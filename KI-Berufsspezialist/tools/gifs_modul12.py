"""GIFs für Modul 12 (Ergänzungen laut Rechtsvorschrift)."""
import math
import random
from gifkit import *  # noqa: F401,F403

OUT = out_dir(12)


def octagon(d, cx, cy, r, fill):
    pts = [p(cx + r * math.cos(math.radians(22.5 + 45 * k)), cy + r * math.sin(math.radians(22.5 + 45 * k))) for k in range(8)]
    d.polygon(pts, fill=fill, outline=WHITE)


# 1 Adversarial Example -------------------------------------------------------------
def gif_adversarial():
    random.seed(7)
    noise = [(random.uniform(0, 1), random.uniform(0, 1), random.choice([-1, 1])) for _ in range(160)]
    before = [("Stoppschild", 0.97), ("Vorfahrt gewähren", 0.02), ("Tempo 30", 0.01)]
    after = [("Stoppschild", 0.09), ("Vorfahrt gewähren", 0.88), ("Tempo 30", 0.03)]
    frames, durs = [], []
    for phase in range(4):
        for f in range(14):
            t = ease(f / 13)
            img, d = canvas()
            text(d, (24, 26), "Adversarial Example: winzige Störung, falsche Antwort", 15, True, INK)
            # Original
            d.rectangle(p(40, 66, 180, 206), fill=(232, 240, 246))
            octagon(d, 110, 136, 56, CORAL)
            text(d, (110, 136), "STOP", 16, True, WHITE, "mm")
            text(d, (110, 220), "Originalbild", 11, False, MUTED, "mm")
            if phase >= 1:
                a = 1 if phase > 1 else t
                text(d, (205, 136), "+", 22, True, mix(BG, INK, a), "mm")
                d.rectangle(p(230, 66, 370, 206), fill=mix(BG, (246, 246, 246), a), outline=mix(BG, GRID, a))
                for (u, v, s) in noise:
                    col = (150, 150, 150) if s > 0 else (205, 205, 205)
                    x, y = 232 + u * 134, 68 + v * 134
                    d.rectangle(p(x, y, x + 3, y + 3), fill=mix(BG, col, a))
                text(d, (300, 220), "gezielte Störung (stark vergrößert)", 11, False, mix(BG, MUTED, a), "mm")
            if phase >= 2:
                a = 1 if phase > 2 else t
                text(d, (395, 136), "=", 22, True, mix(BG, INK, a), "mm")
                d.rectangle(p(420, 66, 560, 206), fill=mix(BG, (232, 240, 246), a))
                octagon(d, 490, 136, 56, mix(BG, CORAL, a))
                text(d, (490, 136), "STOP", 16, True, mix(BG, WHITE, a), "mm")
                for (u, v, s) in noise[::3]:
                    x, y = 422 + u * 134, 68 + v * 134
                    d.point(p(x, y), fill=mix(BG, (200, 120, 110), a))
                text(d, (490, 220), "für Menschen: unverändert", 11, False, mix(BG, MUTED, a), "mm")
            # Wahrscheinlichkeiten
            k = 0 if phase < 2 else (t if phase == 2 else 1)
            text(d, (40, 246), "Das Modell sagt:", 12, True, INK)
            for i in range(3):
                name, pb = before[i]
                pa = after[i][1]
                pr = pb + (pa - pb) * k
                y = 270 + i * 24
                text(d, (40, y), name, 11, False, INK, "lm")
                d.rectangle(p(180, y - 7, 560, y + 7), fill=GRID)
                col = TEAL if (i == 0 and pr > 0.5) else (CORAL if pr > 0.5 else GREY)
                d.rectangle(p(180, y - 7, 180 + 380 * pr, y + 7), fill=col)
                text(d, (570, y), f"{round(pr * 100)} %", 11, True, INK, "lm")
            if phase == 3:
                text(d, (40, 350), "Gegenmittel: Adversarial Training, Eingaben prüfen, mehrere Sensoren, Monitoring", 11, True, CORAL)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1300
    durs[-1] = 3800
    save(frames, OUT / "adversarial.gif", durs)


