/**
 * Options for provisioning a new Cloudflare tunnel
 */
export interface ProvisionTunnelOptions {
    deviceId: string;         // Unique identifier for the device
    domain: string;           // e.g. "example.com"
    zoneId: string;          // Cloudflare Zone ID
    accountId: string;       // Cloudflare Account ID
    apiToken: string;        // Cloudflare API Token
    certPath?: string;       // Defaults to "/root/.cloudflared"
    sshTarget?: string;      // Defaults to "localhost:22"
}

/**
 * Result from a successful tunnel provisioning
 */
export interface ProvisionTunnelResult {
    configYml: string;        // Cloudflare configuration YAML
    tunnelJsonBase64: string; // Base64 encoded tunnel credentials
    hostname: string;         // Full hostname for the tunnel
}

/**
 * Response from Cloudflare API for tunnel creation
 */
export interface CloudflareApiResponse {
    success: boolean;
    errors?: Array<{
        code: number;
        message: string;
    }>;
    result?: any;
}