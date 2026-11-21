"""Erzeugt die animierten Erklaer-GIFs fuer Modul 2 (Mathematik und Statistik)."""
import math
import random
from pathlib import Path
from PIL import Image, ImageDraw

from gifs_modul1 import (W, H, S, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L,
                         VIOLET, VIOLET_L, GREY, canvas, p, text, finish, ease, mix, arrow)

OUT = Path(__file__).resolve().parent.parent / "kurs" / "modul-2" / "gifs"
OUT.mkdir(parents=True, exist_ok=True)
WHITE = (255, 255, 255)


def save(frames, name, durations):
    if isinstance(durations, int):
        durations = [durations] * len(frames)
    pal = [f.convert("P", palette=Image.ADAPTIVE, colors=128) for f in frames]
    pal[0].save(OUT / name, save_all=True, append_images=pal[1:], duration=durations,
                loop=0, optimize=True, disposal=1)
    print(name, len(frames), "Frames")


def de(x, nd=1):
    return f"{x:.{nd}f}".replace(".", ",")


# ------------------------------------------------------------ 1 Mittelwert als Wippe
def gif_wippe():
    x0, x1 = 50, 590  # Skala 0..20
    yb = 200

    def X(v):
        return x0 + v / 20 * (x1 - x0)

    def draw(vals, shown, piv, tilt, extra=""):
        img, d = canvas()
        # Balken (gedreht um Drehpunkt)
        px = X(piv)
        ang = tilt
        def rot(x, y):
            dx, dy = x - px, y - yb
            return (px + dx * math.cos(ang) - dy * math.sin(ang), yb + dx * math.sin(ang) + dy * math.cos(ang))
        a = rot(x0 - 10, yb); b = rot(x1 + 10, yb); c = rot(x1 + 10, yb + 8); e = rot(x0 - 10, yb + 8)
        d.polygon([p(*a), p(*b), p(*c), p(*e)], fill=INK)
        for v in range(0, 21, 2):
            q = rot(X(v), yb + 8)
            text(d, (q[0], q[1] + 14), str(v), 11, False, MUTED, "mm")
        # Gewichte
        stack = {}
        for i, v in enumerate(vals[:shown]):
            k = stack.get(v, 0)
            stack[v] = k + 1
            q = rot(X(v), yb - 13 - k * 24)
            d.rounded_rectangle(p(q[0] - 11, q[1] - 11, q[0] + 11, q[1] + 11), radius=4 * S, fill=TEAL)
            text(d, q, str(v), 11, True, WHITE, "mm")
        # Drehpunkt
        d.polygon([p(px, yb + 8), p(px - 18, yb + 44), p(px + 18, yb + 44)], fill=AMBER)
        text(d, (px, yb + 62), "Mittelwert " + de(piv, 1).replace(",0", ""), 13, True, AMBER, "mm")
        # Median-Markierung
        if shown == len(vals):
            sv = sorted(vals)
            med = sv[len(sv) // 2]
            q = rot(X(med), yb + 8)
            d.line(p(X(med), 290, X(med), 312), fill=VIOLET, width=3 * S)
            text(d, (X(med), 326), f"Median {med}", 13, True, VIOLET, "mm")
        text(d, (24, 30), "Der Mittelwert ist der Punkt, an dem die Wippe im Gleichgewicht ist", 15, True, INK)
        text(d, (24, 54), extra, 13, False, MUTED)
        return finish(img)

    vals = [2, 3, 3, 4, 8]
    frames, durs = [], []
    for k in range(1, 6):
        piv = sum(vals[:k]) / k
        for _ in range(4):
            frames.append(draw(vals, k, piv, 0, "Werte: " + ", ".join(map(str, vals[:k])))); durs.append(160)
    frames.append(draw(vals, 5, 4, 0, "2 + 3 + 3 + 4 + 8 = 20,  20 : 5 = 4")); durs.append(2200)
    # Ausreisser: 8 wandert nach 18, Wippe kippt, Drehpunkt rutscht
    for k in range(16):
        t = ease(k / 15)
        v = 8 + 10 * t
        vv = [2, 3, 3, 4, round(v)]
        tilt = 0.12 * math.sin(math.pi * t)
        frames.append(draw(vv, 5, 4 + 2 * t, tilt, "Ein Ausreißer: Aus 8 wird 18")); durs.append(90)
    frames.append(draw([2, 3, 3, 4, 18], 5, 6, 0, "Mittelwert springt von 4 auf 6 – der Median bleibt 3")); durs.append(3000)
    save(frames, "mittelwert-wippe.gif", durs)


# ------------------------------------------------------------ 2 Streuung (Dart)
def gif_dart():
    rnd = random.Random(11)
    A = [(rnd.gauss(0, 9), rnd.gauss(0, 9)) for _ in range(14)]
    B = [(rnd.gauss(0, 34), rnd.gauss(0, 34)) for _ in range(14)]

    def sd(pts):
        r = [math.hypot(x, y) for x, y in pts]
        return math.sqrt(sum(v * v for v in r) / len(r))

    frames, durs = [], []
    for n in range(0, 15):
        img, d = canvas()
        for cx, title, pts, col in [(165, "Spielerin A", A, TEAL), (475, "Spieler B", B, CORAL)]:
            cy = 185
            for r, c in [(110, GRID), (80, WHITE), (50, GRID), (22, WHITE)]:
                d.ellipse(p(cx - r, cy - r, cx + r, cy + r), fill=c, outline=GREY, width=S)
            d.ellipse(p(cx - 5, cy - 5, cx + 5, cy + 5), fill=AMBER)
            for (x, y) in pts[:n]:
                d.ellipse(p(cx + x - 5, cy + y - 5, cx + x + 5, cy + y + 5), fill=col, outline=WHITE, width=S)
            text(d, (cx, 50), title, 16, True, col, "mm")
            if n >= 14:
                text(d, (cx, 318), f"Streuung klein" if col == TEAL else "Streuung groß", 14, True, col, "mm")
        text(d, (W / 2, 24), "Beide zielen im Mittel genau auf die Mitte", 14, False, MUTED, "mm")
        text(d, (W / 2, 350), "Gleicher Mittelwert – ganz unterschiedliche Streuung", 14, True, INK, "mm")
        frames.append(finish(img)); durs.append(180)
    durs[-1] = 3000
    save(frames, "streuung-dart.gif", durs)


# ------------------------------------------------------------ 3 Boxplot-Aufbau
def gif_boxplot():
    data = [2, 4, 5, 5, 6, 7, 8, 8, 9, 10, 25]
    x0, x1 = 40, 600

    def X(v):
        return x0 + v / 26 * (x1 - x0)

    steps = [
        ("1  Werte sortieren", None),
        ("2  Median: der mittlere Wert (6. von 11)", "med"),
        ("3  Q1: Median der unteren Hälfte, Q3: der oberen", "q"),
        ("4  Box von Q1 bis Q3 – darin liegt die mittlere Hälfte", "box"),
        ("5  IQR = Q3 − Q1 = 9 − 5 = 4", "iqr"),
        ("6  Grenze oben: Q3 + 1,5 · IQR = 15  →  25 ist Ausreißer", "out"),
        ("7  Fertiger Boxplot", "done"),
    ]
    frames, durs = [], []
    for si, (label, key) in enumerate(steps):
        keys = [k for _, k in steps[:si + 1]]
        for k in range(8):
            img, d = canvas()
            text(d, (24, 30), "Boxplot Schritt für Schritt", 16, True, INK)
            text(d, (24, 58), label, 14, True, AMBER)
            # Punkte
            for i, v in enumerate(data):
                cx = 40 + i * 52 + 26
                y = 120
                hl = (key == "med" and i == 5) or (key == "q" and i in (2, 8))
                col = VIOLET if i == 5 and "med" in keys else (TEAL if i in (2, 8) and "q" in keys else GREY)
                if "out" in keys and v == 25:
                    col = CORAL
                r = 18 if hl and k % 4 < 2 else 16
                d.ellipse(p(cx - r, y - r, cx + r, y + r), fill=col)
                text(d, (cx, y), str(v), 13, True, WHITE, "mm")
            # Achse
            ya = 260
            d.line(p(x0, ya + 30, x1, ya + 30), fill=GREY, width=S)
            for v in range(0, 27, 5):
                d.line(p(X(v), ya + 26, X(v), ya + 34), fill=GREY, width=S)
                text(d, (X(v), ya + 46), str(v), 11, False, MUTED, "mm")
            if "med" in keys:
                d.line(p(X(7), ya - 50, X(7), ya + 22), fill=VIOLET, width=3 * S)
                text(d, (X(7), ya - 60), "Median 7", 12, True, VIOLET, "mm")
            if "q" in keys:
                d.line(p(X(5), ya - 30, X(5), ya + 22), fill=TEAL, width=2 * S)
                d.line(p(X(9), ya - 30, X(9), ya + 22), fill=TEAL, width=2 * S)
                text(d, (X(5) - 4, ya - 36), "Q1 = 5", 12, True, TEAL, "rm")
                text(d, (X(9) + 4, ya - 36), "Q3 = 9", 12, True, TEAL, "lm")
            if "box" in keys:
                d.rectangle(p(X(5), ya - 20, X(9), ya + 20), outline=TEAL, width=3 * S, fill=TEAL_L)
                d.line(p(X(7), ya - 20, X(7), ya + 20), fill=VIOLET, width=3 * S)
            if "iqr" in keys:
                d.line(p(X(5), ya + 12, X(9), ya + 12), fill=AMBER, width=2 * S)
            if "out" in keys:
                d.line(p(X(15), ya - 30, X(15), ya + 24), fill=CORAL, width=S)
                text(d, (X(15), ya - 40), "Grenze 15", 11, False, CORAL, "mm")
                d.ellipse(p(X(25) - 6, ya - 6, X(25) + 6, ya + 6), outline=CORAL, width=3 * S)
            if "done" in keys:
                d.line(p(X(2), ya, X(5), ya), fill=INK, width=2 * S)
                d.line(p(X(9), ya, X(10), ya), fill=INK, width=2 * S)
                d.line(p(X(2), ya - 10, X(2), ya + 10), fill=INK, width=2 * S)
                d.line(p(X(10), ya - 10, X(10), ya + 10), fill=INK, width=2 * S)
                text(d, (X(2), ya + 20), "Min 2", 11, False, INK, "mm")
                text(d, (X(10) + 4, ya + 20), "Max 10", 11, False, INK, "lm")
            frames.append(finish(img)); durs.append(130)
        durs[-1] = 1500
    durs[-1] = 3200
    save(frames, "boxplot-aufbau.gif", durs)


# ------------------------------------------------------------ 4 Galtonbrett
def gif_galton():
    rnd = random.Random(5)
    rows = 10
    nb = rows + 1
    top = 40
    dy = 19
    dx = 22
    cx = 220
    bins = [0] * nb
    balls = []  # (start_frame, path)
    N = 220
    for i in range(N):
        path = [rnd.choice((-1, 1)) for _ in range(rows)]
        balls.append((i * 0.55, path))
    total_frames = int(N * 0.55) + rows + 14
    frames, durs = [], []
    binx = lambda k: cx + (k - rows / 2) * dx
    ybin = top + rows * dy + 20
    for f in range(0, total_frames, 1):
        img, d = canvas()
        # Trichter
        d.polygon([p(cx - 40, 8), p(cx + 40, 8), p(cx + 8, top - 8), p(cx - 8, top - 8)], fill=GRID)
        for r in range(rows):
            for j in range(r + 1):
                x = cx + (j - r / 2) * dx
                y = top + r * dy
                d.ellipse(p(x - 3, y - 3, x + 3, y + 3), fill=INK)
        counts = [0] * nb
        for (s, path) in balls:
            age = f - s
            if age < 0:
                continue
            if age >= rows:
                k = sum(1 for v in path if v > 0)
                counts[k] += 1
                continue
            step = int(age)
            frac = age - step
            pos = sum(path[:step]) / 2
            nxt = pos + path[step] / 2
            x = cx + (pos + (nxt - pos) * frac) * dx
            y = top + (step + frac) * dy - 8
            d.ellipse(p(x - 4, y - 4, x + 4, y + 4), fill=AMBER)
        hb = 2.4
        for k in range(nb):
            x = binx(k)
            d.line(p(x - dx / 2, ybin, x - dx / 2, H - 12), fill=GRID, width=S)
            for m in range(counts[k]):
                yy = H - 16 - m * hb * 1.0
                d.rectangle(p(x - dx / 2 + 2, yy - hb + 0.4, x + dx / 2 - 2, yy), fill=TEAL)
        if f > total_frames - 14:
            # Normalkurve
            mu = rows / 2
            sig = math.sqrt(rows) / 2
            pts = []
            for i in range(0, 101):
                k = -0.5 + i / 100 * nb
                dens = N / (sig * math.sqrt(2 * math.pi)) * math.exp(-((k - mu) ** 2) / (2 * sig * sig))
                pts.append(p(cx + (k - rows / 2) * dx, H - 16 - dens * hb))
            d.line(pts, fill=CORAL, width=3 * S)
        tx = 450
        text(d, (tx, 50), "Galtonbrett", 17, True, INK)
        text(d, (tx, 82), "Jede Kugel fällt an jedem", 13, False, MUTED)
        text(d, (tx, 102), "Stift zufällig nach links", 13, False, MUTED)
        text(d, (tx, 122), "oder rechts.", 13, False, MUTED)
        text(d, (tx, 162), "Viele kleine Zufälle", 13, True, INK)
        text(d, (tx, 182), "addieren sich zu einer", 13, True, INK)
        text(d, (tx, 202), "Glockenkurve:", 13, True, INK)
        text(d, (tx, 222), "der Normalverteilung.", 13, True, CORAL)
        text(d, (tx, 270), f"Kugeln unten: {sum(counts)}", 13, False, MUTED)
        frames.append(finish(img)); durs.append(60)
    durs[-1] = 3000
    save(frames, "galtonbrett.gif", durs)


# ------------------------------------------------------------ 5 Korrelation
def gif_korrelation():
    rnd = random.Random(2)
    base = [(rnd.gauss(0, 1), rnd.gauss(0, 1)) for _ in range(45)]
    x0, y0, x1, y1 = 60, 40, 360, 330

    def r_of(pts):
        n = len(pts)
        mx = sum(a for a, _ in pts) / n
        my = sum(b for _, b in pts) / n
        sxy = sum((a - mx) * (b - my) for a, b in pts)
        sx = math.sqrt(sum((a - mx) ** 2 for a, _ in pts))
        sy = math.sqrt(sum((b - my) ** 2 for _, b in pts))
        return sxy / (sx * sy)

    targets = [0.95, 0.6, 0.0, -0.6, -0.95, 0.95]
    frames, durs = [], []
    seq = []
    for a, b in zip(targets[:-1], targets[1:]):
        for k in range(14):
            seq.append(a + (b - a) * ease(k / 13))
        seq += [b] * 12
    for rho in seq:
        pts = [(u, rho * u + math.sqrt(max(0, 1 - rho * rho)) * v) for u, v in base]
        r = r_of(pts)
        img, d = canvas()
        for k in range(6):
            gx = x0 + (x1 - x0) * k / 5
            gy = y0 + (y1 - y0) * k / 5
            d.line(p(gx, y0, gx, y1), fill=GRID, width=S)
            d.line(p(x0, gy, x1, gy), fill=GRID, width=S)
        for u, v in pts:
            X = x0 + (u + 3) / 6 * (x1 - x0)
            Y = y1 - (v + 3) / 6 * (y1 - y0)
            if x0 < X < x1 and y0 < Y < y1:
                d.ellipse(p(X - 5, Y - 5, X + 5, Y + 5), fill=TEAL if r > 0.2 else (CORAL if r < -0.2 else GREY))
        tx = 390
        text(d, (tx, 56), "Korrelation r", 17, True, INK)
        col = TEAL if r > 0.2 else (CORAL if r < -0.2 else MUTED)
        text(d, (tx, 110), ("+" if r >= 0 else "−") + de(abs(r), 2), 40, True, col, "lm")
        if r > 0.8:
            s1, s2 = "stark positiv", "je mehr x, desto mehr y"
        elif r > 0.2:
            s1, s2 = "mittel positiv", "Tendenz steigend"
        elif r > -0.2:
            s1, s2 = "kein linearer", "Zusammenhang"
        elif r > -0.8:
            s1, s2 = "mittel negativ", "Tendenz fallend"
        else:
            s1, s2 = "stark negativ", "je mehr x, desto weniger y"
        text(d, (tx, 160), s1, 15, True, INK)
        text(d, (tx, 184), s2, 13, False, MUTED)
        # Skala
        sx0, sx1, sy = tx, tx + 210, 250
        d.line(p(sx0, sy, sx1, sy), fill=GREY, width=2 * S)
        for v, lab in [(-1, "−1"), (0, "0"), (1, "+1")]:
            xx = sx0 + (v + 1) / 2 * (sx1 - sx0)
            d.line(p(xx, sy - 6, xx, sy + 6), fill=GREY, width=S)
            text(d, (xx, sy + 18), lab, 12, False, MUTED, "mm")
        xx = sx0 + (r + 1) / 2 * (sx1 - sx0)
        d.polygon([p(xx, sy - 6), p(xx - 7, sy - 18), p(xx + 7, sy - 18)], fill=col)
        text(d, (tx, 310), "Korrelation ≠ Ursache!", 13, True, AMBER)
        frames.append(finish(img)); durs.append(80)
    save(frames, "korrelation.gif", durs)


# ------------------------------------------------------------ 6 Bayes mit 1000 Mails
def gif_bayes():
    cols, rows = 40, 25
    size = 8
    gx0, gy0 = 20, 56
    rnd = random.Random(9)
    idx = list(range(1000))
    rnd.shuffle(idx)
    phish = set(idx[:20])
    caught = set(list(phish)[:18])
    others = [i for i in idx[20:]]
    false_alarm = set(others[:49])
    stages = [
        ("1000 E-Mails", "Davon sind 2 % Phishing: 20 Mails (rot)", 0),
        ("Der Filter schlägt Alarm", "Er erkennt 90 % der Phishing-Mails: 18", 1),
        ("…aber auch Fehlalarme", "5 % der 980 normalen Mails: 49 (gelb umrandet)", 2),
        ("Nur die Alarme zählen", "18 echte + 49 falsche = 67 Alarme", 3),
        ("Ergebnis", "18 von 67 Alarmen sind echt: nur 27 %", 4),
    ]
    frames, durs = [], []
    for title, sub, st in stages:
        for k in range(10):
            t = ease(k / 9)
            img, d = canvas()
            for i in range(1000):
                c, r = i % cols, i // cols
                x, y = gx0 + c * (size + 1.8), gy0 + r * (size + 1.8)
                fill = GRID
                if i in phish:
                    fill = CORAL
                alarm = (i in caught and st >= 1) or (i in false_alarm and st >= 2)
                if st >= 3 and not alarm:
                    fill = mix(fill, BG, t if st == 3 else 1)
                d.rectangle(p(x, y, x + size, y + size), fill=fill)
                if alarm:
                    amt = t if (st == 1 and i in caught) or (st == 2 and i in false_alarm) else 1
                    if amt > 0.1:
                        d.rectangle(p(x - 1.2, y - 1.2, x + size + 1.2, y + size + 1.2), outline=mix(BG, AMBER, amt), width=2 * S)
            tx = 452
            text(d, (tx, 52), title, 16, True, INK)
            # Umbruch der Unterzeile
            words, line, yy = sub.split(" "), "", 84
            for w_ in words:
                if len(line + w_) > 24:
                    text(d, (tx, yy), line, 13, False, MUTED); yy += 20; line = ""
                line += w_ + " "
            text(d, (tx, yy), line, 13, False, MUTED)
            if st >= 4:
                text(d, (tx, 210), "P(Phishing | Alarm)", 13, False, INK)
                text(d, (tx, 236), "= 18 / 67 ≈ 27 %", 18, True, CORAL)
                text(d, (tx, 280), "Seltene Fälle erzeugen", 13, True, INK)
                text(d, (tx, 300), "viele Fehlalarme.", 13, True, INK)
            frames.append(finish(img)); durs.append(90)
        durs[-1] = 2200
    durs[-1] = 3600
    save(frames, "bayes-1000-mails.gif", durs)


# ------------------------------------------------------------ 7 Kosinus-Aehnlichkeit
def gif_kosinus():
    ox, oy, L = 200, 250, 150
    frames, durs = [], []
    angles = list(range(0, 181, 4)) + [180] * 10 + list(range(180, -1, -6)) + [0] * 6
    for a in angles:
        img, d = canvas()
        d.ellipse(p(ox - L, oy - L, ox + L, oy + L), outline=GRID, width=S)
        d.line(p(ox - L - 20, oy, ox + L + 20, oy), fill=GRID, width=S)
        arrow(d, ox, oy, ox + L, oy, TEAL)
        rad = math.radians(a)
        bx, by = ox + L * math.cos(rad), oy - L * math.sin(rad)
        arrow(d, ox, oy, bx, by, AMBER)
        # Winkelbogen
        if a > 0:
            d.arc(p(ox - 40, oy - 40, ox + 40, oy + 40), start=-a, end=0, fill=VIOLET, width=3 * S)
        text(d, (ox + L + 8, oy + 18), "»Hund«", 13, True, TEAL, "lm") if False else text(d, (ox + L - 10, oy + 18), "Text A", 13, True, TEAL, "mm")
        text(d, (bx + 18 * math.cos(rad), by - 18 * math.sin(rad)), "Text B", 13, True, AMBER, "mm")
        c = math.cos(rad)
        tx = 420
        text(d, (tx, 50), "Kosinus-Ähnlichkeit", 17, True, INK)
        text(d, (tx, 80), "Texte als Pfeile (Vektoren).", 13, False, MUTED)
        text(d, (tx, 100), "Es zählt nur der Winkel.", 13, False, MUTED)
        text(d, (tx, 140), f"Winkel {a}°", 15, True, VIOLET)
        text(d, (tx, 182), ("+" if c >= -0.005 else "−") + de(abs(c), 2), 36, True, TEAL if c > 0.3 else (CORAL if c < -0.3 else MUTED), "lm")
        if c > 0.9:
            s = "sehr ähnlich"
        elif c > 0.3:
            s = "eher ähnlich"
        elif c > -0.3:
            s = "kaum Bezug"
        elif c > -0.9:
            s = "eher gegensätzlich"
        else:
            s = "gegensätzlich"
        text(d, (tx, 226), s, 15, True, INK)
        text(d, (tx, 280), "Genutzt bei Suche und RAG:", 12, False, MUTED)
        text(d, (tx, 298), "Welcher Text passt zur Frage?", 12, False, MUTED)
        frames.append(finish(img)); durs.append(70)
    durs[0] = 1200
    save(frames, "kosinus-aehnlichkeit.gif", durs)


# ------------------------------------------------------------ 8 Gradientenabstieg
def gif_gradient():
    def run(eta, n):
        w = 0.0
        out = [w]
        for _ in range(n):
            w = w - eta * 2 * (w - 3)
            out.append(w)
        return out

    good = run(0.1, 14)
    bad = run(1.05, 14)
    panels = [(20, "Lernrate η = 0,1", good, TEAL), (330, "Lernrate η = 1,05 (zu groß)", bad, CORAL)]
    WMIN, WMAX = -4, 10
    frames, durs = [], []
    for step in range(0, 15):
        for sub in range(4):
            img, d = canvas()
            for (px, title, seq, col) in panels:
                pw, ph = 290, 250
                top = 70
                def X(w):
                    return px + (w - WMIN) / (WMAX - WMIN) * pw
                def Y(Lv):
                    return top + ph - min(Lv, 50) / 50 * ph
                pts = [p(X(WMIN + i / 100 * (WMAX - WMIN)), Y((WMIN + i / 100 * (WMAX - WMIN) - 3) ** 2)) for i in range(101)]
                d.line(pts, fill=GREY, width=2 * S)
                d.line(p(X(3), top + ph, X(3), top + ph + 6), fill=INK, width=S)
                text(d, (X(3), top + ph + 16), "Minimum w = 3", 11, False, MUTED, "mm")
                text(d, (px + pw / 2, 36), title, 14, True, col, "mm")
                # bisherige Schritte
                upto = min(step, len(seq) - 1)
                for i in range(upto):
                    a, b = seq[i], seq[i + 1]
                    if WMIN <= a <= WMAX and WMIN <= b <= WMAX:
                        d.line(p(X(a), Y((a - 3) ** 2), X(b), Y((b - 3) ** 2)), fill=mix(BG, col, 0.5), width=2 * S)
                cur = seq[upto]
                if upto < len(seq) - 1 and sub > 0:
                    nxt = seq[upto + 1]
                    t = ease(sub / 4)
                    cur = cur + (nxt - cur) * t
                if WMIN <= cur <= WMAX:
                    d.ellipse(p(X(cur) - 8, Y((cur - 3) ** 2) - 8, X(cur) + 8, Y((cur - 3) ** 2) + 8), fill=col)
                text(d, (px + 10, top + ph + 40), f"Schritt {upto}:  w = {de(seq[upto], 2)}", 12, True, INK)
                text(d, (px + 10, top + ph + 58), f"Fehler L = {de((seq[upto] - 3) ** 2, 2)}", 12, False, MUTED)
            text(d, (W / 2, 14), "Verlust L(w) = (w − 3)²   ·   Start bei w = 0", 12, False, MUTED, "mm")
            frames.append(finish(img)); durs.append(110)
        durs[-1] = 450
    durs[-1] = 3200
    save(frames, "gradientenabstieg.gif", durs)


if __name__ == "__main__":
    gif_wippe()
    gif_dart()
    gif_boxplot()
    gif_galton()
    gif_korrelation()
    gif_bayes()
    gif_kosinus()
    gif_gradient()
