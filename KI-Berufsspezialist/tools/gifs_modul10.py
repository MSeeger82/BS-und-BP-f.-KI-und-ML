"""GIFs für Modul 10 (Recht, Ethik und Datenschutz)."""
import math
import random
from gifkit import *  # noqa: F401,F403

OUT = out_dir(10)


# 1 AI-Act-Pyramide -----------------------------------------------------------------
def gif_pyramide():
    levels = [
        ("Unannehmbares Risiko", "verboten", ["Social Scoring", "Emotionserkennung am Arbeitsplatz", "manipulative KI"], CORAL, CORAL_L),
        ("Hohes Risiko", "strenge Pflichten", ["Bewerberauswahl", "Kreditwürdigkeit", "Prüfungsbewertung"], AMBER, AMBER_L),
        ("Begrenztes Risiko", "Transparenzpflichten", ["Chatbot", "Deepfakes", "KI-Texte für die Öffentlichkeit"], VIOLET, VIOLET_L),
        ("Minimales Risiko", "keine besonderen Pflichten", ["Spamfilter", "KI in Videospielen", "Rechtschreibhilfe"], TEAL, TEAL_L),
    ]
    frames, durs = [], []
    top, base_y, cx, half = 60, 330, 190, 170
    for k in range(len(levels) + 1):
        for f in range(14):
            t = ease(f / 13)
            img, d = canvas()
            text(d, (24, 26), "EU AI Act: vier Risikoklassen", 15, True, INK)
            h = (base_y - top) / 4
            for i, (name, rule, ex, col, colL) in enumerate(levels):
                y0 = top + i * h
                y1 = y0 + h
                w0 = half * (i / 4)
                w1 = half * ((i + 1) / 4)
                a = 1 if i < k else (t if i == k else 0.12)
                poly = [p(cx - w0, y0), p(cx + w0, y0), p(cx + w1, y1), p(cx - w1, y1)]
                d.polygon(poly, fill=mix(BG, colL, a), outline=mix(BG, col, a))
                if i == 0:
                    pass
                tx = 380
                if a > 0.2:
                    text(d, (tx, y0 + 10), name, 13, True, mix(BG, col, a))
                    text(d, (tx, y0 + 28), rule, 11, True, mix(BG, INK, a))
                    text(d, (tx, y0 + 46), " · ".join(ex[:2]), 10, False, mix(BG, MUTED, a))
                    d.line(p(cx + (w0 + w1) / 2 + 10, (y0 + y1) / 2, tx - 8, y0 + 20), fill=mix(BG, GREY, a), width=S)
            text(d, (24, 350), "Je höher das Risiko für Gesundheit, Sicherheit und Grundrechte, desto strenger die Regeln.", 12, False, MUTED)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1300
    durs[-1] = 3600
    save(frames, OUT / "ai-act-pyramide.gif", durs)


# 2 DSGVO-Prüfweg -------------------------------------------------------------------
def gif_dsgvo():
    steps = [
        ("Personenbezug?", "Lässt sich ein Mensch direkt oder indirekt identifizieren?", "nein → DSGVO gilt nicht (z. B. echt anonym)"),
        ("Rechtsgrundlage?", "Art. 6: Einwilligung, Vertrag, rechtl. Pflicht, berechtigtes Interesse …", "keine → Verarbeitung unzulässig"),
        ("Zweck und Umfang?", "Zweckbindung, Datenminimierung, Speicherbegrenzung", "Zweck neu → neu prüfen"),
        ("Hohes Risiko?", "z. B. umfangreiche Profilbildung, neue Technologie, sensible Daten", "ja → Datenschutz-Folgenabschätzung (Art. 35)"),
        ("Automatisierte Entscheidung?", "mit rechtlicher oder ähnlich erheblicher Wirkung (Art. 22)", "ja → nur mit Ausnahme + menschliches Eingreifen"),
        ("Technik und Verträge", "Sicherheit (Art. 32), Auftragsverarbeitung (Art. 28), Drittland", "dokumentieren (Rechenschaftspflicht)"),
    ]
    frames, durs = [], []
    for k in range(len(steps) + 1):
        for f in range(12):
            t = ease(f / 11)
            img, d = canvas()
            text(d, (24, 26), "Datenschutz-Prüfweg für ein KI-Vorhaben (DSGVO)", 15, True, INK)
            for i, (q, desc, note) in enumerate(steps):
                y = 50 + i * 50
                a = 1 if i < k else (t if i == k else 0.15)
                d.rounded_rectangle(p(24, y, 616, y + 46), radius=8 * S, fill=mix(BG, WHITE, a), outline=mix(BG, TEAL if i < k else AMBER, a), width=2 * S)
                d.ellipse(p(32, y + 11, 56, y + 35), fill=mix(BG, TEAL if i < k else AMBER, a))
                text(d, (44, y + 23), str(i + 1), 11, True, WHITE, "mm")
                text(d, (66, y + 12), q, 12, True, mix(BG, INK, a))
                text(d, (66, y + 28), desc, 10, False, mix(BG, MUTED, a))
                text(d, (608, y + 21), note, 10, True, mix(BG, CORAL if i < k else MUTED, a), "rm") if a > 0.6 and len(note) < 48 else None
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1300
    durs[-1] = 3600
    save(frames, OUT / "dsgvo-pruefweg.gif", durs)