# 2 PDCA-Zyklus ---------------------------------------------------------------------
def gif_pdca():
    phases = [("Plan", -90, 0, TEAL, TEAL_L, "Ziel und Maßnahme planen: Fehlerquote der Rechnungserkennung von 8 % auf 4 % senken – mit mehr Trainingsdaten."),
              ("Do", 0, 90, AMBER, AMBER_L, "Im kleinen Rahmen umsetzen: 2.000 Rechnungen zusätzlich labeln, nachtrainieren, Pilot in einer Abteilung."),
              ("Check", 90, 180, VIOLET, VIOLET_L, "Ergebnis prüfen: Fehlerquote im Pilot 4,5 %. Ziel fast erreicht – Ursachen der Restfehler analysieren."),
              ("Act", 180, 270, CORAL, CORAL_L, "Standardisieren oder anpassen: für alle ausrollen, Labeling-Ablauf festschreiben, nächste Runde planen.")]
    cx, cy, r = 190, 205, 128
    frames, durs = [], []
    for k in range(5):
        for f in range(12):
            t = ease(f / 11)
            img, d = canvas()
            text(d, (24, 26), "PDCA: Verbesserung als Kreislauf", 15, True, INK)
            for i, (name, a0, a1, col, light, _) in enumerate(phases):
                on = (i == k) or k == 4
                fill = mix(light, col, t) if (i == k and k < 4) else (col if (i < k or k == 4) else light)
                d.pieslice(p(cx - r, cy - r, cx + r, cy + r), a0, a1, fill=fill, outline=WHITE, width=3 * S)
                m = math.radians((a0 + a1) / 2)
                text(d, (cx + 72 * math.cos(m), cy + 72 * math.sin(m)), name, 15, True, WHITE if (i <= k) else col, "mm")
            d.ellipse(p(cx - 34, cy - 34, cx + 34, cy + 34), fill=BG)
            text(d, (cx, cy), "KI-", 11, True, INK, "mb")
            text(d, (cx, cy), "Projekt", 11, True, INK, "mt")
            tx = 360
            if k < 4:
                name, _, _, col, _, desc = phases[k]
                text(d, (tx, 84), f"{k + 1}. {name}", 18, True, col)
                wrap_text(d, tx, 118, desc, 36, 12, False, INK, 20)
            else:
                text(d, (tx, 84), "Und wieder von vorn", 18, True, INK)
                wrap_text(d, tx, 118, "Jede Runde macht den Prozess ein Stück besser – kontinuierliche Verbesserung (Kaizen). Passt gut zum Nachtrainieren von Modellen.", 36, 12, False, INK, 20)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 2600
    durs[-1] = 3600
    save(frames, OUT / "pdca.gif", durs)


