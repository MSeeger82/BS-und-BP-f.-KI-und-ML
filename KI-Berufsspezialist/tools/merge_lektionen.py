"""Setzt neu geschriebene Lektionen in eine Modulseite ein.

Aufruf:  python tools/merge_lektionen.py N

Liest alle Dateien kurs/modul-N/neu/*.html. Jede Datei enthält eine oder mehrere
<section class="lesson" id="lK" ...>...</section>. Jede dieser Sektionen ersetzt die
gleichnamige Sektion (gleiche id) in kurs/modul-N/quelle.html, falls vorhanden,
sonst in kurs/modul-N/ki-kurs-modul-N.html (Modul 1 und 2 haben keine Quelle).
Danach für Module mit Quelle: python tools/build_kurs.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
nr = int(sys.argv[1])
mod = ROOT / "kurs" / f"modul-{nr}"
ziel = mod / "quelle.html"
if not ziel.exists():
    ziel = mod / f"ki-kurs-modul-{nr}.html"
text = ziel.read_text(encoding="utf-8")

SEC = re.compile(r'<section class="lesson" id="([a-z0-9]+)"[^>]*>.*?</section>', re.S)
n = 0
for f in sorted((mod / "neu").glob("*.html")):
    for m in SEC.finditer(f.read_text(encoding="utf-8")):
        lid = m.group(1)
        pat = re.compile(r'<section class="lesson" id="' + re.escape(lid) + r'"[^>]*>.*?</section>', re.S)
        if not pat.search(text):
            print(f"{f.name}: Sektion {lid} nicht im Ziel gefunden")
            continue
        text = pat.sub(lambda _m: m.group(0), text, count=1)
        n += 1
# Ergänzungen: Dateien *-extra.html mit Blöcken <!--EXTRA lK--> ... <!--/EXTRA-->.
# Der Inhalt wird in Lektion lK vor dem Merksatz-Kasten eingefügt (nach dem Ersetzen der Sektionen, also wiederholbar).
EXTRA = re.compile(r'<!--EXTRA (l\d+)-->(.*?)<!--/EXTRA-->', re.S)
e = 0
for f in sorted((mod / "neu").glob("*-extra.html")):
    for m in EXTRA.finditer(f.read_text(encoding="utf-8")):
        lid, block = m.group(1), m.group(2).strip("\n")
        pat = re.compile(r'(<section class="lesson" id="' + re.escape(lid) + r'"[^>]*>.*?)(\s*<div class="box merk">)', re.S)
        if not pat.search(text):
            print(f"{f.name}: Merksatz in {lid} nicht gefunden")
            continue
        text = pat.sub(lambda _m: _m.group(1) + "\n" + block + _m.group(2), text, count=1)
        e += 1
ziel.write_text(text, encoding="utf-8")
print(f"{ziel.name}: {n} Lektionen ersetzt, {e} Ergänzungen eingefügt")