# 3 Wie Bias entsteht -----------------------------------------------------------------
def gif_bias():
    frames, durs = [], []
    stages = [
        ("1 Vergangenheit", "In den letzten 10 Jahren wurden fast nur Männer eingestellt.", 0),
        ("2 Trainingsdaten", "Das Modell sieht: „eingestellt“ ≈ männlich.", 1),
        ("3 Modell lernt", "Merkmale wie „Frauenfußballverein“ werden negativ gewichtet.", 2),
        ("4 Entscheidung", "Frauen werden seltener vorgeschlagen.", 3),
        ("5 Rückkopplung", "Neue Einstellungen bestätigen das Muster – es verstärkt sich.", 4),
    ]
    for k in range(len(stages)):
        for f in range(16):
            t = ease(f / 15)
            img, d = canvas()
            text(d, (24, 26), "Wie Bias entsteht: Das Modell lernt die Vorurteile der Vergangenheit", 14, True, INK)
            cx, cy, R = 200, 200, 120
            for i, (title, desc, _) in enumerate(stages):
                ang = -math.pi / 2 + i * 2 * math.pi / 5
                x, y = cx + R * math.cos(ang), cy + R * math.sin(ang)
                a = 1 if i < k else (t if i == k else 0.15)
                d.ellipse(p(x - 34, y - 34, x + 34, y + 34), fill=mix(BG, CORAL_L if i == k else WHITE, a), outline=mix(BG, CORAL, a), width=2 * S)
                text(d, (x, y), title.split(" ")[0], 16, True, mix(BG, CORAL, a), "mm")
                nxt = (i + 1) % 5
                ang2 = -math.pi / 2 + nxt * 2 * math.pi / 5
                if i < k or (k == 4 and i == 4):
                    x2, y2 = cx + R * math.cos(ang2), cy + R * math.sin(ang2)
                    dx, dy = x2 - x, y2 - y
                    L = math.hypot(dx, dy)
                    arrow(d, x + dx / L * 38, y + dy / L * 38, x2 - dx / L * 40, y2 - dy / L * 40, GREY)
            title, desc, _ = stages[k]
            tx = 360
            text(d, (tx, 90), title, 15, True, CORAL)
            wrap_text(d, tx, 124, desc, 30, 13, False, INK, 20)
            # Balken Anteil Frauen
            share = [0.12, 0.12, 0.12, 0.09, 0.06][k]
            text(d, (tx, 230), "Frauenanteil bei Vorschlägen", 11, False, MUTED)
            d.rounded_rectangle(p(tx, 248, tx + 220, 264), radius=6 * S, fill=GRID)
            d.rounded_rectangle(p(tx, 248, tx + 220 * share * 2, 264), radius=6 * S, fill=CORAL)
            text(d, (tx + 226, 256), f"{round(share * 100)} %", 11, True, INK, "lm")
            if k == 4:
                text(d, (tx, 300), "Gegenmittel: Daten prüfen und ausgleichen,", 12, True, TEAL)
                text(d, (tx, 318), "Fairness messen, Mensch entscheidet.", 12, True, TEAL)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1500
    durs[-1] = 3400
    save(frames, OUT / "bias-entstehung.gif", durs)


