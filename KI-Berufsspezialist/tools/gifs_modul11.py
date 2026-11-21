"""GIFs für Modul 11 (Wirtschaftlichkeit, Projektmanagement, Kommunikation, Transferarbeit)."""
import math
import random
from gifkit import *  # noqa: F401,F403

OUT = out_dir(11)


# 1 Nutzen-Machbarkeits-Matrix ------------------------------------------------------
def gif_matrix():
    cases = [("Rechnungserfassung", 8.2, 8.0), ("Absatzprognose", 7.8, 6.2), ("Chatbot Kundenservice", 5.0, 7.6),
             ("Predictive Maintenance", 8.8, 3.4), ("Bildprüfung Endkontrolle", 7.2, 5.2), ("Social-Media-Texte", 2.8, 8.4),
             ("Vollautomatische Produktion", 9.2, 1.6), ("Logo-Generator", 1.8, 3.0)]
    x0, y0, x1, y1 = 60, 66, 400, 330
    X = lambda v: x0 + v / 10 * (x1 - x0)
    Y = lambda v: y1 - v / 10 * (y1 - y0)
    frames, durs = [], []
    for k in range(len(cases) + 1):
        for f in range(10):
            t = ease(f / 9)
            img, d = canvas()
            text(d, (24, 24), "Nutzen-Machbarkeits-Matrix: Welche Ideen zuerst?", 15, True, INK)
            mx, my = X(5), Y(5)
            d.rectangle(p(mx, y0, x1, my), fill=TEAL_L)
            d.rectangle(p(mx, my, x1, y1), fill=AMBER_L)
            d.rectangle(p(x0, y0, mx, my), fill=VIOLET_L)
            d.rectangle(p(x0, my, mx, y1), fill=(238, 238, 238))
            text(d, (X(9.6), Y(9.6)), "Quick Wins", 12, True, TEAL, "rm")
            text(d, (X(9.6), Y(0.4)), "Strategische Projekte", 12, True, AMBER, "rm")
            text(d, (X(0.4), Y(9.6)), "Füllprojekte", 12, True, VIOLET, "lm")
            text(d, (X(0.4), Y(0.4)), "Zurückstellen", 12, True, MUTED, "lm")
            text(d, ((x0 + x1) / 2, y1 + 16), "Nutzen →", 11, False, MUTED, "mm")
            text(d, (x0 - 8, y0 - 10), "↑ Machbarkeit (Daten, Aufwand, Risiko)", 11, False, MUTED, "lm")
            for i, (name, n, m) in enumerate(cases[:k + 1]):
                if i == len(cases):
                    break
                a = 1 if i < k else t
                if a < 0.05:
                    continue
                d.ellipse(p(X(n) - 7, Y(m) - 7, X(n) + 7, Y(m) + 7), fill=mix(BG, INK, a))
            tx = 420
            if k < len(cases):
                name, n, m = cases[k]
                text(d, (tx, 80), name, 13, True, INK)
                text(d, (tx, 104), f"Nutzen {de(n, 1)} · Machbarkeit {de(m, 1)}", 11, False, MUTED)
                quad = "Quick Win" if n >= 5 and m >= 5 else ("Strategisch" if n >= 5 else ("Füllprojekt" if m >= 5 else "Zurückstellen"))
                text(d, (tx, 130), "→ " + quad, 13, True, TEAL if quad == "Quick Win" else (AMBER if quad == "Strategisch" else MUTED))
            else:
                text(d, (tx, 80), "Empfehlung:", 13, True, INK)
                for j, s in enumerate(["1. Quick Wins starten", "   (Rechnungserfassung)", "2. Strategische Projekte", "   vorbereiten: Daten sammeln", "3. Füllprojekte nebenbei", "4. Rest zurückstellen"]):
                    text(d, (tx, 108 + j * 20), s, 12, False, INK)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1000
    durs[-1] = 3600
    save(frames, OUT / "nutzen-machbarkeit.gif", durs)


