import { Router, Request, Response } from 'express';
import { provisionTunnel } from '../homeServer/controller/provisionTunnel';
import { ProvisionTunnelOptions } from '../homeServer/model/provisionTunnel';
import { v4 as uuidv4 } from 'uuid';

// Add types for Cloudflare API responses
interface CloudflareDNSRecord {
    id: string;
    name: string;
    type: string;
    content: string;
}

interface CloudflareResponse<T> {
    success: boolean;
    errors: any[];
    result: T;
}

const router = Router();

router.post('/provision', async (req: Request, res: Response): Promise<void> => {
    // Generate a unique ID for this tunnel instance
    const tunnelId = uuidv4();

    const cloudflareConfig = {
        deviceId: tunnelId, // Use UUID as the tunnel identifier
        domain: process.env.CLOUDFLARE_DOMAIN,
        zoneId: process.env.CLOUDFLARE_ZONE_ID,
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
        apiToken: process.env.CLOUDFLARE_API_TOKEN
    };

    // Verify Cloudflare configuration
    const missingConfig = Object.entries(cloudflareConfig)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

    if (missingConfig.length > 0) {
        res.status(500).json({
            success: false,
            error: 'Missing Cloudflare configuration',
            message: `Missing required Cloudflare configuration: ${missingConfig.join(', ')}`
        });
        return;
    }

    try {
        const tunnel = await provisionTunnel({
            ...cloudflareConfig as Required<Omit<ProvisionTunnelOptions, 'certPath' | 'sshTarget'>>,
            certPath: process.env.CLOUDFLARE_CERT_PATH
        });

        res.status(201).json({
            success: true,
            data: {
                ...tunnel,
                tunnelId // Return the UUID for the client to use for cleanup
            }
        });
    } catch (error) {
        console.error('Tunnel provisioning failed:', error);
        res.status(500).json({
            success: false,
            error: 'Tunnel provisioning failed',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});

// Cleanup route uses the UUID passed back from provisioning
router.delete('/cleanup/:tunnelId', async (req: Request, res: Response): Promise<void> => {
    const { tunnelId } = req.params;
    const { accountId, apiToken, zoneId, domain } = process.env;

    if (!tunnelId || !accountId || !apiToken || !zoneId || !domain) {
        res.status(400).json({
            success: false,
            error: 'Missing required parameters',
            message: 'tunnelId and Cloudflare configuration are required'
        });
        return;
    }

    try {
        // Delete the tunnel
        const deleteTunnelResponse = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${accountId}/cfd_tunnel/${tunnelId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!deleteTunnelResponse.ok) {
            throw new Error(`Failed to delete tunnel: ${deleteTunnelResponse.statusText}`);
        }

        // Delete the DNS record
        const hostname = `${tunnelId}.${domain}`;
        const getDnsRecordResponse = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?name=${hostname}`,
            {
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const dnsRecordData = await getDnsRecordResponse.json() as CloudflareResponse<CloudflareDNSRecord[]>;
        
        if (dnsRecordData.success && dnsRecordData.result.length > 0) {
            const dnsRecordId = dnsRecordData.result[0].id;
            await fetch(
                `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${dnsRecordId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${apiToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        res.status(200).json({
            success: true,
            message: 'Tunnel and DNS record cleaned up successfully'
        });
    } catch (error) {
        console.error('Tunnel cleanup failed:', error);
        res.status(500).json({
            success: false,
            error: 'Tunnel cleanup failed',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});

export default router;