# 3 Kanban-Board --------------------------------------------------------------------
def gif_kanban():
    cards = ["Daten sammeln", "Daten bereinigen", "Baseline bauen", "Modell trainieren", "Modell bewerten", "Bericht schreiben"]
    cols_x = [(24, 214), (225, 415), (426, 616)]
    heads = ["Zu tun", "In Arbeit (max. 2)", "Erledigt"]
    moves = [(0, 1), (1, 1), (0, 2), (2, 1), (1, 2), (3, 1), (2, 2), (4, 1), (3, 2), (5, 1), (4, 2), (5, 2)]
    state = [0] * len(cards)
    states = [list(state)]
    for c, to in moves:
        state[c] = to
        states.append(list(state))

    def layout(st):
        pos = {}
        for col in range(3):
            row = 0
            for i in range(len(cards)):
                if st[i] == col:
                    pos[i] = (cols_x[col][0] + 10, 92 + row * 38)
                    row += 1
        return pos

    frames, durs = [], []
    for s in range(1, len(states) + 1):
        a, b = layout(states[s - 1]), layout(states[min(s, len(states) - 1)])
        for f in range(10):
            t = ease(f / 9)
            img, d = canvas()
            text(d, (24, 26), "Kanban: Arbeit sichtbar machen, Gleichzeitiges begrenzen", 15, True, INK)
            for ci, (x0, x1) in enumerate(cols_x):
                d.rounded_rectangle(p(x0, 54, x1, 322), radius=8 * S, fill=(244, 244, 242))
                text(d, ((x0 + x1) / 2, 72), heads[ci], 12, True, AMBER if ci == 1 else INK, "mm")
            wip = sum(1 for v in states[min(s, len(states) - 1)] if v == 1)
            for i, name in enumerate(cards):
                (xa, ya), (xb, yb) = a[i], b[i]
                x, y = xa + (xb - xa) * t, ya + (yb - ya) * t
                col = states[min(s, len(states) - 1)][i]
                fill = TEAL_L if col == 2 else (AMBER_L if col == 1 else WHITE)
                d.rounded_rectangle(p(x, y, x + 170, y + 30), radius=5 * S, fill=fill, outline=GRID, width=S)
                text(d, (x + 10, y + 15), name, 11, True, INK, "lm")
            text(d, (24, 344), f"In Arbeit: {wip} von 2.  Regel: Erst fertig machen, dann Neues anfangen – so fließt die Arbeit.", 11, False, INK)
            frames.append(finish(img)); durs.append(70)
        durs[-1] = 650
    durs[-1] = 3400
    save(frames, OUT / "kanban.gif", durs)


# 4 Break-even ----------------------------------------------------------------------
def gif_break_even():
    fix, var, preis = 30000, 20, 50
    xmax = 2000
    x0, y0, x1, y1 = 80, 60, 440, 320
    X = lambda m: x0 + m / xmax * (x1 - x0)
    Y = lambda v: y1 - v / 100000 * (y1 - y0)
    K = lambda m: fix + var * m
    E = lambda m: preis * m
    frames, durs = [], []
    steps = 30
    for s in range(steps + 14):
        u = min(1, s / steps)
        mm = xmax * u
        img, d = canvas()
        text(d, (24, 26), "Break-even: Ab welcher Menge macht man Gewinn?", 15, True, INK)
        for v in range(0, 100001, 25000):
            d.line(p(x0, Y(v), x1, Y(v)), fill=GRID, width=S)
            text(d, (x0 - 6, Y(v)), f"{v // 1000} T€", 10, False, MUTED, "rm")
        for m in range(0, xmax + 1, 500):
            text(d, (X(m), y1 + 14), f"{m:,}".replace(",", "."), 10, False, MUTED, "mm")
        text(d, ((x0 + x1) / 2, y1 + 32), "Menge (Stück)", 10, False, MUTED, "mm")
        if s > steps:
            d.polygon([p(X(0), Y(K(0))), p(X(1000), Y(50000)), p(X(0), Y(0))], fill=CORAL_L)
            d.polygon([p(X(1000), Y(50000)), p(X(xmax), Y(E(xmax))), p(X(xmax), Y(K(xmax)))], fill=TEAL_L)
            text(d, (X(120), Y(18000)), "Verlust", 11, True, CORAL, "mm")
            text(d, (X(1750), Y(78000)), "Gewinn", 11, True, TEAL, "mm")
        d.line(p(X(0), Y(fix), X(mm), Y(fix)), fill=GREY, width=2 * S)
        d.line(p(X(0), Y(K(0)), X(mm), Y(K(mm))), fill=AMBER, width=3 * S)
        d.line(p(X(0), Y(0), X(mm), Y(E(mm))), fill=TEAL, width=3 * S)
        text(d, (X(60), Y(fix) + 10), "Fixkosten", 10, True, MUTED, "lm")
        if u > 0.9:
            text(d, (X(xmax) - 4, Y(K(xmax)) + 26), "Gesamtkosten", 11, True, AMBER, "rm")
            text(d, (X(xmax) - 30, Y(E(xmax)) - 4), "Erlös", 11, True, TEAL, "rm")
        if mm >= 1000:
            d.ellipse(p(X(1000) - 6, Y(50000) - 6, X(1000) + 6, Y(50000) + 6), fill=INK)
            d.line(p(X(1000), Y(50000), X(1000), y1), fill=INK, width=S)
            text(d, (X(1000) + 8, Y(50000) + 14), "Break-even", 11, True, INK, "lm")
        tx = 460
        text(d, (tx, 70), "Fixkosten 30.000 €", 11, False, INK)
        text(d, (tx, 90), "variable Kosten 20 €/Stück", 11, False, INK)
        text(d, (tx, 110), "Preis 50 €/Stück", 11, False, INK)
        if s > steps // 2:
            text(d, (tx, 146), "Deckungsbeitrag", 11, True, MUTED)
            text(d, (tx, 166), "50 − 20 = 30 €/Stück", 12, True, INK)
        if s > steps:
            text(d, (tx, 202), "Break-even-Menge", 11, True, MUTED)
            text(d, (tx, 222), "30.000 / 30", 12, True, INK)
            text(d, (tx, 246), "= 1.000 Stück", 15, True, TEAL)
        frames.append(finish(img)); durs.append(70)
    durs[steps] = 900
    durs[-1] = 3800
    save(frames, OUT / "break-even.gif", durs)


