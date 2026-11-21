"""GIFs für Modul 7 (Neuronale Netze und Deep Learning)."""
import math
import random
from gifkit import *  # noqa: F401,F403

OUT = out_dir(7)


def sig(z):
    return 1 / (1 + math.exp(-z))


# Kleines Netz 2-3-1 ------------------------------------------------------------
X_IN = [1.0, 0.5]
W1 = [[0.8, -0.4], [0.3, 0.9], [-0.6, 0.5]]
B1 = [0.1, -0.2, 0.0]
W2 = [0.7, -0.5, 0.9]
B2 = 0.05
LAYERS = [(80, [140, 240]), (300, [100, 190, 280]), (520, [190])]


def net_values():
    h = []
    for i in range(3):
        z = sum(W1[i][j] * X_IN[j] for j in range(2)) + B1[i]
        h.append(max(0.0, z))
    zo = sum(W2[i] * h[i] for i in range(3)) + B2
    return h, zo, sig(zo)


def draw_net(d, highlight=None, flow=None, t=0.0, wcol=None, back=False):
    h, zo, out = net_values()
    vals = [X_IN, h, [out]]
    # Kanten
    for li in range(2):
        xa, ya = LAYERS[li]
        xb, yb = LAYERS[li + 1]
        for i, y1 in enumerate(ya):
            for j, y2 in enumerate(yb):
                w = W1[j][i] if li == 0 else W2[i]
                base = TEAL if w > 0 else CORAL
                if wcol:
                    base = wcol(li, i, j, base)
                width = max(1, int(abs(w) * 4))
                d.line(p(xa + 26, y1, xb - 26, y2), fill=mix(BG, base, 0.6), width=width * S)
                if flow is not None and flow == li:
                    if back:
                        fx, fy = xb - 26 + (xa + 26 - xb + 26) * t, y2 + (y1 - y2) * t
                        d.ellipse(p(fx - 5, fy - 5, fx + 5, fy + 5), fill=CORAL)
                    else:
                        fx, fy = xa + 26 + (xb - 26 - xa - 26) * t, y1 + (y2 - y1) * t
                        d.ellipse(p(fx - 5, fy - 5, fx + 5, fy + 5), fill=AMBER)
    # Knoten
    for li, (x, ys) in enumerate(LAYERS):
        for i, y in enumerate(ys):
            on = highlight is not None and highlight >= li
            d.ellipse(p(x - 26, y - 26, x + 26, y + 26), fill=TEAL_L if on else WHITE, outline=INK, width=2 * S)
            if on:
                text(d, (x, y), de(vals[li][i], 2), 12, True, INK, "mm")
    text(d, (80, 300), "Eingabe", 12, True, MUTED, "mm")
    text(d, (300, 330), "verborgene Schicht", 12, True, MUTED, "mm")
    text(d, (300, 346), "(ReLU)", 11, False, MUTED, "mm")
    text(d, (520, 300), "Ausgabe", 12, True, MUTED, "mm")
    text(d, (520, 316), "(Sigmoid)", 11, False, MUTED, "mm")


def gif_forward():
    h, zo, out = net_values()
    frames, durs = [], []
    steps = [(0, None, "Eingabe: x₁ = 1,0 und x₂ = 0,5"), (0, 0, "Werte fließen über gewichtete Verbindungen"),
             (1, None, f"Neuron 1: ReLU(0,8·1 − 0,4·0,5 + 0,1) = {de(h[0], 2)}"),
             (1, 1, "Weiter zur Ausgabe"), (2, None, f"Ausgabe: σ(z) = σ({de(zo, 2)}) = {de(out, 2)} → {round(out * 100)} % Wahrscheinlichkeit")]
    for hl, flow, caption in steps:
        for f in range(12):
            img, d = canvas()
            text(d, (24, 24), "Forward Pass: Ein Netz rechnet von links nach rechts", 15, True, INK)
            draw_net(d, highlight=hl, flow=flow, t=ease(f / 11))
            text(d, (24, 54), caption, 13, True, AMBER)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1500
    durs[-1] = 3200
    save(frames, OUT / "forward-pass.gif", durs)