# 4 Fairness messen -------------------------------------------------------------------
def gif_fairness():
    frames, durs = [], []
    seq = [(0.5, 0.5)] * 10 + [(0.5, 0.5 - 0.14 * ease(k / 19)) for k in range(20)] + [(0.5, 0.36)] * 14
    for thrA, thrB in seq:
        selA = 0.30 if thrA >= 0.5 else 0.3
        selB = 0.18 + (0.5 - thrB) * 0.85
        tprA = 0.90
        tprB = 0.70 + (0.5 - thrB) * 1.4
        img, d = canvas()
        text(d, (24, 26), "Fairness messen: Gruppen getrennt auswerten", 15, True, INK)
        groups = [("Gruppe A", selA, tprA, TEAL), ("Gruppe B", selB, tprB, VIOLET)]
        for gi, (name, sel, tpr, col) in enumerate(groups):
            x = 70 + gi * 150
            text(d, (x + 50, 60), name, 13, True, col, "mm")
            for j, (lab, v) in enumerate([("Auswahlquote", sel), ("Richtig-Positiv-Rate", tpr)]):
                bx = x + j * 56
                h = v * 200
                d.rectangle(p(bx, 290 - h, bx + 40, 290), fill=col if j == 0 else mix(WHITE, col, 0.5))
                text(d, (bx + 20, 282 - h), f"{round(v * 100)} %", 11, True, INK, "mm")
            text(d, (x + 20, 304), "Auswahl", 10, False, MUTED, "mm")
            text(d, (x + 76, 304), "TPR", 10, False, MUTED, "mm")
        d.line(p(50, 290, 360, 290), fill=GREY, width=S)
        ratio = selB / selA
        tx = 390
        text(d, (tx, 70), "Verhältnis der Auswahlquoten", 12, False, MUTED)
        col = CORAL if ratio < 0.8 else TEAL
        text(d, (tx, 100), de(ratio, 2), 28, True, col, "lm")
        text(d, (tx, 134), "4/5-Regel: unter 0,8 auffällig", 11, False, MUTED)
        text(d, (tx, 176), "Unterschied der TPR", 12, False, MUTED)
        diff = (tprA - tprB) * 100
        text(d, (tx, 206), f"{round(diff)} Prozentpunkte", 18, True, CORAL if diff > 5 else TEAL, "lm")
        if thrB < 0.49:
            text(d, (tx, 250), f"Schwelle für B: {de(thrB, 2)}", 12, True, AMBER)
            text(d, (tx, 270), "Ausgleich möglich – aber eine", 11, False, INK)
            text(d, (tx, 286), "rechtliche und ethische Abwägung,", 11, False, INK)
            text(d, (tx, 302), "keine rein technische Frage.", 11, False, INK)
        frames.append(finish(img)); durs.append(90)
    durs[-1] = 3200
    save(frames, OUT / "fairness-metriken.gif", durs)


# 5 SHAP-Wasserfall -------------------------------------------------------------------
def gif_shap():
    base = 0.20
    contribs = [("Schuldenquote 45 %", 0.15), ("Beschäftigt seit 8 Monaten", 0.08), ("Einkommen 3.200 €", -0.05), ("keine Zahlungsausfälle", -0.04), ("Kredithöhe 15.000 €", 0.04)]
    x0, x1 = 250, 600
    X = lambda v: x0 + v / 0.5 * (x1 - x0)
    frames, durs = [], []
    for k in range(len(contribs) + 2):
        for f in range(12):
            t = ease(f / 11)
            img, d = canvas()
            text(d, (24, 26), "SHAP: Warum hat das Modell 38 % Ausfallrisiko berechnet?", 15, True, INK)
            for v in (0, 0.1, 0.2, 0.3, 0.4, 0.5):
                d.line(p(X(v), 60, X(v), 300), fill=GRID, width=S)
                text(d, (X(v), 312), f"{int(v * 100)} %", 10, False, MUTED, "mm")
            y = 66
            text(d, (24, y + 12), "Durchschnitt aller Kunden", 12, True, INK, "lm")
            d.rectangle(p(X(0), y, X(base), y + 24), fill=GREY)
            text(d, (X(base) + 6, y + 12), "20 %", 11, True, INK, "lm")
            cur = base
            for i, (lab, c) in enumerate(contribs):
                yy = 104 + i * 36
                a = 1 if i < k else (t if i == k else 0)
                if a <= 0.02:
                    continue
                text(d, (24, yy + 12), lab, 12, False, mix(BG, INK, a), "lm")
                col = CORAL if c > 0 else TEAL
                xa, xb = X(cur), X(cur + c * a)
                d.rectangle(p(min(xa, xb), yy, max(xa, xb), yy + 24), fill=mix(BG, col, a))
                text(d, (max(xa, xb) + 6, yy + 12), ("+" if c > 0 else "−") + f"{abs(round(c * 100))}", 11, True, mix(BG, col, a), "lm")
                cur += c * a if i == k else c
            if k >= len(contribs):
                yy = 104 + len(contribs) * 36
                d.line(p(X(0.38), 60, X(0.38), yy + 24), fill=INK, width=2 * S)
                text(d, (24, yy + 12), "Ergebnis für diesen Kunden", 12, True, INK, "lm")
                text(d, (X(0.38) + 6, yy + 12), "38 %", 13, True, INK, "lm")
                text(d, (24, 340), "Rot erhöht das Risiko, grün senkt es. Größter Treiber hier: die Schuldenquote.", 12, True, INK)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1000
    durs[-1] = 3600
    save(frames, OUT / "shap-erklaerung.gif", durs)


