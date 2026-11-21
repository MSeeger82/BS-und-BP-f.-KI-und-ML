"""Prüft eine erzeugte Modulseite: Skripte (per node --check), Quiz-JSON, Übungs-Spezifikation, Bildverweise.

Aufruf: python tools/pruefe_seite.py 3
"""
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
nr = sys.argv[1]
page = ROOT / "kurs" / f"modul-{nr}" / f"ki-kurs-modul-{nr}.html"
html = page.read_text(encoding="utf-8")
fehler = 0

for i, m in enumerate(re.finditer(r"<script>(.*?)</script>", html, re.S), 1):
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as f:
        f.write(m.group(1))
    r = subprocess.run(["node", "--check", f.name], capture_output=True, text=True)
    if r.returncode:
        fehler += 1
        print(f"Skript {i}: FEHLER\n{r.stderr[:800]}")
    Path(f.name).unlink()

qm = re.search(r'^<script type="application/json" id="quiz-data">(.*?)</script>', html, re.S | re.M)
if qm:
    q = json.loads(qm.group(1))
    for j, item in enumerate(q, 1):
        if not (len(item) == 4 and 0 <= item[2] < len(item[1])):
            fehler += 1
            print(f"Quizfrage {j} fehlerhaft")
    print(f"Quiz: {len(q)} Fragen")

tasks = len(re.findall(r'<div class="task">', html))
specs = set(re.findall(r"\ba(\d+): \{ teile:", html))
print(f"Aufgaben im Text: {tasks}, Spezifikationen: {len(specs)}")
if tasks != len(specs):
    fehler += 1
    print("Anzahl Aufgaben und Spezifikationen stimmt nicht überein")

for src in set(re.findall(r'src="(gifs/[^"]+)"', html)):
    if not (page.parent / src).exists():
        fehler += 1
        print(f"Bild fehlt: {src}")
lessons = len(re.findall(r'<section class="lesson" id="l\d+"', html))
print(f"Lektionen: {lessons}")
print("OK" if not fehler else f"{fehler} Fehler")
sys.exit(1 if fehler else 0)