# 5 Eisenhower-Matrix ---------------------------------------------------------------
def gif_eisenhower():
    tasks = [("Modell in Produktion ausgefallen", 9.0, 9.0), ("Transferarbeit gliedern", 3.0, 8.6), ("Formatierung Wochenbericht", 8.2, 3.2),
             ("Datenschutz-Rückfrage bis heute", 7.4, 7.4), ("Weiterbildung KI-Sicherheit", 2.4, 6.6), ("Newsletter durchsehen", 2.2, 2.4)]
    x0, y0, x1, y1 = 60, 66, 400, 330
    X = lambda v: x0 + v / 10 * (x1 - x0)
    Y = lambda v: y1 - v / 10 * (y1 - y0)
    quads = {"A": ("Sofort selbst erledigen", TEAL), "B": ("Planen und terminieren", VIOLET), "C": ("Delegieren", AMBER), "D": ("Weglassen", MUTED)}
    frames, durs = [], []
    for k in range(len(tasks) + 1):
        for f in range(10):
            t = ease(f / 9)
            img, d = canvas()
            text(d, (24, 24), "Eisenhower-Matrix: wichtig vor dringend", 15, True, INK)
            mx, my = X(5), Y(5)
            d.rectangle(p(mx, y0, x1, my), fill=TEAL_L)
            d.rectangle(p(x0, y0, mx, my), fill=VIOLET_L)
            d.rectangle(p(mx, my, x1, y1), fill=AMBER_L)
            d.rectangle(p(x0, my, mx, y1), fill=(238, 238, 238))
            text(d, (X(9.6), Y(9.6)), "A: sofort selbst", 11, True, TEAL, "rm")
            text(d, (X(0.4), Y(9.6)), "B: planen", 11, True, VIOLET, "lm")
            text(d, (X(9.6), Y(0.4)), "C: delegieren", 11, True, AMBER, "rm")
            text(d, (X(0.4), Y(0.4)), "D: weglassen", 11, True, MUTED, "lm")
            text(d, ((x0 + x1) / 2, y1 + 16), "dringend →", 11, False, MUTED, "mm")
            text(d, (x0 - 8, y0 - 10), "↑ wichtig", 11, False, MUTED, "lm")
            tx = 420
            for i, (name, dr, wi) in enumerate(tasks):
                if i > k or i == len(tasks):
                    continue
                a = 1 if i < k else t
                d.ellipse(p(X(dr) - 10, Y(wi) - 10, X(dr) + 10, Y(wi) + 10), fill=mix(BG, INK, a))
                text(d, (X(dr), Y(wi)), str(i + 1), 11, True, mix(INK, WHITE, a), "mm")
                q = "A" if dr >= 5 and wi >= 5 else ("B" if wi >= 5 else ("C" if dr >= 5 else "D"))
                text(d, (tx, 70 + i * 40), f"{i + 1}. {name}", 11, i == k, mix(BG, INK, a))
                text(d, (tx + 14, 88 + i * 40), "→ " + quads[q][0], 11, True, mix(BG, quads[q][1], a))
            if k == len(tasks):
                text(d, (24, 356), "Wichtig heißt: dient den eigenen Zielen. Dringend heißt: drängt zeitlich. Wer nur Dringendes tut, kommt nie zum Wichtigen.", 10, False, INK)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1100
    durs[-1] = 3800
    save(frames, OUT / "eisenhower.gif", durs)


