"""Erklär-GIFs für Modul 3: Mathematik und einfache Lernverfahren."""
import math
import random

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes, de)

NR = 3


def abstaende():
    """Zwei Punkte: euklidischer Abstand (Luftlinie) und Manhattan-Abstand (Stadtblöcke)."""
    a = Anim()
    A, B = (2, 1), (6, 4)
    X0, Y0, S_ = 80, 300, 50
    sx = lambda x: X0 + x * S_
    sy = lambda y: Y0 - y * S_
    for i in range(70):
        img, d = canvas()
        title(d, "Abstand zweier Datenpunkte")
        for gx in range(0, 8):
            d.line(p(sx(gx), sy(0), sx(gx), sy(5)), fill=GRID, width=2)
        for gy in range(0, 6):
            d.line(p(sx(0), sy(gy), sx(7), sy(gy)), fill=GRID, width=2)
        t1 = ease(i / 22)
        t2 = ease((i - 26) / 22)
        # Manhattan
        if t1 > 0:
            mx = A[0] + (B[0] - A[0]) * min(1, t1 * 2)
            d.line(p(sx(A[0]), sy(A[1]), sx(mx), sy(A[1])), fill=AMBER, width=4 * 2)
            if t1 > 0.5:
                my = A[1] + (B[1] - A[1]) * (t1 - 0.5) * 2
                d.line(p(sx(B[0]), sy(A[1]), sx(B[0]), sy(my)), fill=AMBER, width=4 * 2)
        if t2 > 0:
            d.line(p(sx(A[0]), sy(A[1]), sx(A[0] + (B[0] - A[0]) * t2), sy(A[1] + (B[1] - A[1]) * t2)), fill=TEAL, width=4 * 2)
        for (x, y), lab in ((A, "A (2 | 1)"), (B, "B (6 | 4)")):
            d.ellipse(p(sx(x) - 7, sy(y) - 7, sx(x) + 7, sy(y) + 7), fill=INK)
            text(d, (sx(x) - 10, sy(y) - 12), lab, 13, True, INK, "rb")
        text(d, (450, 110), "Manhattan:", 14, True, AMBER)
        text(d, (450, 132), "|6 − 2| + |4 − 1| = 7", 14, False, mix(BG, INK, t1))
        text(d, (450, 180), "Euklidisch:", 14, True, TEAL)
        text(d, (450, 202), "√(4² + 3²) = √25 = 5", 14, False, mix(BG, INK, t2))
        caption(d, "Kleiner Abstand = ähnliche Beispiele")
        a.frame(img, 80)
    a.hold(3000)
    a.save(NR, "abstaende.gif")


def gradientenabstieg():
    """Kugel auf einer Fehlerkurve: kleine Lernrate (langsam), gute Lernrate, zu große Lernrate (springt)."""
    f = lambda w: (w - 3) ** 2 + 1
    g = lambda w: 2 * (w - 3)
    runs = [(0.1, "Lernrate 0,1: gleichmäßig zum Minimum", TEAL), (0.95, "Lernrate 0,95: springt hin und her", CORAL)]
    a = Anim()
    for lr, lab, col in runs:
        w = -1.0
        trace = [w]
        for _ in range(14):
            w = w - lr * g(w)
            trace.append(w)
        for k in range(len(trace)):
            img, d = canvas()
            title(d, "Gradientenabstieg: bergab zum kleinsten Fehler")
            X0, Y0, X1, Y1 = 60, 60, 600, 320
            sx = lambda w_: X0 + (w_ + 2) / 10 * (X1 - X0)
            sy = lambda v: Y1 - v / 26 * (Y1 - Y0)
            axes(d, X0, Y0, X1, Y1, "Parameter w", "Fehler")
            pts = [(sx(-2 + j * 0.05), sy(f(-2 + j * 0.05))) for j in range(201)]
            d.line([p(*q) for q in pts], fill=GREY, width=3 * 2)
            for j in range(1, k + 1):
                arrow(d, sx(trace[j - 1]), sy(f(trace[j - 1])), sx(trace[j]), sy(f(trace[j])), mix(BG, col, 0.6), 2)
            wk = trace[k]
            d.ellipse(p(sx(wk) - 9, sy(f(wk)) - 9, sx(wk) + 9, sy(f(wk)) + 9), fill=col)
            text(d, (X0 + 20, 70), lab, 14, True, col)
            text(d, (X0 + 20, 92), f"Schritt {k}: w = {de(wk, 2)}, Fehler = {de(f(wk), 2)}", 12, False, MUTED)
            caption(d, "Neues w = altes w − Lernrate · Steigung")
            a.frame(img, 260)
        a.hold(1800)
    a.save(NR, "gradientenabstieg.gif")


