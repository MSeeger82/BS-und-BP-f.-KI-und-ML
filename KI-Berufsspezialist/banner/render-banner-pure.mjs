/**
 * Zero-dependency YouTube banner renderer (Node.js stdlib only).
 * node render-banner-pure.mjs
 */
import fs from "fs";
import path from "path";
import zlib from "zlib";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const W = 2560;
const H = 1440;
const OUT_MAIN = path.join(__dirname, "youtube-banner-2560x1440.png");
const OUT_SAFE = path.join(__dirname, "youtube-banner.png");

const BG_TOP = [7, 11, 18];
const BG_BOT = [12, 21, 34];
const CYAN = [34, 211, 238];
const TEAL = [45, 212, 191];
const WHITE = [248, 250, 252];
const MUTED = [148, 163, 184];
const FOOT = [100, 116, 139];

function lerp(a, b, t) {
  return (a + (b - a) * t) | 0;
}
function blend(c1, c2, t) {
  return [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];
}

// ---- minimal 5x7 font (incl. German umlauts) ----
const G = {};
function def(ch, rows) {
  G[ch] = rows.map((r) => r.padEnd(5, ".").slice(0, 5));
}
const L = {
  A: [".#.", "#.#", "#.#", "###", "#.#", "#.#", "#.#"],
  B: ["##.", "#.#", "#.#", "##.", "#.#", "#.#", "##."],
  C: [".##", "#..", "#..", "#..", "#..", "#..", ".##"],
  D: ["##.", "#.#", "#.#", "#.#", "#.#", "#.#", "##."],
  E: ["###", "#..", "#..", "##.", "#..", "#..", "###"],
  F: ["###", "#..", "#..", "##.", "#..", "#..", "#.."],
  G: [".##", "#..", "#..", "#.#", "#.#", "#.#", ".##"],
  H: ["#.#", "#.#", "#.#", "###", "#.#", "#.#", "#.#"],
  I: ["###", ".#.", ".#.", ".#.", ".#.", ".#.", "###"],
  J: ["###", "..#", "..#", "..#", "..#", "#.#", ".#."],
  K: ["#.#", "#.#", "##.", "#.#", "#.#", "#.#", "#.#"],
  L: ["#..", "#..", "#..", "#..", "#..", "#..", "###"],
  M: ["#.#", "###", "###", "#.#", "#.#", "#.#", "#.#"],
  N: ["#.#", "###", "###", "###", "###", "#.#", "#.#"],
  O: [".#.", "#.#", "#.#", "#.#", "#.#", "#.#", ".#."],
  P: ["##.", "#.#", "#.#", "##.", "#..", "#..", "#.."],
  Q: [".#.", "#.#", "#.#", "#.#", "#.#", ".##", "..#"],
  R: ["##.", "#.#", "#.#", "##.", "#.#", "#.#", "#.#"],
  S: [".##", "#..", "#..", ".#.", "..#", "..#", "##."],
  T: ["###", ".#.", ".#.", ".#.", ".#.", ".#.", ".#."],
  U: ["#.#", "#.#", "#.#", "#.#", "#.#", "#.#", "###"],
  V: ["#.#", "#.#", "#.#", "#.#", "#.#", ".#.", ".#."],
  W: ["#.#", "#.#", "#.#", "#.#", "###", "###", "#.#"],
  X: ["#.#", "#.#", ".#.", ".#.", ".#.", "#.#", "#.#"],
  Y: ["#.#", "#.#", "#.#", ".#.", ".#.", ".#.", ".#."],
  Z: ["###", "..#", ".#.", ".#.", ".#.", "#..", "###"],
  a: ["...", ".##", "..#", ".##", "#.#", "#.#", ".##"],
  b: ["#..", "#..", "##.", "#.#", "#.#", "#.#", "##."],
  c: ["...", ".##", "#..", "#..", "#..", "#..", ".##"],
  d: ["..#", "..#", ".##", "#.#", "#.#", "#.#", ".##"],
  e: ["...", ".#.", "#.#", "###", "#..", "#.#", ".#."],
  f: [".##", "#.#", "#..", "##.", "#..", "#..", "#.."],
  g: ["...", ".##", "#.#", "#.#", ".##", "..#", "##."],
  h: ["#..", "#..", "##.", "#.#", "#.#", "#.#", "#.#"],
  i: [".#.", "...", "##.", ".#.", ".#.", ".#.", "###"],
  j: ["..#", "...", ".##", "..#", "..#", "#.#", ".#."],
  k: ["#..", "#..", "#.#", "##.", "#.#", "#.#", "#.#"],
  l: ["##.", ".#.", ".#.", ".#.", ".#.", ".#.", "###"],
  m: ["...", "##.", "###", "###", "#.#", "#.#", "#.#"],
  n: ["...", "##.", "#.#", "#.#", "#.#", "#.#", "#.#"],
  o: ["...", ".#.", "#.#", "#.#", "#.#", "#.#", ".#."],
  p: ["...", "##.", "#.#", "#.#", "##.", "#..", "#.."],
  q: ["...", ".##", "#.#", "#.#", ".##", "..#", "..#"],
  r: ["...", "#.#", "##.", "#..", "#..", "#..", "#.."],
  s: ["...", ".##", "#..", ".#.", "..#", "..#", "##."],
  t: [".#.", "###", ".#.", ".#.", ".#.", ".#.", "..#"],
  u: ["...", "#.#", "#.#", "#.#", "#.#", "#.#", ".##"],
  v: ["...", "#.#", "#.#", "#.#", "#.#", ".#.", ".#."],
  w: ["...", "#.#", "#.#", "#.#", "###", "###", "#.#"],
  x: ["...", "#.#", "#.#", ".#.", ".#.", "#.#", "#.#"],
  y: ["...", "#.#", "#.#", "#.#", ".##", "..#", "##."],
  z: ["...", "###", "..#", ".#.", "#..", "#..", "###"],
  "0": [".#.", "#.#", "#.#", "#.#", "#.#", "#.#", ".#."],
  "1": [".#.", "##.", ".#.", ".#.", ".#.", ".#.", "###"],
  "2": ["##.", "..#", "..#", ".#.", "#..", "#..", "###"],
  "3": ["##.", "..#", "..#", "##.", "..#", "..#", "##."],
  "4": ["#.#", "#.#", "#.#", "###", "..#", "..#", "..#"],
  "5": ["###", "#..", "##.", "..#", "..#", "..#", "##."],
  "6": [".##", "#..", "##.", "#.#", "#.#", "#.#", ".#."],
  "7": ["###", "..#", "..#", ".#.", ".#.", "#..", "#.."],
  "8": [".#.", "#.#", "#.#", ".#.", "#.#", "#.#", ".#."],
  "9": [".#.", "#.#", "#.#", ".##", "..#", "..#", "##."],
  " ": ["...", "...", "...", "...", "...", "...", "..."],
  ".": ["...", "...", "...", "...", "...", ".#.", ".#."],
  "·": ["...", "...", ".#.", "...", "...", "...", "..."],
  "&": [".#.", "#.#", ".#.", ".##", "#.#", "#.#", ".##"],
  "(": [".#.", "#..", "#..", "#..", "#..", "#..", ".#."],
  ")": [".#.", "..#", "..#", "..#", "..#", "..#", ".#."],
  "-": ["...", "...", "...", "###", "...", "...", "..."],
  ":": ["...", ".#.", ".#.", "...", ".#.", ".#.", "..."],
  "/": ["..#", "..#", ".#.", ".#.", ".#.", "#..", "#.."],
  Ä: ["#.#", ".#.", "#.#", "###", "#.#", "#.#", "#.#"],
  Ö: ["#.#", ".#.", "#.#", "#.#", "#.#", "#.#", ".#."],
  Ü: ["#.#", "...", "#.#", "#.#", "#.#", "#.#", "###"],
  ä: ["#.#", "...", ".##", "..#", ".##", "#.#", ".##"],
  ö: ["#.#", "...", ".#.", "#.#", "#.#", "#.#", ".#."],
  ü: ["#.#", "...", "#.#", "#.#", "#.#", "#.#", ".##"],
  ß: ["##.", "#.#", "##.", "#.#", "#.#", "#.#", "#.."],
};
for (const [k, v] of Object.entries(L)) def(k, v);

