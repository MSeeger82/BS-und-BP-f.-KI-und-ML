"""Wandelt die Lern-Animationen (GIF) in Standbilder fuer das Buch: der Endzustand (letztes Bild) gilt als Abbildung."""
import sys
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent / "kurs"
out = Path(__file__).resolve().parent / "img"
n = 0
for gif in sorted(root.glob("modul-*/gifs/*.gif")):
    mod = gif.parent.parent.name
    dest = out / mod
    dest.mkdir(parents=True, exist_ok=True)
    target = dest / (gif.stem + ".png")
    if target.exists() and target.stat().st_mtime >= gif.stat().st_mtime:
        continue
    with Image.open(gif) as im:
        im.seek(im.n_frames - 1)
        frame = im.convert("RGB")
        # Standbild auf halbe Pixelzahl begrenzen (Dateigroesse)
        if frame.width > 960:
            frame = frame.resize((960, round(frame.height * 960 / frame.width)))
        frame.save(target, optimize=True)
    n += 1
print(f"{n} Standbilder erzeugt")
