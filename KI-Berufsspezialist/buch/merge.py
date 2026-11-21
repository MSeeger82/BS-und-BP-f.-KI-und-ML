"""Setzt Titelblatt und Buchkörper zusammen und übernimmt die Lesezeichen des Körpers."""
import sys
from pypdf import PdfReader, PdfWriter

cover, body, out = sys.argv[1:4]
w = PdfWriter()
w.append(PdfReader(cover))
off = len(w.pages)
w.append(PdfReader(body), import_outline=True)
w.add_metadata({"/Title": "Berufsspezialist/in Künstliche Intelligenz und Maschinelles Lernen – Der Lehrfaden für Einsteiger", "/Author": "Michael Seeger"})
w.write(out)
print(len(w.pages), "Seiten")