# 2 Kosten-Eisberg ------------------------------------------------------------------
def gif_eisberg():
    sichtbar = ["Lizenz / API-Kosten", "Hardware oder Cloud"]
    versteckt = ["Datenaufbereitung (oft größter Posten)", "Integration in bestehende Systeme", "Schulung und Change Management",
                 "Betrieb, Monitoring, Nachtraining", "Rechtsprüfung, Datenschutz, Dokumentation", "Interne Arbeitszeit der Fachabteilung"]
    frames, durs = [], []
    water = 140
    for k in range(len(versteckt) + 3):
        for f in range(10):
            t = ease(f / 9)
            img, d = canvas()
            text(d, (24, 26), "Total Cost of Ownership: der Kosten-Eisberg", 15, True, INK)
            d.rectangle(p(0, water, W, H), fill=(214, 232, 240))
            d.line(p(0, water, W, water), fill=(120, 170, 200), width=2 * S)
            d.polygon([p(150, 60), p(110, water), p(200, water)], fill=WHITE, outline=GREY)
            d.polygon([p(110, water), p(200, water), p(270, 250), p(190, 350), p(70, 340), p(40, 230)], fill=(236, 244, 248), outline=GREY)
            text(d, (260, 70), "sichtbar:", 11, True, MUTED)
            for i, s in enumerate(sichtbar):
                a = 1 if k > 0 else t
                text(d, (260, 92 + i * 20), "• " + s, 12, True, mix(BG, INK, a))
            text(d, (300, water + 14), "unter der Oberfläche:", 11, True, MUTED)
            for i, s in enumerate(versteckt):
                if i + 2 > k + 1:
                    continue
                a = 1 if i + 2 < k + 1 else t
                text(d, (300, water + 36 + i * 24), "• " + s, 12, False, mix(BG, INK, a))
            if k >= len(versteckt) + 2:
                text(d, (24, 356), "Faustregel: Lizenzkosten sind oft nur ein kleiner Teil der Gesamtkosten.", 12, True, CORAL)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 900
    durs[-1] = 3600
    save(frames, OUT / "kosten-eisberg.gif", durs)


# 3 Amortisation -----------------------------------------------------------------------
def gif_amortisation():
    invest, laufend, nutzen = 120000, 2000, 8000
    months = 36
    cum = [-invest + (nutzen - laufend) * m for m in range(months + 1)]
    x0, y0, x1, y1 = 70, 60, 600, 320
    lo, hi = -130000, 100000
    X = lambda m: x0 + m / months * (x1 - x0)
    Y = lambda v: y1 - (v - lo) / (hi - lo) * (y1 - y0)
    frames, durs = [], []
    for k in range(1, months + 2):
        kk = min(k, months)
        img, d = canvas()
        text(d, (24, 26), "Amortisation: Ab wann hat sich die Investition bezahlt gemacht?", 15, True, INK)
        for v in (-100000, -50000, 0, 50000, 100000):
            d.line(p(x0, Y(v), x1, Y(v)), fill=GREY if v == 0 else GRID, width=(2 if v == 0 else 1) * S)
            text(d, (x0 - 6, Y(v)), f"{v // 1000:+d} T€".replace("+0", "0"), 10, False, MUTED, "rm")
        for m in range(kk + 1):
            v = cum[m]
            col = CORAL if v < 0 else TEAL
            bw = (x1 - x0) / months * 0.7
            d.rectangle(p(X(m) - bw / 2, min(Y(0), Y(v)), X(m) + bw / 2, max(Y(0), Y(v))), fill=col)
        for m in (0, 12, 24, 36):
            text(d, (X(m), y1 + 14), f"Monat {m}", 10, False, MUTED, "mm")
        if kk >= 20:
            d.line(p(X(20), y0, X(20), y1), fill=AMBER, width=2 * S)
            text(d, (X(20) + 6, y0 + 10), "Monat 20: Amortisation", 12, True, AMBER, "lm")
        text(d, (24, 344), "Investition 120.000 € · laufend 2.000 €/Monat · Ersparnis 8.000 €/Monat → netto 6.000 €/Monat", 11, False, INK)
        frames.append(finish(img)); durs.append(110)
    durs[-1] = 3400
    save(frames, OUT / "amortisation.gif", durs)


