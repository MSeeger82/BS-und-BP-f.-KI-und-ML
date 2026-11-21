"""Erklär-GIFs für Modul 1: Grundbegriffe von KI und Maschinellem Lernen."""
import math
import random

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes, de)

NR = 1


def ebenen():
    """Vier ineinanderliegende Ellipsen: KI ⊃ ML ⊃ DL ⊃ generative KI."""
    layers = [
        ("Künstliche Intelligenz", "auch feste Regeln", TEAL, TEAL_L, 190, 155),
        ("Maschinelles Lernen", "lernt aus Beispielen", AMBER, AMBER_L, 142, 116),
        ("Deep Learning", "viele Neuronen-Schichten", VIOLET, VIOLET_L, 94, 78),
        ("Generative KI", "erzeugt Neues", CORAL, CORAL_L, 48, 40),
    ]
    cx, cy = 210, 180
    a = Anim()
    for li in range(len(layers)):
        for k in range(14):
            img, d = canvas()
            for j, (name, sub, col, colL, rx, ry) in enumerate(layers[: li + 1]):
                t = ease(k / 13) if j == li else 1.0
                if t < 0.03:
                    continue
                d.ellipse(p(cx - rx * t, cy - ry * t, cx + rx * t, cy + ry * t), fill=mix(BG, colL, t), outline=col, width=2 * 2)
                y = 72 + j * 64
                text(d, (430, y), name, 15, True, mix(BG, INK, t))
                text(d, (430, y + 21), sub, 12, False, mix(BG, MUTED, t))
                d.ellipse(p(412, y + 4, 424, y + 16), fill=mix(BG, col, t))
            caption(d, "Jede Ebene ist ein Teilgebiet der äußeren")
            a.frame(img)
        a.hold(900)
    a.hold(2800)
    a.save(NR, "ebenen.gif")


def regeln_vs_lernen():
    """Oben: Mensch schreibt Regeln → Programm → Antwort. Unten: Daten + Antworten → Lernen → Regeln."""
    a = Anim()
    for i in range(72):
        img, d = canvas()
        t1 = ease(i / 30)
        t2 = ease((i - 34) / 30)
        text(d, (24, 30), "Klassisch programmieren", 15, True, TEAL)
        box(d, 24, 52, 150, 54, "Regeln", TEAL, TEAL_L, "vom Menschen", t=1)
        box(d, 24, 116, 150, 40, "Daten", GREY, WHITE, t=1, size=13)
        arrow(d, 180, 96, 180 + 70 * t1, 96, TEAL)
        if t1 > 0.9:
            box(d, 262, 70, 140, 54, "Programm", INK, GRID)
            arrow(d, 408, 96, 470, 96, TEAL)
            box(d, 478, 70, 138, 54, "Antworten", TEAL, TEAL_L)
        text(d, (24, 200), "Maschinelles Lernen", 15, True, AMBER)
        box(d, 24, 222, 150, 40, "Daten", GREY, WHITE, t=1, size=13)
        box(d, 24, 270, 150, 54, "Antworten", AMBER, AMBER_L, "bekannte Beispiele", t=1)
        if t2 > 0:
            arrow(d, 180, 262, 180 + 70 * t2, 262, AMBER)
        if t2 > 0.9:
            box(d, 262, 236, 140, 54, "Lernen", INK, GRID, "Training")
            arrow(d, 408, 262, 470, 262, AMBER)
            box(d, 478, 236, 138, 54, "Regeln", AMBER, AMBER_L, "= Modell")
        caption(d, "Beim Lernen entstehen die Regeln aus den Beispielen")
        a.frame(img, 60)
    a.hold(3000)
    a.save(NR, "regeln-vs-lernen.gif")


