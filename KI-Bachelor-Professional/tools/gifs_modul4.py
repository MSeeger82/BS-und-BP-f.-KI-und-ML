"""Erklär-GIFs für Modul 4: Evaluierung und Clustering."""
import math
import random

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes, cell, de)

NR = 4


def konfusionsmatrix():
    """Vorhersagen fallen in vier Felder; danach werden Precision und Recall abgelesen."""
    random.seed(1)
    cases = [("TP", 40), ("FN", 20), ("FP", 10), ("TN", 30)]
    seq = [c for c, n in cases for _ in range(n)]
    random.shuffle(seq)
    pos = {"TP": (210, 90), "FN": (390, 90), "FP": (210, 200), "TN": (390, 200)}
    fill = {"TP": TEAL_L, "TN": TEAL_L, "FP": CORAL_L, "FN": CORAL_L}
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Konfusionsmatrix: vier mögliche Ausgänge")
        n = min(len(seq), int(len(seq) * ease(i / 50)))
        cnt = {k: 0 for k in pos}
        for c in seq[:n]:
            cnt[c] += 1
        text(d, (300, 62), "tatsächlich positiv", 12, True, MUTED, "mm")
        text(d, (480, 62), "tatsächlich negativ", 12, True, MUTED, "mm")
        text(d, (200, 145), "vorhergesagt positiv", 12, True, MUTED, "rm")
        text(d, (200, 255), "vorhergesagt negativ", 12, True, MUTED, "rm")
        # Anordnung: Zeilen = Vorhersage, Spalten = Wahrheit
        layout = {"TP": (210, 90), "FP": (390, 90), "FN": (210, 200), "TN": (390, 200)}
        names = {"TP": "richtig positiv", "FP": "falsch positiv", "FN": "falsch negativ", "TN": "richtig negativ"}
        for k, (x, y) in layout.items():
            d.rounded_rectangle(p(x, y, x + 170, y + 100), radius=10 * 2, fill=fill[k], outline=GRID, width=2)
            text(d, (x + 85, y + 30), k, 18, True, INK, "mm")
            text(d, (x + 85, y + 52), names[k], 11, False, MUTED, "mm")
            text(d, (x + 85, y + 78), str(cnt[k]), 20, True, TEAL if k in ("TP", "TN") else CORAL, "mm")
        if i > 55:
            text(d, (24, 330), "Precision = 40 / (40 + 10) = 80 %", 13, True, TEAL)
            text(d, (330, 330), "Recall = 40 / (40 + 20) ≈ 67 %", 13, True, VIOLET)
        a.frame(img, 70)
    a.hold(3400)
    a.save(NR, "konfusionsmatrix.gif")


def roc():
    """Schwelle wandert; Punkte (FPR, TPR) zeichnen die ROC-Kurve."""
    random.seed(8)
    posS = [min(.99, max(.01, random.gauss(.68, .15))) for _ in range(60)]
    negS = [min(.99, max(.01, random.gauss(.38, .15))) for _ in range(60)]
    a = Anim()
    curve = []
    steps = 50
    for i in range(steps + 20):
        th = 1 - min(1, i / steps)
        tpr = sum(s >= th for s in posS) / 60
        fpr = sum(s >= th for s in negS) / 60
        if i <= steps:
            curve.append((fpr, tpr))
        img, d = canvas()
        title(d, "Schwelle verschieben: die ROC-Kurve entsteht")
        # Verteilungen
        X0, X1, Y = 30, 300, 240
        d.line(p(X0, Y, X1, Y), fill=GREY, width=2)
        for s in negS:
            d.ellipse(p(X0 + s * (X1 - X0) - 3, Y - 20 - random.random() * 0, X0 + s * (X1 - X0) + 3, Y - 14), fill=TEAL)
        for s in posS:
            d.ellipse(p(X0 + s * (X1 - X0) - 3, Y - 40, X0 + s * (X1 - X0) + 3, Y - 34), fill=CORAL)
        tx = X0 + th * (X1 - X0)
        d.line(p(tx, 90, tx, Y + 10), fill=VIOLET, width=2 * 2)
        text(d, (max(70, min(260, tx)), 80), f"Schwelle {de(th, 2)}", 12, True, VIOLET, "mm")
        text(d, (X0, 270), "rot = positiv (z. B. Betrug), grün = negativ", 11, False, MUTED)
        text(d, (X0, 288), "rechts der Schwelle = Alarm", 11, False, MUTED)
        # ROC
        RX0, RY0, S_ = 360, 70, 240
        d.rectangle(p(RX0, RY0, RX0 + S_, RY0 + S_), outline=GRID, width=2)
        d.line(p(RX0, RY0 + S_, RX0 + S_, RY0), fill=GRID, width=2)
        if len(curve) > 1:
            d.line([p(RX0 + f * S_, RY0 + (1 - t) * S_) for f, t in curve], fill=CORAL, width=3 * 2)
        f, t = curve[-1]
        d.ellipse(p(RX0 + f * S_ - 5, RY0 + (1 - t) * S_ - 5, RX0 + f * S_ + 5, RY0 + (1 - t) * S_ + 5), fill=VIOLET)
        text(d, (RX0 + S_ / 2, RY0 + S_ + 16), "Falsch-Positiv-Rate", 11, False, MUTED, "mm")
        text(d, (RX0 - 6, RY0 + 4), "Recall", 11, False, MUTED, "ra")
        text(d, (RX0 + S_ - 6, RY0 + S_ - 20), "Zufall", 10, False, GREY, "ra")
        caption(d, "Je weiter die Kurve nach links oben geht, desto besser (AUC nahe 1)")
        a.frame(img, 70)
    a.hold(3000)
    a.save(NR, "roc.gif")