# 4 Abzinsung / Kapitalwert ------------------------------------------------------------
def gif_abzinsung():
    flows = [40000, 40000, 40000]
    r = 0.08
    pv = [c / (1 + r) ** (i + 1) for i, c in enumerate(flows)]
    frames, durs = [], []
    base = 300
    scale = 220 / 100000
    for phase in range(4):
        for f in range(16):
            t = ease(f / 15)
            img, d = canvas()
            text(d, (24, 26), "Kapitalwert: Geld in der Zukunft ist heute weniger wert", 15, True, INK)
            # Investition
            hI = 100000 * scale
            d.rectangle(p(50, base - hI, 110, base), fill=CORAL)
            text(d, (80, base - hI - 12), "−100.000", 11, True, CORAL, "mm")
            text(d, (80, base + 14), "heute", 11, False, MUTED, "mm")
            for i, c in enumerate(flows):
                x = 170 + i * 110
                h = c * scale
                d.rectangle(p(x, base - h, x + 50, base), outline=TEAL, width=2 * S)
                text(d, (x + 25, base + 14), f"Jahr {i + 1}", 11, False, MUTED, "mm")
                text(d, (x + 25, base - h - 12), "40.000", 10, False, MUTED, "mm")
                if phase >= 1:
                    a = 1 if phase > 1 else t
                    hp = (c + (pv[i] - c) * a) * scale
                    d.rectangle(p(x + 8, base - hp, x + 42, base), fill=TEAL)
                    if phase >= 2:
                        text(d, (x + 25, base - hp + 12), f"{round(pv[i]):,}".replace(",", "."), 10, True, WHITE, "mm")
            d.line(p(40, base, 520, base), fill=GREY, width=S)
            tx = 520
            text(d, (tx, 70), "Zins 8 %", 13, True, INK)
            if phase >= 1:
                text(d, (tx, 100), "Abzinsen:", 11, False, MUTED)
                text(d, (tx, 118), "Wert / 1,08ʲᵃʰʳ", 11, False, MUTED)
            if phase >= 3:
                kw = sum(pv) - 100000
                text(d, (tx, 160), "Barwert:", 11, False, MUTED)
                text(d, (tx, 180), f"{round(sum(pv)):,} €".replace(",", "."), 13, True, TEAL)
                text(d, (tx, 214), "Kapitalwert:", 11, False, MUTED)
                text(d, (tx, 236), f"+{round(kw):,} €".replace(",", "."), 16, True, TEAL)
                text(d, (tx, 266), "> 0 → lohnt sich", 12, True, TEAL)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1500
    durs[-1] = 3600
    save(frames, OUT / "kapitalwert.gif", durs)


# 5 Stakeholder-Karte ------------------------------------------------------------------
def gif_stakeholder():
    people = [("Geschäftsführung", 8.8, 7.5), ("Betriebsrat", 7.8, 8.6), ("Sachbearbeitung", 2.6, 8.8), ("IT-Betrieb", 6.4, 4.2),
              ("Datenschutz", 6.8, 6.2), ("Kunden", 2.2, 4.0), ("Externer Dienstleister", 2.8, 2.0)]
    x0, y0, x1, y1 = 60, 66, 400, 330
    X = lambda v: x0 + v / 10 * (x1 - x0)
    Y = lambda v: y1 - v / 10 * (y1 - y0)
    frames, durs = [], []
    for k in range(len(people) + 1):
        for f in range(10):
            t = ease(f / 9)
            img, d = canvas()
            text(d, (24, 24), "Stakeholder-Karte: Einfluss und Interesse", 15, True, INK)
            mx, my = X(5), Y(5)
            quads = [((mx, y0, x1, my), "eng einbinden", TEAL_L, TEAL), ((x0, y0, mx, my), "informieren", VIOLET_L, VIOLET),
                     ((mx, my, x1, y1), "zufriedenstellen", AMBER_L, AMBER), ((x0, my, mx, y1), "beobachten", (238, 238, 238), MUTED)]
            for (a, b, c, e), lab, fill, col in quads:
                d.rectangle(p(a, b, c, e), fill=fill)
            text(d, (X(9.6), Y(9.6)), "eng einbinden", 11, True, TEAL, "rm")
            text(d, (X(0.4), Y(9.6)), "informieren", 11, True, VIOLET, "lm")
            text(d, (X(9.6), Y(0.4)), "zufriedenstellen", 11, True, AMBER, "rm")
            text(d, (X(0.4), Y(0.4)), "beobachten", 11, True, MUTED, "lm")
            text(d, ((x0 + x1) / 2, y1 + 16), "Einfluss →", 11, False, MUTED, "mm")
            text(d, (x0 - 8, y0 - 10), "↑ Interesse / Betroffenheit", 11, False, MUTED, "lm")
            for i, (name, e, inte) in enumerate(people[:k + 1]):
                if i == len(people):
                    break
                a = 1 if i < k else t
                d.ellipse(p(X(e) - 6, Y(inte) - 6, X(e) + 6, Y(inte) + 6), fill=mix(BG, INK, a))
                text(d, (X(e) + 9, Y(inte)), name, 10, True, mix(BG, INK, a), "lm")
            tx = 420
            msgs = {"eng einbinden": "Lenkungskreis, frühe Mitsprache", "informieren": "regelmäßig berichten, Schulungen, Feedback einholen",
                    "zufriedenstellen": "Anforderungen erfüllen, kurz berichten", "beobachten": "bei Bedarf informieren"}
            if k < len(people):
                name, e, inte = people[k]
                q = "eng einbinden" if e >= 5 and inte >= 5 else ("informieren" if inte >= 5 else ("zufriedenstellen" if e >= 5 else "beobachten"))
                text(d, (tx, 80), name, 13, True, INK)
                text(d, (tx, 104), "→ " + q, 13, True, TEAL)
                wrap_text(d, tx, 132, msgs[q], 26, 11, False, MUTED, 16)
            else:
                text(d, (tx, 80), "Kommunikationsplan:", 13, True, INK)
                wrap_text(d, tx, 106, "Für jede Gruppe: Wer informiert wen, wie oft, auf welchem Weg, mit welcher Botschaft?", 26, 12, False, INK, 18)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1000
    durs[-1] = 3400
    save(frames, OUT / "stakeholder-karte.gif", durs)