def bayes():
    """1.000 Menschen: 10 krank. Test erkennt 9, schlägt bei 50 Gesunden falsch an."""
    a = Anim()
    random.seed(2)
    idx = list(range(1000))
    sick = set(random.sample(idx, 10))
    healthy = [k for k in idx if k not in sick]
    sick_l = sorted(sick)
    tp = set(sick_l[:9])
    fp = set(random.sample(healthy, 50))
    for i in range(80):
        img, d = canvas()
        title(d, "Satz von Bayes: Wie sicher ist ein positiver Test?")
        st = 0 if i < 15 else 1 if i < 40 else 2
        for k in range(1000):
            r, c = divmod(k, 50)
            x, y = 24 + c * 8.6, 50 + r * 8.6
            col = GRID
            if k in sick:
                col = CORAL
            if st >= 1 and (k in tp or k in fp):
                col = AMBER if k in fp else CORAL
            if st >= 2 and not (k in tp or k in fp):
                col = mix(GRID, BG, 0.6)
            d.rectangle(p(x, y, x + 7, y + 7), fill=col)
        tx = 470
        text(d, (tx, 60), "1.000 Personen", 14, True, INK)
        text(d, (tx, 82), "10 krank (1 %)", 13, False, CORAL)
        if st >= 1:
            text(d, (tx, 112), "Test positiv bei:", 13, True, INK)
            text(d, (tx, 132), "9 Kranken (90 %)", 13, False, CORAL)
            text(d, (tx, 152), "50 Gesunden (≈ 5 %)", 13, False, AMBER)
        if st >= 2:
            text(d, (tx, 192), "Positiv insgesamt: 59", 13, True, INK)
            text(d, (tx, 216), "davon krank: 9", 13, False, INK)
            text(d, (tx, 248), "9 / 59 ≈ 15 %", 20, True, TEAL)
        caption(d, "Bei seltenen Ereignissen sind die meisten Alarme falsch")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "bayes.gif")


def kleinste_quadrate():
    """Residuen als Quadrate; die Gerade dreht sich, bis die Quadratfläche minimal ist."""
    pts = [(1, 2.0), (2, 2.8), (3, 4.5), (4, 4.2), (5, 6.0), (6, 6.6)]
    xm = sum(x for x, _ in pts) / len(pts)
    ym = sum(y for _, y in pts) / len(pts)
    b1 = sum((x - xm) * (y - ym) for x, y in pts) / sum((x - xm) ** 2 for x, _ in pts)
    b0 = ym - b1 * xm
    a = Anim()
    for i in range(70):
        t = ease(i / 45)
        m = 0.1 + (b1 - 0.1) * t
        c = ym - m * xm
        img, d = canvas()
        title(d, "Methode der kleinsten Quadrate")
        X0, Y0, X1, Y1 = 50, 50, 420, 330
        sx = lambda x: X0 + x / 7 * (X1 - X0)
        sy = lambda y: Y1 - y / 8 * (Y1 - Y0)
        axes(d, X0, Y0, X1, Y1, "x", "y")
        sse = 0
        for x, y in pts:
            yh = m * x + c
            r = y - yh
            sse += r * r
            side = abs(sy(y) - sy(yh))
            x2 = sx(x) + side if r > 0 else sx(x) - side
            d.rectangle(p(min(sx(x), x2), min(sy(y), sy(yh)), max(sx(x), x2), max(sy(y), sy(yh))), fill=CORAL_L, outline=CORAL, width=2)
        d.line(p(sx(0), sy(c), sx(7), sy(m * 7 + c)), fill=AMBER, width=3 * 2)
        for x, y in pts:
            d.ellipse(p(sx(x) - 5, sy(y) - 5, sx(x) + 5, sy(y) + 5), fill=TEAL)
        text(d, (450, 90), f"ŷ = {de(c, 2)} + {de(m, 2)} · x", 15, True, AMBER)
        text(d, (450, 120), "Summe der Quadrate:", 13, False, MUTED)
        text(d, (450, 142), de(sse, 2), 22, True, CORAL)
        if t > 0.99:
            text(d, (450, 190), "Minimum erreicht", 14, True, TEAL)
            text(d, (450, 212), f"b₁ = Cov / Var = {de(b1, 2)}", 12, False, INK)
            text(d, (450, 232), f"b₀ = ȳ − b₁·x̄ = {de(b0, 2)}", 12, False, INK)
        caption(d, "Die beste Gerade macht die Summe der roten Flächen am kleinsten")
        a.frame(img, 80)
    a.hold(3200)
    a.save(NR, "kleinste-quadrate.gif")


