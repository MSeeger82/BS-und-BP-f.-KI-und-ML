"""GIFs für Modul 5 (Unüberwachtes Lernen und Reinforcement Learning)."""
import math
import random
from gifkit import *  # noqa: F401,F403

OUT = out_dir(5)
COLS = [TEAL, AMBER, VIOLET, CORAL, (60, 130, 200), (120, 160, 60), (150, 90, 60), (90, 90, 90)]


def kmeans(pts, k, seed=0, iters=20):
    rnd = random.Random(seed)
    cents = rnd.sample(pts, k)
    for _ in range(iters):
        groups = [[] for _ in range(k)]
        for x, y in pts:
            j = min(range(k), key=lambda i: (x - cents[i][0]) ** 2 + (y - cents[i][1]) ** 2)
            groups[j].append((x, y))
        cents = [(sum(a for a, _ in g) / len(g), sum(b for _, b in g) / len(g)) if g else cents[i] for i, g in enumerate(groups)]
    assign = [min(range(k), key=lambda i: (x - cents[i][0]) ** 2 + (y - cents[i][1]) ** 2) for x, y in pts]
    sse = sum((x - cents[a][0]) ** 2 + (y - cents[a][1]) ** 2 for (x, y), a in zip(pts, assign))
    return cents, assign, sse


# 1 Ellbogen-Methode --------------------------------------------------------------
def gif_ellbogen():
    rnd = random.Random(5)
    centers = [(2.5, 7.5), (7.5, 7), (5, 2.5)]
    pts = [(rnd.gauss(cx, 0.9), rnd.gauss(cy, 0.9)) for cx, cy in centers for _ in range(18)]
    results = {k: kmeans(pts, k, seed=k + 3) for k in range(1, 8)}
    maxsse = results[1][2]
    frames, durs = [], []
    x0, y0, x1, y1 = 30, 60, 290, 320
    gx0, gy0, gx1, gy1 = 360, 70, 610, 300
    for k in range(1, 8):
        for f in range(10):
            img, d = canvas()
            text(d, (24, 26), "Ellbogen-Methode: Wie viele Gruppen gibt es?", 15, True, INK)
            cents, assign, sse = results[k]
            d.rectangle(p(x0, y0, x1, y1), outline=GRID, width=S)
            X = lambda v: x0 + v / 10 * (x1 - x0)
            Y = lambda v: y1 - v / 10 * (y1 - y0)
            for (a, b), g in zip(pts, assign):
                d.ellipse(p(X(a) - 4, Y(b) - 4, X(a) + 4, Y(b) + 4), fill=COLS[g])
            for (a, b) in cents:
                d.line(p(X(a) - 7, Y(b) - 7, X(a) + 7, Y(b) + 7), fill=INK, width=3 * S)
                d.line(p(X(a) - 7, Y(b) + 7, X(a) + 7, Y(b) - 7), fill=INK, width=3 * S)
            text(d, ((x0 + x1) / 2, y1 + 18), f"k = {k}", 15, True, AMBER, "mm")
            # Kurve
            d.line(p(gx0, gy1, gx1, gy1), fill=GREY, width=S)
            d.line(p(gx0, gy0, gx0, gy1), fill=GREY, width=S)
            text(d, (gx0, gy0 - 14), "Summe der quadrierten Abstände (SSE)", 11, False, MUTED, "lm")
            text(d, ((gx0 + gx1) / 2, gy1 + 18), "Anzahl Cluster k", 11, False, MUTED, "mm")
            GX = lambda kk: gx0 + (kk - 1) / 6 * (gx1 - gx0)
            GY = lambda s: gy1 - s / maxsse * (gy1 - gy0)
            prev = None
            for kk in range(1, k + 1):
                pt = (GX(kk), GY(results[kk][2]))
                if prev:
                    d.line(p(*prev, *pt), fill=TEAL, width=3 * S)
                prev = pt
            for kk in range(1, k + 1):
                d.ellipse(p(GX(kk) - 5, GY(results[kk][2]) - 5, GX(kk) + 5, GY(results[kk][2]) + 5), fill=TEAL)
                text(d, (GX(kk), gy1 + 6), "", 10)
            for kk in range(1, 8):
                text(d, (GX(kk), gy1 + 8), "", 10)
            if k >= 4:
                d.ellipse(p(GX(3) - 14, GY(results[3][2]) - 14, GX(3) + 14, GY(results[3][2]) + 14), outline=AMBER, width=3 * S)
                text(d, (GX(3) + 20, GY(results[3][2]) - 20), "Knick (Ellbogen) bei k = 3", 12, True, AMBER, "lm")
                text(d, (gx0, 334), "Danach bringt jedes weitere", 12, False, MUTED)
                text(d, (gx0, 352), "Cluster kaum noch Verbesserung.", 12, False, MUTED)
            frames.append(finish(img)); durs.append(110)
        durs[-1] = 1100
    durs[-1] = 3200
    save(frames, OUT / "ellbogen-methode.gif", durs)


