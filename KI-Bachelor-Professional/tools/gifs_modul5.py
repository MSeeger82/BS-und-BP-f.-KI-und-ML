"""Erklär-GIFs für Modul 5: Neuronale Netze und Deep Learning."""
import math
import random

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes, cell, de)

NR = 5


def neuron():
    """Eingaben × Gewichte → Summe + Bias → ReLU → Ausgabe."""
    xs = [2.0, 1.0, 3.0]
    ws = [0.5, -1.0, 0.25]
    b = 0.5
    z = sum(x * w for x, w in zip(xs, ws)) + b
    out = max(0, z)
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Ein künstliches Neuron")
        st = min(4, i // 14)
        for k, (x, w) in enumerate(zip(xs, ws)):
            y = 90 + k * 80
            box(d, 30, y - 20, 90, 40, f"x{k + 1} = {de(x, 0)}", SKY, SKY_L, size=13)
            col = TEAL if w > 0 else CORAL
            t = ease((i - k * 4) / 12)
            d.line(p(120, y, 120 + 150 * t, y + (190 - y) * t), fill=col, width=int(2 + abs(w) * 4) * 2)
            text(d, (175, y + (190 - y) * .35 - 14), f"w = {de(w, 2)}", 12, True, col, "mm")
        d.ellipse(p(270, 150, 350, 230), fill=VIOLET_L, outline=VIOLET, width=3 * 2)
        text(d, (310, 182), "Σ + b", 15, True, INK, "mm")
        text(d, (310, 204), f"b = {de(b, 1)}", 11, False, MUTED, "mm")
        if st >= 2:
            text(d, (30, 340), f"z = 2·0,5 + 1·(−1) + 3·0,25 + 0,5 = {de(z, 2)}", 13, True, INK)
        if st >= 3:
            arrow(d, 352, 190, 420, 190, VIOLET)
            box(d, 424, 160, 90, 60, "ReLU", AMBER, AMBER_L, "max(0, z)")
        if st >= 4:
            arrow(d, 516, 190, 560, 190, AMBER)
            text(d, (566, 190), de(out, 2), 18, True, TEAL, "lm")
        a.frame(img, 80)
    a.hold(3200)
    a.save(NR, "neuron.gif")


def aktivierungen():
    """Sigmoid, tanh, ReLU nacheinander gezeichnet."""
    funcs = [("Sigmoid", lambda z: 1 / (1 + math.exp(-z)), VIOLET, "0 bis 1, Wahrscheinlichkeit"),
             ("tanh", math.tanh, SKY, "−1 bis 1"),
             ("ReLU", lambda z: max(0.0, z), AMBER, "0 oder z – Standard in tiefen Netzen")]
    a = Anim()
    for i in range(75):
        img, d = canvas()
        title(d, "Aktivierungsfunktionen: die Kennlinie des Neurons")
        X0, Y0, X1, Y1 = 60, 60, 580, 320
        cx, cy = (X0 + X1) / 2, (Y0 + Y1) / 2 + 40
        d.line(p(X0, cy, X1, cy), fill=GRID, width=2)
        d.line(p(cx, Y0, cx, Y1), fill=GRID, width=2)
        for k, (name, f, col, sub) in enumerate(funcs):
            t = ease((i - k * 20) / 16)
            if t <= 0:
                continue
            n = int(200 * t) + 1
            pts = []
            for j in range(n):
                z = -4 + 8 * j / 200
                v = f(z)
                pts.append(p(cx + z * 60, max(Y0, cy - v * 80)))  # oben abschneiden, damit ReLU im Bild bleibt
            if len(pts) > 1:
                d.line(pts, fill=col, width=3 * 2)
            text(d, (X0 + 4, 74 + k * 22), f"{name}: {sub}", 13, True, col)
        a.frame(img, 70)
    a.hold(3000)
    a.save(NR, "aktivierungen.gif")


def layers():
    return [3, 5, 4, 2]


def netz_pos():
    pos = []
    L = layers()
    for li, n in enumerate(L):
        x = 90 + li * 150
        col = []
        for k in range(n):
            y = 190 + (k - (n - 1) / 2) * 52
            col.append((x, y))
        pos.append(col)
    return pos


def vorwaerts():
    """Signal läuft Schicht für Schicht durch ein Netz."""
    pos = netz_pos()
    random.seed(1)
    a = Anim()
    for i in range(70):
        img, d = canvas()
        title(d, "Vorwärtsdurchlauf: Eingabe → verdeckte Schichten → Ausgabe")
        front = i / 14
        for li in range(len(pos) - 1):
            on = front > li + .3
            for (x1, y1) in pos[li]:
                for (x2, y2) in pos[li + 1]:
                    d.line(p(x1, y1, x2, y2), fill=mix(GRID, TEAL, .6) if on else GRID, width=2)
        for li, col in enumerate(pos):
            on = front > li
            c = [SKY, VIOLET, VIOLET, AMBER][li]
            for (x, y) in col:
                d.ellipse(p(x - 15, y - 15, x + 15, y + 15), fill=mix(WHITE, c, .85 if on else .1), outline=c, width=2 * 2)
        names = ["Eingabe", "verdeckt 1", "verdeckt 2", "Ausgabe"]
        for li, n in enumerate(names):
            text(d, (pos[li][0][0], 330), n, 12, True, MUTED, "mm")
        if front > 3.6:
            text(d, (pos[3][0][0] + 22, pos[3][0][1]), "Katze 0,91", 12, True, AMBER, "lm")
            text(d, (pos[3][1][0] + 22, pos[3][1][1]), "Hund 0,09", 12, False, MUTED, "lm")
        caption(d, "")
        a.frame(img, 80)
    a.hold(2800)
    a.save(NR, "vorwaerts.gif")


def backprop():
    """Fehler am Ausgang, rückwärts durch die Schichten; Gewichte werden angepasst."""
    pos = netz_pos()
    a = Anim()
    random.seed(4)
    widths = {}
    for li in range(len(pos) - 1):
        for k1 in range(len(pos[li])):
            for k2 in range(len(pos[li + 1])):
                widths[(li, k1, k2)] = random.choice([1, 2, 3])
    for i in range(70):
        img, d = canvas()
        title(d, "Backpropagation: Fehler rückwärts verteilen, Gewichte anpassen")
        back = 3 - i / 14
        for li in range(len(pos) - 1):
            hit = back < li + 1
            for k1, (x1, y1) in enumerate(pos[li]):
                for k2, (x2, y2) in enumerate(pos[li + 1]):
                    w = widths[(li, k1, k2)]
                    if hit:
                        w = max(1, w + (1 if (k1 + k2) % 2 else -1))
                    d.line(p(x1, y1, x2, y2), fill=mix(GRID, CORAL, .7) if hit else GRID, width=w * 2)
        for li, col in enumerate(pos):
            c = [SKY, VIOLET, VIOLET, AMBER][li]
            for (x, y) in col:
                d.ellipse(p(x - 15, y - 15, x + 15, y + 15), fill=mix(WHITE, c, .4), outline=c, width=2 * 2)
        box(d, 520, 60, 110, 44, "Fehler", CORAL, CORAL_L, "Soll − Ist")
        if back < 3:
            arrow(d, 540, 110, 120 + max(0, back) * 150, 110, CORAL, 2)
        text(d, (24, 330), "Kettenregel: Wie stark hat jedes Gewicht zum Fehler beigetragen?", 13, True, INK)
        a.frame(img, 80)
    a.hold(2800)
    a.save(NR, "backprop.gif")


def cnn_filter():
    """3×3-Filter gleitet über ein 8×8-Bild und erzeugt eine Merkmalskarte (Kantenerkennung)."""
    img_px = [[1 if c >= 4 else 0 for c in range(8)] for r in range(8)]  # senkrechte Kante
    k = [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]]
    fm = [[sum(img_px[r + i][c + j] * k[i][j] for i in range(3) for j in range(3)) for c in range(6)] for r in range(6)]
    a = Anim()
    pos = [(r, c) for r in range(6) for c in range(6)]
    for step in range(len(pos) + 10):
        img, d = canvas()
        title(d, "Faltung (CNN): ein Filter sucht ein Muster im Bild")
        S_ = 28
        X0, Y0 = 30, 70
        for r in range(8):
            for c in range(8):
                v = img_px[r][c]
                d.rectangle(p(X0 + c * S_, Y0 + r * S_, X0 + c * S_ + S_ - 2, Y0 + r * S_ + S_ - 2), fill=(70, 80, 90) if v else (235, 238, 236))
        if step < len(pos):
            r0, c0 = pos[step]
            d.rectangle(p(X0 + c0 * S_ - 2, Y0 + r0 * S_ - 2, X0 + (c0 + 3) * S_, Y0 + (r0 + 3) * S_), outline=AMBER, width=3 * 2)
        # Filter
        text(d, (300, 70), "Filter 3×3", 13, True, AMBER)
        for i in range(3):
            for j in range(3):
                cell(d, 300 + j * 28, 90 + i * 28, 28, 28, str(k[i][j]), fill=AMBER_L, size=12)
        # Merkmalskarte
        text(d, (420, 70), "Merkmalskarte", 13, True, TEAL)
        done = min(step + 1, len(pos))
        for idx in range(done):
            r, c = pos[idx]
            v = fm[r][c]
            fill = mix(WHITE, TEAL, min(1, abs(v) / 3))
            cell(d, 420 + c * 32, 90 + r * 32, 32, 32, str(v), fill=fill, size=11)
        caption(d, "Hohe Werte = hier passt das Muster (eine senkrechte Kante)")
        a.frame(img, 110 if step < len(pos) else 200)
    a.hold(3000)
    a.save(NR, "cnn-filter.gif")