def fitting():
    """Drei Modelle: zu einfach, passend, zu komplex."""
    random.seed(3)
    xs = [i / 14 for i in range(15)]
    ys = [math.sin(x * 3) * .35 + .5 + random.uniform(-.08, .08) for x in xs]
    a = Anim()
    panels = [("Underfitting", "zu einfach", AMBER), ("passend", "verallgemeinert", TEAL), ("Overfitting", "lernt Rauschen", CORAL)]
    for i in range(60):
        t = ease(i / 35)
        img, d = canvas()
        title(d, "Zu einfach, passend, zu komplex")
        for k, (name, sub, col) in enumerate(panels):
            X0, Y0, S_ = 24 + k * 205, 70, 190
            d.rectangle(p(X0, Y0, X0 + S_, Y0 + 200), outline=GRID, width=2)
            for x, y in zip(xs, ys):
                d.ellipse(p(X0 + x * S_ - 4, Y0 + (1 - y) * 200 - 4, X0 + x * S_ + 4, Y0 + (1 - y) * 200 + 4), fill=INK)
            pts = []
            n = int(100 * t) + 1
            for j in range(n):
                x = j / 100
                if k == 0:
                    y = .5 + .1 * (x - .5)
                elif k == 1:
                    y = math.sin(x * 3) * .35 + .5
                else:
                    # durch alle Punkte (stückweise linear, mit Überschwingen)
                    pos = x * 14
                    i0 = min(13, int(pos))
                    f = pos - i0
                    y = ys[i0] + (ys[i0 + 1] - ys[i0]) * f + math.sin(f * math.pi) * .06 * (1 if i0 % 2 else -1)
                pts.append(p(X0 + x * S_, Y0 + (1 - y) * 200))
            if len(pts) > 1:
                d.line(pts, fill=col, width=3 * 2)
            text(d, (X0 + S_ / 2, Y0 + 220), name, 14, True, col, "mm")
            text(d, (X0 + S_ / 2, Y0 + 240), sub, 11, False, MUTED, "mm")
        caption(d, "Ziel: der Zusammenhang, nicht das Rauschen")
        a.frame(img, 80)
    a.hold(3000)
    a.save(NR, "fitting.gif")


def kreuzvalidierung():
    """5-fache Kreuzvalidierung: der Prüfblock wandert."""
    scores = [0.81, 0.84, 0.79, 0.83, 0.82]
    a = Anim()
    for r in range(5):
        for k in range(14):
            img, d = canvas()
            title(d, "5-fache Kreuzvalidierung")
            for rr in range(r + 1):
                y = 70 + rr * 46
                for b in range(5):
                    test = b == rr
                    t = ease(k / 8) if rr == r else 1
                    col = CORAL if test else TEAL
                    colL = CORAL_L if test else TEAL_L
                    d.rounded_rectangle(p(40 + b * 84, y, 40 + b * 84 + 78, y + 34), radius=6 * 2, fill=mix(BG, colL, t), outline=mix(BG, col, t), width=2)
                    text(d, (40 + b * 84 + 39, y + 17), "Test" if test else "Training", 11, True, mix(BG, INK, t), "mm")
                if rr < r or k > 8:
                    text(d, (480, y + 17), f"Runde {rr + 1}: {de(scores[rr], 2)}", 13, False, INK, "lm")
            if r == 4 and k > 10:
                m = sum(scores) / 5
                text(d, (480, 320), f"Mittel: {de(m, 3)}", 15, True, TEAL, "lm")
            caption(d, "Jeder Datenteil ist genau einmal Prüfdaten – das Ergebnis ist stabiler")
            a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "kreuzvalidierung.gif")


