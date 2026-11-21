"""GIFs für Modul 8 (Generative KI und große Sprachmodelle)."""
import math
import random
from gifkit import *  # noqa: F401,F403

OUT = out_dir(8)


def box(d, x, y, w, h, label, col, colL, sub=None, a=1.0, size=13):
    d.rounded_rectangle(p(x, y, x + w, y + h), radius=10 * S, fill=mix(BG, colL, a), outline=mix(BG, col, a), width=2 * S)
    if sub:
        text(d, (x + w / 2, y + h / 2 - 9), label, size, True, mix(BG, INK, a), "mm")
        text(d, (x + w / 2, y + h / 2 + 11), sub, 10, False, mix(BG, MUTED, a), "mm")
    else:
        text(d, (x + w / 2, y + h / 2), label, size, True, mix(BG, INK, a), "mm")


# 1 Tokenisierung ----------------------------------------------------------------
def gif_token():
    satz = "Die Kreditausfallwahrscheinlichkeit steigt."
    tokens = ["Die", " Kredit", "aus", "fall", "wahr", "schein", "lichkeit", " steigt", "."]
    ids = [3214, 51877, 10802, 7312, 41108, 8261, 13987, 58123, 13]
    cols = [TEAL_L, AMBER_L, VIOLET_L, CORAL_L]
    frames, durs = [], []
    for phase in range(3):
        for f in range(16):
            t = ease(f / 15)
            img, d = canvas()
            text(d, (24, 26), "Tokenisierung: Text wird in Stücke zerlegt", 15, True, INK)
            text(d, (24, 70), "Eingabe:", 12, False, MUTED)
            text(d, (24, 92), satz, 17, True, INK)
            if phase >= 1:
                x = 24
                for i, tk in enumerate(tokens):
                    a = 1 if phase == 2 else ease(min(1, max(0, t * 2 - i * 0.12)))
                    wd = 14 + len(tk.strip()) * 10
                    if a > 0.02:
                        d.rounded_rectangle(p(x, 150, x + wd, 184), radius=6 * S, fill=mix(BG, cols[i % 4], a), outline=mix(BG, GREY, a), width=S)
                        text(d, (x + wd / 2, 167), tk.replace(" ", "_"), 13, True, mix(BG, INK, a), "mm")
                        if phase == 2:
                            text(d, (x + wd / 2, 202), str(ids[i]), 10, False, MUTED, "mm")
                    x += wd + 6
                text(d, (24, 130), f"{len(tokens)} Tokens (_ = Leerzeichen gehört zum Token)", 12, False, MUTED)
            if phase == 2:
                text(d, (24, 240), "Jedes Token bekommt eine Nummer aus dem Vokabular (oft 50.000–200.000 Einträge).", 12, False, INK)
                text(d, (24, 262), "Häufige Wörter sind ein Token, seltene und lange Wörter werden zerlegt.", 12, False, INK)
                text(d, (24, 296), "Faustregel Deutsch: 1 Wort ≈ 1,5 Tokens.", 13, True, TEAL)
                text(d, (24, 318), "Abgerechnet und begrenzt (Kontextfenster) wird in Tokens.", 13, True, TEAL)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1500
    durs[-1] = 3600
    save(frames, OUT / "tokenisierung.gif", durs)