# 6 Kontrafaktische Erklärung ------------------------------------------------------
def gif_kontrafaktisch():
    x0, y0, x1, y1 = 40, 66, 380, 330
    X = lambda v: x0 + v / 10 * (x1 - x0)
    Y = lambda v: y1 - v / 10 * (y1 - y0)
    rnd = random.Random(3)
    pts = []
    for _ in range(40):
        a, b = rnd.uniform(0, 10), rnd.uniform(0, 10)
        pts.append((a, b, 1 if b > 9 - 0.8 * a else 0))
    start = (4.0, 4.6)
    goal = (4.0, 6.1)
    frames, durs = [], []
    for f in range(40):
        t = ease(min(1, max(0, (f - 10) / 20)))
        img, d = canvas()
        text(d, (24, 24), "Kontrafaktische Erklärung: Was hätte sich ändern müssen?", 15, True, INK)
        d.polygon([p(X(0), Y(9)), p(X(10), Y(1)), p(X(10), Y(10)), p(X(0), Y(10))], fill=TEAL_L)
        d.polygon([p(X(0), Y(9)), p(X(10), Y(1)), p(X(10), Y(0)), p(X(0), Y(0))], fill=CORAL_L)
        d.line(p(X(0), Y(9), X(10), Y(1)), fill=INK, width=2 * S)
        text(d, (X(8.4), Y(9.2)), "Kredit ja", 12, True, TEAL, "mm")
        text(d, (X(1.6), Y(0.8)), "Kredit nein", 12, True, CORAL, "mm")
        for a, b, c in pts:
            d.ellipse(p(X(a) - 3, Y(b) - 3, X(a) + 3, Y(b) + 3), fill=mix(WHITE, TEAL if c else CORAL, 0.6))
        cx, cy = start[0] + (goal[0] - start[0]) * t, start[1] + (goal[1] - start[1]) * t
        d.line(p(X(start[0]), Y(start[1]), X(cx), Y(cy)), fill=AMBER, width=3 * S)
        d.ellipse(p(X(cx) - 9, Y(cy) - 9, X(cx) + 9, Y(cy) + 9), fill=INK)
        text(d, ((x0 + x1) / 2, y1 + 14), "Berufsjahre →", 11, False, MUTED, "mm")
        text(d, (x0, y0 - 10), "↑ Monatseinkommen", 11, False, MUTED, "lm")
        tx = 400
        text(d, (tx, 70), "Antragsteller (Punkt):", 12, False, MUTED)
        text(d, (tx, 92), "abgelehnt", 15, True, CORAL)
        if f > 30:
            text(d, (tx, 140), "Kleinste Änderung, die", 12, False, INK)
            text(d, (tx, 158), "zur Zusage geführt hätte:", 12, False, INK)
            text(d, (tx, 190), "„Mit 300 € mehr", 14, True, TEAL)
            text(d, (tx, 210), "Monatseinkommen wäre der", 14, True, TEAL)
            text(d, (tx, 230), "Kredit bewilligt worden.“", 14, True, TEAL)
            text(d, (tx, 280), "Für Betroffene verständlich", 11, False, MUTED)
            text(d, (tx, 296), "und handlungsleitend.", 11, False, MUTED)
        frames.append(finish(img)); durs.append(90)
    durs[-1] = 3600
    save(frames, OUT / "kontrafaktische-erklaerung.gif", durs)


if __name__ == "__main__":
    gif_pyramide()
    gif_dsgvo()
    gif_bias()
    gif_fairness()
    gif_shap()
    gif_kontrafaktisch()
