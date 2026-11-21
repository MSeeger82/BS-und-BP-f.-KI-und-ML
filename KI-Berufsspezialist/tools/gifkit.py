"""Gemeinsame Helfer für die GIF-Skripte ab Modul 3."""
import math
from pathlib import Path
from PIL import Image

from gifs_modul1 import (W, H, S, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L,  # noqa: F401
                         VIOLET, VIOLET_L, GREY, canvas, p, text, finish, ease, mix, arrow)

WHITE = (255, 255, 255)
ROOT = Path(__file__).resolve().parent.parent


def out_dir(nr):
    d = ROOT / "kurs" / f"modul-{nr}" / "gifs"
    d.mkdir(parents=True, exist_ok=True)
    return d


def save(frames, path, durations):
    if isinstance(durations, int):
        durations = [durations] * len(frames)
    pal = [f.convert("P", palette=Image.ADAPTIVE, colors=128) for f in frames]
    pal[0].save(path, save_all=True, append_images=pal[1:], duration=durations, loop=0, optimize=True, disposal=1)
    print(Path(path).name, len(frames), "Frames")


def de(x, nd=1):
    return f"{x:.{nd}f}".replace(".", ",")


def cell(d, x, y, w, h, txt, fill=WHITE, col=INK, bold=False, size=12, outline=GRID):
    d.rectangle(p(x, y, x + w, y + h), fill=fill, outline=outline, width=S)
    text(d, (x + w / 2, y + h / 2), txt, size, bold, col, "mm")


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