# 2 Nächstes Wort ---------------------------------------------------------------
def gif_naechstes_wort():
    prompt = "Die Lieferung kommt"
    steps = [
        [("morgen", 0.46), ("heute", 0.21), ("am", 0.14), ("leider", 0.09), ("bald", 0.06)],
        [("früh", 0.38), ("zwischen", 0.22), ("an", 0.15), ("um", 0.13), ("pünktlich", 0.08)],
        [("bei", 0.41), ("an", 0.33), ("zu", 0.11), ("per", 0.07), ("im", 0.05)],
        [("Ihnen", 0.72), ("uns", 0.12), ("der", 0.08), ("Ihrer", 0.05), ("Familie", 0.02)],
        [("an", 0.81), (".", 0.10), ("vorbei", 0.05), ("ein", 0.02), ("zu", 0.01)],
    ]
    frames, durs = [], []
    text_so_far = prompt
    for si, cand in enumerate(steps):
        for f in range(16):
            t = ease(f / 15)
            img, d = canvas()
            text(d, (24, 26), "Ein Sprachmodell schreibt Wort für Wort (Token für Token)", 15, True, INK)
            d.rounded_rectangle(p(24, 50, W - 24, 92), radius=10 * S, fill=WHITE, outline=GRID, width=S)
            text(d, (40, 71), text_so_far + ("|" if f % 8 < 4 else ""), 15, True, INK, "lm")
            text(d, (24, 118), f"Schritt {si + 1}: Wahrscheinlichkeiten für das nächste Token", 12, False, MUTED)
            for j, (w, pr) in enumerate(cand):
                y = 140 + j * 36
                text(d, (130, y + 12), w, 13, True, INK, "rm")
                d.rounded_rectangle(p(140, y, 140 + 360, y + 24), radius=6 * S, fill=GRID)
                d.rounded_rectangle(p(140, y, 140 + 360 * pr * t, y + 24), radius=6 * S, fill=TEAL if j == 0 else mix(WHITE, TEAL, 0.45))
                text(d, (510, y + 12), f"{round(pr * 100)} %", 12, True, INK, "lm")
            if f >= 12:
                d.rounded_rectangle(p(140 - 4, 138, 140 + 360 + 70, 166), radius=8 * S, outline=AMBER, width=3 * S)
            frames.append(finish(img)); durs.append(70)
        durs[-1] = 600
        text_so_far += " " + cand[0][0]
    for f in range(1):
        img, d = canvas()
        text(d, (24, 26), "Ein Sprachmodell schreibt Wort für Wort (Token für Token)", 15, True, INK)
        d.rounded_rectangle(p(24, 50, W - 24, 92), radius=10 * S, fill=TEAL_L, outline=TEAL, width=2 * S)
        text(d, (40, 71), text_so_far + ".", 15, True, INK, "lm")
        text(d, (24, 130), "Das Modell „weiß“ nichts im menschlichen Sinn: Es wählt immer wieder", 13, False, INK)
        text(d, (24, 152), "ein wahrscheinliches nächstes Token und hängt es an.", 13, False, INK)
        text(d, (24, 190), "Deshalb kann es flüssig klingen und trotzdem falsch sein (Halluzination).", 13, True, CORAL)
        frames.append(finish(img)); durs.append(3600)
    save(frames, OUT / "naechstes-wort.gif", durs)


# 3 Temperatur --------------------------------------------------------------------
def gif_temperatur():
    words = ["morgen", "heute", "am", "leider", "bald", "nie"]
    logits = [3.0, 2.2, 1.8, 1.2, 0.8, -0.5]
    frames, durs = [], []
    temps = [1.0 - 0.8 * ease(k / 19) for k in range(20)] + [0.2] * 10 + [0.2 + 1.6 * ease(k / 29) for k in range(30)] + [1.8] * 10 + [1.8 - 0.8 * ease(k / 14) for k in range(15)] + [1.0] * 8
    for T in temps:
        ex = [math.exp(l / T) for l in logits]
        s = sum(ex)
        pr = [e / s for e in ex]
        img, d = canvas()
        text(d, (24, 26), "Temperatur: Wie mutig wählt das Modell?", 15, True, INK)
        for j, (w, v) in enumerate(zip(words, pr)):
            x = 50 + j * 90
            h = v * 220
            d.rectangle(p(x, 300 - h, x + 60, 300), fill=TEAL if j == 0 else mix(WHITE, TEAL, 0.5))
            text(d, (x + 30, 314), w, 12, True, INK, "mm")
            text(d, (x + 30, 292 - h), f"{round(v * 100)} %", 11, True, INK, "mm")
        d.line(p(40, 300, 600, 300), fill=GREY, width=S)
        text(d, (W - 30, 70), f"T = {de(T, 1)}", 22, True, AMBER, "rm")
        if T < 0.5:
            msg, col = "niedrig: fast immer das wahrscheinlichste Wort – sachlich, wiederholbar", TEAL
        elif T > 1.4:
            msg, col = "hoch: auch unwahrscheinliche Wörter – kreativ, aber fehleranfälliger", CORAL
        else:
            msg, col = "mittel: ausgewogen", INK
        text(d, (W - 30, 100), msg, 12, True, col, "rm")
        text(d, (24, 344), "Technisch: Rohwerte werden vor dem Softmax durch T geteilt.", 12, False, MUTED)
        frames.append(finish(img)); durs.append(80)
    durs[-1] = 2600
    save(frames, OUT / "temperatur.gif", durs)


