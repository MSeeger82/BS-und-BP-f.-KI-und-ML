import sys
from pathlib import Path
from PIL import Image
d = Path(sys.argv[1])
names = sorted(d.glob("*.gif"))
tiles = []
for n in names:
    im = Image.open(n)
    cnt = im.n_frames
    for idx in (cnt // 2, cnt - 1):
        im.seek(idx); tiles.append(im.convert("RGB").copy())
w, h = tiles[0].size
sheet = Image.new("RGB", (w * 2, h * len(names)), "white")
for i, t in enumerate(tiles):
    sheet.paste(t, ((i % 2) * w, (i // 2) * h))
sheet.save(sys.argv[2])