# 2 DBSCAN ------------------------------------------------------------------------
def gif_dbscan():
    rnd = random.Random(2)
    pts = []
    for i in range(36):
        a = math.pi * i / 35
        pts.append((3 + 2.2 * math.cos(a) + rnd.gauss(0, 0.18), 5 + 2.2 * math.sin(a) + rnd.gauss(0, 0.18)))
    for i in range(36):
        a = math.pi + math.pi * i / 35
        pts.append((5.2 + 2.2 * math.cos(a) + rnd.gauss(0, 0.18), 5.8 + 2.2 * math.sin(a) + rnd.gauss(0, 0.18)))
    noise = [(0.8, 1.2), (9.2, 9.0), (8.8, 1.5), (1.0, 9.0)]
    pts += noise
    eps, minpts = 0.75, 3
    n = len(pts)
    nb = [[j for j in range(n) if math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]) <= eps] for i in range(n)]
    core = [len(nb[i]) >= minpts + 1 for i in range(n)]
    label = [-1] * n
    order = []
    c = 0
    for i in range(n):
        if label[i] != -1 or not core[i]:
            continue
        label[i] = c
        queue = [i]
        while queue:
            q = queue.pop(0)
            order.append(q)
            if core[q]:
                for j in nb[q]:
                    if label[j] == -1:
                        label[j] = c
                        queue.append(j)
        c += 1
    x0, y0, x1, y1 = 30, 50, 360, 340
    X = lambda v: x0 + v / 10 * (x1 - x0)
    Y = lambda v: y1 - v / 10 * (y1 - y0)
    frames, durs = [], []
    steps = list(range(0, len(order) + 1, 3)) + [len(order)]
    for si, s in enumerate(steps + [len(order)] * 6):
        img, d = canvas()
        text(d, (24, 24), "DBSCAN: Cluster wachsen entlang dichter Bereiche", 15, True, INK)
        d.rectangle(p(x0, y0, x1, y1), outline=GRID, width=S)
        done = set(order[:s])
        R = eps / 10 * (x1 - x0)
        if s < len(order) and s > 0:
            q = order[s - 1]
            d.ellipse(p(X(pts[q][0]) - R, Y(pts[q][1]) - R, X(pts[q][0]) + R, Y(pts[q][1]) + R), outline=AMBER, width=2 * S)
        final = si >= len(steps)
        for i, (a, b) in enumerate(pts):
            if i in done:
                col = COLS[label[i] % len(COLS)]
            elif final and label[i] == -1:
                col = CORAL
            else:
                col = GREY
            if final and label[i] == -1:
                d.line(p(X(a) - 6, Y(b) - 6, X(a) + 6, Y(b) + 6), fill=CORAL, width=3 * S)
                d.line(p(X(a) - 6, Y(b) + 6, X(a) + 6, Y(b) - 6), fill=CORAL, width=3 * S)
            else:
                d.ellipse(p(X(a) - 4, Y(b) - 4, X(a) + 4, Y(b) + 4), fill=col)
        tx = 385
        text(d, (tx, 70), "Parameter:", 13, True, INK)
        text(d, (tx, 92), "ε = Radius des Suchkreises", 12, False, MUTED)
        text(d, (tx, 110), "minPts = Mindestnachbarn", 12, False, MUTED)
        text(d, (tx, 150), "1 Kernpunkt: genug Nachbarn", 12, False, INK)
        text(d, (tx, 170), "   im Kreis", 12, False, INK)
        text(d, (tx, 192), "2 Cluster wächst von Kern-", 12, False, INK)
        text(d, (tx, 212), "   punkt zu Kernpunkt", 12, False, INK)
        text(d, (tx, 234), "3 Was nirgends dazugehört,", 12, False, INK)
        text(d, (tx, 254), "   ist Rauschen", 12, False, INK)
        if final:
            text(d, (tx, 296), "2 bogenförmige Cluster –", 12, True, TEAL)
            text(d, (tx, 314), "k-Means könnte das nicht.", 12, True, TEAL)
            text(d, (tx, 334), "Kreuze = Ausreißer", 12, True, CORAL)
        frames.append(finish(img)); durs.append(90)
    durs[-1] = 3200
    save(frames, OUT / "dbscan.gif", durs)