def gif_backprop():
    frames, durs = [], []
    rnd = random.Random(2)
    change = {(li, i, j): rnd.uniform(-1, 1) for li in range(2) for i in range(3) for j in range(3)}
    steps = [("Vorhersage 0,57 – richtig wäre 1,0. Fehler!", None, None, 0),
             ("Der Fehler wird rückwärts verteilt: Wer hat wie viel beigetragen?", 1, True, 0),
             ("…bis zur ersten Schicht (Kettenregel)", 0, True, 0),
             ("Jedes Gewicht wird ein kleines Stück angepasst", None, None, 1)]
    for caption, flow, back, adjust in steps:
        for f in range(14):
            t = ease(f / 13)

            def wcol(li, i, j, base, adjust=adjust, t=t):
                if not adjust:
                    return base
                c = change.get((li, i, j), 0)
                return mix(base, AMBER if c > 0 else VIOLET, 0.6 * t)
            img, d = canvas()
            text(d, (24, 24), "Backpropagation: Der Fehler wandert rückwärts", 15, True, INK)
            draw_net(d, highlight=2, flow=flow, t=t, wcol=wcol, back=bool(back))
            d.rounded_rectangle(p(580, 160, 630, 220), radius=8 * S, fill=CORAL_L, outline=CORAL, width=2 * S)
            text(d, (605, 178), "Ziel", 11, True, CORAL, "mm")
            text(d, (605, 200), "1,0", 13, True, INK, "mm")
            text(d, (24, 54), caption, 13, True, AMBER if not adjust else VIOLET)
            if adjust:
                text(d, (24, 74), "w_neu = w_alt − Lernrate · Gradient", 12, False, INK)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1500
    durs[-1] = 3200
    save(frames, OUT / "backpropagation.gif", durs)


# Aktivierungsfunktionen ----------------------------------------------------------
def gif_aktivierung():
    funcs = [("Sigmoid", sig, (0, 1), "0 bis 1 – Ausgabe bei Ja/Nein", TEAL),
             ("Tanh", math.tanh, (-1, 1), "−1 bis 1 – nullzentriert", VIOLET),
             ("ReLU", lambda z: max(0, z), (-1, 5), "0 bis ∞ – Standard in verborgenen Schichten", AMBER),
             ("Leaky ReLU", lambda z: z if z > 0 else 0.1 * z, (-1, 5), "wie ReLU, aber kleine Steigung links", CORAL)]
    frames, durs = [], []
    x0, y0, x1, y1 = 60, 70, 380, 320
    for name, f, (lo, hi), desc, col in funcs:
        for k in range(16):
            t = ease(k / 15)
            img, d = canvas()
            text(d, (24, 26), "Aktivierungsfunktionen: Der Knick, der Netze klug macht", 15, True, INK)
            d.rectangle(p(x0, y0, x1, y1), outline=GRID, width=S)
            X = lambda z: x0 + (z + 5) / 10 * (x1 - x0)
            Y = lambda v: y1 - (v - lo) / (hi - lo) * (y1 - y0)
            d.line(p(X(0), y0, X(0), y1), fill=GRID, width=S)
            if lo < 0 < hi:
                d.line(p(x0, Y(0), x1, Y(0)), fill=GRID, width=S)
            n = int(200 * t) + 2
            pts = [p(X(-5 + i / 200 * 10), Y(max(lo, min(hi, f(-5 + i / 200 * 10))))) for i in range(n)]
            d.line(pts, fill=col, width=4 * S)
            text(d, (x0 - 6, Y(hi)), de(hi, 0), 11, False, MUTED, "rm")
            text(d, (x0 - 6, Y(lo)), de(lo, 0), 11, False, MUTED, "rm")
            text(d, ((x0 + x1) / 2, y1 + 16), "Eingabe z (von −5 bis 5)", 11, False, MUTED, "mm")
            tx = 410
            text(d, (tx, 90), name, 24, True, col)
            yy = wrap_text(d, tx, 130, desc, 26, 13, False, INK)
            text(d, (tx, 240), "Ohne nichtlineare Aktivierung", 12, False, MUTED)
            text(d, (tx, 258), "wäre jedes noch so tiefe Netz", 12, False, MUTED)
            text(d, (tx, 276), "nur eine gerade Linie.", 12, False, MUTED)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1600
    durs[-1] = 2600
    save(frames, OUT / "aktivierungsfunktionen.gif", durs)


