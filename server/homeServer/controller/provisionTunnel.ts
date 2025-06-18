import { v4 as uuidv4 } from "uuid";
import {
  ProvisionTunnelOptions,
  ProvisionTunnelResult,
  CloudflareApiResponse,
} from "../model/provisionTunnel";

export async function provisionTunnel({
  deviceId,
  domain,
  zoneId,
  accountId,
  apiToken,
  sshTarget = "localhost:22",
}: ProvisionTunnelOptions): Promise<ProvisionTunnelResult> {
  const hostname = `${deviceId}.${domain}`;

  // Add debug logging
  console.log("Attempting to create tunnel with:", {
    accountId,
    zoneId,
    deviceId,
    domain,
    tokenLength: apiToken?.length || 0,
  });

  // Fix header format to match curl example exactly
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + apiToken  // Changed to exact format
  };

  // 1. Create Tunnel with error handling
  let createTunnelResponse;
  try {
    createTunnelResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/cfd_tunnel`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: deviceId,
          config_src: "cloudflare",
        }),
      }
    );

    // Log response status and headers for debugging
    console.log("Cloudflare response:", {
      status: createTunnelResponse.status,
      statusText: createTunnelResponse.statusText,
      headers: Object.fromEntries(createTunnelResponse.headers),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Network error creating tunnel: ${error.message}`);
    } else {
      throw new Error("Network error creating tunnel: Unknown error");
    }
  }

  const createTunnelData = (await createTunnelResponse.json()) as CloudflareApiResponse;

  if (!createTunnelData.success) {
    throw new Error(
      `Failed to create tunnel: ${JSON.stringify(createTunnelData.errors)}
      acc= ${accountId}, zone=${zoneId}, device=${deviceId}, domain=${domain} token=${apiToken}`
    );
  }

  const tunnelId = createTunnelData.result.id;

  // 2. Create DNS record
  const createDnsResponse = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        type: "CNAME",
        name: hostname,
        content: `${tunnelId}.cfargotunnel.com`,
        proxied: true,
      }),
    }
  );

  const createDnsData = (await createDnsResponse.json()) as CloudflareApiResponse;

  if (!createDnsData.success) {
    throw new Error(
      `Failed to create DNS record: ${JSON.stringify(createDnsData.errors)}`
    );
  }

  // 3. Generate config.yml
  const configYml = `
tunnel: ${tunnelId}
credentials-file: /home/pi/.cloudflared/${deviceId}.json

ingress:
  - hostname: ${hostname}
    service: ssh://${sshTarget}
  - service: http_status:404
  `.trim();
  console.log("createTunneldata Resp",createTunnelData)
  // Note: tunnelSecret is inside credentials_file in the response
  const tunnelJson = {
    TunnelID: tunnelId,
    TunnelName: deviceId,
    AccountTag: accountId,
    TunnelSecret: createTunnelData.result.credentials_file.TunnelSecret
  };

  const tunnelJsonBase64 = Buffer.from(
    JSON.stringify(tunnelJson, null, 2)
  ).toString("base64");

  console.log("Tunnel provisioned successfully:", {
    tunnelId, 
    hostname,
    tunnelJsonBase64,
    configYml,
  });
  return {
    configYml,
    tunnelJsonBase64,
    hostname,
  };
}
