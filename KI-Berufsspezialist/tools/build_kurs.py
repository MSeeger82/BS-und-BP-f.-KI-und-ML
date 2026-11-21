"""Baut die Kursseiten.

1. Für jedes Modul mit kurs/modul-N/quelle.html wird ki-kurs-modul-N.html aus
   kurs/shared/template.html erzeugt. quelle.html beginnt mit
   <!--META {"nr": 3, "titel": "...", "lektionen": 16, "pass": 14}-->
   danach folgt der Seiteninhalt; nach der Zeile <!--SCRIPTS--> stehen die modulspezifischen
   Skripte (window.UEBUNGEN, Rechner).
2. In alle Modulseiten wird die Übungs-Engine (kurs/shared/uebungen.css + .js)
   zwischen den BEGIN/END-Markierungen eingefügt.

Aufruf:  python tools/build_kurs.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SHARED = ROOT / "kurs" / "shared"
css = (SHARED / "uebungen.css").read_text(encoding="utf-8").strip()
js = (SHARED / "uebungen.js").read_text(encoding="utf-8").strip()
template = (SHARED / "template.html").read_text(encoding="utf-8")

META_RE = re.compile(r"^\s*<!--META\s*(\{.*?\})\s*-->", re.S)
CSS_RE = re.compile(r"(/\* BEGIN uebungen-css \*/)(.*?)(/\* END uebungen-css \*/)", re.S)
JS_RE = re.compile(r"(<!-- BEGIN uebungen-engine -->)(.*?)(<!-- END uebungen-engine -->)", re.S)

# 1. Seiten aus Quelle erzeugen
for src in sorted(ROOT.glob("kurs/modul-*/quelle.html")):
    raw = src.read_text(encoding="utf-8")
    m = META_RE.match(raw)
    if not m:
        print(f"{src}: META fehlt – übersprungen")
        continue
    meta = json.loads(m.group(1))
    body = raw[m.end():]
    content, _, scripts = body.partition("<!--SCRIPTS-->")
    page = (template.replace("{{NR}}", str(meta["nr"]))
            .replace("{{TITEL}}", meta["titel"])
            .replace("{{LEKTIONEN}}", str(meta["lektionen"]))
            .replace("{{PASS}}", str(meta["pass"]))
            .replace("{{CONTENT}}", content.strip("\n"))
            .replace("{{SCRIPTS}}", scripts.strip("\n")))
    out = src.parent / f"ki-kurs-modul-{meta['nr']}.html"
    out.write_text(page, encoding="utf-8")
    print(f"{out.name}: aus Quelle erzeugt")

# 2. Engine einsetzen
for page in sorted(ROOT.glob("kurs/modul-*/ki-kurs-modul-*.html")):
    text = page.read_text(encoding="utf-8")
    new, n1 = CSS_RE.subn(lambda m: m.group(1) + "\n" + css + "\n" + m.group(3), text)
    new, n2 = JS_RE.subn(lambda m: m.group(1) + "\n<script>\n" + js + "\n</script>\n" + m.group(3), new)
    if n1 != 1 or n2 != 1:
        print(f"{page.name}: Markierungen fehlen (css={n1}, js={n2}) – übersprungen")
        continue
    if new != text:
        page.write_text(new, encoding="utf-8")
        print(f"{page.name}: Engine eingesetzt")
    else:
        print(f"{page.name}: unverändert")
