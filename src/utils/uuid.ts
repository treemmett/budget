/* eslint-disable no-bitwise */

const byteToHex = new Array<string>(256);
for (let i = 0; i < 256; i += 1) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf: Uint8Array): string {
  let i = 0;

  const uuidBytes = [
    byteToHex[buf[(i += 1)]],
    byteToHex[buf[(i += 1)]],
    byteToHex[buf[(i += 1)]],
    '-',
    byteToHex[buf[(i += 1)]],
    byteToHex[buf[(i += 1)]],
    '-',
    byteToHex[buf[(i += 1)]],
    byteToHex[buf[(i += 1)]],
    '-',
    byteToHex[buf[(i += 1)]],
    byteToHex[buf[(i += 1)]],
    '-',
    byteToHex[buf[(i += 1)]],
    byteToHex[buf[(i += 1)]],
    byteToHex[buf[(i += 1)]],
    byteToHex[buf[(i += 1)]],
    byteToHex[buf[(i += 1)]],
    byteToHex[buf[(i += 1)]],
  ];

  return uuidBytes.join('');
}

function uuid(): string {
  const rnds = window.crypto.getRandomValues(new Uint8Array(16));
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;
  return bytesToUuid(rnds);
}

export default uuid;