def sigmoid():
    """Logistische Funktion; Punkte bekommen Wahrscheinlichkeiten; Schwelle 0,5 trennt."""
    a = Anim()
    random.seed(9)
    xs = [(-4 + random.random() * 8) for _ in range(18)]
    for i in range(70):
        t = ease(i / 40)
        img, d = canvas()
        title(d, "Logistische Regression: aus einer Zahl wird eine Wahrscheinlichkeit")
        X0, Y0, X1, Y1 = 60, 60, 590, 310
        sx = lambda z: X0 + (z + 6) / 12 * (X1 - X0)
        sy = lambda v: Y1 - v * (Y1 - Y0)
        axes(d, X0, Y0, X1, Y1, "z = b₀ + b₁·x₁ + …", "P(Klasse 1)")
        n = int(240 * t) + 1
        pts = [(-6 + 12 * j / 240, 1 / (1 + math.exp(-(-6 + 12 * j / 240)))) for j in range(n)]
        if len(pts) > 1:
            d.line([p(sx(z), sy(v)) for z, v in pts], fill=VIOLET, width=3 * 2)
        d.line(p(X0, sy(0.5), X1, sy(0.5)), fill=GREY, width=2)
        text(d, (X1, sy(0.5) - 8), "Schwelle 0,5", 11, False, MUTED, "rb")
        if t > 0.9:
            for z in xs:
                v = 1 / (1 + math.exp(-z))
                col = CORAL if v >= 0.5 else TEAL
                d.ellipse(p(sx(z) - 5, sy(v) - 5, sx(z) + 5, sy(v) + 5), fill=col)
            text(d, (X1 - 10, 76), "→ Klasse 1 (z. B. kündigt)", 12, True, CORAL, "ra")
            text(d, (X0 + 14, 290), "→ Klasse 0", 12, True, TEAL)
        text(d, (330, 330), "σ(z) = 1 / (1 + e^(−z))", 13, True, VIOLET, "mm")
        a.frame(img, 80)
    a.hold(3200)
    a.save(NR, "sigmoid.gif")


def knn():
    """Neuer Punkt; Kreis wächst, bis k = 5 Nachbarn drin sind; Mehrheit entscheidet."""
    random.seed(12)
    pts = [(random.gauss(0.35, .12), random.gauss(0.4, .12), 0) for _ in range(14)] + \
          [(random.gauss(0.65, .12), random.gauss(0.6, .12), 1) for _ in range(14)]
    q = (0.52, 0.5)
    dist = sorted(((math.hypot(x - q[0], y - q[1]), c) for x, y, c in pts))
    r5 = dist[4][0] + 0.004
    a = Anim()
    for i in range(70):
        t = ease((i - 10) / 35)
        img, d = canvas()
        title(d, "k-nächste Nachbarn (k = 5)")
        X0, Y0, S_ = 70, 50, 280
        for x, y, c in pts:
            d.ellipse(p(X0 + x * S_ - 6, Y0 + y * S_ - 6, X0 + x * S_ + 6, Y0 + y * S_ + 6), fill=TEAL if c == 0 else CORAL)
        r = r5 * t
        if r > 0:
            d.ellipse(p(X0 + (q[0] - r) * S_, Y0 + (q[1] - r) * S_, X0 + (q[0] + r) * S_, Y0 + (q[1] + r) * S_), outline=VIOLET, width=2 * 2)
        votes = [c for dd, c in dist[:5]]
        done = t > 0.99
        qc = (CORAL if sum(votes) >= 3 else TEAL) if done else INK
        d.ellipse(p(X0 + q[0] * S_ - 9, Y0 + q[1] * S_ - 9, X0 + q[0] * S_ + 9, Y0 + q[1] * S_ + 9), fill=qc, outline=WHITE, width=2 * 2)
        text(d, (420, 90), "Neuer Kunde: ?", 15, True, INK)
        if done:
            nr = sum(votes)
            text(d, (420, 130), f"{5 - nr} × treu", 14, False, TEAL)
            text(d, (420, 152), f"{nr} × kündigt", 14, False, CORAL)
            text(d, (420, 190), "Mehrheit: " + ("kündigt" if nr >= 3 else "treu"), 16, True, qc)
        caption(d, "Kein Training im engeren Sinn: das Modell merkt sich alle Beispiele")
        a.frame(img, 80)
    a.hold(3200)
    a.save(NR, "knn.gif")


