"""Erzeugt die animierten Erklaer-GIFs fuer Modul 1 (Grundlagen der KI)."""
import math
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "kurs" / "modul-1" / "gifs"
OUT.mkdir(parents=True, exist_ok=True)

W, H = 640, 380
S = 2  # Supersampling
BG = (250, 251, 250)
INK = (28, 37, 48)
MUTED = (110, 120, 130)
GRID = (226, 231, 229)
TEAL = (15, 118, 110)
TEAL_L = (204, 236, 231)
AMBER = (217, 119, 6)
AMBER_L = (253, 233, 200)
CORAL = (214, 69, 80)
CORAL_L = (250, 214, 217)
VIOLET = (99, 82, 183)
VIOLET_L = (226, 221, 248)
GREY = (160, 168, 175)

FONT = "C:/Windows/Fonts/segoeui.ttf"
FONT_B = "C:/Windows/Fonts/segoeuib.ttf"


def font(size, bold=False):
    return ImageFont.truetype(FONT_B if bold else FONT, size * S)


def canvas():
    img = Image.new("RGB", (W * S, H * S), BG)
    return img, ImageDraw.Draw(img)


def p(*v):
    return tuple(int(x * S) for x in v)


def text(d, xy, s, size=16, bold=False, fill=INK, anchor="la"):
    d.text(p(*xy), s, font=font(size, bold), fill=fill, anchor=anchor)


def finish(img):
    return img.resize((W, H), Image.LANCZOS)


def save(frames, name, durations):
    if isinstance(durations, int):
        durations = [durations] * len(frames)
    pal = [f.convert("P", palette=Image.ADAPTIVE, colors=128) for f in frames]
    pal[0].save(OUT / name, save_all=True, append_images=pal[1:], duration=durations,
                loop=0, optimize=True, disposal=1)
    print(name, len(frames), "Frames")