def kmeans():
    """k-Means mit k = 3: zuordnen, Zentren verschieben, wiederholen."""
    random.seed(4)
    centers_true = [(.25, .3), (.7, .28), (.5, .75)]
    pts = [(random.gauss(cx, .08), random.gauss(cy, .08)) for cx, cy in centers_true for _ in range(18)]
    C = [(.15, .85), (.2, .2), (.85, .55)]
    cols = [TEAL, AMBER, VIOLET]
    a = Anim()
    X0, Y0, S_ = 150, 50, 280
    for it in range(5):
        assign = [min(range(3), key=lambda k: (x - C[k][0]) ** 2 + (y - C[k][1]) ** 2) for x, y in pts]
        newC = []
        for k in range(3):
            mem = [pts[j] for j in range(len(pts)) if assign[j] == k]
            newC.append((sum(x for x, _ in mem) / len(mem), sum(y for _, y in mem) / len(mem)) if mem else C[k])
        for phase in range(2):
            for s in range(10):
                img, d = canvas()
                title(d, f"k-Means, Runde {it + 1}: " + ("Punkte dem nächsten Zentrum zuordnen" if phase == 0 else "Zentren zum Mittelpunkt verschieben"))
                d.rectangle(p(X0, Y0, X0 + S_, Y0 + S_), outline=GRID, width=2)
                tt = ease(s / 9)
                for j, (x, y) in enumerate(pts):
                    c = cols[assign[j]] if (phase == 1 or tt > .5) else GREY if it == 0 else cols[assign[j]]
                    d.ellipse(p(X0 + x * S_ - 4, Y0 + y * S_ - 4, X0 + x * S_ + 4, Y0 + y * S_ + 4), fill=c)
                for k in range(3):
                    cx = C[k][0] + (newC[k][0] - C[k][0]) * (tt if phase == 1 else 0)
                    cy = C[k][1] + (newC[k][1] - C[k][1]) * (tt if phase == 1 else 0)
                    d.line(p(X0 + cx * S_ - 9, Y0 + cy * S_ - 9, X0 + cx * S_ + 9, Y0 + cy * S_ + 9), fill=cols[k], width=4 * 2)
                    d.line(p(X0 + cx * S_ - 9, Y0 + cy * S_ + 9, X0 + cx * S_ + 9, Y0 + cy * S_ - 9), fill=cols[k], width=4 * 2)
                caption(d, "Wiederholen, bis sich nichts mehr ändert")
                a.frame(img, 70)
        C = newC
    a.hold(2600)
    a.save(NR, "kmeans.gif")


def elbow():
    """Fehlerkurve über k mit Knick bei k = 3."""
    vals = [100, 52, 22, 18, 15, 13, 11.5, 10.5]
    a = Anim()
    for i in range(50):
        t = ease(i / 35)
        img, d = canvas()
        title(d, "Elbow-Methode: Wie viele Cluster?")
        X0, Y0, X1, Y1 = 80, 60, 560, 310
        axes(d, X0, Y0, X1, Y1, "Anzahl Cluster k", "Fehler")
        n = max(1, int(len(vals) * t))
        pts = [(X0 + (k + .5) / len(vals) * (X1 - X0), Y1 - vals[k] / 105 * (Y1 - Y0)) for k in range(len(vals))]
        if n > 1:
            d.line([p(*q) for q in pts[:n]], fill=SKY, width=3 * 2)
        for k in range(n):
            d.ellipse(p(pts[k][0] - 5, pts[k][1] - 5, pts[k][0] + 5, pts[k][1] + 5), fill=SKY)
            text(d, (pts[k][0], Y1 + 14), str(k + 1), 11, False, MUTED, "mm")
        if t > .95:
            x, y = pts[2]
            d.ellipse(p(x - 14, y - 14, x + 14, y + 14), outline=CORAL, width=3 * 2)
            text(d, (x + 22, y - 70), "Knick bei k = 3", 14, True, CORAL)
            text(d, (x + 22, y - 50), "danach kaum noch Gewinn", 12, False, MUTED)
        caption(d, "Mehr Cluster senken den Fehler immer – sinnvoll ist der Punkt, ab dem es kaum noch hilft")
        a.frame(img, 80)
    a.hold(3000)
    a.save(NR, "elbow.gif")


