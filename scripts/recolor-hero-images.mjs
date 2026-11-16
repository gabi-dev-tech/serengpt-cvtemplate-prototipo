// Recolors the hero resume screenshots (public/sites/enhancv/fold-section_es_resume*.webp) to the
// SerenGPT palette and swaps the Enhancv branding for SerenGPT. Originals are never modified.
// Run: node scripts/recolor-hero-images.mjs
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "public/sites/enhancv";
const OUT_DIR = "public/sites/serengpt/hero";

// Tokens from monorepo apps/frontend/src/styles/globals.scss (light theme).
const PRIMARY = "#e44230"; // --primary (primary-600)
const PRIMARY_TEXT = "#be2817"; // --primary-hover (primary-700)
const SUCCESS = "#16a34a"; // --success
const INK = "#212739"; // --color-ink

// A rule recolors pixels whose hue falls in `hue`: each pixel is read as `key` blended over white
// and re-emitted as `target` with the same blend amount, which keeps antialiasing and tints intact.
// `minL` keeps dark neutrals (body text in navy) out of accent rules.
const BLUE = { hue: [195, 250], key: "#3868f0", target: PRIMARY };
const TEAL = { hue: [165, 195], key: "#18aaa8", target: PRIMARY_TEXT };
const MINT = { hue: [130, 165], key: "#58c8a0", target: SUCCESS };
const DEFAULT_RULES = [BLUE, TEAL, MINT];

const FONT = "Segoe UI, Arial, sans-serif";

/**
 * Per image: `regions` are checked in order and the first one containing a pixel wins.
 * A region either protects its pixels (photos, palette swatches) or replaces the default rules.
 * `brand` patches cover Enhancv marks: a rotated rect in `bg` anchored at the text's left baseline.
 */
