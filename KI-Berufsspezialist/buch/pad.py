"""Druck-Innenteil: gerade Seitenzahl herstellen (KDP verlangt keine, aber sauberer Druckbogen)."""
import sys
from pypdf import PdfReader, PdfWriter
src, out = sys.argv[1:3]
r = PdfReader(src); w = PdfWriter(); w.append(r, import_outline=True)
if len(w.pages) % 2:
    w.add_blank_page(width=r.pages[0].mediabox.width, height=r.pages[0].mediabox.height)
w.add_metadata({"/Title": "Berufsspezialist/in Künstliche Intelligenz und Maschinelles Lernen", "/Author": "Michael Seeger"})
w.write(out); print(len(w.pages), "Seiten Innenteil")
