"""GIFs für Modul 4 (Überwachtes Lernen)."""
import math
import random
from gifkit import *  # noqa: F401,F403

OUT = out_dir(4)


def axes(d, x0, y0, x1, y1, xl="", yl=""):
    for k in range(6):
        gx = x0 + (x1 - x0) * k / 5
        gy = y0 + (y1 - y0) * k / 5
        d.line(p(gx, y0, gx, y1), fill=GRID, width=S)
        d.line(p(x0, gy, x1, gy), fill=GRID, width=S)
    if xl:
        text(d, ((x0 + x1) / 2, y1 + 16), xl, 11, False, MUTED, "mm")
    if yl:
        text(d, (x0, y0 - 12), yl, 11, False, MUTED, "lm")


def dot(d, X, Y, c, shape="o", r=6):
    if shape == "s":
        d.rectangle(p(X - r, Y - r, X + r, Y + r), fill=c)
    else:
        d.ellipse(p(X - r, Y - r, X + r, Y + r), fill=c)


# 1 Logistische Regression -----------------------------------------------------
def gif_logistisch():
    rnd = random.Random(3)
    data = []
    for _ in range(26):
        h = rnd.uniform(0, 10)
        pr = 1 / (1 + math.exp(-(h - 5) * 1.2))
        data.append((h, 1 if rnd.random() < pr else 0))
    x0, y0, x1, y1 = 60, 60, 400, 300
    X = lambda h: x0 + h / 10 * (x1 - x0)
    Y = lambda v: y1 - v * (y1 - y0)
    frames, durs = [], []
    seq = []
    for k in range(20):
        seq.append(("fit", 0.15 + 1.05 * ease(k / 19), 0.5))
    seq += [("fit", 1.2, 0.5)] * 8
    for k in range(16):
        seq.append(("thr", 1.2, 0.5 - 0.2 * ease(k / 15)))
    seq += [("thr", 1.2, 0.3)] * 14
    for kind, a, thr in seq:
        img, d = canvas()
        text(d, (24, 26), "Logistische Regression: Wahrscheinlichkeit statt gerader Linie", 15, True, INK)
        axes(d, x0, y0, x1, y1, "Mahnungen im letzten Jahr (0–10)", "Wahrscheinlichkeit Ausfall")
        for v, lab in [(0, "0"), (0.5, "0,5"), (1, "1")]:
            text(d, (x0 - 8, Y(v)), lab, 11, False, MUTED, "rm")
        pts = [p(X(h / 10), Y(1 / (1 + math.exp(-(h / 10 - 5) * a)))) for h in range(0, 101)]
        d.line(pts, fill=TEAL, width=3 * S)
        # Schwelle
        d.line(p(x0, Y(thr), x1, Y(thr)), fill=AMBER, width=2 * S)
        text(d, (x0 + 8, Y(thr) - 10), "Schwelle " + de(thr, 2), 11, True, AMBER, "lm")
        hx = 5 + math.log(thr / (1 - thr)) / a
        d.line(p(X(hx), y0, X(hx), y1), fill=AMBER_L, width=S)
        for h, c in data:
            col = CORAL if c else TEAL
            dot(d, X(h), Y(c), col, "s" if c else "o", 5)
        tx = 430
        text(d, (tx, 70), "Kurve = σ(z)", 14, True, TEAL)
        text(d, (tx, 92), "liegt immer zwischen 0 und 1", 12, False, MUTED)
        text(d, (tx, 130), "Rechts der senkrechten", 12, False, INK)
        text(d, (tx, 148), "Linie: Vorhersage »Ausfall«", 12, False, INK)
        if kind == "thr" and thr < 0.49:
            text(d, (tx, 196), "Schwelle gesenkt:", 13, True, AMBER)
            text(d, (tx, 216), "mehr Ausfälle erkannt", 12, False, INK)
            text(d, (tx, 234), "(Recall ↑), aber mehr", 12, False, INK)
            text(d, (tx, 252), "Fehlalarme (Precision ↓)", 12, False, INK)
        d.rectangle(p(tx, 290, tx + 10, 300), fill=CORAL); text(d, (tx + 16, 295), "ausgefallen (1)", 11, False, MUTED, "lm")
        d.ellipse(p(tx, 310, tx + 10, 320), fill=TEAL); text(d, (tx + 16, 315), "zurückgezahlt (0)", 11, False, MUTED, "lm")
        frames.append(finish(img)); durs.append(90)
    durs[-1] = 2600
    save(frames, OUT / "logistische-regression.gif", durs)