# 3 Hierarchisches Clustering ---------------------------------------------------
def gif_dendrogramm():
    names = ["A", "B", "C", "D", "E", "F"]
    pos = {"A": (1.5, 7.5), "B": (2.3, 8.2), "C": (7.2, 7.8), "D": (8.0, 7.0), "E": (4.8, 2.0), "F": (5.6, 2.8)}
    clusters = {n: [n] for n in names}

    def cdist(a, b):  # average linkage
        return sum(math.hypot(pos[x][0] - pos[y][0], pos[x][1] - pos[y][1]) for x in a for y in b) / (len(a) * len(b))
    merges = []
    active = [[n] for n in names]
    while len(active) > 1:
        best = None
        for i in range(len(active)):
            for j in range(i + 1, len(active)):
                dd = cdist(active[i], active[j])
                if best is None or dd < best[0]:
                    best = (dd, i, j)
        dd, i, j = best
        merges.append((active[i], active[j], dd))
        new = active[i] + active[j]
        active = [c for k, c in enumerate(active) if k not in (i, j)] + [new]
    order = ["A", "B", "E", "F", "C", "D"]
    maxd = merges[-1][2]
    x0, y0, x1, y1 = 30, 60, 290, 320
    X = lambda v: x0 + v / 10 * (x1 - x0)
    Y = lambda v: y1 - v / 10 * (y1 - y0)
    dx0, dx1, dyb, dyt = 360, 610, 300, 80
    LX = {n: dx0 + i * (dx1 - dx0) / 5 for i, n in enumerate(order)}
    frames, durs = [], []
    for m in range(len(merges) + 1):
        for f in range(12):
            img, d = canvas()
            text(d, (24, 24), "Hierarchisches Clustering: immer die zwei ähnlichsten zusammenfassen", 14, True, INK)
            d.rectangle(p(x0, y0, x1, y1), outline=GRID, width=S)
            # Gruppen-Umrisse
            for k_, (a, b, dd) in enumerate(merges[:m]):
                grp = a + b
                xs = [X(pos[n][0]) for n in grp]; ys = [Y(pos[n][1]) for n in grp]
                pad = 14 + 4 * k_
                d.rounded_rectangle(p(min(xs) - pad, min(ys) - pad, max(xs) + pad, max(ys) + pad), radius=12 * S, outline=mix(BG, COLS[k_ % 4], 0.8), width=2 * S)
            for n in names:
                d.ellipse(p(X(pos[n][0]) - 7, Y(pos[n][1]) - 7, X(pos[n][0]) + 7, Y(pos[n][1]) + 7), fill=INK)
                text(d, (X(pos[n][0]) + 12, Y(pos[n][1])), n, 12, True, INK, "lm")
            # Dendrogramm
            d.line(p(dx0 - 10, dyb, dx1 + 10, dyb), fill=GREY, width=S)
            text(d, (dx0 - 10, dyt - 14), "Abstand beim Zusammenfassen ↑", 11, False, MUTED, "lm")
            height = {n: dyb for n in names}
            xpos = {n: LX[n] for n in names}
            for n in names:
                text(d, (LX[n], dyb + 14), n, 12, True, INK, "mm")
            for k_, (a, b, dd) in enumerate(merges[:m]):
                ka, kb = tuple(sorted(a)), tuple(sorted(b))
                xa = sum(LX[n] for n in a) / len(a) if len(a) > 1 else LX[a[0]]
                xb = sum(LX[n] for n in b) / len(b) if len(b) > 1 else LX[b[0]]
                ha = height.get(ka, dyb) if len(a) > 1 else dyb
                hb = height.get(kb, dyb) if len(b) > 1 else dyb
                hy = dyb - dd / maxd * (dyb - dyt)
                a_ = 1 if k_ < m - 1 else ease(f / 11)
                col = mix(BG, COLS[k_ % 4], a_)
                d.line(p(xa, ha, xa, ha + (hy - ha) * a_), fill=col, width=3 * S)
                d.line(p(xb, hb, xb, hb + (hy - hb) * a_), fill=col, width=3 * S)
                if a_ > 0.95:
                    d.line(p(xa, hy, xb, hy), fill=col, width=3 * S)
                height[tuple(sorted(a + b))] = hy
            if m == len(merges):
                cut = dyb - 0.45 * (dyb - dyt)
                d.line(p(dx0 - 10, cut, dx1 + 10, cut), fill=CORAL, width=2 * S)
                text(d, (dx1 + 6, cut - 12), "Schnitt", 11, True, CORAL, "rm")
                text(d, (dx0 - 10, 340), "Schnitt hier → 3 Cluster: {A,B}, {E,F}, {C,D}", 12, True, INK)
            frames.append(finish(img)); durs.append(90)
        durs[-1] = 1100
    durs[-1] = 3400
    save(frames, OUT / "dendrogramm.gif", durs)