const IMAGES = [
  {
    name: "resume1",
    regions: [],
    brand: {
      angle: 0,
      patches: [
        { at: [138, 171], cover: [-1, -10.5, 100, 3.5], bg: "#ffffff", text: "hola@serengpt.com", size: 10, weight: 700, fill: "#343436" },
        { at: [123.5, 1108], cover: [-1, -9, 84, 3], bg: "#ffffff", text: "serengpt.com", size: 10, fill: "#575958" },
        { at: [688, 1109.5], cover: [-2, -15, 89, 2.5], bg: "#ffffff", logo: { h: 16, centerY: -6.5 } },
      ],
    },
  },
  {
    name: "resume2",
    regions: [],
    brand: {
      angle: -2.8,
      patches: [
        { at: [130, 184.5], cover: [-1, -9, 84, 3], bg: "#ffffff", text: "hola@serengpt.com", size: 8.4, weight: 700, fill: "#343436" },
        { at: [160, 979.5], cover: [-1, -8, 73, 3], bg: "#ffffff", text: "serengpt.com", size: 8.4, fill: "#575958" },
        { at: [641, 955], cover: [-2, -13, 75, 2.5], bg: "#ffffff", logo: { h: 13.5, centerY: -5.5 } },
      ],
    },
  },
  {
    name: "resume3",
    regions: [
      { circle: [673, 122.5, 104.5], protect: true },
      { rect: [132, 808, 186, 864], rules: [{ hue: [130, 175], key: "#58c8a0", target: PRIMARY }] },
      { rect: [410, 978, 462, 1040], rules: [{ hue: [130, 175], key: "#58c8a0", target: PRIMARY }] },
    ],
    protectAfterBrand: [[673, 122.5, 104.5]],
    brand: {
      angle: -3.2,
      patches: [
        { at: [418, 240], cover: [-1, -9, 88, 3], bg: "#ffffff", text: "hola@serengpt.com", size: 8.7, weight: 700, fill: "#343436" },
        { at: [929, 1012], cover: [-2, -13, 75, 2.5], bg: "#ffffff", logo: { h: 13.5, centerY: -5.5 } },
      ],
    },
  },
  {
    name: "resume4",
    regions: [
      { circle: [605, 124.5, 104], protect: true },
      { circle: [775, 695, 26], rules: [{ hue: [160, 200], key: "#015c5d", target: INK, minL: 0, maxA: 1.2 }] },
      { circle: [775, 695, 43], rules: [{ hue: [160, 200], key: "#18aaa8", target: PRIMARY }] },
      { rect: [630, 640, 1110, 860], protect: true },
      { rect: [640, 852, 980, 905], rules: [{ hue: [225, 275], key: "#8880cc", target: PRIMARY_TEXT }] },
      { rect: [84, 686, 188, 788], rules: [{ hue: [130, 175], key: "#2dc08a", target: PRIMARY }] },
      {
        poly: [[248, 120], [483, 128], [533, 1078], [295, 1093]],
        rules: [{ hue: [160, 196], key: "#006665", target: INK, minL: 0, maxA: 1.5 }],
      },
    ],
    protectAfterBrand: [[605, 124.5, 104]],
    brand: {
      angle: -3,
      patches: [
        { at: [400, 1057], cover: [-2, -14, 77, 2.5], bg: INK, logo: { h: 13.8, centerY: -5.7, light: true } },
        { at: [849, 1032.5], cover: [-1, -8, 72, 3], bg: "#ffffff", text: "serengpt.com", size: 8.4, fill: "#575958" },
        { at: [672, 191.9], cover: [0, -9, 38, 3], bg: "#ffffff", text: "hola@serengpt.com", anchorEnd: 35.5, size: 9.3, fill: "#575958" },
      ],
    },
  },
];

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const smooth = (v, lo, hi) => {
  const t = clamp((v - lo) / (hi - lo), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Returns [hue in degrees, saturation 0-1, lightness 0-1, chroma 0-255]. */
function hsl(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;
  const l = (max + min) / 510;
  if (chroma === 0) return [0, 0, l, 0];
  const s = chroma / 255 / (1 - Math.abs(2 * l - 1));
  let h;
  if (max === r) h = ((g - b) / chroma) % 6;
  else if (max === g) h = (b - r) / chroma + 2;
  else h = (r - g) / chroma + 4;
  h *= 60;
  if (h < 0) h += 360;
  return [h, s, l, chroma];
}

function inPolygon(x, y, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function contains(region, x, y) {
  if (region.rect) {
    const [x0, y0, x1, y1] = region.rect;
    return x >= x0 && x < x1 && y >= y0 && y < y1;
  }
  if (region.circle) {
    const [cx, cy, r] = region.circle;
    return (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
  }
  return inPolygon(x, y, region.poly);
}

function compileRule(rule) {
  const key = hexToRgb(rule.key);
  const keyInv = key.map((c) => 255 - c);
  return {
    ...rule,
    keyInv,
    keyNorm: keyInv.reduce((sum, c) => sum + c * c, 0),
    targetInv: hexToRgb(rule.target).map((c) => 255 - c),
    minL: rule.minL ?? 0.22,
    maxA: rule.maxA ?? 1,
  };
}

function recolorPixel(data, i, rules) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const [h, s, l, chroma] = hsl(r, g, b);
  const rule = rules.find(({ hue }) => h >= hue[0] && h < hue[1]);
  if (!rule) return;
  const weight = smooth(s, 0.2, 0.4) * smooth(chroma, 6, 20) * (rule.minL > 0 ? smooth(l, rule.minL, rule.minL + 0.08) : 1);
  if (weight <= 0) return;
  const inv = [255 - r, 255 - g, 255 - b];
  const amount = clamp((inv[0] * rule.keyInv[0] + inv[1] * rule.keyInv[1] + inv[2] * rule.keyInv[2]) / rule.keyNorm, 0, rule.maxA);
  for (let c = 0; c < 3; c++) {
    const recolored = clamp(255 - amount * rule.targetInv[c], 0, 255);
    data[i + c] = Math.round(data[i + c] + (recolored - data[i + c]) * weight);
  }
}

async function logoMarkup() {
  const svg = await readFile("public/sites/serengpt/serengpt-logo-ink.svg", "utf8");
  const inner = svg
    .replace(/<metadata>[\s\S]*?<\/metadata>/, "")
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "");
  return {
    dark: inner,
    light: inner.replaceAll('fill="#212739"', 'fill="#ffffff"').replaceAll("clip-path", "clip-path-light"),
  };
}

const escapeXml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function brandSvg({ angle, patches }, width, height, logos) {
  const LOGO_RATIO = 273.5 / 69.3;
  const groups = patches.map((p) => {
    const [x0, y0, x1, y1] = p.cover;
    let content = `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="${p.bg}"/>`;
    if (p.text) {
      const anchor = p.anchorEnd !== undefined ? ` x="${p.anchorEnd}" text-anchor="end"` : ' x="0"';
      content += `<text${anchor} y="0" font-family="${FONT}" font-size="${p.size}" font-weight="${p.weight ?? 400}" fill="${p.fill}">${escapeXml(p.text)}</text>`;
    }
    if (p.logo) {
      const { h, centerY, light } = p.logo;
      content += `<svg x="0" y="${centerY - h / 2}" width="${h * LOGO_RATIO}" height="${h}" viewBox="0 0 273.5 69.3">${light ? logos.light : logos.dark}</svg>`;
    }
    return `<g transform="translate(${p.at[0]} ${p.at[1]}) rotate(${angle})">${content}</g>`;
  });
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${groups.join("")}</svg>`);
}

async function processImage(config, logos) {
  const src = path.join(SRC_DIR, `fold-section_es_${config.name}.webp`);
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const defaultRules = DEFAULT_RULES.map(compileRule);
  const regions = config.regions.map((region) => ({ ...region, rules: region.rules?.map(compileRule) }));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] === 0) continue;
      const region = regions.find((candidate) => contains(candidate, x, y));
      if (region?.protect) continue;
      recolorPixel(data, i, region?.rules ?? defaultRules);
    }
  }

  const raw = { raw: { width, height, channels: 4 } };
  const branded = await sharp(data, raw)
    .composite([{ input: brandSvg(config.brand, width, height, logos) }])
    .raw()
    .toBuffer();

  // Patches near a photo must not paint over it.
  for (const [cx, cy, r] of config.protectAfterBrand ?? []) {
    for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(height - 1, Math.ceil(cy + r)); y++) {
      for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(width - 1, Math.ceil(cx + r)); x++) {
        if ((x - cx) ** 2 + (y - cy) ** 2 > r * r) continue;
        const i = (y * width + x) * 4;
        for (let c = 0; c < 4; c++) branded[i + c] = data[i + c];
      }
    }
  }

  const out = path.join(OUT_DIR, `${config.name}.webp`);
  await sharp(branded, raw).webp({ quality: 90, alphaQuality: 100 }).toFile(out);
  console.log(`${src} -> ${out}`);
}

await mkdir(OUT_DIR, { recursive: true });
const logos = await logoMarkup();
for (const config of IMAGES) await processImage(config, logos);