# 2 Entscheidungsbaum -----------------------------------------------------------
def gif_baum():
    rnd = random.Random(12)
    pts = []
    for _ in range(40):
        a, b = rnd.uniform(0, 10), rnd.uniform(0, 10)
        c = 1 if (a > 5 and b > 4) or (a <= 5 and b > 8) else 0
        pts.append((a, b, c))
    x0, y0, x1, y1 = 30, 60, 300, 330
    X = lambda v: x0 + v / 10 * (x1 - x0)
    Y = lambda v: y1 - v / 10 * (y1 - y0)
    splits = [("v", 5, None), ("h", 4, "r"), ("h", 8, "l")]
    frames, durs = [], []
    for stage in range(4):
        for k in range(12):
            t = ease(k / 11)
            img, d = canvas()
            text(d, (24, 26), "Entscheidungsbaum: Der Raum wird Frage für Frage zerlegt", 15, True, INK)
            d.rectangle(p(x0, y0, x1, y1), outline=GRID, width=S)
            # Regionen einfärben
            if stage >= 3:
                regions = [((5, 10, 4, 10), 1), ((5, 10, 0, 4), 0), ((0, 5, 8, 10), 1), ((0, 5, 0, 8), 0)]
                for (ax, bx, ay, by), c in regions:
                    d.rectangle(p(X(ax), Y(by), X(bx), Y(ay)), fill=mix(WHITE, CORAL_L if c else TEAL_L, t))
            for i, (kind, v, side) in enumerate(splits):
                if stage < i + 1:
                    continue
                a = t if stage == i + 1 else 1
                if kind == "v":
                    d.line(p(X(v), Y(0), X(v), Y(0) + (Y(10) - Y(0)) * a), fill=INK, width=3 * S)
                elif side == "r":
                    d.line(p(X(5), Y(v), X(5) + (X(10) - X(5)) * a, Y(v)), fill=INK, width=3 * S)
                else:
                    d.line(p(X(0), Y(v), X(0) + (X(5) - X(0)) * a, Y(v)), fill=INK, width=3 * S)
            for a_, b_, c in pts:
                dot(d, X(a_), Y(b_), CORAL if c else TEAL, "s" if c else "o", 5)
            text(d, ((x0 + x1) / 2, y1 + 16), "Einkommen →", 11, False, MUTED, "mm")
            text(d, (x0, y0 - 12), "↑ Berufsjahre", 11, False, MUTED, "lm")
            # Baum rechts
            def node(x, y, s, on=True, leaf=None):
                fill = WHITE if leaf is None else (CORAL_L if leaf else TEAL_L)
                d.rounded_rectangle(p(x - 70, y - 16, x + 70, y + 16), radius=8 * S, fill=fill if on else BG, outline=INK if on else GRID, width=2 * S)
                text(d, (x, y), s, 11, True, INK if on else GREY, "mm")
            if stage >= 1:
                node(480, 80, "Einkommen > 5?")
            if stage >= 2:
                d.line(p(480, 96, 545, 154), fill=INK, width=S); text(d, (525, 118), "ja", 11, False, MUTED, "mm")
                node(545, 170, "Berufsjahre > 4?")
            if stage >= 3:
                d.line(p(480, 96, 410, 154), fill=INK, width=S); text(d, (432, 118), "nein", 11, False, MUTED, "mm")
                node(410, 170, "Berufsjahre > 8?")
                for (px_, lab, leaf) in [(370, "Ablehnen", 0), (450, "Zusagen", 1)]:
                    d.line(p(410, 186, px_, 244), fill=INK, width=S)
                for (px_, lab, leaf) in [(515, "Ablehnen", 0), (595, "Zusagen", 1)]:
                    d.line(p(545, 186, px_, 244), fill=INK, width=S)
                for (px_, lab, leaf) in [(370, "Ablehnen", 0), (450, "Zusagen", 1), (515, "Ablehnen", 0), (595, "Zusagen", 1)]:
                    d.rounded_rectangle(p(px_ - 36, 244, px_ + 36, 272), radius=7 * S, fill=CORAL_L if leaf else TEAL_L, outline=INK, width=S)
                    text(d, (px_, 258), lab, 10, True, INK, "mm")
                text(d, (330, 310), "Jedes Blatt = eine Region links.", 12, False, MUTED)
                text(d, (330, 330), "Leicht erklärbar: einfach den Pfad vorlesen.", 12, False, MUTED)
            frames.append(finish(img)); durs.append(90)
        durs[-1] = 1500
    durs[-1] = 3200
    save(frames, OUT / "entscheidungsbaum.gif", durs)