def training():
    """Eine Gerade passt sich Schritt für Schritt an Punkte an; der Fehler sinkt."""
    random.seed(4)
    pts = [(x, 0.6 * x + 12 + random.uniform(-9, 9)) for x in range(8, 100, 7)]
    a = Anim()
    # Modell y = m·(x − 50) + c: zentriertes x macht den Gradientenabstieg gutmütig
    m, c = -0.3, 20.0
    lr_m, lr_c = 0.0012, 0.08
    hist = []
    for step in range(60):
        b = c - 50 * m
        gm = sum(-2 * (x - 50) * (y - (m * (x - 50) + c)) for x, y in pts) / len(pts)
        gc = sum(-2 * (y - (m * (x - 50) + c)) for x, y in pts) / len(pts)
        mse = sum((y - (m * x + b)) ** 2 for x, y in pts) / len(pts)
        hist.append(mse)
        img, d = canvas()
        title(d, "Training: Fehler messen, Parameter anpassen, wiederholen")
        X0, Y0, X1, Y1 = 40, 60, 380, 320
        axes(d, X0, Y0, X1, Y1, "Merkmal x", "Ziel y")
        sx = lambda x: X0 + x / 105 * (X1 - X0)
        sy = lambda y: Y1 - y / 90 * (Y1 - Y0)
        for x, y in pts:
            yy = m * x + b
            d.line(p(sx(x), sy(y), sx(x), sy(yy)), fill=CORAL_L, width=2)
        for x, y in pts:
            d.ellipse(p(sx(x) - 4, sy(y) - 4, sx(x) + 4, sy(y) + 4), fill=TEAL)
        d.line(p(sx(0), sy(b), sx(105), sy(m * 105 + b)), fill=AMBER, width=3 * 2)
        # Verlustkurve
        LX0, LY0, LX1, LY1 = 420, 80, 616, 300
        axes(d, LX0, LY0, LX1, LY1, "Schritt", "Fehler")
        mx = max(hist[0], 1)
        for k in range(1, len(hist)):
            d.line(p(LX0 + (k - 1) / 60 * (LX1 - LX0), LY1 - hist[k - 1] / mx * (LY1 - LY0 - 10),
                     LX0 + k / 60 * (LX1 - LX0), LY1 - hist[k] / mx * (LY1 - LY0 - 10)), fill=CORAL, width=2 * 2)
        text(d, (420, 318), f"Schritt {step + 1}   mittlerer quadr. Fehler {de(mse, 0)}", 12, False, MUTED)
        caption(d, "Rote Striche = Fehler je Beispiel; sie werden kleiner")
        a.frame(img, 90 if step > 5 else 220)
        m -= lr_m * gm
        c -= lr_c * gc
    a.hold(2600)
    a.save(NR, "training.gif")


def regression_klassifikation():
    """Links: Zahl vorhersagen (Gerade). Rechts: Kategorie vorhersagen (Trennlinie)."""
    random.seed(7)
    reg = [(x, 0.7 * x + 10 + random.uniform(-8, 8)) for x in range(5, 100, 9)]
    cls = [(random.uniform(5, 95), random.uniform(5, 95)) for _ in range(26)]
    a = Anim()
    for i in range(50):
        t = ease(i / 30)
        img, d = canvas()
        text(d, (30, 26), "Regression: eine Zahl", 15, True, TEAL)
        text(d, (346, 26), "Klassifikation: eine Kategorie", 15, True, VIOLET)
        X0, Y0, X1, Y1 = 30, 60, 290, 300
        axes(d, X0, Y0, X1, Y1, "Wohnfläche", "Preis")
        for x, y in reg:
            d.ellipse(p(X0 + x * 2.5 - 4, Y1 - y * 2.4 - 4, X0 + x * 2.5 + 4, Y1 - y * 2.4 + 4), fill=TEAL)
        d.line(p(X0, Y1 - 10 * 2.4, X0 + 260 * t, Y1 - (10 + 0.7 * 104 * t) * 2.4), fill=AMBER, width=3 * 2)
        QX0, QY0, QX1, QY1 = 346, 60, 606, 300
        axes(d, QX0, QY0, QX1, QY1, "Merkmal 1", "Merkmal 2")
        for x, y in cls:
            spam = y > 100 - x
            c = CORAL if spam else TEAL
            cx, cy = QX0 + x * 2.6, QY1 - y * 2.4
            d.ellipse(p(cx - 5, cy - 5, cx + 5, cy + 5), fill=mix(GREY, c, t))
        d.line(p(QX0, QY1 - 100 * 2.4, QX0 + 260 * t, QY1 - (100 - 100 * t) * 2.4), fill=INK, width=2 * 2)
        if t > 0.95:
            text(d, (600, 80), "Spam", 13, True, CORAL, "ra")
            text(d, (360, 280), "kein Spam", 13, True, TEAL)
            text(d, (160, 320), "Ergebnis: 312.000 €", 13, True, AMBER, "mm")
            text(d, (476, 320), "Ergebnis: Spam ja/nein", 13, True, VIOLET, "mm")
        caption(d, "")
        a.frame(img, 70)
    a.hold(3200)
    a.save(NR, "regression-klassifikation.gif")


