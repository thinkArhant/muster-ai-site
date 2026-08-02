/* Minimal PNG reader — 8-bit, non-interlaced, colour types 0/2/4/6.

   Exists for one reason: the grain layer is the project's known cross-engine
   failure class, and "it looked fine" is not evidence. Decoding the render
   lets both engines be compared on the same number — the pixel spread of a
   patch of bare ground. A flat fill scores 0. */

import { inflateSync } from "node:zlib";

const CHANNELS = { 0: 1, 2: 3, 4: 2, 6: 4 };

export function decodePng(buffer) {
  if (buffer.readUInt32BE(0) !== 0x89504e47) throw new Error("Not a PNG");

  let offset = 8;
  let header = null;
  const idat = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);

    if (type === "IHDR") {
      header = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        depth: data[8],
        colorType: data[9],
        interlace: data[12]
      };
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") {
      break;
    }
    offset += length + 12;
  }

  if (!header) throw new Error("PNG has no IHDR");
  if (header.depth !== 8) throw new Error(`Unsupported bit depth ${header.depth}`);
  if (header.interlace !== 0) throw new Error("Interlaced PNG unsupported");

  const channels = CHANNELS[header.colorType];
  if (!channels) throw new Error(`Unsupported colour type ${header.colorType}`);

  const raw = inflateSync(Buffer.concat(idat));
  const stride = header.width * channels;
  const pixels = Buffer.alloc(stride * header.height);

  let pos = 0;
  for (let y = 0; y < header.height; y++) {
    const filter = raw[pos++];
    const line = raw.subarray(pos, pos + stride);
    pos += stride;

    const out = pixels.subarray(y * stride, (y + 1) * stride);
    const prior = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;

    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? out[x - channels] : 0;
      const b = prior ? prior[x] : 0;
      const c = prior && x >= channels ? prior[x - channels] : 0;
      const v = line[x];

      switch (filter) {
        case 0: out[x] = v; break;
        case 1: out[x] = (v + a) & 0xff; break;
        case 2: out[x] = (v + b) & 0xff; break;
        case 3: out[x] = (v + ((a + b) >> 1)) & 0xff; break;
        case 4: out[x] = (v + paeth(a, b, c)) & 0xff; break;
        default: throw new Error(`Unknown filter ${filter}`);
      }
    }
  }

  return { ...header, channels, stride, pixels };
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

/* Mean and standard deviation of luminance across a rectangular patch. */
export function patchStats(image, x0, y0, w, h) {
  const values = [];
  for (let y = y0; y < Math.min(y0 + h, image.height); y++) {
    for (let x = x0; x < Math.min(x0 + w, image.width); x++) {
      const i = y * image.stride + x * image.channels;
      const lum =
        image.channels >= 3
          ? 0.2126 * image.pixels[i] +
            0.7152 * image.pixels[i + 1] +
            0.0722 * image.pixels[i + 2]
          : image.pixels[i];
      values.push(lum);
    }
  }
  if (!values.length) return { mean: 0, stdDev: 0, min: 0, max: 0, samples: 0 };

  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  const variance =
    values.reduce((s, v) => s + (v - mean) * (v - mean), 0) / values.length;

  return {
    mean: round(mean),
    stdDev: round(Math.sqrt(variance)),
    min: round(Math.min(...values)),
    max: round(Math.max(...values)),
    samples: values.length
  };
}

function round(n) {
  return Math.round(n * 1000) / 1000;
}

/* Locate a patch of bare page ground by luminance, so the same measurement can
   be taken from two engines whose layouts do not line up pixel for pixel.
   A patch that still contains text or a border is rejected by its spread. */
export function findGroundPatch(image, targetLum, { size = 96, tolerance = 2.5, maxSpread = 6 } = {}) {
  for (let y = 0; y + size <= image.height; y += 32) {
    for (let x = 0; x + size <= image.width; x += 32) {
      const stats = patchStats(image, x, y, size, size);
      if (Math.abs(stats.mean - targetLum) <= tolerance && stats.stdDev < maxSpread) {
        return { x, y, size, ...stats };
      }
    }
  }
  return null;
}

/* sRGB luminance of a #rrggbb value, on the same 0-255 scale as patchStats. */
export function hexLuminance(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return round(0.2126 * r + 0.7152 * g + 0.0722 * b);
}