# 4 PCA ---------------------------------------------------------------------------
def gif_pca():
    rnd = random.Random(7)
    pts = []
    for _ in range(50):
        t = rnd.gauss(0, 2.2)
        s = rnd.gauss(0, 0.6)
        ang = math.radians(32)
        pts.append((5 + t * math.cos(ang) - s * math.sin(ang), 5 + t * math.sin(ang) + s * math.cos(ang)))
    mx = sum(a for a, _ in pts) / len(pts); my = sum(b for _, b in pts) / len(pts)
    x0, y0, x1, y1 = 30, 50, 330, 340
    X = lambda v: x0 + v / 10 * (x1 - x0)
    Y = lambda v: y1 - v / 10 * (y1 - y0)

    def var_along(deg):
        c, s = math.cos(math.radians(deg)), math.sin(math.radians(deg))
        pr = [(a - mx) * c + (b - my) * s for a, b in pts]
        return sum(v * v for v in pr) / len(pr)
    total = var_along(0) + var_along(90)
    angles = list(range(100, 31, -3)) + [32] * 8
    frames, durs = [], []
    for phase, seq in [(0, angles), (1, [32] * 16)]:
        for fi, deg in enumerate(seq):
            img, d = canvas()
            text(d, (24, 24), "Hauptkomponentenanalyse (PCA): die Richtung der größten Streuung finden", 14, True, INK)
            d.rectangle(p(x0, y0, x1, y1), outline=GRID, width=S)
            c, s = math.cos(math.radians(deg)), math.sin(math.radians(deg))
            L = 6
            d.line(p(X(mx - L * c), Y(my - L * s), X(mx + L * c), Y(my + L * s)), fill=AMBER, width=3 * S)
            t = ease(fi / 15) if phase == 1 else 0
            for a, b in pts:
                pr = (a - mx) * c + (b - my) * s
                px_, py_ = mx + pr * c, my + pr * s
                if phase == 0:
                    d.line(p(X(a), Y(b), X(px_), Y(py_)), fill=GRID, width=S)
                ax, ay = a + (px_ - a) * t, b + (py_ - b) * t
                d.ellipse(p(X(ax) - 4, Y(ay) - 4, X(ax) + 4, Y(ay) + 4), fill=TEAL)
            d.rectangle(p(0, 0, x0 - 1, H), fill=BG); d.rectangle(p(x1 + 1, 0, W, H), fill=BG)
            d.rectangle(p(0, 0, W, y0 - 1), fill=BG); d.rectangle(p(0, y1 + 1, W, H), fill=BG)
            text(d, (24, 24), "Hauptkomponentenanalyse (PCA): die Richtung der größten Streuung finden", 14, True, INK)
            v = var_along(deg)
            tx = 360
            text(d, (tx, 74), "Achse wird gedreht", 13, True, AMBER)
            text(d, (tx, 104), "Erklärte Streuung:", 12, False, MUTED)
            text(d, (tx, 134), f"{round(v / total * 100)} %", 30, True, TEAL if v / total > 0.85 else INK, "lm")
            d.rounded_rectangle(p(tx, 160, tx + 220, 176), radius=6 * S, fill=GRID)
            d.rounded_rectangle(p(tx, 160, tx + 220 * v / total, 176), radius=6 * S, fill=TEAL)
            if phase == 1:
                text(d, (tx, 210), "1. Hauptkomponente gefunden.", 12, True, INK)
                text(d, (tx, 230), "Punkte auf die Achse projiziert:", 12, False, INK)
                text(d, (tx, 250), "aus 2 Merkmalen wird 1 –", 12, False, INK)
                text(d, (tx, 270), "mit kaum Informationsverlust.", 12, False, INK)
            else:
                text(d, (tx, 210), "Graue Linien = was beim", 12, False, MUTED)
                text(d, (tx, 230), "Projizieren verloren ginge.", 12, False, MUTED)
            frames.append(finish(img)); durs.append(90)
        durs[-1] = 1500
    durs[-1] = 3200
    save(frames, OUT / "pca.gif", durs)


