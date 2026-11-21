"""Gemeinsame Bausteine für die Erklär-GIFs des Bachelor-Kurses (Stil wie Kurs 1: heller Bildgrund, Kursfarben).

Aufruf eines Modulskripts:  python tools/gifs_modulN.py
Die GIFs landen in kurs/modul-N/gifs/.
"""
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent

W, H = 640, 380
S = 2  # Supersampling
BG = (250, 251, 250)
WHITE = (255, 255, 255)
INK = (28, 37, 48)
MUTED = (110, 120, 130)
GRID = (226, 231, 229)
TEAL = (15, 118, 110)
TEAL_L = (204, 236, 231)
AMBER = (217, 119, 6)
AMBER_L = (253, 233, 200)
CORAL = (214, 69, 80)
CORAL_L = (250, 214, 217)
VIOLET = (99, 82, 183)
VIOLET_L = (226, 221, 248)
SKY = (14, 116, 178)
SKY_L = (214, 234, 248)
GREY = (160, 168, 175)

FONT = "C:/Windows/Fonts/segoeui.ttf"
FONT_B = "C:/Windows/Fonts/segoeuib.ttf"
_cache = {}


def font(size, bold=False):
    k = (size, bold)
    if k not in _cache:
        _cache[k] = ImageFont.truetype(FONT_B if bold else FONT, int(size * S))
    return _cache[k]


def out_dir(nr):
    d = ROOT / "kurs" / f"modul-{nr}" / "gifs"
    d.mkdir(parents=True, exist_ok=True)
    return d


def canvas():
    img = Image.new("RGB", (W * S, H * S), BG)
    return img, ImageDraw.Draw(img)


def p(*v):
    return tuple(int(round(x * S)) for x in v)


def text(d, xy, s, size=16, bold=False, fill=INK, anchor="la"):
    d.text(p(*xy), s, font=font(size, bold), fill=fill, anchor=anchor)


def finish(img):
    return img.resize((W, H), Image.LANCZOS)


def save(frames, path, durations):
    if isinstance(durations, int):
        durations = [durations] * len(frames)
    pal = [f.convert("P", palette=Image.ADAPTIVE, colors=128) for f in frames]
    pal[0].save(path, save_all=True, append_images=pal[1:], duration=durations, loop=0, optimize=True, disposal=1)
    print(Path(path).name, len(frames), "Frames")


def ease(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def mix(c1, c2, t):
    t = max(0.0, min(1.0, t))
    return tuple(int(a + (b - a) * t) for a, b in zip(c1, c2))


def caption(d, s, t=1.0):
    text(d, (W / 2, H - 22), s, 15, False, mix(BG, MUTED, t), "mm")


def title(d, s, t=1.0):
    text(d, (24, 22), s, 17, True, mix(BG, INK, t))


def box(d, x, y, w, h, label, col=TEAL, colL=TEAL_L, sub=None, t=1.0, size=15):
    d.rounded_rectangle(p(x, y, x + w, y + h), radius=10 * S, fill=mix(BG, colL, t), outline=mix(BG, col, t), width=2 * S)
    if sub:
        text(d, (x + w / 2, y + h / 2 - 9), label, size, True, mix(BG, INK, t), "mm")
        text(d, (x + w / 2, y + h / 2 + 11), sub, 11, False, mix(BG, MUTED, t), "mm")
    else:
        text(d, (x + w / 2, y + h / 2), label, size, True, mix(BG, INK, t), "mm")


def arrow(d, x1, y1, x2, y2, col=GREY, width=2):
    d.line(p(x1, y1, x2, y2), fill=col, width=width * S)
    a = math.atan2(y2 - y1, x2 - x1)
    pts = [(x2, y2), (x2 - 10 * math.cos(a - 0.45), y2 - 10 * math.sin(a - 0.45)),
           (x2 - 10 * math.cos(a + 0.45), y2 - 10 * math.sin(a + 0.45))]
    d.polygon([p(*q) for q in pts], fill=col)


def cell(d, x, y, w, h, txt, fill=WHITE, col=INK, bold=False, size=12, outline=GRID):
    d.rectangle(p(x, y, x + w, y + h), fill=fill, outline=outline, width=S)
    text(d, (x + w / 2, y + h / 2), txt, size, bold, col, "mm")


def de(x, nd=1):
    return f"{x:.{nd}f}".replace(".", ",")


def wrap_text(d, x, y, s, width_chars, size=13, bold=False, fill=MUTED, lh=20):
    words, line = s.split(" "), ""
    for w_ in words:
        if len(line) + len(w_) > width_chars and line:
            text(d, (x, y), line.strip(), size, bold, fill)
            y += lh
            line = ""
        line += w_ + " "
    if line.strip():
        text(d, (x, y), line.strip(), size, bold, fill)
        y += lh
    return y


def axes(d, x0, y0, x1, y1, xlabel="", ylabel="", t=1.0):
    """Koordinatenachsen von (x0, y1) unten links bis (x1, y0) oben rechts."""
    c = mix(BG, GREY, t)
    arrow(d, x0, y1, x1, y1, c)
    arrow(d, x0, y1, x0, y0, c)
    if xlabel:
        text(d, (x1, y1 + 14), xlabel, 12, False, mix(BG, MUTED, t), "rm")
    if ylabel:
        text(d, (x0 - 6, y0 - 4), ylabel, 12, False, mix(BG, MUTED, t), "rb")


def hold(frames, durs, n_ms):
    """Letzten Frame länger stehen lassen."""
    if durs:
        durs[-1] = n_ms


class Anim:
    """Sammelt Frames und Dauern: a.frame(img, ms)."""

    def __init__(self):
        self.frames, self.durs = [], []

    def frame(self, img, ms=70):
        self.frames.append(finish(img))
        self.durs.append(ms)

    def hold(self, ms):
        if self.durs:
            self.durs[-1] = ms

    def save(self, nr, name):
        save(self.frames, out_dir(nr) / name, self.durs)
