"""GIFs für Modul 6 (Modellbewertung)."""
import math
import random
from gifkit import *  # noqa: F401,F403

OUT = out_dir(6)


def scores():
    rnd = random.Random(6)
    pos = [min(0.99, max(0.01, rnd.gauss(0.68, 0.14))) for _ in range(40)]
    neg = [min(0.99, max(0.01, rnd.gauss(0.36, 0.15))) for _ in range(80)]
    return pos, neg


# 1 Konfusionsmatrix ---------------------------------------------------------------
def gif_konfusion():
    rnd = random.Random(3)
    cases = [("P", "P")] * 8 + [("P", "N")] * 2 + [("N", "P")] * 3 + [("N", "N")] * 17
    rnd.shuffle(cases)
    cells = {("P", "P"): (330, 110, "TP", "richtig positiv", TEAL_L), ("P", "N"): (480, 110, "FN", "falsch negativ", CORAL_L),
             ("N", "P"): (330, 230, "FP", "falsch positiv", AMBER_L), ("N", "N"): (480, 230, "TN", "richtig negativ", TEAL_L)}
    frames, durs = [], []
    counts = {k: 0 for k in cells}
    for i in range(len(cases) + 1):
        for f in range(4 if i < len(cases) else 1):
            t = ease(f / 3)
            img, d = canvas()
            text(d, (24, 26), "Konfusionsmatrix: Jede Vorhersage landet in einem von vier Feldern", 15, True, INK)
            text(d, (405, 80), "Vorhersage: defekt", 11, True, MUTED, "mm"); text(d, (555, 80), "Vorhersage: in Ordnung", 11, True, MUTED, "mm")
            text(d, (322, 160), "wirklich", 11, True, MUTED, "rm"); text(d, (322, 176), "defekt", 11, True, MUTED, "rm")
            text(d, (322, 280), "wirklich", 11, True, MUTED, "rm"); text(d, (322, 296), "in Ordnung", 11, True, MUTED, "rm")
            for k, (x, y, ab, name, col) in cells.items():
                d.rounded_rectangle(p(x, y, x + 145, y + 112), radius=10 * S, fill=col, outline=GRID, width=S)
                text(d, (x + 72, y + 24), ab, 16, True, INK, "mm")
                text(d, (x + 72, y + 44), name, 10, False, MUTED, "mm")
                text(d, (x + 72, y + 80), str(counts[k]), 26, True, INK, "mm")
            # Warteschlange
            for j in range(i + 1, min(len(cases), i + 13)):
                real = cases[j][0]
                xx = 40 + ((j - i - 1) % 6) * 40
                yy = 100 + ((j - i - 1) // 6) * 40
                d.rounded_rectangle(p(xx, yy, xx + 30, yy + 30), radius=5 * S, fill=CORAL if real == "P" else TEAL)
            text(d, (40, 80), "Bauteile (rot = wirklich defekt)", 11, False, MUTED, "lm")
            if i < len(cases):
                real, pred = cases[i]
                x, y = cells[(real, pred)][0] + 58, cells[(real, pred)][1] + 66
                sx, sy = 40, 100
                cx, cy = sx + (x - sx) * t, sy + (y - sy) * t
                d.rounded_rectangle(p(cx, cy, cx + 30, cy + 30), radius=5 * S, fill=CORAL if real == "P" else TEAL, outline=INK, width=2 * S)
                text(d, (40, 210), "Modell sagt: " + ("defekt" if pred == "P" else "in Ordnung"), 13, True, INK, "lm")
            if i == len(cases):
                text(d, (40, 210), "Fertig: 30 Bauteile", 13, True, INK, "lm")
                text(d, (40, 240), "Accuracy = (8 + 17) / 30 ≈ 83 %", 12, False, INK, "lm")
                text(d, (40, 262), "Precision = 8 / (8 + 3) ≈ 73 %", 12, False, INK, "lm")
                text(d, (40, 284), "Recall = 8 / (8 + 2) = 80 %", 12, False, INK, "lm")
            frames.append(finish(img)); durs.append(70)
            if f == 3 and i < len(cases):
                counts[cases[i]] += 1
    durs[-1] = 3600
    save(frames, OUT / "konfusionsmatrix.gif", durs)


# 2 Schwelle, Precision, Recall ------------------------------------------------------
def dist_plot(d, pos, neg, thr, x0, y0, x1, y1):
    bins = 20
    hp = [0] * bins; hn = [0] * bins
    for v in pos:
        hp[min(bins - 1, int(v * bins))] += 1
    for v in neg:
        hn[min(bins - 1, int(v * bins))] += 1
    mx = max(max(hp), max(hn))
    bw = (x1 - x0) / bins
    for i in range(bins):
        xl = x0 + i * bw
        right = (i + 0.5) / bins >= thr
        hn_ = hn[i] / mx * (y1 - y0) * 0.9
        hp_ = hp[i] / mx * (y1 - y0) * 0.9
        d.rectangle(p(xl + 1, y1 - hn_, xl + bw - 1, y1), fill=AMBER_L if right else TEAL_L)
        d.rectangle(p(xl + bw * 0.25, y1 - hp_, xl + bw * 0.75, y1), fill=CORAL if right else mix(WHITE, CORAL, 0.35))
    X = x0 + thr * (x1 - x0)
    d.line(p(X, y0 - 6, X, y1), fill=INK, width=3 * S)
    d.line(p(x0, y1, x1, y1), fill=GREY, width=S)
    text(d, (x0, y1 + 14), "0", 10, False, MUTED, "mm"); text(d, (x1, y1 + 14), "1", 10, False, MUTED, "mm")
    text(d, ((x0 + x1) / 2, y1 + 14), "Modell-Wahrscheinlichkeit „Betrug“", 10, False, MUTED, "mm")


def pr_at(pos, neg, thr):
    tp = sum(1 for v in pos if v >= thr); fn = len(pos) - tp
    fp = sum(1 for v in neg if v >= thr); tn = len(neg) - fp
    prec = tp / (tp + fp) if tp + fp else 1.0
    rec = tp / (tp + fn)
    return tp, fp, fn, tn, prec, rec


def gif_schwelle():
    pos, neg = scores()
    frames, durs = [], []
    thrs = [0.8 - 0.6 * ease(k / 39) for k in range(40)] + [0.2] * 6 + [0.2 + 0.3 * ease(k / 19) for k in range(20)] + [0.5] * 10
    for thr in thrs:
        img, d = canvas()
        text(d, (24, 26), "Die Schwelle verschieben: Precision gegen Recall", 15, True, INK)
        dist_plot(d, pos, neg, thr, 40, 70, 380, 300)
        tp, fp, fn, tn, prec, rec = pr_at(pos, neg, thr)
        tx = 410
        text(d, (tx, 74), f"Schwelle {de(thr, 2)}", 16, True, INK)
        text(d, (tx, 110), "Recall (Betrug erkannt)", 12, False, MUTED)
        d.rounded_rectangle(p(tx, 126, tx + 160, 142), radius=6 * S, fill=GRID)
        d.rounded_rectangle(p(tx, 126, tx + 160 * rec, 142), radius=6 * S, fill=CORAL)
        text(d, (tx + 168, 134), f"{round(rec * 100)} %", 12, True, INK, "lm")
        text(d, (tx, 166), "Precision (Alarm stimmt)", 12, False, MUTED)
        d.rounded_rectangle(p(tx, 182, tx + 160, 198), radius=6 * S, fill=GRID)
        d.rounded_rectangle(p(tx, 182, tx + 160 * prec, 198), radius=6 * S, fill=TEAL)
        text(d, (tx + 168, 190), f"{round(prec * 100)} %", 12, True, INK, "lm")
        text(d, (tx, 230), f"Erkannt: {tp} von {tp + fn} Betrugsfällen", 12, False, INK)
        text(d, (tx, 250), f"Fehlalarme: {fp}", 12, False, INK)
        text(d, (tx, 290), "Rote Balken = echte Betrugsfälle", 11, False, MUTED)
        text(d, (tx, 308), "Breite Balken = normale Zahlungen", 11, False, MUTED)
        text(d, (tx, 326), "Rechts der Linie = Alarm", 11, True, INK)
        frames.append(finish(img)); durs.append(90)
    durs[-1] = 2600
    save(frames, OUT / "schwelle-precision-recall.gif", durs)


# 3 ROC -----------------------------------------------------------------------------
def gif_roc():
    pos, neg = scores()
    pts = []
    thrs = [1.0 - k / 59 for k in range(60)]
    for thr in thrs:
        tp = sum(1 for v in pos if v >= thr); fp = sum(1 for v in neg if v >= thr)
        pts.append((fp / len(neg), tp / len(pos)))
    auc = 0
    for (x1, y1), (x2, y2) in zip(pts[:-1], pts[1:]):
        auc += (x2 - x1) * (y1 + y2) / 2
    frames, durs = [], []
    gx0, gy0, gx1, gy1 = 340, 60, 600, 320
    GX = lambda v: gx0 + v * (gx1 - gx0)
    GY = lambda v: gy1 - v * (gy1 - gy0)
    for k in range(1, len(pts) + 12):
        kk = min(k, len(pts))
        thr = thrs[kk - 1]
        img, d = canvas()
        text(d, (24, 26), "ROC-Kurve: alle Schwellen auf einmal", 15, True, INK)
        dist_plot(d, pos, neg, max(0.0, min(1.0, thr)), 30, 80, 300, 300)
        d.rectangle(p(gx0, gy0, gx1, gy1), outline=GRID, width=S)
        d.line(p(GX(0), GY(0), GX(1), GY(1)), fill=GREY, width=S)
        text(d, ((GX(0) + GX(1)) / 2 + 30, GY(0.42)), "Zufall (AUC 0,5)", 10, False, MUTED, "mm")
        if k > len(pts):
            poly = [p(GX(x), GY(y)) for x, y in pts] + [p(GX(1), GY(0)), p(GX(0), GY(0))]
            d.polygon(poly, fill=TEAL_L)
        d.line([p(GX(x), GY(y)) for x, y in pts[:kk]], fill=TEAL, width=3 * S)
        x, y = pts[kk - 1]
        d.ellipse(p(GX(x) - 6, GY(y) - 6, GX(x) + 6, GY(y) + 6), fill=AMBER)
        text(d, ((gx0 + gx1) / 2, gy1 + 16), "Falsch-Positiv-Rate (Fehlalarme unter Normalen)", 10, False, MUTED, "mm")
        text(d, (gx0, gy0 - 12), "Richtig-Positiv-Rate (Recall)", 10, False, MUTED, "lm")
        if k > len(pts):
            text(d, (GX(0.55), GY(0.25)), f"AUC = {de(auc, 2)}", 18, True, TEAL, "mm")
            text(d, (24, 340), "Fläche unter der Kurve: 1 = perfekt, 0,5 = Raten. Unabhängig von einer einzelnen Schwelle.", 12, False, INK)
        frames.append(finish(img)); durs.append(70)
    durs[-1] = 3400
    save(frames, OUT / "roc-auc.gif", durs)


# 4 Overfitting ---------------------------------------------------------------------
def polyfit(xs, ys, deg, lam=1e-6):
    n = deg + 1
    A = [[sum(x ** (i + j) for x in xs) + (lam if i == j else 0) for j in range(n)] for i in range(n)]
    b = [sum(y * x ** i for x, y in zip(xs, ys)) for i in range(n)]
    for c in range(n):
        piv = max(range(c, n), key=lambda r: abs(A[r][c]))
        A[c], A[piv] = A[piv], A[c]; b[c], b[piv] = b[piv], b[c]
        for r in range(n):
            if r != c and A[c][c] != 0:
                f = A[r][c] / A[c][c]
                A[r] = [a - f * ac for a, ac in zip(A[r], A[c])]
                b[r] -= f * b[c]
    return [b[i] / A[i][i] for i in range(n)]


def gif_overfitting():
    rnd = random.Random(10)
    f = lambda x: 0.5 + 0.35 * math.sin(2.6 * x)
    xs = [i / 11 for i in range(12)]
    ys = [f(x) + rnd.gauss(0, 0.07) for x in xs]
    xv = [rnd.uniform(0, 1) for _ in range(12)]
    yv = [f(x) + rnd.gauss(0, 0.07) for x in xv]
    cases = [(1, "Underfitting: Modell zu einfach", CORAL), (3, "Gute Anpassung", TEAL), (11, "Overfitting: lernt das Rauschen auswendig", CORAL)]
    frames, durs = [], []
    x0, y0, x1, y1 = 30, 60, 340, 320
    X = lambda v: x0 + v * (x1 - x0)
    Y = lambda v: y1 - v * (y1 - y0)
    for deg, title, col in cases:
        cx = [2 * x - 1 for x in xs]
        w = polyfit(cx, ys, deg, 1e-9 if deg < 11 else 1e-12)
        pf = lambda x: sum(wi * (2 * x - 1) ** i for i, wi in enumerate(w))
        tr = sum((pf(x) - y) ** 2 for x, y in zip(xs, ys)) / len(xs)
        va = sum((max(-1, min(2, pf(x))) - y) ** 2 for x, y in zip(xv, yv)) / len(xv)
        for k in range(18):
            t = ease(k / 17)
            img, d = canvas()
            text(d, (24, 26), f"Polynom vom Grad {deg}: {title}", 15, True, col)
            d.rectangle(p(x0, y0, x1, y1), outline=GRID, width=S)
            line = []
            for i in range(201):
                xx = i / 200
                yy = 0.5 + (pf(xx) - 0.5) * t
                yy = max(-0.05, min(1.05, yy))
                line.append(p(X(xx), Y(yy)))
            d.line(line, fill=col, width=3 * S)
            for x, y in zip(xs, ys):
                d.ellipse(p(X(x) - 5, Y(y) - 5, X(x) + 5, Y(y) + 5), fill=INK)
            for x, y in zip(xv, yv):
                d.rectangle(p(X(x) - 4, Y(y) - 4, X(x) + 4, Y(y) + 4), outline=VIOLET, width=2 * S)
            d.rectangle(p(0, 0, W, y0 - 1), fill=BG); d.rectangle(p(0, y1 + 1, W, H), fill=BG)
            text(d, (24, 26), f"Polynom vom Grad {deg}: {title}", 15, True, col)
            tx = 370
            d.ellipse(p(tx, 74, tx + 10, 84), fill=INK); text(d, (tx + 16, 79), "Trainingsdaten", 11, False, MUTED, "lm")
            d.rectangle(p(tx, 92, tx + 10, 102), outline=VIOLET, width=2 * S); text(d, (tx + 16, 97), "Validierungsdaten", 11, False, MUTED, "lm")
            mx = 0.12
            for j, (lab, v, c) in enumerate([("Fehler Training", tr, INK), ("Fehler Validierung", va, VIOLET)]):
                yy = 140 + j * 60
                text(d, (tx, yy), lab, 12, True, c)
                d.rounded_rectangle(p(tx, yy + 22, tx + 220, yy + 38), radius=6 * S, fill=GRID)
                d.rounded_rectangle(p(tx, yy + 22, tx + 220 * min(1, max(0.02, v / mx) * t), yy + 38), radius=6 * S, fill=c)
            msg = {1: ["Beide Fehler hoch:", "Modell erkennt das Muster nicht."],
                   3: ["Beide Fehler niedrig", "und ähnlich groß: generalisiert."],
                   11: ["Training fast fehlerfrei,", "Validierung schlecht."]}[deg]
            text(d, (tx, 280), msg[0], 12, True, INK)
            text(d, (tx, 300), msg[1], 12, False, INK)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 2200
    durs[-1] = 3200
    save(frames, OUT / "overfitting.gif", durs)


# 5 Bias-Varianz (Zielscheiben) ------------------------------------------------------
def gif_bias_varianz():
    rnd = random.Random(14)
    combos = [("geringer Bias", "geringe Varianz", (0, 0), 6, "ideal"), ("geringer Bias", "hohe Varianz", (0, 0), 28, "Overfitting"),
              ("hoher Bias", "geringe Varianz", (26, -22), 6, "Underfitting"), ("hoher Bias", "hohe Varianz", (26, -22), 28, "schlecht")]
    shots = [[(rnd.gauss(0, 1), rnd.gauss(0, 1)) for _ in range(10)] for _ in combos]
    frames, durs = [], []
    for n in range(0, 11):
        img, d = canvas()
        text(d, (24, 22), "Bias und Varianz: Wo treffen die Vorhersagen?", 15, True, INK)
        for i, (b, v, off, sd, lab) in enumerate(combos):
            cx = 120 + (i % 2) * 300 + (60 if i % 2 else 0)
            cy = 120 + (i // 2) * 135
            for r, c in [(55, GRID), (38, WHITE), (21, GRID), (8, AMBER_L)]:
                d.ellipse(p(cx - r, cy - r, cx + r, cy + r), fill=c, outline=GREY, width=S)
            for (a, bb) in shots[i][:n]:
                x, y = cx + off[0] + a * sd * 0.6, cy + off[1] + bb * sd * 0.6
                d.ellipse(p(x - 4, y - 4, x + 4, y + 4), fill=TEAL if lab == "ideal" else CORAL)
            text(d, (cx + 70, cy - 20), b, 12, True, INK, "lm")
            text(d, (cx + 70, cy), v, 12, True, INK, "lm")
            text(d, (cx + 70, cy + 22), "→ " + lab, 12, True, TEAL if lab == "ideal" else CORAL, "lm")
        frames.append(finish(img)); durs.append(220)
    durs[-1] = 3600
    save(frames, OUT / "bias-varianz.gif", durs)


# 6 Kreuzvalidierung -----------------------------------------------------------------
def gif_kreuzvalidierung():
    scores_ = [0.82, 0.85, 0.80, 0.84, 0.79]
    frames, durs = [], []
    for fold in range(6):
        for f in range(14):
            t = ease(f / 13)
            img, d = canvas()
            text(d, (24, 26), "5-fache Kreuzvalidierung: jeder Teil ist einmal Prüfteil", 15, True, INK)
            for r in range(5):
                y = 70 + r * 44
                show = r < fold or (r == fold and fold < 5)
                a = 1 if r < fold else (t if r == fold else 0)
                text(d, (30, y + 15), f"Durchlauf {r + 1}", 12, True, mix(BG, INK, max(a, 0.25)), "lm")
                for c in range(5):
                    x = 130 + c * 66
                    col = AMBER if c == r else TEAL
                    d.rounded_rectangle(p(x, y, x + 60, y + 30), radius=6 * S, fill=mix(BG, mix(WHITE, col, 0.7 if c == r else 0.35), max(a, 0.15)))
                    if a > 0.5:
                        text(d, (x + 30, y + 15), "Prüfen" if c == r else "Lernen", 10, True, INK if c == r else MUTED, "mm")
                if a > 0.7:
                    text(d, (480, y + 15), f"F1 = {de(scores_[r], 2)}", 13, True, INK, "lm")
            if fold == 5:
                m = sum(scores_) / 5
                sd = math.sqrt(sum((s - m) ** 2 for s in scores_) / 4)
                d.rounded_rectangle(p(130, 300, 610, 344), radius=10 * S, fill=TEAL_L, outline=TEAL, width=2 * S)
                text(d, (370, 322), f"Ergebnis: Mittelwert {de(m, 2)} ± {de(sd, 2)} (Standardabweichung)", 13, True, INK, "mm")
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 900
    durs[-1] = 3400
    save(frames, OUT / "kreuzvalidierung.gif", durs)


if __name__ == "__main__":
    gif_konfusion()
    gif_schwelle()
    gif_roc()
    gif_overfitting()
    gif_bias_varianz()
    gif_kreuzvalidierung()