# 5 Isolation Forest --------------------------------------------------------------
def gif_isolation():
    rnd = random.Random(4)
    pts = [(rnd.gauss(4.5, 1.0), rnd.gauss(5, 1.0)) for _ in range(40)]
    out = (8.8, 8.6)
    inner = pts[3]
    x0, y0, x1, y1 = 30, 60, 300, 330
    X = lambda v: x0 + v / 10 * (x1 - x0)
    Y = lambda v: y1 - v / 10 * (y1 - y0)
    frames, durs = [], []
    for target, name, col in [(out, "Ausreißer", CORAL), (inner, "normaler Punkt", TEAL)]:
        rnd2 = random.Random(9)
        box = [0, 10, 0, 10]
        cuts = []
        for _ in range(14):
            dim = rnd2.choice((0, 1))
            lo, hi = (box[0], box[1]) if dim == 0 else (box[2], box[3])
            v = rnd2.uniform(lo, hi)
            cuts.append((dim, v, list(box)))
            if dim == 0:
                if target[0] < v:
                    box[1] = v
                else:
                    box[0] = v
            else:
                if target[1] < v:
                    box[3] = v
                else:
                    box[2] = v
            inside = [q for q in pts + [out] if box[0] <= q[0] <= box[1] and box[2] <= q[1] <= box[3]]
            if len(inside) <= 1:
                break
        for k in range(len(cuts) + 3):
            img, d = canvas()
            text(d, (24, 26), "Isolation Forest: Ausreißer sind schnell isoliert", 15, True, INK)
            d.rectangle(p(x0, y0, x1, y1), outline=GRID, width=S)
            for dim, v, b in cuts[:k]:
                if dim == 0:
                    d.line(p(X(v), Y(b[2]), X(v), Y(b[3])), fill=AMBER, width=2 * S)
                else:
                    d.line(p(X(b[0]), Y(v), X(b[1]), Y(v)), fill=AMBER, width=2 * S)
            for q in pts + [out]:
                c = CORAL if q == out else TEAL
                d.ellipse(p(X(q[0]) - 4, Y(q[1]) - 4, X(q[0]) + 4, Y(q[1]) + 4), fill=c)
            d.ellipse(p(X(target[0]) - 10, Y(target[1]) - 10, X(target[0]) + 10, Y(target[1]) + 10), outline=INK, width=3 * S)
            tx = 330
            text(d, (tx, 70), "Zufällige Schnitte, bis der", 13, False, INK)
            text(d, (tx, 90), "markierte Punkt allein ist.", 13, False, INK)
            text(d, (tx, 130), f"Untersucht: {name}", 13, True, col)
            text(d, (tx, 160), f"Schnitte bisher: {min(k, len(cuts))}", 22, True, col, "lm")
            if k >= len(cuts):
                text(d, (tx, 210), f"Isoliert nach {len(cuts)} Schnitten.", 13, True, INK)
            text(d, (tx, 270), "Wenige Schnitte nötig", 12, False, MUTED)
            text(d, (tx, 288), "→ hoher Anomalie-Wert.", 12, False, MUTED)
            frames.append(finish(img)); durs.append(380)
        durs[-1] = 2200
    durs[-1] = 3200
    save(frames, OUT / "isolation-forest.gif", durs)


