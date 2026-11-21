#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate YouTube channel banner 2560x1440 for KI/ML IHK education channel."""
from __future__ import annotations

import math
import os
import struct
import zlib
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

W, H = 2560, 1440
OUT_DIR = Path(__file__).resolve().parent
OUT_MAIN = OUT_DIR / "youtube-banner-2560x1440.png"
OUT_SAFE = OUT_DIR / "youtube-banner.png"

# Colors
BG_TOP = (7, 11, 18)
BG_BOT = (12, 21, 34)
CYAN = (34, 211, 238)       # #22d3ee
TEAL = (45, 212, 191)       # #2dd4bf
CYAN_DIM = (34, 211, 238, 90)
WHITE = (248, 250, 252)
MUTED = (148, 163, 184)
GRID = (30, 58, 78)


def lerp(a, b, t):
    return int(a + (b - a) * t)


def blend(c1, c2, t):
    return tuple(lerp(c1[i], c2[i], t) for i in range(3))


def find_font(size: int, bold: bool = False):
    candidates = []
    windir = os.environ.get("WINDIR", r"C:\Windows")
    fonts = Path(windir) / "Fonts"
    if bold:
        candidates += [
            fonts / "segoeuib.ttf",
            fonts / "arialbd.ttf",
            fonts / "calibrib.ttf",
            fonts / "Bahnschrift.ttf",
            fonts / "consolab.ttf",
        ]
    candidates += [
        fonts / "segoeui.ttf",
        fonts / "arial.ttf",
        fonts / "calibri.ttf",
        fonts / "consola.ttf",
        fonts / "tahoma.ttf",
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
        Path("/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"),
    ]
    for p in candidates:
        if p.exists():
            try:
                return ImageFont.truetype(str(p), size=size)
            except OSError:
                continue
    return ImageFont.load_default()


def draw_gradient_bg(img: Image.Image):
    px = img.load()
    cx, cy = W * 0.55, H * 0.42
    for y in range(H):
        v = y / (H - 1)
        base = blend(BG_TOP, BG_BOT, v)
        for x in range(W):
            # radial cyan glow upper-center
            dx = (x - cx) / W
            dy = (y - cy) / H
            r = math.sqrt(dx * dx + dy * dy * 1.2)
            glow = max(0.0, 1.0 - r * 1.8) ** 2
            # secondary orb left
            dx2 = (x - W * 0.18) / W
            dy2 = (y - H * 0.55) / H
            r2 = math.sqrt(dx2 * dx2 + dy2 * dy2)
            glow2 = max(0.0, 1.0 - r2 * 3.5) ** 2 * 0.35
            g = min(1.0, glow * 0.22 + glow2)
            r_c = lerp(base[0], 14, g * 0.5)
            g_c = lerp(base[1], 80, g)
            b_c = lerp(base[2], 110, g)
            px[x, y] = (r_c, g_c, b_c)


def draw_grid(draw: ImageDraw.ImageDraw, step: int = 80):
    col = (20, 40, 58, 70)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for x in range(0, W, step):
        od.line([(x, 0), (x, H)], fill=col, width=1)
    for y in range(0, H, step):
        od.line([(0, y), (W, y)], fill=col, width=1)
    # stronger center safe-area guide subtle
    return overlay


def draw_corner_brackets(draw: ImageDraw.ImageDraw):
    c = (*CYAN, 180)
    L = 70
    t = 3
    m = 48
    # TL
    draw.line([(m, m + L), (m, m), (m + L, m)], fill=c, width=t)
    # TR
    draw.line([(W - m - L, m), (W - m, m), (W - m, m + L)], fill=c, width=t)
    # BL
    draw.line([(m, H - m - L), (m, H - m), (m + L, H - m)], fill=c, width=t)
    # BR
    draw.line([(W - m - L, H - m), (W - m, H - m), (W - m, H - m - L)], fill=c, width=t)