def datensplit():
    """100 Beispiele werden in Training (70), Validierung (15) und Test (15) aufgeteilt."""
    random.seed(3)
    order = list(range(100))
    random.shuffle(order)
    a = Anim()
    for i in range(64):
        t = ease((i - 10) / 34)
        img, d = canvas()
        title(d, "Daten aufteilen: lernen, einstellen, ehrlich prüfen")
        for k in range(100):
            r, c = divmod(k, 20)
            x0, y0 = 60 + c * 26, 70 + r * 26
            rank = order.index(k)
            grp = 0 if rank < 70 else 1 if rank < 85 else 2
            col = [TEAL, AMBER, CORAL][grp]
            tx = [60, 60, 60][grp]
            # Zielposition in drei Blöcken
            if grp == 0:
                rr, cc = divmod(rank, 14)
                X, Y = 40 + cc * 21, 230 + rr * 21
            elif grp == 1:
                rr, cc = divmod(rank - 70, 5)
                X, Y = 380 + cc * 21, 230 + rr * 21
            else:
                rr, cc = divmod(rank - 85, 5)
                X, Y = 510 + cc * 21, 230 + rr * 21
            x = x0 + (X - x0) * t
            y = y0 + (Y - y0) * t
            d.rounded_rectangle(p(x, y, x + 16, y + 16), radius=3 * 2, fill=mix(GREY, col, t))
        if t > 0.9:
            text(d, (40, 212), "Training 70 %", 14, True, TEAL)
            text(d, (380, 212), "Validierung 15 %", 14, True, AMBER)
            text(d, (510, 212), "Test 15 %", 14, True, CORAL)
            caption(d, "Testdaten bleiben bis zum Schluss unter Verschluss")
        a.frame(img, 70)
    a.hold(3200)
    a.save(NR, "datensplit.gif")