def entscheidungsbaum():
    """Raum wird schrittweise geteilt; daneben wächst der Baum."""
    random.seed(21)
    pts = []
    for _ in range(40):
        x, y = random.random(), random.random()
        c = 1 if (x > 0.55 and y > 0.35) or (x <= 0.55 and y > 0.8) else 0
        pts.append((x, y, c))
    a = Anim()
    for i in range(80):
        st = 0 if i < 15 else 1 if i < 35 else 2 if i < 55 else 3
        img, d = canvas()
        title(d, "Entscheidungsbaum: Fragen teilen den Raum")
        X0, Y0, S_ = 30, 60, 260
        d.rectangle(p(X0, Y0, X0 + S_, Y0 + S_), outline=GRID, width=2)
        for x, y, c in pts:
            cx, cy = X0 + x * S_, Y0 + (1 - y) * S_
            d.ellipse(p(cx - 5, cy - 5, cx + 5, cy + 5), fill=CORAL if c else TEAL)
        if st >= 1:
            d.line(p(X0 + 0.55 * S_, Y0, X0 + 0.55 * S_, Y0 + S_), fill=INK, width=2 * 2)
        if st >= 2:
            d.line(p(X0 + 0.55 * S_, Y0 + 0.65 * S_, X0 + S_, Y0 + 0.65 * S_), fill=INK, width=2 * 2)
        if st >= 3:
            d.line(p(X0, Y0 + 0.2 * S_, X0 + 0.55 * S_, Y0 + 0.2 * S_), fill=INK, width=2 * 2)
        text(d, (X0 + S_ / 2, Y0 + S_ + 16), "Nutzungsdauer x", 11, False, MUTED, "mm")
        text(d, (X0 - 4, Y0 - 8), "Beschwerden y", 11, False, MUTED, "lb")
        # Baum
        if st >= 1:
            box(d, 390, 60, 150, 36, "x > 0,55 ?", INK, GRID)
        if st >= 2:
            arrow(d, 465, 96, 545, 140, GREY)
            text(d, (520, 112), "ja", 11, False, MUTED)
            box(d, 480, 142, 140, 36, "y > 0,35 ?", INK, GRID)
            arrow(d, 550, 178, 590, 230, GREY)
            arrow(d, 550, 178, 510, 230, GREY)
            box(d, 560, 232, 70, 32, "kündigt", CORAL, CORAL_L, size=12)
            box(d, 468, 232, 70, 32, "treu", TEAL, TEAL_L, size=12)
        if st >= 3:
            arrow(d, 465, 96, 385, 140, GREY)
            text(d, (408, 112), "nein", 11, False, MUTED)
            box(d, 310, 142, 140, 36, "y > 0,8 ?", INK, GRID)
            arrow(d, 380, 178, 420, 230, GREY)
            arrow(d, 380, 178, 340, 230, GREY)
            box(d, 388, 232, 70, 32, "kündigt", CORAL, CORAL_L, size=12)
            box(d, 300, 232, 70, 32, "treu", TEAL, TEAL_L, size=12)
        caption(d, "Jede Frage wird so gewählt, dass die Gruppen möglichst rein werden")
        a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "entscheidungsbaum.gif")


def random_forest():
    """Fünf Bäume stimmen ab; Mehrheit gewinnt."""
    votes = ["kündigt", "treu", "kündigt", "kündigt", "treu"]
    a = Anim()
    for i in range(60):
        img, d = canvas()
        title(d, "Random Forest: viele Bäume stimmen ab")
        for k, v in enumerate(votes):
            x = 40 + k * 118
            t = ease((i - k * 6) / 10)
            # stilisierter Baum
            col = mix(BG, TEAL if v == "treu" else CORAL, t)
            d.polygon([p(x + 45, 70), p(x + 10, 150), p(x + 80, 150)], fill=mix(BG, (60, 140, 90), t))
            d.rectangle(p(x + 39, 150, x + 51, 172), fill=mix(BG, (120, 90, 60), t))
            text(d, (x + 45, 190), f"Baum {k + 1}", 12, False, mix(BG, MUTED, t), "mm")
            box(d, x + 5, 206, 80, 30, v, TEAL if v == "treu" else CORAL, TEAL_L if v == "treu" else CORAL_L, t=t, size=12)
        if i > 40:
            text(d, (320, 270), "3 × kündigt  :  2 × treu", 16, True, INK, "mm")
            text(d, (320, 300), "Vorhersage: kündigt (Mehrheit)", 16, True, CORAL, "mm")
        caption(d, "Jeder Baum sieht andere Zufallsstichproben und Merkmale – zusammen sind sie stabiler")
        a.frame(img, 90)
    a.hold(3000)
    a.save(NR, "random-forest.gif")


if __name__ == "__main__":
    abstaende()
    gradientenabstieg()
    bayes()
    kleinste_quadrate()
    sigmoid()
    knn()
    entscheidungsbaum()
    random_forest()