# Faltung -------------------------------------------------------------------------
def gif_faltung():
    img_ = [[0, 0, 0, 1, 1, 1],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 0, 1, 1, 1]]
    k = [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]]
    out = [[sum(img_[r + a][c + b] * k[a][b] for a in range(3) for b in range(3)) for c in range(4)] for r in range(4)]
    cs = 36
    ix, iy = 30, 80
    ox, oy = 440, 116
    frames, durs = [], []
    for pos in range(17):
        img, d = canvas()
        text(d, (24, 26), "Faltung (Convolution): Ein Filter gleitet über das Bild", 15, True, INK)
        text(d, (ix, iy - 14), "Bild 6×6 (0 = dunkel, 1 = hell)", 11, False, MUTED, "lm")
        for r in range(6):
            for c in range(6):
                v = img_[r][c]
                d.rectangle(p(ix + c * cs, iy + r * cs, ix + (c + 1) * cs, iy + (r + 1) * cs), fill=(230, 233, 232) if v else (90, 100, 110), outline=GRID, width=S)
                text(d, (ix + c * cs + cs / 2, iy + r * cs + cs / 2), str(v), 11, True, INK if v else WHITE, "mm")
        # Filter
        text(d, (270, 80), "Filter 3×3", 11, True, AMBER, "lm")
        for a in range(3):
            for b in range(3):
                d.rectangle(p(270 + b * 28, 92 + a * 28, 270 + (b + 1) * 28, 92 + (a + 1) * 28), fill=AMBER_L, outline=AMBER, width=S)
                text(d, (270 + b * 28 + 14, 92 + a * 28 + 14), str(k[a][b]), 11, True, INK, "mm")
        text(d, (270, 190), "erkennt senkrechte", 11, False, MUTED, "lm")
        text(d, (270, 206), "Kanten (dunkel → hell)", 11, False, MUTED, "lm")
        text(d, (ox, oy - 14), "Merkmalskarte 4×4", 11, False, MUTED, "lm")
        cur = min(pos, 15)
        r0, c0 = cur // 4, cur % 4
        if pos < 16:
            d.rectangle(p(ix + c0 * cs, iy + r0 * cs, ix + (c0 + 3) * cs, iy + (r0 + 3) * cs), outline=AMBER, width=4 * S)
        for idx in range(16):
            r, c = idx // 4, idx % 4
            filled = idx <= cur if pos < 16 else True
            v = out[r][c]
            fill = mix(WHITE, TEAL, min(1, v / 3)) if filled else WHITE
            d.rectangle(p(ox + c * cs, oy + r * cs, ox + (c + 1) * cs, oy + (r + 1) * cs), fill=fill, outline=GRID, width=S)
            if filled:
                text(d, (ox + c * cs + cs / 2, oy + r * cs + cs / 2), str(v), 12, True, INK if v < 2 else WHITE, "mm")
        if pos < 16:
            vals = [img_[r0 + a][c0 + b] * k[a][b] for a in range(3) for b in range(3)]
            text(d, (ix, 312), f"Summe der 9 Produkte (Bild × Filter) = {out[r0][c0]}", 13, True, INK, "lm")
        else:
            text(d, (ix, 312), "Hohe Werte genau dort, wo im Bild eine senkrechte Kante ist.", 13, True, TEAL, "lm")
            text(d, (ix, 334), "Das Netz lernt die Filterwerte selbst – für Kanten, Kurven, später ganze Formen.", 12, False, MUTED, "lm")
        frames.append(finish(img)); durs.append(320 if pos < 16 else 3800)
    save(frames, OUT / "faltung-cnn.gif", durs)


# RNN / Gedächtnis ----------------------------------------------------------------
def gif_rnn():
    words = ["Der", "Umsatz", "stieg", "im", "Dezember", "stark"]
    frames, durs = [], []
    for i in range(len(words) + 1):
        for f in range(12):
            t = ease(f / 11)
            img, d = canvas()
            text(d, (24, 26), "Rekurrentes Netz: Das Gedächtnis wird Wort für Wort weitergereicht", 14, True, INK)
            for j in range(len(words)):
                x = 50 + j * 96
                a = 1 if j < i else (t if j == i else 0)
                if a <= 0.02:
                    d.rounded_rectangle(p(x, 240, x + 76, 274), radius=8 * S, outline=GRID, width=S)
                    continue
                d.rounded_rectangle(p(x, 240, x + 76, 274), radius=8 * S, fill=mix(BG, AMBER_L, a), outline=mix(BG, AMBER, a), width=S)
                text(d, (x + 38, 257), words[j], 12, True, mix(BG, INK, a), "mm")
                d.line(p(x + 38, 240, x + 38, 196), fill=mix(BG, GREY, a), width=2 * S)
                d.rounded_rectangle(p(x + 8, 140, x + 68, 196), radius=10 * S, fill=mix(BG, TEAL_L, a), outline=mix(BG, TEAL, a), width=2 * S)
                text(d, (x + 38, 160), "Zelle", 11, True, mix(BG, INK, a), "mm")
                # Gedächtnisbalken: wächst
                fill_h = 4 + 2 * min(j + 1, 6)
                d.rectangle(p(x + 22, 190 - fill_h, x + 54, 190), fill=mix(BG, TEAL, a * 0.7))
                if j > 0:
                    arrow(d, x - 28, 168, x + 6, 168, mix(BG, TEAL, a))
            if i >= len(words):
                d.rounded_rectangle(p(50, 70, 620, 118), radius=10 * S, fill=VIOLET_L, outline=VIOLET, width=2 * S)
                text(d, (335, 86), "Vorhersage nächstes Wort: „an“ / Prognose: Umsatz Januar", 13, True, INK, "mm")
                text(d, (335, 104), "Die letzte Zelle kennt den ganzen Satz – über ihr Gedächtnis (hidden state).", 11, False, MUTED, "mm")
            text(d, (24, 310), "Problem einfacher RNNs: Das Gedächtnis verblasst über lange Strecken.", 12, False, INK)
            text(d, (24, 330), "LSTM und GRU haben Tore (Gates), die entscheiden, was behalten und was vergessen wird.", 12, False, MUTED)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 700
    durs[-1] = 3400
    save(frames, OUT / "rnn-gedaechtnis.gif", durs)