# 4 Embedding-Raum ----------------------------------------------------------------
def gif_embedding():
    pts = {
        "Hund": (2.0, 7.2), "Katze": (2.6, 7.8), "Pferd": (1.6, 6.4), "Kuh": (2.4, 6.0),
        "Auto": (7.4, 7.0), "LKW": (8.0, 6.3), "Fahrrad": (6.4, 7.6), "Bus": (8.0, 8.3),
        "Rechnung": (6.6, 2.4), "Mahnung": (7.4, 1.8), "Zahlung": (6.2, 1.6), "Gutschrift": (7.8, 2.8),
        "Urlaub": (2.2, 2.2), "Freistellung": (2.8, 1.6), "Krankmeldung": (1.6, 2.8),
    }
    groups = {"Tiere": ["Hund", "Katze", "Pferd", "Kuh"], "Fahrzeuge": ["Auto", "LKW", "Fahrrad", "Bus"],
              "Finanzen": ["Rechnung", "Mahnung", "Zahlung", "Gutschrift"], "Personal": ["Urlaub", "Freistellung", "Krankmeldung"]}
    gc = {"Tiere": TEAL, "Fahrzeuge": AMBER, "Finanzen": VIOLET, "Personal": CORAL}
    q = ("„Wie beantrage ich frei?“", (3.8, 2.6))
    x0, y0, x1, y1 = 30, 50, 400, 340
    X = lambda v: x0 + v / 10 * (x1 - x0)
    Y = lambda v: y1 - v / 10 * (y1 - y0)
    frames, durs = [], []
    for phase in range(3):
        for f in range(16):
            t = ease(f / 15)
            img, d = canvas()
            text(d, (24, 24), "Embeddings: Bedeutung wird zu einer Position im Raum", 15, True, INK)
            d.rectangle(p(x0, y0, x1, y1), outline=GRID, width=S)
            for g, ws in groups.items():
                for w in ws:
                    a, b = pts[w]
                    col = gc[g] if phase >= 1 else GREY
                    d.ellipse(p(X(a) - 5, Y(b) - 5, X(a) + 5, Y(b) + 5), fill=col)
                    text(d, (X(a) + 8, Y(b)), w, 10, False, INK, "lm")
            if phase >= 2:
                qa, qb = q[1]
                QX, QY = X(qa), Y(qb)
                rr = 8 + 6 * math.sin(f / 15 * math.pi * 2)
                d.polygon([p(QX, QY - 9), p(QX - 8, QY + 6), p(QX + 8, QY + 6)], fill=INK)
                for w in ["Urlaub", "Freistellung"]:
                    a, b = pts[w]
                    d.line(p(QX, QY, X(a), Y(b)), fill=AMBER, width=2 * S)
            tx = 420
            if phase == 0:
                lines = ["Ein Embedding-Modell macht", "aus jedem Wort oder Text", "einen Vektor (z. B. 768 Zahlen).", "", "Hier vereinfacht in 2D."]
            elif phase == 1:
                lines = ["Ähnliche Bedeutungen", "liegen nah beieinander –", "ohne dass jemand die", "Gruppen vorgegeben hat."]
            else:
                lines = ["Frage (Dreieck):", q[0], "", "Nächste Nachbarn:", "Urlaub, Freistellung –", "obwohl kein Wort gleich ist.", "", "So findet RAG passende", "Dokumente (Kosinus-Ähnlichkeit)."]
            yy = 70
            for ln in lines:
                text(d, (tx, yy), ln, 12, ln.startswith(("Frage", "Nächste")), INK)
                yy += 20
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1700
    durs[-1] = 3600
    save(frames, OUT / "embeddings.gif", durs)


