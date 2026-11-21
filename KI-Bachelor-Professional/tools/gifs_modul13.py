"""Erklär-GIFs für Modul 13: Abwägungsmethoden."""
import math

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes, cell, de)

NR = 13


def nutzwert():
    """Nutzwertanalyse: Teilnutzen stapeln sich zu Säulen."""
    krit = [("Kosten", .40, SKY), ("Genauigkeit", .35, VIOLET), ("Datenschutz", .25, TEAL)]
    alt = {"Anbieter A": [6, 9, 5], "Anbieter B": [8, 6, 9]}
    a = Anim()
    X, Y1, SC = [130, 280], 300, 30
    for i in range(80):
        img, d = canvas()
        title(d, "Nutzwertanalyse: Gewicht × Punkte = Teilnutzen")
        n = min(3, i // 16 + 1)
        t = ease((i % 16) / 12) if i < 48 else 1
        for j, (nm, pts) in enumerate(alt.items()):
            x = X[j]
            y = Y1
            tot = 0
            for k in range(n):
                kn, g, c = krit[k]
                v = g * pts[k]
                h = v * SC * (t if k == n - 1 else 1)
                d.rectangle(p(x, y - h, x + 90, y), fill=c)
                if h > 16:
                    text(d, (x + 45, y - h / 2), de(v, 2), 11, True, WHITE, "mm")
                y -= h
                tot += v
            text(d, (x + 45, Y1 + 14), nm, 12, True, INK, "mm")
            if i >= 50:
                text(d, (x + 45, y - 14), "Nutzwert " + de(tot, 2), 12, True, CORAL if j == 1 else INK, "mm")
        for k, (kn, g, c) in enumerate(krit):
            d.rectangle(p(400, 80 + k * 32, 414, 94 + k * 32), fill=c)
            text(d, (422, 87 + k * 32), f"{kn} {int(g * 100)} %: A {alt['Anbieter A'][k]}, B {alt['Anbieter B'][k]}", 12, False, INK, "lm")
        if i >= 60:
            text(d, (400, 200), "B gewinnt mit 7,55 zu 6,80.", 13, True, CORAL)
            text(d, (400, 222), "Aber: Hält das Ergebnis,", 12, False, INK)
            text(d, (400, 240), "wenn sich Gewichte ändern?", 12, False, INK)
        caption(d, "Kriterien → Gewichte (Summe 100 %) → Punkte → Teilnutzen → Nutzwert")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "nutzwert.gif")