# 3 Random Forest ---------------------------------------------------------------
def gif_forest():
    votes = ["Zusagen", "Ablehnen", "Zusagen", "Zusagen", "Ablehnen", "Zusagen", "Zusagen"]
    frames, durs = [], []
    n = len(votes)

    def tree(d, cx, cy, col, a):
        c = mix(BG, col, a)
        d.line(p(cx, cy, cx, cy + 50), fill=mix(BG, INK, a), width=2 * S)
        d.ellipse(p(cx - 9, cy - 9, cx + 9, cy + 9), fill=c)
        for dx in (-22, 22):
            d.line(p(cx, cy, cx + dx, cy + 26), fill=mix(BG, GREY, a), width=S)
            d.ellipse(p(cx + dx - 7, cy + 19, cx + dx + 7, cy + 33), fill=c)
            for ddx in (-10, 10):
                d.line(p(cx + dx, cy + 26, cx + dx + ddx, cy + 48), fill=mix(BG, GREY, a), width=S)
                d.ellipse(p(cx + dx + ddx - 5, cy + 43, cx + dx + ddx + 5, cy + 53), fill=c)

    for phase in range(4):
        for k in range(14):
            t = ease(k / 13)
            img, d = canvas()
            titles = ["Viele Bäume, jeder auf einer anderen Zufallsstichprobe", "Jeder Baum sieht nur zufällige Merkmale", "Jeder Baum stimmt ab", "Mehrheit entscheidet: 5 zu 2 → Zusagen"]
            text(d, (24, 26), "Random Forest · " + titles[phase], 14, True, INK)
            for i in range(n):
                cx = 60 + i * 84
                a = 1 if phase > 0 else ease(min(1, max(0, t * 2 - i * 0.15)))
                tree(d, cx, 90, TEAL, a)
                if phase >= 1:
                    feats = ["Einkommen, Alter", "Schulden, Beruf", "Alter, Wohnort", "Einkommen, Schulden", "Beruf, Alter", "Schulden, Wohnort", "Einkommen, Beruf"][i]
                    for j, f in enumerate(feats.split(", ")):
                        text(d, (cx, 170 + j * 16), f, 10, False, MUTED, "mm")
                if phase >= 2:
                    a2 = 1 if phase == 3 else ease(min(1, max(0, t * 2 - i * 0.15)))
                    if a2 > 0.05:
                        v = votes[i]
                        col = TEAL if v == "Zusagen" else CORAL
                        d.rounded_rectangle(p(cx - 36, 214, cx + 36, 240), radius=7 * S, fill=mix(BG, TEAL_L if v == "Zusagen" else CORAL_L, a2), outline=mix(BG, col, a2), width=S)
                        text(d, (cx, 227), v, 10, True, mix(BG, INK, a2), "mm")
            if phase == 3:
                d.rounded_rectangle(p(200, 270, 440, 320), radius=10 * S, fill=TEAL_L, outline=TEAL, width=3 * S)
                text(d, (320, 295), "Ergebnis: Zusagen (5 von 7)", 15, True, INK, "mm")
                text(d, (W / 2, 345), "Einzelne Bäume irren sich – die Mehrheit ist stabiler (Bagging senkt die Varianz).", 12, False, MUTED, "mm")
            frames.append(finish(img)); durs.append(90)
        durs[-1] = 1500
    durs[-1] = 3200
    save(frames, OUT / "random-forest.gif", durs)


