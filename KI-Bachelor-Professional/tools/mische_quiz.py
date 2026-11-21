"""Mischt die Antwortoptionen im Quiz eines Moduls reproduzierbar, damit die richtige Antwort nicht immer an derselben Stelle steht.

Aufruf: python tools/mische_quiz.py 1
Bearbeitet die Teildatei mit <script type="application/json" id="quiz-data"> in kurs/modul-N/teile/.
Ist das Quiz schon gemischt (richtige Antworten über alle Positionen verteilt), passiert nichts.
"""
import json
import random
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
nr = sys.argv[1]
RE = re.compile(r'(<script type="application/json" id="quiz-data">)(.*?)(</script>)', re.S)

for f in sorted((ROOT / "kurs" / f"modul-{nr}" / "teile").glob("*.html")):
    src = f.read_text(encoding="utf-8")
    m = RE.search(src)
    if not m:
        continue
    q = json.loads(m.group(2))
    pos = Counter(item[2] for item in q)
    if len(pos) >= 3 and max(pos.values()) <= len(q) * 0.45:
        print(f"{f.name}: schon gemischt {dict(pos)}")
        break
    orig = [(item[1][:], item[1][item[2]]) for item in q]
    for versuch in range(200):  # so lange mischen, bis keine Position mehr als 40 % hat
        rnd = random.Random(f"modul-{nr}-{versuch}")
        for item, (opts0, right) in zip(q, orig):
            opts = opts0[:]
            rnd.shuffle(opts)
            item[1], item[2] = opts, opts.index(right)
        if max(Counter(item[2] for item in q).values()) <= len(q) * 0.4:
            break
    out = "[\n" + ",\n".join(" " + json.dumps(item, ensure_ascii=False) for item in q) + "\n]"
    f.write_text(src[: m.start(2)] + "\n" + out + "\n" + src[m.end(2):], encoding="utf-8")
    print(f"{f.name}: gemischt {dict(Counter(item[2] for item in q))}")
    break
