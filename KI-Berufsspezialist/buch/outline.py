"""Liest die PDF-Lesezeichen (Überschriften) und gibt {normalisierter Titel: Seite} als JSON aus."""
import json, re, sys
from pypdf import PdfReader

r = PdfReader(sys.argv[1])
res = {}

def norm(s):
    return re.sub(r"[^a-z0-9äöüß]", "", s.lower())

def walk(items):
    for it in items:
        if isinstance(it, list):
            walk(it)
        else:
            key = norm(it.title)
            if key and key not in res:
                res[key] = r.get_destination_page_number(it) + 1

walk(r.outline)
sys.stdout.reconfigure(encoding="utf-8")
print(json.dumps(res, ensure_ascii=False))