# 4 kNN -------------------------------------------------------------------------
def gif_knn():
    rnd = random.Random(21)
    pts = []
    for _ in range(14):
        pts.append((rnd.gauss(3.2, 1.1), rnd.gauss(6.5, 1.1), 0))
    for _ in range(14):
        pts.append((rnd.gauss(6.6, 1.1), rnd.gauss(3.5, 1.1), 1))
    q = (5.0, 5.2)
    x0, y0, x1, y1 = 40, 50, 330, 340
    X = lambda v: x0 + v / 10 * (x1 - x0)
    Y = lambda v: y1 - v / 10 * (y1 - y0)
    ds = sorted(((math.hypot(a - q[0], b - q[1]), a, b, c) for a, b, c in pts))
    frames, durs = [], []
    for kk in (1, 3, 5, 7):
        r_target = ds[kk - 1][0]
        for k in range(16):
            t = ease(k / 15)
            img, d = canvas()
            text(d, (24, 24), "k-Nächste-Nachbarn: Wer steht am nächsten?", 15, True, INK)
            d.rectangle(p(x0, y0, x1, y1), outline=GRID, width=S)
            r = r_target * t
            R = r / 10 * (x1 - x0)
            d.ellipse(p(X(q[0]) - R, Y(q[1]) - R, X(q[0]) + R, Y(q[1]) + R), outline=AMBER, width=2 * S)
            for dd, a, b, c in ds:
                inside = dd <= r + 1e-9
                dot(d, X(a), Y(b), CORAL if c else TEAL, "s" if c else "o", 5)
                if inside:
                    d.ellipse(p(X(a) - 9, Y(b) - 9, X(a) + 9, Y(b) + 9), outline=AMBER, width=2 * S)
            d.polygon([p(X(q[0]), Y(q[1]) - 10), p(X(q[0]) - 9, Y(q[1]) + 7), p(X(q[0]) + 9, Y(q[1]) + 7)], fill=INK)
            near = ds[:kk]
            n1 = sum(1 for x in near if x[3] == 1)
            n0 = kk - n1
            tx = 360
            text(d, (tx, 70), f"k = {kk}", 22, True, AMBER)
            text(d, (tx, 110), "Neuer Kunde (Dreieck):", 13, False, MUTED)
            text(d, (tx, 130), "Welche Klasse?", 13, False, MUTED)
            if k >= 12:
                text(d, (tx, 170), f"Nachbarn: {n0} × Kreis, {n1} × Quadrat", 13, True, INK)
                win = "Quadrat (kauft)" if n1 > n0 else "Kreis (kauft nicht)"
                text(d, (tx, 196), "Mehrheit: " + win, 13, True, CORAL if n1 > n0 else TEAL)
            text(d, (tx, 280), "Kein Training – das Modell", 12, False, MUTED)
            text(d, (tx, 298), "merkt sich nur alle Punkte.", 12, False, MUTED)
            text(d, (tx, 316), "Skalierung ist Pflicht!", 12, True, INK)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1700
    durs[-1] = 3000
    save(frames, OUT / "knn.gif", durs)