const buf = Buffer.alloc(W * H * 3);

function idx(x, y) {
  return (y * W + x) * 3;
}
function set(x, y, r, g, b, a = 255) {
  if (x < 0 || y < 0 || x >= W || y >= H || a <= 0) return;
  const i = idx(x, y);
  if (a >= 255) {
    buf[i] = r;
    buf[i + 1] = g;
    buf[i + 2] = b;
  } else {
    const t = a / 255;
    buf[i] = (buf[i] * (1 - t) + r * t) | 0;
    buf[i + 1] = (buf[i + 1] * (1 - t) + g * t) | 0;
    buf[i + 2] = (buf[i + 2] * (1 - t) + b * t) | 0;
  }
}
function rect(x0, y0, x1, y1, c, a = 255) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) set(x, y, c[0], c[1], c[2], a);
}
function hline(x0, x1, y, c, a = 255) {
  if (x0 > x1) [x0, x1] = [x1, x0];
  for (let x = x0; x <= x1; x++) set(x, y, c[0], c[1], c[2], a);
}
function vline(x, y0, y1, c, a = 255) {
  if (y0 > y1) [y0, y1] = [y1, y0];
  for (let y = y0; y <= y1; y++) set(x, y, c[0], c[1], c[2], a);
}
function circle(cx, cy, rad, c, a = 255, fill = true) {
  const r2 = rad * rad;
  for (let y = (cy - rad) | 0; y <= cy + rad; y++) {
    for (let x = (cx - rad) | 0; x <= cx + rad; x++) {
      const d = (x - cx) * (x - cx) + (y - cy) * (y - cy);
      if (fill && d <= r2) set(x, y, c[0], c[1], c[2], a);
      else if (!fill && Math.abs(d - r2) <= rad) set(x, y, c[0], c[1], c[2], a);
    }
  }
}
function line(x0, y0, x1, y1, c, a = 255, w = 1) {
  let dx = Math.abs(x1 - x0),
    dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1,
    sy = y0 < y1 ? 1 : -1;
  let err = dx - dy,
    x = x0,
    y = y0;
  for (;;) {
    if (w <= 1) set(x, y, c[0], c[1], c[2], a);
    else {
      const h = (w / 2) | 0;
      for (let oy = -h; oy <= h; oy++) for (let ox = -h; ox <= h; ox++) set(x + ox, y + oy, c[0], c[1], c[2], a);
    }
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
}

function measure(text, scale, tracking = 1) {
  let w = 0;
  for (const ch of text) {
    const g = G[ch] || G[ch.toUpperCase()] || G[" "];
    const gw = Math.max(...g.map((r) => r.length));
    w += (gw + tracking) * scale;
  }
  return w;
}
function drawText(x, y, text, scale, c, a = 255, tracking = 1) {
  let cx = x;
  for (const ch of text) {
    const g = G[ch] || G[ch.toUpperCase()] || G[" "];
    for (let row = 0; row < g.length; row++) {
      for (let col = 0; col < g[row].length; col++) {
        if (g[row][col] === "#") {
          for (let sy = 0; sy < scale; sy++)
            for (let sx = 0; sx < scale; sx++) set(cx + col * scale + sx, y + row * scale + sy, c[0], c[1], c[2], a);
        }
      }
    }
    const gw = Math.max(...g.map((r) => r.length));
    cx += (gw + tracking) * scale;
  }
}

// Background
console.log("bg…");
const cx0 = W * 0.55,
  cy0 = H * 0.42;
for (let y = 0; y < H; y++) {
  const v = y / (H - 1);
  const base = blend(BG_TOP, BG_BOT, v);
  for (let x = 0; x < W; x++) {
    const dx = (x - cx0) / W;
    const dy = (y - cy0) / H;
    const r = Math.sqrt(dx * dx + dy * dy * 1.2);
    let glow = Math.max(0, 1 - r * 1.8) ** 2 * 0.22;
    const dx2 = (x - W * 0.18) / W;
    const dy2 = (y - H * 0.55) / H;
    const r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    glow += Math.max(0, 1 - r2 * 3.5) ** 2 * 0.08;
    glow = Math.min(1, glow);
    set(x, y, lerp(base[0], 14, glow * 0.5), lerp(base[1], 80, glow), lerp(base[2], 110, glow));
  }
}

// Grid
console.log("decor…");
for (let x = 0; x < W; x += 80) vline(x, 0, H - 1, [20, 40, 58], 50);
for (let y = 0; y < H; y += 80) hline(0, W - 1, y, [20, 40, 58], 50);

// Neural net
const layers = [
  [
    [180, 420],
    [160, 560],
    [190, 700],
    [150, 820],
  ],
  [
    [340, 380],
    [360, 520],
    [350, 660],
    [370, 780],
    [330, 900],
  ],
  [
    [520, 460],
    [540, 600],
    [510, 740],
    [530, 860],
  ],
];
for (let li = 0; li < layers.length - 1; li++) {
  for (const a of layers[li]) for (const b of layers[li + 1]) line(a[0], a[1], b[0], b[1], CYAN, 40, 1);
}
for (const layer of layers) {
  for (const [x, y] of layer) {
    circle(x, y, 6, CYAN, 200);
    circle(x, y, 10, CYAN, 50, false);
  }
}

// Bars
const baseX = 2100,
  baseY = 920;
const bars = [90, 140, 110, 180, 150, 220, 190];
const bw = 28,
  gap = 18;
for (let i = 0; i < bars.length; i++) {
  const bh = bars[i];
  const x0 = baseX + i * (bw + gap);
  rect(x0, baseY - bh, x0 + bw, baseY, CYAN, 50 + i * 12);
  hline(x0, x0 + bw, baseY - bh, CYAN, 140);
  vline(x0, baseY - bh, baseY, CYAN, 140);
  vline(x0 + bw, baseY - bh, baseY, CYAN, 140);
}
hline(baseX - 10, baseX + bars.length * (bw + gap), baseY, CYAN, 100);

// Brackets
const m = 48,
  Lbr = 70,
  t = 3;
for (let k = 0; k < t; k++) {
  hline(m, m + Lbr, m + k, CYAN, 180);
  vline(m + k, m, m + Lbr, CYAN, 180);
  hline(W - m - Lbr, W - m, m + k, CYAN, 180);
  vline(W - m - k, m, m + Lbr, CYAN, 180);
  hline(m, m + Lbr, H - m - k, CYAN, 180);
  vline(m + k, H - m - Lbr, H - m, CYAN, 180);
  hline(W - m - Lbr, W - m, H - m - k, CYAN, 180);
  vline(W - m - k, H - m - Lbr, H - m, CYAN, 180);
}
rect(0, H - 8, W - 1, H - 1, CYAN, 200);
rect(0, H - 14, (W / 3) | 0, H - 9, TEAL, 160);

// Text
console.log("text…");
const safeW = 1546,
  safeL = ((W - safeW) / 2) | 0,
  safeT = ((H - 423) / 2) | 0;

const badge = "IHK · KI & MASCHINELLES LERNEN";
const title = "Kompletter Lehrstoff als Erklärvideos";
const sub = "Berufsspezialist & Bachelor Professional in KI und ML (IHK)";
const footL = "Prüfungsorientiert · Praxisnah · Strukturiert";
const footR = "DQR 5 · DQR 6";
const chips = ["12 Module", "Praxisprojekte", "Prüfungsfit"];

const sBadge = 4,
  sTitle = 8,
  sSub = 4,
  sFoot = 3,
  sChip = 3;

const bwT = measure(badge, sBadge, 2);
const bhT = 7 * sBadge;
const bx = safeL + ((safeW - bwT) / 2) | 0;
const by = safeT + 40;
const padX = 28,
  padY = 16;
rect(bx - padX, by - padY, bx + bwT + padX, by + bhT + padY, [8, 30, 40], 200);
hline(bx - padX, bx + bwT + padX, by - padY, CYAN, 160);
hline(bx - padX, bx + bwT + padX, by + bhT + padY, CYAN, 160);
vline(bx - padX, by - padY, by + bhT + padY, CYAN, 160);
vline(bx + bwT + padX, by - padY, by + bhT + padY, CYAN, 160);
drawText(bx, by, badge, sBadge, CYAN, 255, 2);

const tw = measure(title, sTitle, 2);
const th = 7 * sTitle;
const tx = safeL + ((safeW - tw) / 2) | 0;
const ty = by + bhT + 50;
drawText(tx + 3, ty + 3, title, sTitle, [0, 40, 50], 100, 2);
drawText(tx, ty, title, sTitle, WHITE, 255, 2);

const sw = measure(sub, sSub, 2);
const sh = 7 * sSub;
const sx = safeL + ((safeW - sw) / 2) | 0;
const sy = ty + th + 36;
drawText(sx, sy, sub, sSub, MUTED, 255, 2);

const chipH = 7 * sChip + 20;
const chipGap = 20;
const chipData = chips.map((c) => [c, measure(c, sChip, 2) + 36]);
const total = chipData.reduce((s, [, cw]) => s + cw, 0) + chipGap * (chips.length - 1);
let x = safeL + ((safeW - total) / 2) | 0;
const cy = sy + sh + 40;
for (const [label, cw] of chipData) {
  rect(x, cy, x + cw, cy + chipH, [15, 40, 55], 180);
  hline(x, x + cw, cy, CYAN, 100);
  hline(x, x + cw, cy + chipH, CYAN, 100);
  vline(x, cy, cy + chipH, CYAN, 100);
  vline(x + cw, cy, cy + chipH, CYAN, 100);
  const lw = measure(label, sChip, 2);
  drawText(x + ((cw - lw) / 2) | 0, cy + 10, label, sChip, [165, 243, 252], 230, 2);
  x += cw + chipGap;
}

drawText(64, H - 64, footL, sFoot, FOOT, 255, 2);
const frw = measure(footR, sFoot, 2);
drawText(W - 64 - frw, H - 64, footR, sFoot, FOOT, 255, 2);
circle(52, H - 54, 4, CYAN, 255);
circle(W - 52, H - 54, 4, TEAL, 255);

// PNG encode
console.log("png…");
function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : c >>> 1;
  }
  return ~c >>> 0;
}
function chunk(type, data) {
  const typeB = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcB = Buffer.alloc(4);
  const both = Buffer.concat([typeB, data]);
  crcB.writeUInt32BE(crc32(both));
  return Buffer.concat([len, both, crcB]);
}

const raw = Buffer.alloc((W * 3 + 1) * H);
for (let y = 0; y < H; y++) {
  const o = y * (W * 3 + 1);
  raw[o] = 0;
  buf.copy(raw, o + 1, y * W * 3, (y + 1) * W * 3);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;
ihdr[9] = 2;
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);
fs.writeFileSync(OUT_MAIN, png);
fs.copyFileSync(OUT_MAIN, OUT_SAFE);
const mb = (png.length / (1024 * 1024)).toFixed(3);
console.log(`Wrote: ${OUT_MAIN}`);
console.log(`Also:  ${OUT_SAFE}`);
console.log(`Size:  ${png.length} bytes (${mb} MB)`);
console.log(`Dims:  ${W}x${H}`);
if (png.length > 6 * 1024 * 1024) throw new Error("File exceeds 6MB");