def lernarten():
    """Drei Felder: überwacht (mit Labels), unüberwacht (Gruppen finden), bestärkend (Belohnung)."""
    random.seed(11)
    a = Anim()
    sup = [(random.uniform(0, 1), random.uniform(0, 1)) for _ in range(18)]
    uns = [(0.25 + random.gauss(0, .08), 0.3 + random.gauss(0, .08)) for _ in range(8)] + \
          [(0.72 + random.gauss(0, .08), 0.7 + random.gauss(0, .08)) for _ in range(8)]
    for i in range(80):
        img, d = canvas()
        t = ease((i % 80) / 40)
        cols = [(20, "Überwacht", "mit richtigen Antworten", TEAL), (226, "Unüberwacht", "ohne Antworten", AMBER), (432, "Bestärkend", "durch Belohnung", VIOLET)]
        for x, name, sub, col in cols:
            d.rounded_rectangle(p(x, 50, x + 188, 300), radius=12 * 2, fill=WHITE, outline=GRID, width=2)
            text(d, (x + 94, 72), name, 15, True, col, "mm")
            text(d, (x + 94, 92), sub, 11, False, MUTED, "mm")
        # überwacht: Punkte mit Label-Farbe, Trennlinie
        for u, v in sup:
            lab = v > u
            d.ellipse(p(30 + u * 168 - 5, 110 + v * 170 - 5, 30 + u * 168 + 5, 110 + v * 170 + 5), fill=CORAL if lab else TEAL)
        d.line(p(30, 110, 30 + 168 * t, 110 + 170 * t), fill=INK, width=2 * 2)
        # unüberwacht: Punkte grau → Gruppenfarbe, Kreise
        for k, (u, v) in enumerate(uns):
            c = mix(GREY, AMBER if k < 8 else SKY, t)
            d.ellipse(p(236 + u * 168 - 5, 110 + v * 170 - 5, 236 + u * 168 + 5, 110 + v * 170 + 5), fill=c)
        if t > 0.6:
            d.ellipse(p(236 + 0.25 * 168 - 40, 110 + 0.3 * 170 - 40, 236 + 0.25 * 168 + 40, 110 + 0.3 * 170 + 40), outline=AMBER, width=2)
            d.ellipse(p(236 + 0.72 * 168 - 40, 110 + 0.7 * 170 - 40, 236 + 0.72 * 168 + 40, 110 + 0.7 * 170 + 40), outline=SKY, width=2)
        # bestärkend: Agent läuft im Gitter zum Ziel
        for gx in range(4):
            for gy in range(4):
                d.rectangle(p(452 + gx * 37, 115 + gy * 42, 452 + gx * 37 + 34, 115 + gy * 42 + 39), outline=GRID, width=2)
        d.rectangle(p(452 + 3 * 37, 115, 452 + 3 * 37 + 34, 154), fill=TEAL_L)
        text(d, (452 + 3 * 37 + 17, 134), "+10", 12, True, TEAL, "mm")
        d.rectangle(p(452 + 37, 115 + 42, 452 + 37 + 34, 115 + 42 + 39), fill=CORAL_L)
        text(d, (452 + 37 + 17, 115 + 42 + 20), "−5", 12, True, CORAL, "mm")
        path = [(0, 3), (0, 2), (0, 1), (0, 0), (1, 0), (2, 0), (3, 0)]  # um das Strafeld herum
        k = min(len(path) - 1, int(t * (len(path) - 1) + 0.0001))
        gx, gy = path[k]
        d.ellipse(p(452 + gx * 37 + 7, 115 + gy * 42 + 9, 452 + gx * 37 + 27, 115 + gy * 42 + 29), fill=VIOLET)
        caption(d, "Drei Arten zu lernen – je nachdem, welche Informationen vorliegen")
        a.frame(img, 70)
    a.hold(2400)
    a.save(NR, "lernarten.gif")


def lebenszyklus():
    """Kreislauf: Problem → Daten → Modell → Bewertung → Einsatz → Überwachung → zurück."""
    steps = [("Problem", "verstehen"), ("Daten", "sammeln, prüfen"), ("Modell", "trainieren"),
             ("Bewertung", "ehrlich testen"), ("Einsatz", "Inferenz"), ("Überwachung", "Drift, Qualität")]
    cols = [TEAL, SKY, AMBER, VIOLET, CORAL, TEAL]
    cx, cy, R = 320, 200, 118
    a = Anim()
    for i in range(6 * 12 + 20):
        img, d = canvas()
        title(d, "Lebenszyklus eines KI-Modells")
        active = min(5, i // 12)
        for k, (name, sub) in enumerate(steps):
            ang = -math.pi / 2 + k * 2 * math.pi / 6
            x, y = cx + R * math.cos(ang), cy + R * math.sin(ang)
            on = k <= active
            col = cols[k]
            box(d, x - 66, y - 26, 132, 52, name, col if on else GREY, (TEAL_L, SKY_L, AMBER_L, VIOLET_L, CORAL_L, TEAL_L)[k] if on else WHITE, sub)
            ang2 = -math.pi / 2 + (k + 1) * 2 * math.pi / 6
            if k < active or (i >= 72):
                a1, a2 = ang + 0.42, ang2 - 0.42
                arrow(d, cx + (R - 6) * math.cos(a1), cy + (R - 6) * math.sin(a1), cx + (R - 6) * math.cos(a2), cy + (R - 6) * math.sin(a2), GREY)
        if i >= 72:
            text(d, (cx, cy), "immer wieder", 13, True, MUTED, "mm")
        caption(d, "Ein Modell ist nie „fertig“: Daten und Welt ändern sich")
        a.frame(img, 80)
    a.hold(2800)
    a.save(NR, "lebenszyklus.gif")


if __name__ == "__main__":
    ebenen()
    regeln_vs_lernen()
    training()
    regression_klassifikation()
    datensplit()
    lernarten()
    lebenszyklus()