# 6 Ishikawa-Diagramm ---------------------------------------------------------------
def gif_ishikawa():
    bones = [("Daten", ["veraltete Trainingsdaten", "Labels fehlerhaft"], True), ("Methode", ["Leakage im Training", "falsche Kennzahl"], True),
             ("Mensch", ["Fachwissen fehlt", "Bedienfehler"], True), ("Messung", ["kein Monitoring", "Testset unrealistisch"], False),
             ("Technik", ["Sensor neu kalibriert", "Schnittstelle fehlerhaft"], False), ("Umfeld", ["Kundenverhalten neu", "neue Produkte"], False)]
    spine_y = 200
    frames, durs = [], []
    for k in range(len(bones) + 2):
        for f in range(12):
            t = ease(f / 11)
            img, d = canvas()
            text(d, (24, 26), "Ishikawa-Diagramm: Ursachen systematisch suchen", 15, True, INK)
            d.line(p(30, spine_y, 470, spine_y), fill=INK, width=3 * S)
            d.polygon([p(470, spine_y - 8), p(484, spine_y), p(470, spine_y + 8)], fill=INK)
            d.rounded_rectangle(p(488, 168, 628, 232), radius=8 * S, fill=CORAL_L, outline=CORAL, width=2 * S)
            text(d, (558, 190), "Modell liefert", 11, True, CORAL, "mm")
            text(d, (558, 210), "schlechte Werte", 11, True, CORAL, "mm")
            for i, (name, causes, top) in enumerate(bones):
                if i > k:
                    continue
                a = 1 if i < k else t
                xe = 60 + (i % 3) * 140
                ye = 82 if top else 318
                xj = xe + 80
                xm, ym = xe + (xj - xe) * a, ye + (spine_y - ye) * a
                d.line(p(xe, ye, xm, ym), fill=mix(BG, GREY, a), width=2 * S)
                text(d, (xe, ye - 12 if top else ye + 12), name, 12, True, mix(BG, TEAL, a), "mm")
                for j, c in enumerate(causes):
                    fr = 0.3 + 0.38 * j
                    if a < fr:
                        continue
                    cx_, cy_ = xe + (xj - xe) * fr, ye + (spine_y - ye) * fr
                    d.line(p(cx_, cy_, cx_ + 6, cy_), fill=GREY, width=S)
                    text(d, (cx_ + 8, cy_), c, 10, False, INK, "lm")
            if k >= len(bones):
                text(d, (24, 360), "Danach für die wahrscheinlichste Ursache fünfmal „Warum?“ fragen (5-Why) – bis zur Wurzel.", 11, True, VIOLET)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 900
    durs[-1] = 3800
    save(frames, OUT / "ishikawa.gif", durs)


if __name__ == "__main__":
    gif_adversarial()
    gif_pdca()
    gif_kanban()
    gif_break_even()
    gif_eisenhower()
    gif_ishikawa()