def ease(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def mix(c1, c2, t):
    return tuple(int(a + (b - a) * t) for a, b in zip(c1, c2))


def caption(d, s):
    text(d, (W / 2, H - 22), s, 15, False, MUTED, "mm")


# ---------------------------------------------------------------- 1 Ebenen
def gif_ebenen():
    layers = [
        ("Künstliche Intelligenz", "auch feste Regeln", TEAL, TEAL_L, 190, 160),
        ("Maschinelles Lernen", "lernt aus Beispielen", AMBER, AMBER_L, 142, 120),
        ("Deep Learning", "viele Neuronen-Schichten", VIOLET, VIOLET_L, 94, 80),
        ("Generative KI", "erzeugt Neues", CORAL, CORAL_L, 48, 40),
    ]
    cx, cy = 210, 178
    frames, durs = [], []
    steps = 14
    for li in range(len(layers) + 1):
        for k in range(steps):
            img, d = canvas()
            for j, (name, sub, col, colL, rx, ry) in enumerate(layers):
                if j > li or (j == li and li == len(layers)):
                    continue
                t = ease(k / (steps - 1)) if j == li else 1.0
                ex, ey = rx * t, ry * t * 0.95
                if t <= 0.02:
                    continue
                d.ellipse(p(cx - ex, cy - ey, cx + ex, cy + ey), fill=mix(BG, colL, t), outline=col, width=2 * S)
            # Labels rechts
            for j, (name, sub, col, colL, rx, ry) in enumerate(layers):
                if j > li or (j == li and li == len(layers)):
                    continue
                t = ease(k / (steps - 1)) if j == li else 1.0
                y = 70 + j * 66
                c = mix(BG, col, t)
                ix = cx + (rx - (rx - (layers[j + 1][4] if j < 3 else 0)) / 2) if j < 3 else cx
                d.line(p(ix, cy, 432, y + 10), fill=mix(BG, GREY, t), width=S)
                d.ellipse(p(ix - 3, cy - 3, ix + 3, cy + 3), fill=mix(BG, INK, t))
                d.ellipse(p(432, y + 3, 446, y + 17), fill=c)
                text(d, (454, y + 10), name, 15, True, mix(BG, INK, t), "lm")
                text(d, (454, y + 32), sub, 12, False, mix(BG, MUTED, t), "lm")
            caption(d, "Jede Ebene ist ein Teilgebiet der äußeren")
            frames.append(finish(img))
            durs.append(70)
        durs[-1] = 900
    durs[-1] = 2600
    save(frames, "ki-ebenen.gif", durs)


# ---------------------------------------------------------------- 2 Programmieren vs Lernen
def box(d, x, y, w, h, label, col, colL, sub=None):
    d.rounded_rectangle(p(x, y, x + w, y + h), radius=10 * S, fill=colL, outline=col, width=2 * S)
    if sub:
        text(d, (x + w / 2, y + h / 2 - 9), label, 15, True, INK, "mm")
        text(d, (x + w / 2, y + h / 2 + 11), sub, 11, False, MUTED, "mm")
    else:
        text(d, (x + w / 2, y + h / 2), label, 15, True, INK, "mm")


def arrow(d, x1, y1, x2, y2, col=GREY):
    d.line(p(x1, y1, x2, y2), fill=col, width=2 * S)
    a = math.atan2(y2 - y1, x2 - x1)
    pts = [(x2, y2), (x2 - 10 * math.cos(a - 0.45), y2 - 10 * math.sin(a - 0.45)),
           (x2 - 10 * math.cos(a + 0.45), y2 - 10 * math.sin(a + 0.45))]
    d.polygon([p(*q) for q in pts], fill=col)


def gif_prog_vs_lernen():
    frames = []
    n = 60
    for i in range(n):
        img, d = canvas()
        t = (i % 30) / 30
        # Reihe 1: klassisch
        text(d, (24, 30), "Klassisch programmieren", 16, True, TEAL)
        y = 52
        box(d, 24, y, 120, 46, "Daten", TEAL, TEAL_L, "z. B. E-Mail-Text")
        box(d, 24, y + 58, 120, 46, "Regeln", TEAL, TEAL_L, "vom Menschen")
        box(d, 250, y + 22, 130, 60, "Programm", INK, GRID)
        box(d, 470, y + 29, 140, 46, "Ergebnis", TEAL, TEAL_L, "Spam: ja / nein")
        arrow(d, 146, y + 23, 248, y + 45)
        arrow(d, 146, y + 81, 248, y + 60)
        arrow(d, 382, y + 52, 468, y + 52)
        for (x1, y1, x2, y2, off) in [(146, y + 23, 248, y + 45, 0), (146, y + 81, 248, y + 60, 0), (382, y + 52, 468, y + 52, 0.5)]:
            tt = (t + off) % 1
            d.ellipse(p(x1 + (x2 - x1) * tt - 5, y1 + (y2 - y1) * tt - 5, x1 + (x2 - x1) * tt + 5, y1 + (y2 - y1) * tt + 5), fill=TEAL)
        d.line(p(24, 186, W - 24, 186), fill=GRID, width=S)
        # Reihe 2: ML
        text(d, (24, 208), "Maschinelles Lernen", 16, True, AMBER)
        y = 230
        box(d, 24, y, 120, 46, "Daten", AMBER, AMBER_L, "viele E-Mails")
        box(d, 24, y + 58, 120, 46, "Ergebnisse", AMBER, AMBER_L, "je Mail: Spam?")
        glow = 0.5 + 0.5 * math.sin(i / 60 * 2 * math.pi * 2)
        box(d, 250, y + 22, 130, 60, "Lernen", AMBER, mix(AMBER_L, (255, 214, 150), glow), "Training")
        box(d, 470, y + 29, 140, 46, "Regeln", AMBER, AMBER_L, "= das Modell")
        arrow(d, 146, y + 23, 248, y + 45)
        arrow(d, 146, y + 81, 248, y + 60)
        arrow(d, 382, y + 52, 468, y + 52)
        for (x1, y1, x2, y2, off) in [(146, y + 23, 248, y + 45, 0.25), (146, y + 81, 248, y + 60, 0.25), (382, y + 52, 468, y + 52, 0.75)]:
            tt = (t + off) % 1
            d.ellipse(p(x1 + (x2 - x1) * tt - 5, y1 + (y2 - y1) * tt - 5, x1 + (x2 - x1) * tt + 5, y1 + (y2 - y1) * tt + 5), fill=AMBER)
        frames.append(finish(img))
    save(frames, "programmieren-vs-lernen.gif", 55)


# ---------------------------------------------------------------- 3 Ueberwachtes Lernen (Perzeptron)
def plot_area(d, x0, y0, x1, y1, xl, yl):
    for k in range(6):
        gx = x0 + (x1 - x0) * k / 5
        gy = y0 + (y1 - y0) * k / 5
        d.line(p(gx, y0, gx, y1), fill=GRID, width=S)
        d.line(p(x0, gy, x1, gy), fill=GRID, width=S)
    d.line(p(x0, y1, x1, y1), fill=GREY, width=S)
    d.line(p(x0, y0, x0, y1), fill=GREY, width=S)
    text(d, ((x0 + x1) / 2, y1 + 16), xl, 12, False, MUTED, "mm")
    tmp = Image.new("RGBA", (200 * S, 24 * S), (0, 0, 0, 0))
    ImageDraw.Draw(tmp).text((0, 0), yl, font=font(12), fill=MUTED)
    return tmp.rotate(90, expand=True)


def gif_ueberwacht():
    rnd = random.Random(4)
    pts = []
    for _ in range(18):
        pts.append((rnd.uniform(0.08, 0.45), rnd.uniform(0.1, 0.55), 1))  # Spam: wenige Woerter, viele Links? -> Klasse A
    for _ in range(18):
        pts.append((rnd.uniform(0.5, 0.92), rnd.uniform(0.45, 0.92), 0))
    # Perzeptron trainieren und Zustaende merken
    w = [0.2, -1.0, 0.1]  # w0 + w1*x + w2*y
    states = [list(w)]
    lr = 0.6
    for epoch in range(12):
        changed = False
        for (x, y, c) in pts:
            target = 1 if c == 1 else -1
            out = 1 if (w[0] + w[1] * x + w[2] * y) > 0 else -1
            if out != target:
                w = [w[0] + lr * target, w[1] + lr * target * x, w[2] + lr * target * y]
                states.append(list(w))
                changed = True
        if not changed:
            break
    x0, y0, x1, y1 = 70, 40, 400, 320

    def tx(x):
        return x0 + x * (x1 - x0)

    def ty(y):
        return y1 - y * (y1 - y0)

    def errors(wv):
        return sum(1 for (x, y, c) in pts if ((wv[0] + wv[1] * x + wv[2] * y) > 0) != (c == 1))

    frames, durs = [], []
    seq = []
    for a, b in zip(states[:-1], states[1:]):
        for k in range(6):
            t = ease(k / 5)
            seq.append([a[j] + (b[j] - a[j]) * t for j in range(3)])
    seq = [states[0]] * 8 + seq + [states[-1]] * 30
    for idx, wv in enumerate(seq):
        img, d = canvas()
        lab = plot_area(d, x0, y0, x1, y1, "Anzahl Links in der Mail", "")
        img.paste(lab, (int((x0 - 34) * S), int(110 * S)), lab)
        text(d, (x0 - 44, 180), "Wörter wie »gratis«", 12, False, MUTED, "mm") if False else None
        # Linie w0 + w1 x + w2 y = 0
        if abs(wv[2]) > 1e-6:
            xa, xb = 0.0, 1.0
            ya = -(wv[0] + wv[1] * xa) / wv[2]
            yb = -(wv[0] + wv[1] * xb) / wv[2]
            d.line(p(tx(xa), ty(ya), tx(xb), ty(yb)), fill=TEAL, width=3 * S)
        else:
            xv = -wv[0] / wv[1]
            d.line(p(tx(xv), ty(0), tx(xv), ty(1)), fill=TEAL, width=3 * S)
        # Clip-Rahmen
        d.rectangle(p(0, 0, W, y0 - 1), fill=BG)
        d.rectangle(p(0, y1 + 1, W, H), fill=BG)
        d.rectangle(p(x1 + 1, 0, W, H), fill=BG)
        d.rectangle(p(0, 0, x0 - 1, H), fill=BG)
        d.line(p(x0, y1, x1, y1), fill=GREY, width=S)
        d.line(p(x0, y0, x0, y1), fill=GREY, width=S)
        text(d, ((x0 + x1) / 2, y1 + 16), "Anzahl Links in der Mail  →", 12, False, MUTED, "mm")
        tmp = Image.new("RGBA", (220 * S, 20 * S), (0, 0, 0, 0))
        ImageDraw.Draw(tmp).text((0, 0), "Werbewörter in der Mail  →", font=font(12), fill=MUTED)
        tmp = tmp.rotate(90, expand=True)
        img.paste(tmp, (int(42 * S), int(80 * S)), tmp)
        for (x, y, c) in pts:
            wrong = ((wv[0] + wv[1] * x + wv[2] * y) > 0) != (c == 1)
            col = CORAL if c == 1 else TEAL
            r = 6
            if c == 1:
                d.rectangle(p(tx(x) - r, ty(y) - r, tx(x) + r, ty(y) + r), fill=col)
            else:
                d.ellipse(p(tx(x) - r, ty(y) - r, tx(x) + r, ty(y) + r), fill=col)
            if wrong:
                d.ellipse(p(tx(x) - 11, ty(y) - 11, tx(x) + 11, ty(y) + 11), outline=AMBER, width=2 * S)
        e = errors(wv)
        text(d, (430, 60), "Überwachtes Lernen", 17, True, INK)
        text(d, (430, 92), "Jede Mail hat ein Label:", 13, False, MUTED)
        d.rectangle(p(432, 116, 444, 128), fill=CORAL)
        text(d, (452, 122), "Spam", 13, False, INK, "lm")
        d.ellipse(p(522, 116, 534, 128), fill=TEAL)
        text(d, (542, 122), "kein Spam", 13, False, INK, "lm")
        text(d, (430, 160), "Die Linie ist das Modell.", 13, False, INK)
        text(d, (430, 180), "Bei jedem Fehler wird", 13, False, INK)
        text(d, (430, 200), "sie ein Stück verschoben.", 13, False, INK)
        d.ellipse(p(432, 236, 450, 254), outline=AMBER, width=2 * S)
        text(d, (458, 245), "falsch eingeordnet", 13, False, INK, "lm")
        text(d, (430, 286), f"Fehler: {e}", 26, True, CORAL if e else TEAL)
        if e == 0:
            text(d, (430, 318), "Alle Beispiele richtig!", 13, True, TEAL)
        frames.append(finish(img))
        durs.append(90)
    durs[-1] = 2500
    save(frames, "ueberwachtes-lernen.gif", durs)


# ---------------------------------------------------------------- 4 Unueberwachtes Lernen (k-Means)
def gif_unueberwacht():
    rnd = random.Random(7)
    centers_true = [(0.22, 0.72), (0.75, 0.75), (0.5, 0.22)]
    pts = []
    for (cx, cy) in centers_true:
        for _ in range(16):
            pts.append((cx + rnd.gauss(0, 0.07), cy + rnd.gauss(0, 0.07)))
    cols = [TEAL, AMBER, VIOLET]
    cents = [(0.15, 0.15), (0.3, 0.2), (0.85, 0.3)]
    x0, y0, x1, y1 = 40, 36, 380, 330

    def tx(x):
        return x0 + x * (x1 - x0)

    def ty(y):
        return y1 - y * (y1 - y0)

    def assign(cs):
        out = []
        for (x, y) in pts:
            dist = [(x - c[0]) ** 2 + (y - c[1]) ** 2 for c in cs]
            out.append(dist.index(min(dist)))
        return out

    history = [list(cents)]
    for _ in range(6):
        a = assign(cents)
        new = []
        for k in range(3):
            mem = [pts[i] for i in range(len(pts)) if a[i] == k]
            new.append((sum(m[0] for m in mem) / len(mem), sum(m[1] for m in mem) / len(mem)) if mem else cents[k])
        cents = new
        history.append(list(cents))

    frames, durs = [], []

    def draw(cs, colored, phase, step):
        img, d = canvas()
        for k in range(6):
            gx = x0 + (x1 - x0) * k / 5
            gy = y0 + (y1 - y0) * k / 5
            d.line(p(gx, y0, gx, y1), fill=GRID, width=S)
            d.line(p(x0, gy, x1, gy), fill=GRID, width=S)
        a = assign(cs)
        for i, (x, y) in enumerate(pts):
            c = mix(GREY, cols[a[i]], colored)
            d.ellipse(p(tx(x) - 5, ty(y) - 5, tx(x) + 5, ty(y) + 5), fill=c)
        if step >= 0:
            for k, (cx, cy) in enumerate(cs):
                X, Y = tx(cx), ty(cy)
                d.line(p(X - 11, Y - 11, X + 11, Y + 11), fill=INK, width=5 * S)
                d.line(p(X - 11, Y + 11, X + 11, Y - 11), fill=INK, width=5 * S)
                d.line(p(X - 10, Y - 10, X + 10, Y + 10), fill=cols[k], width=3 * S)
                d.line(p(X - 10, Y + 10, X + 10, Y - 10), fill=cols[k], width=3 * S)
        text(d, (410, 56), "Unüberwachtes Lernen", 17, True, INK)
        text(d, (410, 86), "Kundendaten ohne Label.", 13, False, MUTED)
        text(d, (410, 106), "Der Algorithmus k-Means", 13, False, MUTED)
        text(d, (410, 126), "sucht selbst 3 Gruppen.", 13, False, MUTED)
        lines = [
            ("1", "Mittelpunkte (Kreuze) raten"),
            ("2", "Jeden Punkt dem nächsten"),
            ("", "Kreuz zuordnen"),
            ("3", "Kreuz in die Mitte seiner"),
            ("", "Gruppe schieben"),
            ("4", "Wiederholen, bis nichts"),
            ("", "sich mehr ändert"),
        ]
        yy = 166
        for num, s in lines:
            active = (num == "1" and phase == 1) or (num == "2" and phase == 2) or (num == "3" and phase == 3) or (num == "4" and phase == 4)
            if num:
                d.ellipse(p(410, yy - 9, 428, yy + 9), fill=AMBER if active else GRID)
                text(d, (419, yy), num, 11, True, (255, 255, 255) if active else MUTED, "mm")
            text(d, (436, yy), s, 13, active, INK if active else MUTED, "lm")
            yy += 22 if num == "" else 24
        text(d, (410, 342), f"Durchlauf {max(step, 0)}", 13, True, MUTED)
        return finish(img)

    for _ in range(10):
        frames.append(draw(history[0], 0, 0, -1)); durs.append(100)
    for _ in range(8):
        frames.append(draw(history[0], 0, 1, 0)); durs.append(100)
    for it in range(len(history) - 1):
        for k in range(6):
            frames.append(draw(history[it], ease(k / 5) if it == 0 else 1, 2, it + 1)); durs.append(80)
        for k in range(10):
            t = ease(k / 9)
            cs = [(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t) for a, b in zip(history[it], history[it + 1])]
            frames.append(draw(cs, 1, 3, it + 1)); durs.append(70)
        if history[it] == history[it + 1]:
            break
    for _ in range(4):
        frames.append(draw(history[-1], 1, 4, len(history) - 1)); durs.append(120)
    durs[-1] = 2600
    save(frames, "unueberwachtes-lernen.gif", durs)


# ---------------------------------------------------------------- 5 Reinforcement Learning
def gif_reinforcement():
    N = 5
    cell = 56
    gx0, gy0 = 40, 50
    goal = (4, 0)
    trap = [(2, 1), (3, 3), (1, 3)]
    wall = [(2, 2)]
    episodes = [
        ("Episode 1: ausprobieren", [(0, 4), (1, 4), (1, 3)], -10),
        ("Episode 2: anderer Weg", [(0, 4), (0, 3), (0, 2), (1, 2), (1, 1), (2, 1)], -10),
        ("Episode 3: Ziel gefunden", [(0, 4), (0, 3), (0, 2), (1, 2), (1, 1), (1, 0), (2, 0), (3, 0), (4, 0)], 10),
        ("Episode 20: gelernter Weg", [(0, 4), (0, 3), (0, 2), (0, 1), (0, 0), (1, 0), (2, 0), (3, 0), (4, 0)], 10),
    ]
    frames, durs = [], []
    total = 0
    learned = {}

    def draw(title, path_so_far, pos, score_txt, flash=None):
        img, d = canvas()
        for r in range(N):
            for c in range(N):
                x, y = gx0 + c * cell, gy0 + r * cell
                fill = (255, 255, 255)
                if (c, r) in learned:
                    fill = mix((255, 255, 255), TEAL_L, min(1, learned[(c, r)]))
                if (c, r) == goal:
                    fill = TEAL_L
                if (c, r) in trap:
                    fill = CORAL_L
                if (c, r) in wall:
                    fill = GREY
                d.rectangle(p(x, y, x + cell, y + cell), fill=fill, outline=GRID, width=S)
                if (c, r) == goal:
                    text(d, (x + cell / 2, y + cell / 2 - 6), "Ziel", 12, True, TEAL, "mm")
                    text(d, (x + cell / 2, y + cell / 2 + 12), "+10", 12, True, TEAL, "mm")
                if (c, r) in trap:
                    text(d, (x + cell / 2, y + cell / 2), "−10", 13, True, CORAL, "mm")
        for a, b in zip(path_so_far[:-1], path_so_far[1:]):
            d.line(p(gx0 + a[0] * cell + cell / 2, gy0 + a[1] * cell + cell / 2,
                     gx0 + b[0] * cell + cell / 2, gy0 + b[1] * cell + cell / 2), fill=AMBER, width=3 * S)
        X, Y = gx0 + pos[0] * cell + cell / 2, gy0 + pos[1] * cell + cell / 2
        d.rounded_rectangle(p(X - 16, Y - 16, X + 16, Y + 16), radius=7 * S, fill=INK)
        d.ellipse(p(X - 9, Y - 6, X - 3, Y), fill=(255, 255, 255))
        d.ellipse(p(X + 3, Y - 6, X + 9, Y), fill=(255, 255, 255))
        d.line(p(X - 7, Y + 7, X + 7, Y + 7), fill=(255, 255, 255), width=2 * S)
        if flash:
            text(d, (X, Y - 28), flash[0], 15, True, flash[1], "mm")
        tx0 = 350
        text(d, (tx0, 56), "Bestärkendes Lernen", 17, True, INK)
        text(d, (tx0, 86), "Der Agent (Roboter) kennt die", 13, False, MUTED)
        text(d, (tx0, 106), "Karte nicht. Er probiert und", 13, False, MUTED)
        text(d, (tx0, 126), "bekommt Belohnung oder Strafe.", 13, False, MUTED)
        text(d, (tx0, 170), title, 14, True, AMBER)
        text(d, (tx0, 200), score_txt, 13, False, INK)
        text(d, (tx0, 250), "Grün getönte Felder:", 13, False, MUTED)
        text(d, (tx0, 270), "dort hat sich Erfolg »gemerkt«.", 13, False, MUTED)
        text(d, (tx0, 310), "Ziel: möglichst viel Belohnung", 13, True, INK)
        text(d, (tx0, 330), "auf lange Sicht.", 13, True, INK)
        return finish(img)

    for title, path, rew in episodes:
        for i in range(1, len(path) + 1):
            frames.append(draw(title, path[:i], path[i - 1], "Schritte: %d" % (i - 1)))
            durs.append(230)
        if rew > 0:
            for cpos in path:
                learned[cpos] = learned.get(cpos, 0) + 0.5
        flash = ("+10 Belohnung", TEAL) if rew > 0 else ("−10 Strafe", CORAL)
        frames.append(draw(title, path, path[-1], "Ergebnis: %+d Punkte" % rew, flash))
        durs.append(1400)
    durs[-1] = 2600
    save(frames, "bestaerkendes-lernen.gif", durs)


# ---------------------------------------------------------------- 6 Regression vs Klassifikation
def gif_regression():
    rnd = random.Random(3)
    pts = []
    for _ in range(14):
        x = rnd.uniform(30, 120)
        y = 200 + 10 * x + rnd.gauss(0, 90)
        pts.append((x, y))
    x0, y0, x1, y1 = 70, 40, 400, 310
    XMIN, XMAX, YMIN, YMAX = 20, 130, 0, 1800

    def tx(x):
        return x0 + (x - XMIN) / (XMAX - XMIN) * (x1 - x0)

    def ty(y):
        return y1 - (y - YMIN) / (YMAX - YMIN) * (y1 - y0)

    # Gradientenabstieg auf normierten Daten fuer anschauliche Bewegung
    a, b = 900.0, 0.0  # y = a + b*(x-75)
    states = [(a, b)]
    for _ in range(45):
        ga = sum(2 * ((a + b * (x - 75)) - y) for x, y in pts) / len(pts)
        gb = sum(2 * ((a + b * (x - 75)) - y) * (x - 75) for x, y in pts) / len(pts)
        a -= 0.04 * ga
        b -= 0.00008 * gb
        states.append((a, b))
    frames, durs = [], []
    seq = [states[0]] * 10 + states + [states[-1]] * 1
    for idx, (a, b) in enumerate(seq):
        img, d = canvas()
        for k in range(6):
            gx = x0 + (x1 - x0) * k / 5
            gy = y0 + (y1 - y0) * k / 5
            d.line(p(gx, y0, gx, y1), fill=GRID, width=S)
            d.line(p(x0, gy, x1, gy), fill=GRID, width=S)
        for v in (40, 80, 120):
            text(d, (tx(v), y1 + 14), f"{v} m²", 11, False, MUTED, "mm")
        for v in (500, 1000, 1500):
            text(d, (x0 - 8, ty(v)), f"{v} €", 11, False, MUTED, "rm")
        mse = 0
        for x, y in pts:
            yh = a + b * (x - 75)
            mse += (y - yh) ** 2
            d.line(p(tx(x), ty(y), tx(x), ty(yh)), fill=CORAL_L, width=2 * S)
        mse /= len(pts)
        d.line(p(tx(XMIN), ty(a + b * (XMIN - 75)), tx(XMAX), ty(a + b * (XMAX - 75))), fill=TEAL, width=3 * S)
        for x, y in pts:
            d.ellipse(p(tx(x) - 5, ty(y) - 5, tx(x) + 5, ty(y) + 5), fill=INK)
        d.rectangle(p(0, 0, W, y0 - 1), fill=BG)
        d.rectangle(p(x1 + 1, 0, W, H), fill=BG)
        text(d, (430, 56), "Regression", 17, True, INK)
        text(d, (430, 86), "Ziel ist eine Zahl:", 13, False, MUTED)
        text(d, (430, 106), "Miete aus Wohnfläche.", 13, False, MUTED)
        text(d, (430, 146), "Rote Striche = Fehler", 13, False, INK)
        text(d, (430, 166), "Die Linie dreht sich, bis", 13, False, INK)
        text(d, (430, 186), "die Fehler klein sind.", 13, False, INK)
        avg = math.sqrt(mse)
        text(d, (430, 230), "Ø Fehler", 13, False, MUTED)
        text(d, (430, 260), f"{avg:,.0f} €".replace(",", "."), 28, True, CORAL if avg > 150 else TEAL, "lm")
        xs = 70
        text(d, (430, 300), f"Vorhersage für {xs} m²:", 13, False, MUTED)
        text(d, (430, 322), f"{a + b * (xs - 75):,.0f} € Miete".replace(",", "."), 15, True, INK)
        frames.append(finish(img))
        durs.append(110)
    durs[-1] = 2600
    save(frames, "regression.gif", durs)


# ---------------------------------------------------------------- 7 Lernschleife
def gif_lernschleife():
    steps = [
        ("1  Beispiel zeigen", "Foto eines Tieres", TEAL, TEAL_L),
        ("2  Modell rät", "»Katze, 60 %«", AMBER, AMBER_L),
        ("3  Mit Lösung vergleichen", "Richtig wäre: Hund", CORAL, CORAL_L),
        ("4  Anpassen", "Stellschrauben drehen", VIOLET, VIOLET_L),
    ]
    cx, cy, R = 222, 190, 112
    pos = [(cx, cy - R), (cx + R * 1.2, cy), (cx, cy + R), (cx - R * 1.2, cy)]
    frames, durs = [], []
    guesses = [("Katze", 60), ("Hund", 55), ("Hund", 78), ("Hund", 93)]
    for rnd_i, (g, conf) in enumerate(guesses):
        for active in range(4):
            for k in range(8):
                img, d = canvas()
                d.ellipse(p(cx - R * 1.2, cy - R, cx + R * 1.2, cy + R), outline=GRID, width=3 * S)
                # Bewegter Punkt
                ang = -math.pi / 2 + (active + k / 8) * math.pi / 2
                px, py = cx + R * 1.2 * math.cos(ang), cy + R * math.sin(ang)
                d.ellipse(p(px - 6, py - 6, px + 6, py + 6), fill=INK)
                for j, (t1, t2, col, colL) in enumerate(steps):
                    x, y = pos[j]
                    on = j == active
                    w, h = 176, 52
                    sub = t2
                    if j == 1:
                        sub = f"»{g}, {conf} %«"
                    if j == 2:
                        sub = "Lösung: Hund – stimmt" if g == "Hund" else "Lösung: Hund – falsch"
                    d.rounded_rectangle(p(x - w / 2, y - h / 2, x + w / 2, y + h / 2), radius=10 * S,
                                        fill=colL if on else (255, 255, 255), outline=col if on else GRID, width=2 * S)
                    text(d, (x, y - 9), t1, 13, True, INK if on else MUTED, "mm")
                    text(d, (x, y + 11), sub, 11, False, INK if on else MUTED, "mm")
                tx0 = 440
                text(d, (tx0, 60), "So lernt ein Modell", 17, True, INK)
                text(d, (tx0, 94), f"Runde {rnd_i + 1} von 4", 13, True, AMBER)
                text(d, (tx0, 130), "Sicherheit für »Hund«:", 13, False, MUTED)
                hund = conf if g == "Hund" else 100 - conf
                d.rounded_rectangle(p(tx0, 150, tx0 + 160, 168), radius=6 * S, fill=GRID)
                d.rounded_rectangle(p(tx0, 150, tx0 + 160 * hund / 100, 168), radius=6 * S, fill=TEAL)
                text(d, (tx0 + 168, 159), f"{hund} %", 12, True, INK, "lm")
                text(d, (tx0, 210), "Tausende Runden mit", 13, False, INK)
                text(d, (tx0, 230), "vielen Beispielen =", 13, False, INK)
                text(d, (tx0, 250), "Training.", 13, True, INK)
                frames.append(finish(img))
                durs.append(90 if k < 7 else 700)
    durs[-1] = 2200
    save(frames, "lernschleife.gif", durs)


if __name__ == "__main__":
    gif_ebenen()
    gif_prog_vs_lernen()
    gif_ueberwacht()
    gif_unueberwacht()
    gif_reinforcement()
    gif_regression()
    gif_lernschleife()