def draw_neural_net(overlay: Image.Image):
    """Left side decorative neural network nodes + edges."""
    od = ImageDraw.Draw(overlay)
    layers = [
        [(180, 420), (160, 560), (190, 700), (150, 820)],
        [(340, 380), (360, 520), (350, 660), (370, 780), (330, 900)],
        [(520, 460), (540, 600), (510, 740), (530, 860)],
    ]
    # edges
    for li in range(len(layers) - 1):
        for a in layers[li]:
            for b in layers[li + 1]:
                dist = math.hypot(a[0] - b[0], a[1] - b[1])
                alpha = max(25, int(90 - dist * 0.08))
                od.line([a, b], fill=(34, 211, 238, alpha), width=1)
    # nodes
    for li, layer in enumerate(layers):
        for i, (x, y) in enumerate(layer):
            r = 7 if li == 1 else 6
            od.ellipse([x - r, y - r, x + r, y + r], fill=(34, 211, 238, 200))
            od.ellipse([x - r - 4, y - r - 4, x + r + 4, y + r + 4], outline=(34, 211, 238, 60), width=2)


def draw_bar_chart(overlay: Image.Image):
    """Right side decorative bar chart."""
    od = ImageDraw.Draw(overlay)
    base_x, base_y = 2100, 920
    bars = [90, 140, 110, 180, 150, 220, 190]
    bw = 28
    gap = 18
    for i, h in enumerate(bars):
        x0 = base_x + i * (bw + gap)
        y0 = base_y - h
        # bar fill gradient simulation
        od.rounded_rectangle(
            [x0, y0, x0 + bw, base_y],
            radius=4,
            fill=(34, 211, 238, 40 + i * 12),
            outline=(34, 211, 238, 140),
            width=1,
        )
    # baseline
    od.line([(base_x - 10, base_y), (base_x + len(bars) * (bw + gap), base_y)], fill=(34, 211, 238, 100), width=2)
    # small trend line
    pts = []
    for i, h in enumerate(bars):
        pts.append((base_x + i * (bw + gap) + bw // 2, base_y - h - 16))
    if len(pts) > 1:
        od.line(pts, fill=(45, 212, 191, 160), width=2)
        for p in pts:
            od.ellipse([p[0] - 3, p[1] - 3, p[0] + 3, p[1] + 3], fill=(45, 212, 191, 200))


def draw_bottom_bars(overlay: Image.Image):
    od = ImageDraw.Draw(overlay)
    od.rectangle([0, H - 8, W, H], fill=(34, 211, 238, 200))
    od.rectangle([0, H - 14, W // 3, H - 8], fill=(45, 212, 191, 160))
    od.rectangle([W * 2 // 3, 0, W, 4], fill=(34, 211, 238, 100))


def text_size(draw: ImageDraw.ImageDraw, text: str, font) -> tuple[int, int]:
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def center_x(draw, text, font, area_left, area_w):
    tw, _ = text_size(draw, text, font)
    return area_left + (area_w - tw) // 2


def create_with_pil() -> Path:
    img = Image.new("RGB", (W, H), BG_TOP)
    draw_gradient_bg(img)

    overlay = draw_grid(ImageDraw.Draw(img))
    draw_neural_net(overlay)
    draw_bar_chart(overlay)
    draw_bottom_bars(overlay)

    # soft vignette via multiply-ish darkening edges
    vignette = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    for i in range(120):
        a = int(80 * (1 - i / 120) ** 2)
        vd.rectangle([i, i, W - 1 - i, H - 1 - i], outline=(0, 0, 0, a))

    img = img.convert("RGBA")
    img = Image.alpha_composite(img, overlay)
    img = Image.alpha_composite(img, vignette)

    draw = ImageDraw.Draw(img)
    draw_corner_brackets(draw)

    # Safe area ~1546x423 centered
    safe_w, safe_h = 1546, 423
    safe_l = (W - safe_w) // 2
    safe_t = (H - safe_h) // 2

    font_badge = find_font(28, bold=True)
    font_title = find_font(72, bold=True)
    font_sub = find_font(36, bold=False)
    font_foot = find_font(26, bold=False)
    font_chip = find_font(24, bold=False)

    # Badge pill
    badge = "IHK · KI & MASCHINELLES LERNEN"
    bw, bh = text_size(draw, badge, font_badge)
    pad_x, pad_y = 28, 14
    bx = safe_l + (safe_w - bw) // 2
    by = safe_t + 28
    pill = [bx - pad_x, by - pad_y, bx + bw + pad_x, by + bh + pad_y]
    # pill background
    pill_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(pill_layer)
    pd.rounded_rectangle(pill, radius=24, fill=(8, 30, 40, 180), outline=(*CYAN, 160), width=2)
    img = Image.alpha_composite(img, pill_layer)
    draw = ImageDraw.Draw(img)
    draw.text((bx, by), badge, font=font_badge, fill=CYAN)

    # Title
    title = "Kompletter Lehrstoff als Erklärvideos"
    tw, th = text_size(draw, title, font_title)
    tx = safe_l + (safe_w - tw) // 2
    ty = by + bh + 36
    # subtle glow under title
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.text((tx, ty), title, font=font_title, fill=(34, 211, 238, 40))
    glow = glow.filter(ImageFilter.GaussianBlur(12))
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)
    draw.text((tx, ty), title, font=font_title, fill=WHITE)

    # Subtitle
    sub = "Berufsspezialist & Bachelor Professional in KI und ML (IHK)"
    sw, sh = text_size(draw, sub, font_sub)
    sx = safe_l + (safe_w - sw) // 2
    sy = ty + th + 28
    draw.text((sx, sy), sub, font=font_sub, fill=MUTED)

    # Chips row
    chips = ["12 Module", "Praxisprojekte", "Prüfungsfit"]
    chip_font = font_chip
    gap = 18
    chip_widths = []
    for ch in chips:
        cw, chh = text_size(draw, ch, chip_font)
        chip_widths.append((cw + 36, chh + 20, ch, cw))
    total_cw = sum(w for w, _, _, _ in chip_widths) + gap * (len(chips) - 1)
    cx0 = safe_l + (safe_w - total_cw) // 2
    cy0 = sy + sh + 36
    chip_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cd = ImageDraw.Draw(chip_layer)
    x = cx0
    for ww, hh, label, tw_ in chip_widths:
        cd.rounded_rectangle([x, cy0, x + ww, cy0 + hh], radius=12, fill=(15, 40, 55, 160), outline=(34, 211, 238, 100), width=1)
        cd.text((x + (ww - tw_) // 2, cy0 + 8), label, font=chip_font, fill=(165, 243, 252, 230))
        x += ww + gap
    img = Image.alpha_composite(img, chip_layer)
    draw = ImageDraw.Draw(img)

    # Bottom left / right labels (outside tight safe area but on banner)
    foot_l = "Prüfungsorientiert · Praxisnah · Strukturiert"
    foot_r = "DQR 5 · DQR 6"
    draw.text((64, H - 64), foot_l, font=font_foot, fill=(100, 116, 139))
    rw, _ = text_size(draw, foot_r, font_foot)
    draw.text((W - 64 - rw, H - 64), foot_r, font=font_foot, fill=(100, 116, 139))

    # Small accent dots near feet
    draw.ellipse([48, H - 58, 56, H - 50], fill=CYAN)
    draw.ellipse([W - 48 - 8, H - 58, W - 48, H - 50], fill=TEAL)

    final = img.convert("RGB")
    final.save(OUT_MAIN, "PNG", optimize=True)
    final.save(OUT_SAFE, "PNG", optimize=True)
    return OUT_MAIN


# ---------- stdlib fallback (no PIL): simple bitmap font + PNG ----------

# 5x7 style glyphs (rows of 5 bits), including German umlauts
GLYPHS: dict[str, list[str]] = {}


def _g(rows: list[str]) -> list[str]:
    return rows


def _init_glyphs():
    # Each row is 5 chars of . or #
    data = {
        "A": ["###", "#.#", "###", "#.#", "#.#", "#.#", "#.#"],
        "B": ["##.", "#.#", "##.", "#.#", "#.#", "#.#", "##."],
        "C": [".##", "#..", "#..", "#..", "#..", "#..", ".##"],
        "D": ["##.", "#.#", "#.#", "#.#", "#.#", "#.#", "##."],
        "E": ["###", "#..", "#..", "##.", "#..", "#..", "###"],
        "F": ["###", "#..", "#..", "##.", "#..", "#..", "#.."],
        "G": [".##", "#..", "#..", "#.#", "#.#", "#.#", ".##"],
        "H": ["#.#", "#.#", "#.#", "###", "#.#", "#.#", "#.#"],
        "I": ["###", ".#.", ".#.", ".#.", ".#.", ".#.", "###"],
        "J": ["###", "..#", "..#", "..#", "..#", "#.#", ".#."],
        "K": ["#.#", "#.#", "#..", "##.", "#.#", "#.#", "#.#"],
        "L": ["#..", "#..", "#..", "#..", "#..", "#..", "###"],
        "M": ["#.#", "###", "###", "#.#", "#.#", "#.#", "#.#"],
        "N": ["#.#", "###", "###", "###", "#.#", "#.#", "#.#"],
        "O": [".#.", "#.#", "#.#", "#.#", "#.#", "#.#", ".#."],
        "P": ["##.", "#.#", "#.#", "##.", "#..", "#..", "#.."],
        "Q": [".#.", "#.#", "#.#", "#.#", "#.#", ".#.", "..#"],
        "R": ["##.", "#.#", "#.#", "##.", "#.#", "#.#", "#.#"],
        "S": [".##", "#..", "#..", ".#.", "..#", "..#", "##."],
        "T": ["###", ".#.", ".#.", ".#.", ".#.", ".#.", ".#."],
        "U": ["#.#", "#.#", "#.#", "#.#", "#.#", "#.#", "###"],
        "V": ["#.#", "#.#", "#.#", "#.#", "#.#", ".#.", ".#."],
        "W": ["#.#", "#.#", "#.#", "#.#", "###", "###", "#.#"],
        "X": ["#.#", "#.#", ".#.", ".#.", ".#.", "#.#", "#.#"],
        "Y": ["#.#", "#.#", "#.#", ".#.", ".#.", ".#.", ".#."],
        "Z": ["###", "..#", "..#", ".#.", "#..", "#..", "###"],
        "a": ["...", ".##", "..#", ".##", "#.#", "#.#", ".##"],
        "b": ["#..", "#..", "##.", "#.#", "#.#", "#.#", "##."],
        "c": ["...", ".##", "#..", "#..", "#..", "#..", ".##"],
        "d": ["..#", "..#", ".##", "#.#", "#.#", "#.#", ".##"],
        "e": ["...", ".#.", "#.#", "###", "#..", "#..", ".##"],
        "f": [".##", "#..", "#..", "##.", "#..", "#..", "#.."],
        "g": ["...", ".##", "#.#", "#.#", ".##", "..#", "##."],
        "h": ["#..", "#..", "##.", "#.#", "#.#", "#.#", "#.#"],
        "i": [".#.", "...", ".#.", ".#.", ".#.", ".#.", ".#."],
        "j": ["..#", "...", "..#", "..#", "..#", "#.#", ".#."],
        "k": ["#..", "#..", "#.#", "##.", "#.#", "#.#", "#.#"],
        "l": ["#.", "#.", "#.", "#.", "#.", "#.", ".#"],
        "m": ["...", "##.", "###", "###", "#.#", "#.#", "#.#"],
        "n": ["...", "##.", "#.#", "#.#", "#.#", "#.#", "#.#"],
        "o": ["...", ".#.", "#.#", "#.#", "#.#", "#.#", ".#."],
        "p": ["...", "##.", "#.#", "#.#", "##.", "#..", "#.."],
        "q": ["...", ".##", "#.#", "#.#", ".##", "..#", "..#"],
        "r": ["...", "#.#", "##.", "#..", "#..", "#..", "#.."],
        "s": ["...", ".##", "#..", ".#.", "..#", "..#", "##."],
        "t": [".#.", ".#.", "###", ".#.", ".#.", ".#.", "..#"],
        "u": ["...", "#.#", "#.#", "#.#", "#.#", "#.#", ".##"],
        "v": ["...", "#.#", "#.#", "#.#", "#.#", ".#.", ".#."],
        "w": ["...", "#.#", "#.#", "#.#", "###", "###", "#.#"],
        "x": ["...", "#.#", "#.#", ".#.", ".#.", "#.#", "#.#"],
        "y": ["...", "#.#", "#.#", "#.#", ".##", "..#", "##."],
        "z": ["...", "###", "..#", ".#.", ".#.", "#..", "###"],
        "0": [".#.", "#.#", "#.#", "#.#", "#.#", "#.#", ".#."],
        "1": [".#.", "##.", ".#.", ".#.", ".#.", ".#.", "###"],
        "2": ["##.", "..#", "..#", ".#.", "#..", "#..", "###"],
        "3": ["##.", "..#", "..#", "##.", "..#", "..#", "##."],
        "4": ["#.#", "#.#", "#.#", "###", "..#", "..#", "..#"],
        "5": ["###", "#..", "#..", "##.", "..#", "..#", "##."],
        "6": [".##", "#..", "#..", "##.", "#.#", "#.#", ".#."],
        "7": ["###", "..#", "..#", ".#.", ".#.", "#..", "#.."],
        "8": [".#.", "#.#", "#.#", ".#.", "#.#", "#.#", ".#."],
        "9": [".#.", "#.#", "#.#", ".##", "..#", "..#", "##."],
        " ": ["...", "...", "...", "...", "...", "...", "..."],
        ".": ["...", "...", "...", "...", "...", ".#.", ".#."],
        ",": ["...", "...", "...", "...", ".#.", ".#.", "#.."],
        "·": [".#.", "...", "...", "...", "...", "...", "..."],
        "&": [".#.", "#.#", ".#.", ".##", "#.#", "#.#", ".##"],
        "(": [".#.", "#..", "#..", "#..", "#..", "#..", ".#."],
        ")": [".#.", "..#", "..#", "..#", "..#", "..#", ".#."],
        "-": ["...", "...", "...", "###", "...", "...", "..."],
        "–": ["...", "...", "...", "###", "...", "...", "..."],
        "—": ["...", "...", "...", "###", "...", "...", "..."],
        ":": ["...", ".#.", ".#.", "...", ".#.", ".#.", "..."],
        "!": [".#.", ".#.", ".#.", ".#.", ".#.", "...", ".#."],
        "?": ["##.", "..#", "..#", ".#.", ".#.", "...", ".#."],
        "/": ["..#", "..#", ".#.", ".#.", ".#.", "#..", "#.."],
        "Ä": ["#.#", ".#.", "#.#", "###", "#.#", "#.#", "#.#"],
        "Ö": ["#.#", ".#.", "#.#", "#.#", "#.#", "#.#", ".#."],
        "Ü": ["#.#", "#.#", "...", "#.#", "#.#", "#.#", "###"],
        "ä": ["#.#", "...", ".##", "..#", ".##", "#.#", ".##"],
        "ö": ["#.#", "...", ".#.", "#.#", "#.#", "#.#", ".#."],
        "ü": ["#.#", "...", "#.#", "#.#", "#.#", "#.#", ".##"],
        "ß": ["##.", "#.#", "##.", "#.#", "#.#", "#.#", "#.."],
    }
    # Normalize to width 5
    for k, rows in data.items():
        norm = []
        for r in rows:
            r = r.replace("#", "1").replace(".", "0")
            if len(r) < 5:
                r = r + "0" * (5 - len(r))
            if len(r) > 5:
                r = r[:5]
            # convert back visually
            norm.append("".join("#" if c == "1" else "." for c in r))
        GLYPHS[k] = norm


_init_glyphs()


def png_write(path: Path, width: int, height: int, rgb_rows: bytes):
    """rgb_rows: raw RGB bytes length width*height*3, row-major."""
    def chunk(tag: bytes, data: bytes) -> bytes:
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    raw = bytearray()
    stride = width * 3
    for y in range(height):
        raw.append(0)  # filter None
        start = y * stride
        raw.extend(rgb_rows[start : start + stride])

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(bytes(raw), 9)) + chunk(b"IEND", b"")
    path.write_bytes(png)


def create_stdlib() -> Path:
    """Fallback renderer without Pillow — tech pixel look, full layout."""
    import array

    # Use array of ints RGB packed for speed then convert
    buf = bytearray(W * H * 3)

    def set_px(x, y, r, g, b, a=255):
        if x < 0 or y < 0 or x >= W or y >= H or a <= 0:
            return
        i = (y * W + x) * 3
        if a >= 255:
            buf[i] = r
            buf[i + 1] = g
            buf[i + 2] = b
        else:
            t = a / 255.0
            buf[i] = int(buf[i] * (1 - t) + r * t)
            buf[i + 1] = int(buf[i + 1] * (1 - t) + g * t)
            buf[i + 2] = int(buf[i + 2] * (1 - t) + b * t)

    def fill_bg():
        cx, cy = W * 0.55, H * 0.42
        for y in range(H):
            v = y / (H - 1)
            br = lerp(BG_TOP[0], BG_BOT[0], v)
            bg = lerp(BG_TOP[1], BG_BOT[1], v)
            bb = lerp(BG_TOP[2], BG_BOT[2], v)
            for x in range(W):
                dx = (x - cx) / W
                dy = (y - cy) / H
                r = math.sqrt(dx * dx + dy * dy * 1.2)
                glow = max(0.0, 1.0 - r * 1.8) ** 2 * 0.22
                dx2 = (x - W * 0.18) / W
                dy2 = (y - H * 0.55) / H
                r2 = math.sqrt(dx2 * dx2 + dy2 * dy2)
                glow2 = max(0.0, 1.0 - r2 * 3.5) ** 2 * 0.08
                g = min(1.0, glow + glow2)
                set_px(
                    x,
                    y,
                    lerp(br, 14, g * 0.5),
                    lerp(bg, 80, g),
                    lerp(bb, 110, g),
                )

    def hline(x0, x1, y, col, a=255):
        if y < 0 or y >= H:
            return
        if x0 > x1:
            x0, x1 = x1, x0
        for x in range(max(0, x0), min(W, x1 + 1)):
            set_px(x, y, *col, a)

    def vline(x, y0, y1, col, a=255):
        if x < 0 or x >= W:
            return
        if y0 > y1:
            y0, y1 = y1, y0
        for y in range(max(0, y0), min(H, y1 + 1)):
            set_px(x, y, *col, a)

    def rect(x0, y0, x1, y1, col, a=255):
        for y in range(max(0, y0), min(H, y1 + 1)):
            for x in range(max(0, x0), min(W, x1 + 1)):
                set_px(x, y, *col, a)

    def circle(cx, cy, rad, col, a=255, fill=True):
        r2 = rad * rad
        for y in range(int(cy - rad) - 1, int(cy + rad) + 2):
            for x in range(int(cx - rad) - 1, int(cx + rad) + 2):
                d = (x - cx) ** 2 + (y - cy) ** 2
                if fill and d <= r2:
                    set_px(x, y, *col, a)
                elif not fill and abs(d - r2) < rad:
                    set_px(x, y, *col, a)

    def line(x0, y0, x1, y1, col, a=255, width=1):
        dx = abs(x1 - x0)
        dy = abs(y1 - y0)
        sx = 1 if x0 < x1 else -1
        sy = 1 if y0 < y1 else -1
        err = dx - dy
        x, y = x0, y0
        while True:
            if width <= 1:
                set_px(x, y, *col, a)
            else:
                for oy in range(-(width // 2), width // 2 + 1):
                    for ox in range(-(width // 2), width // 2 + 1):
                        set_px(x + ox, y + oy, *col, a)
            if x == x1 and y == y1:
                break
            e2 = 2 * err
            if e2 > -dy:
                err -= dy
                x += sx
            if e2 < dx:
                err += dx
                y += sy

    def measure_text(text: str, scale: int, tracking: int = 1) -> int:
        w = 0
        for ch in text:
            g = GLYPHS.get(ch) or GLYPHS.get(ch.upper()) or GLYPHS[" "]
            gw = max(len(r) for r in g)
            w += (gw + tracking) * scale
        return w

    def draw_text(x, y, text, scale, col, a=255, tracking=1):
        cx = x
        for ch in text:
            g = GLYPHS.get(ch)
            if g is None:
                g = GLYPHS.get(ch.upper(), GLYPHS[" "])
            for row_i, row in enumerate(g):
                for col_i, cell in enumerate(row):
                    if cell == "#":
                        for sy in range(scale):
                            for sx in range(scale):
                                set_px(cx + col_i * scale + sx, y + row_i * scale + sy, *col, a)
            gw = max(len(r) for r in g)
            cx += (gw + tracking) * scale
        return cx

    print("Rendering background (stdlib)…")
    fill_bg()

    # grid
    print("Grid / decorations…")
    for x in range(0, W, 80):
        vline(x, 0, H - 1, (20, 40, 58), 50)
    for y in range(0, H, 80):
        hline(0, W - 1, y, (20, 40, 58), 50)

    # neural net left
    layers = [
        [(180, 420), (160, 560), (190, 700), (150, 820)],
        [(340, 380), (360, 520), (350, 660), (370, 780), (330, 900)],
        [(520, 460), (540, 600), (510, 740), (530, 860)],
    ]
    for li in range(len(layers) - 1):
        for a in layers[li]:
            for b in layers[li + 1]:
                line(a[0], a[1], b[0], b[1], CYAN, 40, 1)
    for layer in layers:
        for x, y in layer:
            circle(x, y, 6, CYAN, 200)
            circle(x, y, 10, CYAN, 50, fill=False)

    # bar chart right
    base_x, base_y = 2100, 920
    bars = [90, 140, 110, 180, 150, 220, 190]
    bw, gap = 28, 18
    for i, bh in enumerate(bars):
        x0 = base_x + i * (bw + gap)
        rect(x0, base_y - bh, x0 + bw, base_y, CYAN, 50 + i * 12)
        # outline
        hline(x0, x0 + bw, base_y - bh, CYAN, 140)
        vline(x0, base_y - bh, base_y, CYAN, 140)
        vline(x0 + bw, base_y - bh, base_y, CYAN, 140)
    hline(base_x - 10, base_x + len(bars) * (bw + gap), base_y, CYAN, 100)

    # corner brackets
    m, L, t = 48, 70, 3
    for thick in range(t):
        # TL
        hline(m, m + L, m + thick, CYAN, 180)
        vline(m + thick, m, m + L, CYAN, 180)
        # TR
        hline(W - m - L, W - m, m + thick, CYAN, 180)
        vline(W - m - thick, m, m + L, CYAN, 180)
        # BL
        hline(m, m + L, H - m - thick, CYAN, 180)
        vline(m + thick, H - m - L, H - m, CYAN, 180)
        # BR
        hline(W - m - L, W - m, H - m - thick, CYAN, 180)
        vline(W - m - thick, H - m - L, H - m, CYAN, 180)

    # bottom bar
    rect(0, H - 8, W - 1, H - 1, CYAN, 200)
    rect(0, H - 14, W // 3, H - 9, TEAL, 160)

    # Text layout in safe area
    safe_w, safe_h = 1546, 423
    safe_l = (W - safe_w) // 2
    safe_t = (H - safe_h) // 2

    badge = "IHK · KI & MASCHINELLES LERNEN"
    title = "Kompletter Lehrstoff als Erklärvideos"
    sub = "Berufsspezialist & Bachelor Professional in KI und ML (IHK)"
    foot_l = "Prüfungsorientiert · Praxisnah · Strukturiert"
    foot_r = "DQR 5 · DQR 6"
    chips = ["12 Module", "Praxisprojekte", "Prüfungsfit"]

    # scales chosen for readability at 2560
    s_badge, s_title, s_sub, s_foot, s_chip = 4, 8, 4, 3, 3

    print("Text…")
    # badge pill
    bw = measure_text(badge, s_badge, 2)
    bh = 7 * s_badge
    bx = safe_l + (safe_w - bw) // 2
    by = safe_t + 40
    pad_x, pad_y = 28, 16
    rect(bx - pad_x, by - pad_y, bx + bw + pad_x, by + bh + pad_y, (8, 30, 40), 200)
    # pill outline
    hline(bx - pad_x, bx + bw + pad_x, by - pad_y, CYAN, 160)
    hline(bx - pad_x, bx + bw + pad_x, by + bh + pad_y, CYAN, 160)
    vline(bx - pad_x, by - pad_y, by + bh + pad_y, CYAN, 160)
    vline(bx + bw + pad_x, by - pad_y, by + bh + pad_y, CYAN, 160)
    draw_text(bx, by, badge, s_badge, CYAN, 255, 2)

    # title
    tw = measure_text(title, s_title, 2)
    th = 7 * s_title
    tx = safe_l + (safe_w - tw) // 2
    ty = by + bh + 50
    # soft shadow
    draw_text(tx + 3, ty + 3, title, s_title, (0, 40, 50), 100, 2)
    draw_text(tx, ty, title, s_title, WHITE, 255, 2)

    # subtitle
    sw = measure_text(sub, s_sub, 2)
    sh = 7 * s_sub
    sx = safe_l + (safe_w - sw) // 2
    sy = ty + th + 36
    draw_text(sx, sy, sub, s_sub, MUTED, 255, 2)

    # chips
    chip_h = 7 * s_chip + 20
    chip_gap = 20
    chip_data = []
    for c in chips:
        cw = measure_text(c, s_chip, 2) + 36
        chip_data.append((c, cw))
    total = sum(cw for _, cw in chip_data) + chip_gap * (len(chips) - 1)
    cx0 = safe_l + (safe_w - total) // 2
    cy0 = sy + sh + 40
    x = cx0
    for label, cw in chip_data:
        rect(x, cy0, x + cw, cy0 + chip_h, (15, 40, 55), 180)
        hline(x, x + cw, cy0, CYAN, 100)
        hline(x, x + cw, cy0 + chip_h, CYAN, 100)
        vline(x, cy0, cy0 + chip_h, CYAN, 100)
        vline(x + cw, cy0, cy0 + chip_h, CYAN, 100)
        lw = measure_text(label, s_chip, 2)
        draw_text(x + (cw - lw) // 2, cy0 + 10, label, s_chip, (165, 243, 252), 230, 2)
        x += cw + chip_gap

    # footers
    draw_text(64, H - 64, foot_l, s_foot, (100, 116, 139), 255, 2)
    frw = measure_text(foot_r, s_foot, 2)
    draw_text(W - 64 - frw, H - 64, foot_r, s_foot, (100, 116, 139), 255, 2)
    circle(52, H - 54, 4, CYAN, 255)
    circle(W - 52, H - 54, 4, TEAL, 255)

    print("Writing PNG…")
    png_write(OUT_MAIN, W, H, bytes(buf))
    OUT_SAFE.write_bytes(OUT_MAIN.read_bytes())
    return OUT_MAIN


def main():
    if HAS_PIL:
        print("Using Pillow renderer")
        out = create_with_pil()
    else:
        print("Pillow not found — using stdlib renderer")
        out = create_stdlib()
    size = out.stat().st_size
    print(f"Wrote: {out}")
    print(f"Also:  {OUT_SAFE}")
    print(f"Size:  {size} bytes ({size / (1024 * 1024):.3f} MB)")
    print(f"Dims:  {W}x{H}")
    assert size <= 6 * 1024 * 1024, "File exceeds 6MB"
    assert out.exists() and OUT_SAFE.exists()


if __name__ == "__main__":
    main()