def attention():
    """Satz; das Wort „sie“ schaut auf die anderen Wörter, stärkste Verbindung zu „Maschine“."""
    words = ["Die", "Maschine", "stoppte,", "weil", "sie", "überhitzte."]
    att = [0.02, 0.71, 0.06, 0.03, 0.08, 0.10]
    a = Anim()
    for i in range(60):
        t = ease(i / 30)
        img, d = canvas()
        title(d, "Attention: Welche Wörter sind für dieses Wort wichtig?")
        xs = []
        x = 40
        for w in words:
            wid = 30 + len(w) * 9
            xs.append(x + wid / 2)
            hl = w == "sie"
            box(d, x, 230, wid, 40, w, VIOLET if hl else GREY, VIOLET_L if hl else WHITE, size=14)
            x += wid + 12
        src = xs[4]
        for k, (xx, a_) in enumerate(zip(xs, att)):
            if k == 4:
                continue
            h = 60 + 100 * a_
            col = mix(GRID, CORAL, min(1, a_ * 1.4))
            pts = [(src + (xx - src) * s / 20, 230 - math.sin(math.pi * s / 20) * h * t) for s in range(21)]
            d.line([p(*q) for q in pts], fill=col, width=max(1, int(a_ * 10)) * 2)
            if t > .9:
                text(d, ((src + xx) / 2, 230 - h - 12), de(a_, 2), 12, True, col, "mm")
        caption(d, "„sie“ bezieht sich auf „Maschine“ – das Modell lernt solche Bezüge selbst")
        a.frame(img, 80)
    a.hold(3000)
    a.save(NR, "attention.gif")


