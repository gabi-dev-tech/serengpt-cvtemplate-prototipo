/**
 * Minimal PNG encoder for 1×1 solid-color images (decorations in the .docx are page-anchored
 * pictures stretched to size). Uses a stored (uncompressed) zlib block, so it needs no dependency
 * and works in the browser and in Node.
 */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(bytes: Uint8Array) {
  let c = 0xffffffff;
  for (const b of bytes) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Uint8Array) {
  const out = new Uint8Array(12 + data.length);
  const dv = new DataView(out.buffer);
  dv.setUint32(0, data.length);
  for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
  out.set(data, 8);
  dv.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
}

export function solidPng(hex: string): Uint8Array {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const ihdr = new Uint8Array(13);
  const dv = new DataView(ihdr.buffer);
  dv.setUint32(0, 1); // width
  dv.setUint32(4, 1); // height
  ihdr.set([8, 2, 0, 0, 0], 8); // 8-bit RGB
  const raw = [0, r, g, b]; // filter byte + pixel
  let a = 1;
  let s = 0;
  for (const v of raw) {
    a = (a + v) % 65521;
    s = (s + a) % 65521;
  }
  const adler = ((s << 16) | a) >>> 0;
  const idat = new Uint8Array([0x78, 0x01, 0x01, raw.length, 0, ~raw.length & 0xff, 0xff, ...raw, adler >>> 24, (adler >>> 16) & 0xff, (adler >>> 8) & 0xff, adler & 0xff]);
  const sig = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  const parts = [sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", new Uint8Array())];
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}
