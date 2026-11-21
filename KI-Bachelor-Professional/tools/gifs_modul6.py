"""Erklär-GIFs für Modul 6: Chancen und Herausforderungen der KI."""
import math
import random

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes, cell, de)

NR = 6


def bias_quellen():
    """Kette: Welt → Daten → Modell → Entscheidung → zurück in die Daten (Rückkopplung)."""
    steps = [("Vergangenheit", "historischer Bias", AMBER, AMBER_L), ("Daten", "Auswahl-/Messbias", SKY, SKY_L),
             ("Modell", "lernt die Muster", VIOLET, VIOLET_L), ("Entscheidung", "betrifft Menschen", CORAL, CORAL_L)]
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Wie Bias entsteht – und sich selbst verstärkt")
        n = min(4, i // 12 + 1)
        for k in range(n):
            x = 24 + k * 154
            box(d, x, 120, 138, 66, steps[k][0], steps[k][2], steps[k][3], steps[k][1])
            if k:
                arrow(d, x - 14, 153, x - 2, 153, GREY)
        if i > 52:
            t = ease((i - 52) / 16)
            pts = [(24 + 3 * 154 + 69, 190), (24 + 3 * 154 + 69, 190 + 70 * t)]
            d.line([p(*q) for q in pts], fill=CORAL, width=2 * 2)
            if t > .5:
                d.line(p(24 + 3 * 154 + 69, 260, 24 + 154 + 69 + (1 - t) * 300, 260), fill=CORAL, width=2 * 2)
            if t > .95:
                arrow(d, 24 + 154 + 69, 260, 24 + 154 + 69, 192, CORAL)
                text(d, (320, 284), "Rückkopplung: Entscheidungen erzeugen die Daten von morgen", 13, True, CORAL, "mm")
        caption(d, "Beispiel: Wer nie einen Kredit bekommt, kann nie beweisen, dass er ihn zurückzahlt")
        a.frame(img, 80)
    a.hold(3200)
    a.save(NR, "bias-quellen.gif")


def auswahlquoten():
    """Zwei Gruppen, Auswahlquote je Gruppe; Verhältnis und 80-%-Regel."""
    a = Anim()
    ga, gb = 0.30, 0.15
    for i in range(60):
        t = ease(i / 35)
        img, d = canvas()
        title(d, "Demographic Parity: gleiche Auswahlquote je Gruppe?")
        for k, (name, q, col, colL) in enumerate([("Gruppe A", ga, TEAL, TEAL_L), ("Gruppe B", gb, AMBER, AMBER_L)]):
            x = 120 + k * 220
            # 100 Figuren als Punkte 10×10
            for j in range(100):
                r, c = divmod(j, 10)
                sel = j < q * 100 * t
                d.ellipse(p(x + c * 16, 70 + r * 16, x + c * 16 + 11, 70 + r * 16 + 11), fill=col if sel else GRID)
            text(d, (x + 76, 250), name, 14, True, col, "mm")
            text(d, (x + 76, 272), f"Auswahlquote {de(q * 100 * t, 0)} %", 13, False, INK, "mm")
        if t > .95:
            text(d, (320, 310), "Verhältnis B/A = 15 % / 30 % = 0,5  →  unter 0,8: Hinweis auf Benachteiligung", 13, True, CORAL, "mm")
        caption(d, "")
        a.frame(img, 80)
    a.hold(3400)
    a.save(NR, "auswahlquoten.gif")


def shap():
    """Wasserfall: Durchschnitt 20 % → Beiträge der Merkmale → 47 % für diesen Kunden."""
    base = 20
    contrib = [("Zahlungsverzug letztes Jahr", +18, CORAL), ("Einkommen", -6, TEAL), ("Kreditbetrag hoch", +12, CORAL),
               ("Beschäftigt seit 8 Jahren", -4, TEAL), ("Offene Kredite: 3", +7, CORAL)]
    a = Anim()
    X0, S_ = 240, 5.4
    for i in range(80):
        img, d = canvas()
        title(d, "SHAP: Wie kommt diese eine Vorhersage zustande?")
        n = min(len(contrib), max(0, (i - 8) // 10 + 1))
        y = 70
        text(d, (X0 - 10, y + 12), "Durchschnitt aller Kunden", 12, False, MUTED, "rm")
        d.rectangle(p(X0, y, X0 + base * S_, y + 24), fill=GREY)
        text(d, (X0 + base * S_ + 6, y + 12), f"{base} %", 12, True, INK, "lm")
        cur = base
        for k in range(n):
            name, v, col = contrib[k]
            y = 106 + k * 34
            x1, x2 = X0 + cur * S_, X0 + (cur + v) * S_
            d.rectangle(p(min(x1, x2), y, max(x1, x2), y + 24), fill=col)
            text(d, (X0 - 10, y + 12), name, 12, False, INK, "rm")
            text(d, (max(x1, x2) + 6, y + 12), f"{'+' if v > 0 else '−'}{abs(v)} Pp.", 12, True, col, "lm")
            cur += v
        if n == len(contrib):
            y = 106 + n * 34 + 6
            d.rectangle(p(X0, y, X0 + cur * S_, y + 26), fill=VIOLET)
            text(d, (X0 - 10, y + 13), "Vorhersage für diesen Kunden", 12, True, INK, "rm")
            text(d, (X0 + cur * S_ + 6, y + 13), f"{cur} % Ausfallrisiko", 13, True, VIOLET, "lm")
        caption(d, "Rot erhöht, grün senkt das Risiko – die Beiträge addieren sich zur Vorhersage")
        a.frame(img, 90)
    a.hold(3600)
    a.save(NR, "shap.gif")


def adversarial():
    """Bild + kaum sichtbares Rauschen = falsche Erkennung."""
    random.seed(2)
    a = Anim()
    def sign(d, x, y, s, noise=0):
        d.regular_polygon((x * 2, y * 2, s * 2), 8, rotation=22.5, fill=(200, 40, 50))
        text(d, (x, y), "STOP", int(s / 2.6), True, WHITE, "mm")
        if noise:
            rnd = random.Random(5)
            for _ in range(140):
                px, py = x + rnd.uniform(-s, s), y + rnd.uniform(-s, s)
                d.rectangle(p(px, py, px + 3, py + 3), fill=mix((200, 40, 50), WHITE, noise * rnd.random()))
    for i in range(70):
        img, d = canvas()
        title(d, "Adversarial Example: winzige Änderung, falsche Erkennung")
        sign(d, 100, 190, 60)
        text(d, (100, 280), "„Stoppschild“ 98 %", 13, True, TEAL, "mm")
        if i > 15:
            text(d, (205, 190), "+", 30, True, MUTED, "mm")
            rnd = random.Random(9)
            for _ in range(260):
                px, py = 260 + rnd.uniform(0, 110), 135 + rnd.uniform(0, 110)
                g = int(128 + rnd.uniform(-60, 60))
                d.rectangle(p(px, py, px + 3, py + 3), fill=(g, g, g))
            text(d, (315, 280), "gezielte Störung", 12, False, MUTED, "mm")
        if i > 32:
            text(d, (405, 190), "=", 30, True, MUTED, "mm")
            sign(d, 520, 190, 60, noise=.25)
            text(d, (520, 280), "„Vorfahrt achten“ 91 %", 13, True, CORAL, "mm")
        caption(d, "Für Menschen sieht das Schild gleich aus – für das Modell nicht")
        a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "adversarial.gif")


def drift():
    """Datenverteilung verschiebt sich über die Monate; Modellgüte sinkt, Warnschwelle, Neutraining."""
    a = Anim()
    acc = [0.90, 0.90, 0.89, 0.88, 0.86, 0.83, 0.80, 0.77, 0.89, 0.90]
    for i in range(80):
        m = min(9, i // 8)
        img, d = canvas()
        title(d, "Drift: Die Welt ändert sich, das Modell nicht")
        # Verteilung links
        X0, X1, Y = 30, 300, 210
        shift = min(m, 7) * 0.12 if m < 8 else 0.84
        d.line(p(X0, Y, X1, Y), fill=GREY, width=2)
        pts_tr = [p(X0 + (x / 100) * (X1 - X0), Y - 110 * math.exp(-((x / 100 - .35) ** 2) / .01)) for x in range(101)]
        d.line(pts_tr, fill=TEAL, width=3 * 2)
        pts_now = [p(X0 + (x / 100) * (X1 - X0), Y - 110 * math.exp(-((x / 100 - .35 - shift * .5) ** 2) / .012)) for x in range(101)]
        d.line(pts_now, fill=AMBER, width=3 * 2)
        text(d, (X0, 236), "grün: Trainingsdaten", 11, False, TEAL)
        text(d, (X0, 254), "orange: aktuelle Daten", 11, False, AMBER)
        # Güte rechts
        GX0, GY0, GX1, GY1 = 350, 70, 610, 270
        axes(d, GX0, GY0, GX1, GY1, "Monat", "Genauigkeit")
        thr = GY1 - (0.82 - 0.7) / 0.25 * (GY1 - GY0)
        d.line(p(GX0, thr, GX1, thr), fill=CORAL, width=2)
        text(d, (GX1, thr - 6), "Warnschwelle 82 %", 10, False, CORAL, "rb")
        pts = [(GX0 + (k + .5) / 10 * (GX1 - GX0), GY1 - (acc[k] - 0.7) / 0.25 * (GY1 - GY0)) for k in range(m + 1)]
        if len(pts) > 1:
            d.line([p(*q) for q in pts], fill=SKY, width=3 * 2)
        for q in pts:
            d.ellipse(p(q[0] - 4, q[1] - 4, q[0] + 4, q[1] + 4), fill=SKY)
        if m >= 8:
            text(d, (pts[7][0], pts[7][1] + 18), "Neutraining", 11, True, TEAL, "mm")
        caption(d, "Überwachen, Schwellen setzen, mit aktuellen Daten neu trainieren")
        a.frame(img, 110)
    a.hold(3000)
    a.save(NR, "drift.gif")


def mensch_im_regelkreis():
    """Fälle mit hoher Sicherheit automatisch, unsichere an Menschen."""
    random.seed(3)
    a = Anim()
    probs = [random.random() for _ in range(18)]
    for i in range(80):
        img, d = canvas()
        title(d, "Human-in-the-Loop: unsichere Fälle prüft ein Mensch")
        box(d, 24, 150, 120, 60, "KI-Modell", VIOLET, VIOLET_L, "Wahrscheinlichkeit")
        box(d, 470, 60, 150, 54, "automatisch", TEAL, TEAL_L, "> 90 % oder < 10 %")
        box(d, 470, 250, 150, 54, "Mensch prüft", AMBER, AMBER_L, "10 % bis 90 %")
        arrow(d, 146, 170, 466, 90, GREY)
        arrow(d, 146, 190, 466, 276, GREY)
        n = min(len(probs), i // 4)
        for k in range(n):
            pr = probs[k]
            auto = pr > .9 or pr < .1
            t = ease(((i - k * 4) % 400) / 8)
            x = 150 + (300 * t)
            y = 180 + ((-95 if auto else 95) * t)
            d.ellipse(p(x - 6, y - 6, x + 6, y + 6), fill=TEAL if auto else AMBER)
        na = sum(1 for k in range(n) if probs[k] > .9 or probs[k] < .1)
        text(d, (545, 128), f"{na} Fälle", 13, True, TEAL, "mm")
        text(d, (545, 318), f"{n - na} Fälle", 13, True, AMBER, "mm")
        caption(d, "Der Mensch muss eingreifen können – und Zeit sowie Wissen dafür haben")
        a.frame(img, 80)
    a.hold(2600)
    a.save(NR, "mensch-im-regelkreis.gif")


if __name__ == "__main__":
    bias_quellen()
    auswahlquoten()
    shap()
    adversarial()
    drift()
    mensch_im_regelkreis()