# 5 SVM -------------------------------------------------------------------------
def gif_svm():
    A = [(2, 6), (3, 7.5), (1.5, 8), (3.6, 5.6), (2.5, 4.8), (1, 6.5)]
    B = [(6, 2.5), (7.5, 3.5), (6.8, 1.5), (5.2, 3.2), (8, 5), (7, 4.6)]
    x0, y0, x1, y1 = 40, 50, 330, 340
    X = lambda v: x0 + v / 10 * (x1 - x0)
    Y = lambda v: y1 - v / 10 * (y1 - y0)

    def margin(ang, c):
        nx, ny = math.cos(ang), math.sin(ang)
        m = min([(nx * a + ny * b - c) for a, b in A] + [-(nx * a + ny * b - c) for a, b in B])
        return m

    # bestes Winkel/Offset per Gittersuche
    best = None
    for i in range(0, 180):
        ang = math.radians(90 + i)
        for j in range(-100, 100):
            c = j / 10
            m = margin(ang, c)
            if best is None or m > best[0]:
                best = (m, ang, c)
    mbest, angb, cb = best
    seq = [(math.radians(150), 0.0, 0.0)]
    cands = [(math.radians(170), -0.5), (math.radians(120), -1.0), (angb, cb)]
    frames, durs = [], []
    prev = (math.radians(200), -2.0)
    for ci, (ang, c) in enumerate(cands):
        for k in range(16):
            t = ease(k / 15)
            a_ = prev[0] + (ang - prev[0]) * t
            c_ = prev[1] + (c - prev[1]) * t
            m = margin(a_, c_)
            img, d = canvas()
            text(d, (24, 24), "Support Vector Machine: die breiteste Straße zwischen den Klassen", 14, True, INK)
            d.rectangle(p(x0, y0, x1, y1), outline=GRID, width=S)
            nx, ny = math.cos(a_), math.sin(a_)

            def line_pts(off):
                # Punkte auf nx*x + ny*y = off
                ptsl = []
                for xx in (-2, 12):
                    if abs(ny) > 1e-6:
                        ptsl.append((xx, (off - nx * xx) / ny))
                return ptsl
            if m > 0:
                for off in (c_ - m, c_ + m):
                    lp = line_pts(off)
                    if len(lp) == 2:
                        d.line(p(X(lp[0][0]), Y(lp[0][1]), X(lp[1][0]), Y(lp[1][1])), fill=AMBER, width=S)
            lp = line_pts(c_)
            d.line(p(X(lp[0][0]), Y(lp[0][1]), X(lp[1][0]), Y(lp[1][1])), fill=INK, width=3 * S)
            d.rectangle(p(0, 0, x0 - 1, H), fill=BG); d.rectangle(p(x1 + 1, 0, W, H), fill=BG)
            d.rectangle(p(0, 0, W, y0 - 1), fill=BG); d.rectangle(p(0, y1 + 1, W, H), fill=BG)
            text(d, (24, 24), "Support Vector Machine: die breiteste Straße zwischen den Klassen", 14, True, INK)
            d.rectangle(p(x0, y0, x1, y1), outline=GRID, width=S)
            for a, b in A:
                dot(d, X(a), Y(b), TEAL, "o", 6)
            for a, b in B:
                dot(d, X(a), Y(b), CORAL, "s", 6)
            if ci == len(cands) - 1 and k > 10:
                for a, b in A + B:
                    dist = abs(nx * a + ny * b - c_)
                    if abs(dist - m) < 0.05:
                        d.ellipse(p(X(a) - 11, Y(b) - 11, X(a) + 11, Y(b) + 11), outline=VIOLET, width=3 * S)
            tx = 360
            text(d, (tx, 74), f"Versuch {ci + 1}", 16, True, AMBER)
            text(d, (tx, 108), "Straßenbreite (Margin):", 13, False, MUTED)
            text(d, (tx, 134), de(max(m, 0) * 2, 2), 26, True, TEAL if ci == len(cands) - 1 else INK, "lm")
            text(d, (tx, 190), "Die SVM wählt die Linie", 12, False, INK)
            text(d, (tx, 208), "mit der breitesten Straße.", 12, False, INK)
            if ci == len(cands) - 1 and k > 10:
                d.ellipse(p(tx, 246, tx + 14, 260), outline=VIOLET, width=3 * S)
                text(d, (tx + 22, 253), "Support-Vektoren:", 12, True, VIOLET, "lm")
                text(d, (tx, 274), "nur diese Punkte bestimmen", 12, False, INK)
                text(d, (tx, 292), "die Lage der Linie.", 12, False, INK)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1200
        prev = (ang, c)
    durs[-1] = 3200
    save(frames, OUT / "svm-margin.gif", durs)