def naechstes_token():
    """Wahrscheinlichkeiten für das nächste Token; Temperatur verändert die Verteilung."""
    toks = ["Kaffee", "Tee", "Wasser", "Milch", "Saft"]
    logits = [3.0, 2.2, 1.0, 0.6, 0.2]
    a = Anim()
    temps = [1.0, 0.3, 1.8]
    for T in temps:
        ex = [math.exp(l / T) for l in logits]
        s = sum(ex)
        probs = [e / s for e in ex]
        for k in range(24):
            t = ease(k / 14)
            img, d = canvas()
            title(d, "Sprachmodell: Wahrscheinlichkeit für das nächste Token")
            text(d, (30, 66), "„Morgens trinke ich eine Tasse …“", 16, True, INK)
            for j, (tok, pr) in enumerate(zip(toks, probs)):
                y = 110 + j * 40
                text(d, (150, y + 14), tok, 14, False, INK, "rm")
                d.rectangle(p(160, y, 160 + 380 * pr * t, y + 28), fill=TEAL if j == 0 else SKY)
                text(d, (166 + 380 * pr * t, y + 14), f"{de(pr * 100, 0)} %", 12, False, MUTED, "lm")
            lab = {1.0: "Temperatur 1,0", 0.3: "Temperatur 0,3: fast immer „Kaffee“", 1.8: "Temperatur 1,8: vielfältiger, riskanter"}[T]
            text(d, (30, 330), lab, 14, True, VIOLET)
            a.frame(img, 90)
        a.hold(1600)
    a.save(NR, "naechstes-token.gif")


def rag():
    """Frage → Suche in Dokumenten → passende Abschnitte → Sprachmodell → Antwort mit Quelle."""
    a = Anim()
    for i in range(90):
        img, d = canvas()
        title(d, "RAG: Antworten mit Wissen aus eigenen Dokumenten")
        st = min(5, i // 15)
        box(d, 24, 70, 150, 54, "Frage", SKY, SKY_L, "„Wie lange gilt die Garantie?“")
        if st >= 1:
            arrow(d, 176, 97, 220, 97, GREY)
            box(d, 224, 70, 170, 54, "Suche", VIOLET, VIOLET_L, "Embedding + Vektor-DB")
        if st >= 2:
            for k in range(3):
                y = 150 + k * 44
                hit = k < 2
                box(d, 224, y, 170, 36, ["Garantiebedingungen §3", "FAQ Gewährleistung", "Preisliste 2026"][k], TEAL if hit else GREY, TEAL_L if hit else WHITE, size=11)
            text(d, (310, 290), "beste Treffer werden ausgewählt", 11, False, MUTED, "mm")
        if st >= 3:
            arrow(d, 396, 170, 440, 120, TEAL)
            arrow(d, 396, 97, 440, 97, GREY)
            box(d, 444, 70, 172, 70, "Sprachmodell", AMBER, AMBER_L, "Frage + gefundene Abschnitte")
        if st >= 4:
            arrow(d, 530, 142, 530, 180, AMBER)
            d.rounded_rectangle(p(430, 184, 630, 290), radius=10 * 2, fill=WHITE, outline=TEAL, width=2 * 2)
            text(d, (442, 200), "„Die Garantie gilt 24 Monate", 11, False, INK)
            text(d, (442, 218), "ab Kaufdatum.“", 11, False, INK)
            text(d, (442, 248), "Quelle: Garantiebedingungen §3", 11, True, TEAL)
        caption(d, "Aktuelles, belegbares Wissen ohne neues Training – Halluzinationen werden seltener")
        a.frame(img, 80)
    a.hold(3000)
    a.save(NR, "rag.gif")


if __name__ == "__main__":
    neuron()
    aktivierungen()
    vorwaerts()
    backprop()
    cnn_filter()
    attention()
    naechstes_token()
    rag()