# Attention -------------------------------------------------------------------------
def gif_attention():
    words = ["Die", "Katze", "jagte", "die", "Maus", ",", "weil", "sie", "hungrig", "war"]
    weights = {"Die": 0.02, "Katze": 0.62, "jagte": 0.06, "die": 0.01, "Maus": 0.18, ",": 0.0, "weil": 0.02, "sie": 0.05, "hungrig": 0.03, "war": 0.01}
    xs = []
    x = 30
    widths = []
    for w in words:
        wd = 14 + len(w) * 9
        xs.append(x); widths.append(wd)
        x += wd + 8
    frames, durs = [], []
    q = words.index("sie")
    for phase in range(3):
        for f in range(16):
            t = ease(f / 15)
            img, d = canvas()
            text(d, (24, 26), "Attention: Jedes Wort entscheidet, auf welche anderen es achtet", 15, True, INK)
            y = 250
            for i, w in enumerate(words):
                hl = i == q
                fill = AMBER_L if hl else WHITE
                if phase >= 2 and not hl:
                    fill = mix(WHITE, TEAL, min(1, weights[w] * 1.4) * t)
                d.rounded_rectangle(p(xs[i], y, xs[i] + widths[i], y + 34), radius=8 * S, fill=fill, outline=AMBER if hl else GRID, width=2 * S)
                white = phase >= 2 and t > 0.6 and weights.get(w, 0) >= 0.4 and not hl
                text(d, (xs[i] + widths[i] / 2, y + 17), w, 13, True, WHITE if white else INK, "mm")
            if phase >= 1:
                qx = xs[q] + widths[q] / 2
                for i, w in enumerate(words):
                    if i == q:
                        continue
                    wt = weights[w]
                    a = t if phase == 1 else 1
                    cx = xs[i] + widths[i] / 2
                    mid = (qx + cx) / 2
                    hgt = 60 + abs(qx - cx) * 0.25
                    pts = []
                    for s in range(21):
                        u = s / 20
                        px_ = (1 - u) ** 2 * qx + 2 * (1 - u) * u * mid + u * u * cx
                        py_ = (1 - u) ** 2 * y + 2 * (1 - u) * u * (y - hgt) + u * u * y
                        pts.append(p(px_, py_))
                    width = max(1, int(1 + wt * 14 * a))
                    d.line(pts, fill=mix(BG, TEAL, 0.25 + 0.75 * min(1, wt * 1.5)), width=width * S)
            if phase >= 2:
                text(d, (24, 310), "„sie“ bezieht sich vor allem auf „Katze“ (62 %) – nicht auf „Maus“ (18 %).", 13, True, TEAL)
                text(d, (24, 332), "Ein Transformer berechnet diese Gewichte für jedes Wort gleichzeitig – das macht ihn schnell und stark.", 12, False, MUTED)
            elif phase == 1:
                text(d, (24, 310), "Das Wort „sie“ fragt alle anderen Wörter: Wie wichtig bist du für mich?", 13, True, INK)
            else:
                text(d, (24, 310), "Worauf bezieht sich „sie“?", 13, True, INK)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1600
    durs[-1] = 3800
    save(frames, OUT / "attention.gif", durs)


if __name__ == "__main__":
    gif_forward()
    gif_backprop()
    gif_aktivierung()
    gif_faltung()
    gif_rnn()
    gif_attention()