# 6 Transferarbeit: Zeitplan ----------------------------------------------------------
def gif_zeitplan():
    tasks = [("Thema, Kurzbeschreibung, Gliederung", -14, -1, VIOLET), ("Genehmigung", 0, 0, CORAL),
             ("Ist-Analyse, Daten sichten", 1, 6, TEAL), ("Lösungskonzept, Modell / Prototyp", 5, 15, TEAL),
             ("Wirtschaftlichkeit, Recht, Risiken", 12, 19, AMBER), ("Folien erstellen", 17, 24, VIOLET), ("Probevortrag, Feinschliff, Abgabe", 23, 28, CORAL)]
    x0, x1 = 40, 600
    lo, hi = -14, 28
    X = lambda dd: x0 + (dd - lo) / (hi - lo) * (x1 - x0)
    frames, durs = [], []
    for k in range(len(tasks) + 1):
        for f in range(12):
            t = ease(f / 11)
            img, d = canvas()
            text(d, (24, 26), "Transferarbeit: 28 Tage gut einteilen", 15, True, INK)
            for dd in range(lo, hi + 1, 7):
                d.line(p(X(dd), 60, X(dd), 320), fill=GRID, width=S)
                lab = "Tag " + str(dd) if dd > 0 else ("Genehmigung" if dd == 0 else f"{dd} Tage")
                text(d, (X(dd), 332), lab, 10, False, MUTED, "mm")
            d.rectangle(p(X(1), 56, X(28), 64), fill=AMBER_L)
            text(d, ((X(1) + X(28)) / 2, 52), "28 Tage Bearbeitungszeit (Beginn am Tag nach der Genehmigung)", 10, True, AMBER, "mm")
            for i, (name, a, b, col) in enumerate(tasks):
                y = 80 + i * 34
                al = 1 if i < k else (t if i == k else 0)
                if al <= 0.02:
                    continue
                if a == b:
                    d.polygon([p(X(a), y + 4), p(X(a) + 10, y + 14), p(X(a), y + 24), p(X(a) - 10, y + 14)], fill=mix(BG, col, al))
                    text(d, (X(a) + 16, y + 14), name, 11, True, mix(BG, INK, al), "lm")
                else:
                    xb = X(a) + (X(b) - X(a)) * al
                    d.rounded_rectangle(p(X(a), y + 4, xb, y + 24), radius=6 * S, fill=mix(BG, col, 0.85))
                    if b > 12:
                        text(d, (X(a) - 8, y + 14), name, 11, True, mix(BG, INK, al), "rm")
                    else:
                        text(d, (X(b) + 8, y + 14), name, 11, True, mix(BG, INK, al), "lm")
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 900
    durs[-1] = 3600
    save(frames, OUT / "transferarbeit-zeitplan.gif", durs)


if __name__ == "__main__":
    gif_matrix()
    gif_eisberg()
    gif_amortisation()
    gif_abzinsung()
    gif_stakeholder()
    gif_zeitplan()