# 5 RAG ---------------------------------------------------------------------------
def gif_rag():
    nodes = [
        (24, 70, 130, 56, "Frage", "„Wie viele Urlaubstage?“", AMBER, AMBER_L),
        (190, 70, 130, 56, "Embedding", "Frage → Vektor", VIOLET, VIOLET_L),
        (356, 70, 130, 56, "Vektordatenbank", "ähnlichste Abschnitte", TEAL, TEAL_L),
        (500, 160, 120, 70, "Treffer", "Handbuch S. 12, 14", TEAL, TEAL_L),
        (300, 250, 150, 66, "Prompt", "Frage + Treffer", AMBER, AMBER_L),
        (40, 250, 200, 66, "Sprachmodell", "Antwort mit Quelle", CORAL, CORAL_L),
    ]
    edges = [(0, 1), (1, 2), (2, 3), (3, 4), (4, 5)]
    frames, durs = [], []
    for step in range(len(nodes) + 1):
        for f in range(12):
            t = ease(f / 11)
            img, d = canvas()
            text(d, (24, 26), "RAG: Erst nachschlagen, dann antworten", 15, True, INK)
            # Vorab: Dokumente indexiert
            d.rounded_rectangle(p(356, 140, 486, 210), radius=8 * S, fill=WHITE, outline=GRID, width=S)
            for k in range(4):
                d.rectangle(p(366 + k * 30, 152, 390 + k * 30, 198), fill=mix(WHITE, TEAL, 0.25), outline=GRID, width=S)
            text(d, (421, 222), "vorher: Dokumente in", 10, False, MUTED, "mm")
            text(d, (421, 236), "Abschnitte zerlegt", 10, False, MUTED, "mm")
            for i, (a, b) in enumerate(edges):
                if step > i + 1 or (step == i + 1):
                    xa, ya, wa, ha = nodes[a][:4]
                    xb, yb, wb, hb = nodes[b][:4]
                    sx, sy = xa + wa / 2, ya + ha / 2
                    ex, ey = xb + wb / 2, yb + hb / 2
                    if a == 0 or a == 1:
                        sx, ex = xa + wa, xb
                    aa = 1 if step > i + 1 else t
                    arrow(d, sx, sy, sx + (ex - sx) * aa, sy + (ey - sy) * aa, GREY)
            for i, (x, y, w, h, lab, sub, col, colL) in enumerate(nodes):
                a = 1 if i < step else (t if i == step else 0)
                if a > 0.02:
                    box(d, x, y, w, h, lab, col, colL, sub, a, 12)
            if step == len(nodes):
                text(d, (24, 340), "„Laut Mitarbeiterhandbuch (S. 12) stehen Ihnen 30 Urlaubstage zu.“ – aktuell, belegbar, ohne Neutraining.", 12, True, TEAL)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 900
    durs[-1] = 3800
    save(frames, OUT / "rag-ablauf.gif", durs)


# 6 Trainingsphasen ---------------------------------------------------------------
def gif_phasen():
    phases = [
        ("1 Vortraining", "Billionen Tokens aus Büchern, Web, Code", "Aufgabe: nächstes Token vorhersagen", "→ Basismodell: kann Text fortsetzen", TEAL, TEAL_L),
        ("2 Instruction Tuning", "Zehntausende Frage-Antwort-Beispiele", "von Menschen geschrieben", "→ folgt Anweisungen", AMBER, AMBER_L),
        ("3 Feedback (RLHF)", "Menschen vergleichen Antworten", "Belohnungsmodell + Reinforcement Learning", "→ hilfreich, ehrlich, sicher", VIOLET, VIOLET_L),
    ]
    frames, durs = [], []
    for k in range(len(phases) + 1):
        for f in range(14):
            t = ease(f / 13)
            img, d = canvas()
            text(d, (24, 26), "Wie ein Chat-Assistent entsteht: drei Trainingsphasen", 15, True, INK)
            for i, (title, l1, l2, l3, col, colL) in enumerate(phases):
                x = 24 + i * 204
                a = 1 if i < k else (t if i == k else 0)
                if a <= 0.02:
                    d.rounded_rectangle(p(x, 70, x + 190, 290), radius=12 * S, outline=GRID, width=S)
                    continue
                d.rounded_rectangle(p(x, 70, x + 190, 290), radius=12 * S, fill=mix(BG, colL, a), outline=mix(BG, col, a), width=2 * S)
                text(d, (x + 95, 96), title, 14, True, mix(BG, INK, a), "mm")
                wrap_text(d, x + 12, 126, l1, 26, 11, False, mix(BG, INK, a), 16)
                wrap_text(d, x + 12, 176, l2, 26, 11, False, mix(BG, MUTED, a), 16)
                wrap_text(d, x + 12, 236, l3, 26, 12, True, mix(BG, col, a), 16)
                if i < 2 and a > 0.9:
                    arrow(d, x + 192, 180, x + 202, 180, GREY)
            if k == len(phases):
                text(d, (24, 318), "Phase 1 kostet am meisten Rechenzeit. Phasen 2 und 3 formen das Verhalten.", 12, True, INK)
                text(d, (24, 340), "Eigenes Fine-Tuning im Unternehmen setzt meist auf einem fertigen Modell auf (Lektion 10).", 12, False, MUTED)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1500
    durs[-1] = 3600
    save(frames, OUT / "trainingsphasen.gif", durs)


if __name__ == "__main__":
    gif_token()
    gif_naechstes_wort()
    gif_temperatur()
    gif_embedding()
    gif_rag()
    gif_phasen()