def paarvergleich():
    """Paarvergleich: Matrix füllt sich, Zeilensummen ergeben Gewichte."""
    k = ["Kosten", "Genauigkeit", "Datenschutz", "Integration"]
    M = [[None, 1, 0, 1], [1, None, 1, 2], [2, 1, None, 2], [1, 0, 0, None]]
    a = Anim()
    X0, Y0, CW, CH = 130, 100, 86, 40
    order = [(r, c) for r in range(4) for c in range(4) if r != c]
    for i in range(80):
        img, d = canvas()
        title(d, "Paarvergleich: Welches Kriterium ist wichtiger?")
        for c in range(4):
            cell(d, X0 + c * CW, Y0 - CH, CW, CH, k[c], GRID, INK, True, 11)
        cell(d, X0 + 4 * CW, Y0 - CH, 60, CH, "Summe", GRID, INK, True, 11)
        cell(d, X0 + 4 * CW + 60, Y0 - CH, 70, CH, "Gewicht", GRID, INK, True, 11)
        n = min(len(order), i // 4)
        shown = set(order[:n])
        for r in range(4):
            text(d, (X0 - 8, Y0 + r * CH + CH / 2), k[r], 12, True, INK, "rm")
            for c in range(4):
                if r == c:
                    cell(d, X0 + c * CW, Y0 + r * CH, CW, CH, "–", WHITE, GREY)
                else:
                    v = M[r][c]
                    cell(d, X0 + c * CW, Y0 + r * CH, CW, CH, str(v) if (r, c) in shown else "", WHITE, [CORAL, INK, TEAL][v], True, 13)
            if n >= len(order):
                s = sum(v for v in M[r] if v is not None)
                cell(d, X0 + 4 * CW, Y0 + r * CH, 60, CH, str(s), AMBER_L, INK, True, 13)
                cell(d, X0 + 4 * CW + 60, Y0 + r * CH, 70, CH, de(s / 12 * 100, 1) + " %", TEAL_L, INK, True, 12)
        text(d, (24, 278), "2 = Zeile wichtiger · 1 = gleich wichtig · 0 = Zeile unwichtiger", 12, False, MUTED)
        if n >= len(order):
            text(d, (24, 300), "Summe aller Punkte = n · (n − 1) = 4 · 3 = 12 → Gewicht = Zeilensumme / 12", 12, True, INK)
            text(d, (24, 320), "Gegenüberliegende Felder ergänzen sich immer zu 2", 12, False, INK)
        caption(d, "Paarweise entscheiden ist leichter als alles auf einmal zu gewichten")
        a.frame(img, 90)
    a.hold(3600)
    a.save(NR, "paarvergleich.gif")


def tco():
    """TCO als Eisberg: sichtbare Lizenzkosten, versteckte Kosten darunter."""
    items = [("Lizenz / API", 30, True), ("Datenaufbereitung", 40, False), ("Integration", 35, False), ("Betrieb, Monitoring", 25, False),
             ("Neutraining", 15, False), ("Schulung, Change", 10, False), ("Compliance", 10, False), ("Ausstieg", 5, False)]
    a = Anim()
    WL = 120
    for i in range(80):
        img, d = canvas()
        title(d, "Total Cost of Ownership: der Eisberg")
        d.rectangle(p(0, WL, 640, 340), fill=(225, 238, 247))
        d.line(p(0, WL, 640, WL), fill=SKY, width=2 * 2)
        d.polygon([p(140, WL), p(180, 62), p(230, 50), p(280, 70), p(310, WL)], fill=WHITE, outline=SKY)
        d.polygon([p(140, WL), p(310, WL), p(360, 200), p(330, 300), p(220, 330), p(110, 290), p(90, 200)], fill=(245, 250, 253), outline=SKY)
        text(d, (226, 96), "Lizenz / API 30", 12, True, INK, "mm")
        n = min(7, max(0, (i - 10) // 7))
        for k in range(n):
            nm, v, _ = items[k + 1]
            text(d, (225, 142 + k * 24), f"{nm} {v}", 12, False, INK, "mm")
        if i > 62:
            text(d, (400, 70), "Angebot sagt: 30 T€", 14, True, INK)
            text(d, (400, 100), "Tatsächlich über 3 Jahre:", 13, False, INK)
            text(d, (400, 124), "170 T€", 22, True, CORAL)
            text(d, (400, 170), "Rund 80 % der Kosten", 12, False, INK)
            text(d, (400, 188), "liegen unter der Wasserlinie", 12, False, INK)
        caption(d, "Beträge in T€ über drei Jahre – Beispiel eines KI-Projekts")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "tco.gif")


def amortisation():
    """Kumulierter Rückfluss: Investition 60 T€, 24 T€ pro Jahr → 2,5 Jahre."""
    a = Anim()
    X0, Y0, X1, Y1 = 70, 72, 420, 310
    sx = lambda t: X0 + t / 5 * (X1 - X0)
    sy = lambda v: Y0 + (80 - v) / 160 * (Y1 - Y0)
    for i in range(70):
        t = ease(i / 50) * 5
        img, d = canvas()
        title(d, "Amortisation: Wann ist die Investition zurückverdient?")
        axes(d, X0, Y0, X1, Y1, "Jahre", "T€")
        d.line(p(X0, sy(0), X1, sy(0)), fill=GREY, width=2)
        for y in range(6):
            text(d, (sx(y), sy(0) + 14), str(y), 11, False, MUTED, "mm")
        for v in (-60, -30, 30, 60):
            text(d, (X0 - 6, sy(v)), str(v), 10, False, MUTED, "rm")
        pts = [p(sx(s / 20), sy(-60 + 24 * s / 20)) for s in range(int(t * 20) + 1)]
        if len(pts) > 1:
            d.line(pts, fill=TEAL, width=3 * 2)
        d.ellipse(p(sx(0) - 5, sy(-60) - 5, sx(0) + 5, sy(-60) + 5), fill=CORAL)
        if t >= 2.5:
            d.ellipse(p(sx(2.5) - 7, sy(0) - 7, sx(2.5) + 7, sy(0) + 7), outline=CORAL, width=3 * 2)
            text(d, (sx(2.5) + 12, sy(0) + 34), "nach 2,5 Jahren", 12, True, CORAL, "lm")
        text(d, (440, 80), "Investition: 60 T€", 13, True, INK)
        text(d, (440, 104), "Rückfluss: 24 T€ / Jahr", 13, True, INK)
        if i > 52:
            text(d, (440, 150), "Amortisation =", 13, False, INK)
            text(d, (440, 170), "60 / 24 = 2,5 Jahre", 13, True, CORAL)
            text(d, (440, 210), "ROI nach 5 Jahren =", 13, False, INK)
            text(d, (440, 230), "(120 − 60) / 60 = 100 %", 13, True, TEAL)
        caption(d, "Statisch: ohne Zinsen. Dynamische Verfahren folgen in Modul 14.")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "amortisation.gif")


def fmea():
    """FMEA: RPZ = Auftreten × Bedeutung × Entdeckung."""
    rows = [("Rechnung falsch ausgelesen", 4, 7, 6), ("Modell driftet unbemerkt", 3, 8, 8), ("Schnittstelle fällt aus", 2, 6, 2), ("Prompt Injection", 2, 9, 7)]
    a = Anim()
    cols = [("Fehler", 220), ("A", 50), ("B", 50), ("E", 50), ("RPZ", 80)]
    for i in range(80):
        img, d = canvas()
        title(d, "FMEA: Risikoprioritätszahl RPZ = A × B × E")
        x = 30
        for nm, w in cols:
            cell(d, x, 60, w, 34, nm, GRID, INK, True, 12)
            x += w
        n = min(4, i // 12 + 1)
        for k in range(n):
            f, A, B, E = rows[k]
            r = A * B * E
            y = 94 + k * 38
            vals = [f, str(A), str(B), str(E), str(r)]
            x = 30
            for j, (nm, w) in enumerate(cols):
                hot = j == 4 and i > 56 and r >= 150
                cell(d, x, y, w, 38, vals[j], CORAL_L if hot else WHITE, CORAL if hot else INK, j == 4, 12)
                x += w
        text(d, (510, 80), "A = Auftreten", 12, False, INK)
        text(d, (510, 100), "B = Bedeutung", 12, False, INK)
        text(d, (510, 120), "E = Entdeckung", 12, False, INK)
        text(d, (510, 140), "je 1 bis 10", 11, False, MUTED)
        text(d, (510, 164), "E: 10 = kaum", 11, False, MUTED)
        text(d, (510, 180), "entdeckbar", 11, False, MUTED)
        if i > 56:
            text(d, (30, 270), "Höchste RPZ zuerst: Drift-Monitoring (192), Erkennung prüfen (168), Injection-Schutz (126)", 12, True, INK)
            text(d, (30, 294), "Zusätzlich: Hohe Bedeutung (9–10) immer behandeln, egal wie hoch die RPZ ist", 12, False, CORAL)
        caption(d, "Fehlermöglichkeits- und Einflussanalyse: Fehler vorbeugen, bevor sie passieren")
        a.frame(img, 90)
    a.hold(3600)
    a.save(NR, "fmea.gif")


def sensitivitaet():
    """Nutzwert A und B in Abhängigkeit vom Gewicht der Genauigkeit; kritischer Wert 48 %."""
    nA = lambda w: 9 * w + (1 - w) * (40 / 65 * 6 + 25 / 65 * 5)
    nB = lambda w: 6 * w + (1 - w) * (40 / 65 * 8 + 25 / 65 * 9)
    X0, Y0, X1, Y1 = 70, 74, 430, 300
    sx = lambda w: X0 + w * (X1 - X0)
    sy = lambda v: Y1 - (v - 4) / 6 * (Y1 - Y0)
    a = Anim()
    for i in range(70):
        t = ease(i / 50)
        img, d = canvas()
        title(d, "Sensitivitätsanalyse: Ab wann kippt die Entscheidung?")
        axes(d, X0, Y0, X1, Y1, "", "Nutzwert"); text(d, (X1, Y1 + 30), "Gewicht der Genauigkeit", 11, False, MUTED, "rm")
        for w in (0, .25, .5, .75, 1):
            text(d, (sx(w), Y1 + 14), f"{int(w * 100)} %", 10, False, MUTED, "mm")
        ws = [k / 100 for k in range(int(100 * t) + 1)]
        if len(ws) > 1:
            d.line([p(sx(w), sy(nA(w))) for w in ws], fill=SKY, width=3 * 2)
            d.line([p(sx(w), sy(nB(w))) for w in ws], fill=CORAL, width=3 * 2)
        d.line(p(sx(.35), Y0, sx(.35), Y1), fill=GREY, width=2)
        text(d, (sx(.35), Y0 - 6), "heute 35 %", 11, True, MUTED, "mm")
        if t > .5:
            d.line(p(sx(.48), Y0 + 20, sx(.48), Y1), fill=VIOLET, width=2 * 2)
            d.ellipse(p(sx(.48) - 6, sy(nA(.48)) - 6, sx(.48) + 6, sy(nA(.48)) + 6), outline=VIOLET, width=3 * 2)
        if t > .98:
            text(d, (450, 80), "Anbieter A", 13, True, SKY)
            text(d, (450, 102), "Anbieter B", 13, True, CORAL)
            text(d, (450, 150), "Kritischer Wert: 48 %", 13, True, VIOLET)
            text(d, (450, 172), "Erst wenn Genauigkeit", 12, False, INK)
            text(d, (450, 190), "mehr als 48 % wiegt,", 12, False, INK)
            text(d, (450, 208), "liegt A vorn.", 12, False, INK)
            text(d, (450, 240), "Abstand zu 35 %:", 12, False, INK)
            text(d, (450, 258), "Ergebnis ist robust.", 12, True, TEAL)
        caption(d, "Übrige Gewichte im Verhältnis 40 : 25 angepasst")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "sensitivitaet.gif")


def entscheidungsbaum():
    """Eigenentwicklung vs. Kauf mit Wahrscheinlichkeiten und Erwartungswert."""
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Entscheidungsbaum: Erwartungswert je Alternative")
        d.rectangle(p(30, 170, 60, 200), fill=INK)
        text(d, (45, 216), "Entscheidung", 10, False, MUTED, "mm")
        st = min(3, i // 16)
        for k, (nm, y, c, br) in enumerate([("Eigenentwicklung", 122, SKY, [("Erfolg 60 %", 300, .6), ("Misserfolg 40 %", -100, .4)]),
                                              ("Kauf einer Lösung", 276, TEAL, [("passt 90 %", 160, .9), ("passt kaum 10 %", 20, .1)])]):
            arrow(d, 62, 185, 200, y, c, 2)
            text(d, (130, y - 8 + (k * 30)), nm, 12, True, c, "mm")
            d.ellipse(p(200, y - 14, 228, y + 14), fill=c)
            if st >= 1:
                for j, (bn, v, pr) in enumerate(br):
                    yy = y - 40 + j * 80
                    arrow(d, 228, y, 360, yy, GREY, 2)
                    text(d, (300, yy + (-14 if j == 0 else 14)), bn, 11, False, INK, "mm")
                    d.polygon([p(362, yy), p(376, yy - 10), p(376, yy + 10)], fill=GREY)
                    text(d, (384, yy), f"{v:+d} T€".replace("+", "+ ").replace("-", "− "), 12, True, CORAL if v < 0 else INK, "lm")
            if st >= 2:
                ev = sum(v * pr for _, v, pr in br)
                text(d, (470, y), f"EW = {de(ev, 0)} T€", 14, True, c, "lm")
        if st >= 3:
            text(d, (470, 175), "Kauf: höherer", 12, True, TEAL, "lm")
            text(d, (470, 193), "Erwartungswert,", 12, True, TEAL, "lm")
            text(d, (470, 211), "kleineres Risiko", 12, True, TEAL, "lm")
        caption(d, "EW = Σ Wahrscheinlichkeit × Ergebnis: 0,6·300 − 0,4·100 = 140; 0,9·160 + 0,1·20 = 146")
        a.frame(img, 90)
    a.hold(3600)
    a.save(NR, "entscheidungsbaum.gif")


if __name__ == "__main__":
    nutzwert()
    paarvergleich()
    tco()
    amortisation()
    fmea()
    sensitivitaet()
    entscheidungsbaum()
