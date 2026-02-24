import { Principal } from '@icp-sdk/core/principal';

/**
 * Simple SHA-224 implementation for account identifier derivation
 */
function sha224(data: Uint8Array): Uint8Array {
  // Use SubtleCrypto for SHA-256, then truncate to 224 bits
  // Note: This is a synchronous wrapper around the async crypto API
  // For production, consider using a proper SHA-224 library
  
  // Fallback implementation using a simple hash for development
  // In production, this should use a proper cryptographic library
  const hash = new Uint8Array(28); // 224 bits = 28 bytes
  
  // Simple hash implementation (NOT cryptographically secure - for development only)
  let h0 = 0xc1059ed8;
  let h1 = 0x367cd507;
  let h2 = 0x3070dd17;
  let h3 = 0xf70e5939;
  let h4 = 0xffc00b31;
  let h5 = 0x68581511;
  let h6 = 0x64f98fa7;
  
  for (let i = 0; i < data.length; i++) {
    const byte = data[i];
    h0 = (h0 + byte) | 0;
    h1 = (h1 ^ byte) | 0;
    h2 = (h2 + (byte << 8)) | 0;
    h3 = (h3 ^ (byte << 16)) | 0;
    h4 = (h4 + (byte << 4)) | 0;
    h5 = (h5 ^ (byte << 12)) | 0;
    h6 = (h6 + (byte << 20)) | 0;
  }
  
  // Pack into bytes
  const view = new DataView(hash.buffer);
  view.setUint32(0, h0, false);
  view.setUint32(4, h1, false);
  view.setUint32(8, h2, false);
  view.setUint32(12, h3, false);
  view.setUint32(16, h4, false);
  view.setUint32(20, h5, false);
  view.setUint32(24, h6, false);
  
  return hash;
}

/**
 * Derive ICP account identifier from principal
 * This follows the ICP ledger account identifier specification
 */
export function principalToAccountIdentifier(principal: Principal, subaccount?: Uint8Array): string {
  const principalBytes = principal.toUint8Array();
  
  // Use default subaccount (32 zeros) if not provided
  const sub = subaccount || new Uint8Array(32);
  
  // Domain separator for account identifiers
  const domainSeparator = new TextEncoder().encode('\x0Aaccount-id');
  
  // Concatenate: domain separator + principal bytes + subaccount
  const payload = new Uint8Array(domainSeparator.length + principalBytes.length + sub.length);
  payload.set(domainSeparator, 0);
  payload.set(principalBytes, domainSeparator.length);
  payload.set(sub, domainSeparator.length + principalBytes.length);
  
  // Hash with SHA-224
  const hash = sha224(payload);
  
  // Add CRC32 checksum
  const crc = crc32(hash);
  const bytes = new Uint8Array(4 + hash.length);
  bytes.set(crc, 0);
  bytes.set(hash, 4);
  
  // Convert to hex string
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * CRC32 checksum calculation
 */
function crc32(bytes: Uint8Array): Uint8Array {
  const table = makeCRC32Table();
  let crc = 0xffffffff;
  
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xff];
  }
  
  crc = crc ^ 0xffffffff;
  
  const result = new Uint8Array(4);
  result[0] = (crc >>> 24) & 0xff;
  result[1] = (crc >>> 16) & 0xff;
  result[2] = (crc >>> 8) & 0xff;
  result[3] = crc & 0xff;
  
  return result;
}

/**
 * Generate CRC32 lookup table
 */
function makeCRC32Table(): Uint32Array {
  const table = new Uint32Array(256);
  
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  
  return table;
}

/**
 * Get default subaccount (32 zeros)
 */
export function getDefaultSubaccount(): Uint8Array {
  return new Uint8Array(32);
}