def dbscan():
    """Dichte Bereiche werden zu Clustern beliebiger Form; Einzelpunkte sind Rauschen."""
    random.seed(6)
    ring = [(.5 + .32 * math.cos(a_) + random.gauss(0, .02), .5 + .32 * math.sin(a_) + random.gauss(0, .02)) for a_ in [k / 40 * 2 * math.pi for k in range(40)]]
    core = [(random.gauss(.5, .05), random.gauss(.5, .05)) for _ in range(20)]
    noise = [(.08, .1), (.92, .12), (.9, .9), (.1, .88), (.2, .55)]
    a = Anim()
    X0, Y0, S_ = 170, 50, 280
    for i in range(70):
        t = ease((i - 10) / 35)
        img, d = canvas()
        title(d, "DBSCAN: Cluster aus dichten Bereichen")
        d.rectangle(p(X0, Y0, X0 + S_, Y0 + S_), outline=GRID, width=2)
        for x, y in ring:
            d.ellipse(p(X0 + x * S_ - 4, Y0 + y * S_ - 4, X0 + x * S_ + 4, Y0 + y * S_ + 4), fill=mix(GREY, TEAL, t))
        for x, y in core:
            d.ellipse(p(X0 + x * S_ - 4, Y0 + y * S_ - 4, X0 + x * S_ + 4, Y0 + y * S_ + 4), fill=mix(GREY, AMBER, t))
        for x, y in noise:
            d.ellipse(p(X0 + x * S_ - 4, Y0 + y * S_ - 4, X0 + x * S_ + 4, Y0 + y * S_ + 4), fill=mix(GREY, CORAL, t))
            if t > .9:
                d.ellipse(p(X0 + x * S_ - 9, Y0 + y * S_ - 9, X0 + x * S_ + 9, Y0 + y * S_ + 9), outline=CORAL, width=2)
        if t > .9:
            text(d, (470, 120), "Cluster 1: Ring", 13, True, TEAL)
            text(d, (470, 144), "Cluster 2: Kern", 13, True, AMBER)
            text(d, (470, 168), "Rauschen: 5 Punkte", 13, True, CORAL)
            text(d, (470, 210), "k-Means würde den", 12, False, MUTED)
            text(d, (470, 228), "Ring zerschneiden.", 12, False, MUTED)
        caption(d, "Parameter: Radius ε und Mindestzahl Nachbarn – keine Clusteranzahl nötig")
        a.frame(img, 80)
    a.hold(3000)
    a.save(NR, "dbscan.gif")


def pca():
    """Punktwolke; neue Achse in Richtung größter Streuung; Projektion auf diese Achse."""
    random.seed(10)
    pts = []
    for _ in range(50):
        u = random.gauss(0, 1)
        v = random.gauss(0, .25)
        pts.append((u * .8 - v * .6, u * .6 + v * .8))
    a = Anim()
    cx, cy, S_ = 320, 200, 70
    for i in range(70):
        t1 = ease((i - 5) / 20)
        t2 = ease((i - 30) / 25)
        img, d = canvas()
        title(d, "PCA: neue Achse in Richtung der größten Streuung")
        d.line(p(cx - 230, cy, cx + 230, cy), fill=GRID, width=2)
        d.line(p(cx, cy - 150, cx, cy + 150), fill=GRID, width=2)
        if t1 > 0:
            L = 230 * t1
            d.line(p(cx - L * .8, cy + L * .6, cx + L * .8, cy - L * .6), fill=VIOLET, width=3 * 2)
            text(d, (cx + 190, cy - 160), "Hauptkomponente 1", 13, True, mix(BG, VIOLET, t1), "mm")
        for x, y in pts:
            s = x * .8 + y * .6
            px, py = s * .8, s * .6
            X = x + (px - x) * t2
            Y = y + (py - y) * t2
            d.ellipse(p(cx + X * S_ - 4, cy - Y * S_ - 4, cx + X * S_ + 4, cy - Y * S_ + 4), fill=TEAL)
        if t2 > .95:
            pass
        caption(d, "Zwei Merkmale → eine Komponente; über 90 % der Streuung bleiben erhalten" if t2 > .95 else "", 1)
        a.frame(img, 80)
    a.hold(3000)
    a.save(NR, "pca.gif")


if __name__ == "__main__":
    konfusionsmatrix()
    roc()
    fitting()
    kreuzvalidierung()
    kmeans()
    elbow()
    dbscan()
    pca()