# 6 Boosting --------------------------------------------------------------------
def gif_boosting():
    xs = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    ys = [0, 0, 1, 1, 0, 1, 1, 0, 1]
    w = [1.0] * 9
    stumps = []
    rounds = []
    for r in range(3):
        best = None
        for thr in [v + 0.5 for v in range(0, 10)]:
            for pol in (1, -1):
                pred = [1 if (pol * (x - thr) > 0) else 0 for x in xs]
                err = sum(wi for wi, pi, yi in zip(w, pred, ys) if pi != yi) / sum(w)
                if best is None or err < best[0]:
                    best = (err, thr, pol, pred)
        err, thr, pol, pred = best
        rounds.append((list(w), thr, pol, pred))
        alpha = 0.5 * math.log((1 - err) / max(err, 1e-6))
        w = [wi * math.exp(alpha if pi != yi else -alpha) for wi, pi, yi in zip(w, pred, ys)]
        s = sum(w)
        w = [wi / s * 9 for wi in w]
    frames, durs = [], []
    x0, x1 = 50, 590
    X = lambda v: x0 + (v - 0.5) / 9 * (x1 - x0)
    for r, (wr, thr, pol, pred) in enumerate(rounds):
        for phase in range(2):
            for k in range(14):
                t = ease(k / 13)
                img, d = canvas()
                text(d, (24, 26), f"Boosting · Runde {r + 1}: " + ("Fehler der Vorrunde werden schwerer gewichtet" if r else "erster einfacher Baum (Stumpf)"), 14, True, INK)
                yl = 170
                d.line(p(x0, yl + 40, x1, yl + 40), fill=GREY, width=S)
                for i, (x, y) in enumerate(zip(xs, ys)):
                    rad = 6 + 7 * min(wr[i], 3)
                    col = CORAL if y else TEAL
                    if y:
                        d.rectangle(p(X(x) - rad, yl - rad, X(x) + rad, yl + rad), fill=col)
                    else:
                        d.ellipse(p(X(x) - rad, yl - rad, X(x) + rad, yl + rad), fill=col)
                    if phase == 1 and pred[i] != y:
                        d.ellipse(p(X(x) - rad - 6, yl - rad - 6, X(x) + rad + 6, yl + rad + 6), outline=AMBER, width=3 * S)
                if phase == 1:
                    xt = X(thr)
                    d.line(p(xt, 80, xt, 80 + (yl + 60 - 80) * t), fill=INK, width=3 * S)
                    left = "Quadrat" if pol == -1 else "Kreis"
                    right = "Kreis" if pol == -1 else "Quadrat"
                    text(d, (xt - 10, 92), "← " + left, 12, True, INK, "rm")
                    text(d, (xt + 10, 92), right + " →", 12, True, INK, "lm")
                    nerr = sum(1 for pi, yi in zip(pred, ys) if pi != yi)
                    text(d, (24, 270), f"Dieser Stumpf macht {nerr} Fehler (orange umrandet).", 13, True, AMBER)
                    text(d, (24, 294), "In der nächsten Runde zählen genau diese Punkte mehr (größer gezeichnet).", 13, False, INK)
                    text(d, (24, 318), "Am Ende stimmen alle Stümpfe gewichtet ab – zusammen ein starkes Modell.", 13, False, MUTED)
                else:
                    text(d, (24, 270), "Größe eines Punktes = Gewicht im Training.", 13, False, INK)
                frames.append(finish(img)); durs.append(90)
            durs[-1] = 1500
    durs[-1] = 3200
    save(frames, OUT / "boosting.gif", durs)


if __name__ == "__main__":
    gif_logistisch()
    gif_baum()
    gif_forest()
    gif_knn()
    gif_svm()
    gif_boosting()