# 6 Q-Learning --------------------------------------------------------------------
def gif_qlearning():
    N = 4
    goal = (3, 0)
    trap = (3, 1)
    wall = (1, 1)
    gamma, alpha = 0.9, 0.5
    acts = [(0, -1), (1, 0), (0, 1), (-1, 0)]
    Q = {(x, y): [0.0] * 4 for x in range(N) for y in range(N)}

    def step(s, a):
        nx, ny = s[0] + acts[a][0], s[1] + acts[a][1]
        if not (0 <= nx < N and 0 <= ny < N) or (nx, ny) == wall:
            nx, ny = s
        if (nx, ny) == goal:
            return (nx, ny), 10, True
        if (nx, ny) == trap:
            return (nx, ny), -10, True
        return (nx, ny), -1, False
    rnd = random.Random(1)
    snapshots = []
    for ep in range(120):
        s = (0, 3)
        for _ in range(30):
            a = rnd.randrange(4) if rnd.random() < 0.3 else max(range(4), key=lambda i: Q[s][i])
            s2, r, done = step(s, a)
            target = r + (0 if done else gamma * max(Q[s2]))
            Q[s][a] += alpha * (target - Q[s][a])
            s = s2
            if done:
                break
        if ep in (0, 2, 5, 10, 20, 40, 80, 119):
            snapshots.append((ep + 1, {k: list(v) for k, v in Q.items()}))
    cell = 70
    gx0, gy0 = 30, 50
    frames, durs = [], []
    for ep, Qs in snapshots:
        for f in range(8):
            img, d = canvas()
            text(d, (24, 26), "Q-Learning: Die Tabelle der Erfahrungswerte füllt sich", 15, True, INK)
            for x in range(N):
                for y in range(N):
                    X0, Y0 = gx0 + x * cell, gy0 + y * cell
                    v = max(Qs[(x, y)])
                    if (x, y) == goal:
                        fill = TEAL_L
                    elif (x, y) == trap:
                        fill = CORAL_L
                    elif (x, y) == wall:
                        fill = GREY
                    else:
                        fill = mix(WHITE, TEAL_L, max(0, min(1, v / 10))) if v > 0 else mix(WHITE, CORAL_L, max(0, min(1, -v / 10)))
                    d.rectangle(p(X0, Y0, X0 + cell, Y0 + cell), fill=fill, outline=GRID, width=S)
                    if (x, y) == goal:
                        text(d, (X0 + cell / 2, Y0 + cell / 2), "Ziel +10", 11, True, TEAL, "mm")
                    elif (x, y) == trap:
                        text(d, (X0 + cell / 2, Y0 + cell / 2), "Falle −10", 11, True, CORAL, "mm")
                    elif (x, y) != wall:
                        best = max(range(4), key=lambda i: Qs[(x, y)][i])
                        if abs(v) > 0.01:
                            ax, ay = acts[best]
                            cx, cy = X0 + cell / 2, Y0 + cell / 2 + 6
                            arrow(d, cx - ax * 14, cy - ay * 14, cx + ax * 16, cy + ay * 16, INK)
                        text(d, (X0 + cell / 2, Y0 + 14), de(v, 1), 10, False, MUTED, "mm")
                    if (x, y) == (0, 3):
                        text(d, (X0 + 10, Y0 + cell - 10), "Start", 9, True, AMBER, "lm")
            tx = 330
            text(d, (tx, 70), f"Nach {ep} Episoden", 18, True, AMBER)
            text(d, (tx, 110), "Zahl im Feld = bester Q-Wert:", 12, False, MUTED)
            text(d, (tx, 128), "Wie viel Belohnung ist von", 12, False, MUTED)
            text(d, (tx, 146), "hier aus noch zu erwarten?", 12, False, MUTED)
            text(d, (tx, 182), "Pfeil = beste bekannte Aktion", 12, False, INK)
            text(d, (tx, 222), "Die Belohnung des Ziels", 12, True, INK)
            text(d, (tx, 240), "»sickert« Schritt für Schritt", 12, True, INK)
            text(d, (tx, 258), "zurück zum Start (γ = 0,9).", 12, True, INK)
            text(d, (tx, 298), "Jeder Schritt kostet −1,", 12, False, MUTED)
            text(d, (tx, 316), "deshalb lohnt der kurze Weg.", 12, False, MUTED)
            frames.append(finish(img)); durs.append(120)
        durs[-1] = 1300
    durs[-1] = 3400
    save(frames, OUT / "q-learning.gif", durs)


if __name__ == "__main__":
    gif_ellbogen()
    gif_dbscan()
    gif_dendrogramm()
    gif_pca()
    gif_isolation()
    gif_qlearning()
