"""Erklär-GIFs für Modul 9: Projektmanagement klassisch und agil."""
import math

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes, cell, de)

NR = 9


def dreieck():
    """Magisches Dreieck: Leistung, Zeit, Kosten; ein Punkt verschiebt sich, die anderen reagieren."""
    a = Anim()
    A, B, C = (320, 95), (150, 300), (490, 300)
    for i in range(80):
        img, d = canvas()
        title(d, "Magisches Dreieck: Leistung, Zeit, Kosten")
        s = math.sin(i / 80 * 2 * math.pi)
        A2 = (A[0], A[1] - 12 * max(0, s))
        C2 = (C[0] + 40 * max(0, s), C[1])
        B2 = (B[0] - 40 * max(0, s), B[1])
        d.polygon([p(*A2), p(*B2), p(*C2)], fill=TEAL_L, outline=TEAL)
        text(d, (A2[0], A2[1] - 14), "Leistung / Qualität", 14, True, INK, "mm")
        text(d, (B2[0] - 10, B2[1] + 18), "Zeit", 14, True, INK, "mm")
        text(d, (C2[0] + 10, C2[1] + 18), "Kosten", 14, True, INK, "mm")
        if s > .3:
            text(d, (320, 210), "mehr Leistung →", 13, True, CORAL, "mm")
            text(d, (320, 230), "mehr Zeit oder mehr Kosten", 13, True, CORAL, "mm")
        caption(d, "Ändert sich eine Ecke, müssen die anderen mitziehen – oder die Qualität leidet")
        a.frame(img, 70)
    a.save(NR, "dreieck.gif")


def psp():
    """Projektstrukturplan wächst als Baum."""
    a = Anim()
    l1 = ["1 Analyse", "2 Daten", "3 Modell", "4 Integration", "5 Einführung"]
    l2 = {0: ["1.1 Ist-Prozess", "1.2 Anforderungen"], 1: ["2.1 Datenquellen", "2.2 Aufbereitung"], 2: ["3.1 Training", "3.2 Bewertung"],
          3: ["4.1 API", "4.2 ERP-Anbindung"], 4: ["5.1 Schulung", "5.2 Rollout"]}
    for i in range(70):
        img, d = canvas()
        title(d, "Projektstrukturplan (PSP)")
        box(d, 220, 50, 200, 40, "KI-Rechnungsprüfung", VIOLET, VIOLET_L, size=13)
        n1 = min(5, i // 6 + 1)
        for k in range(n1):
            x = 14 + k * 124
            box(d, x, 120, 116, 36, l1[k], TEAL, TEAL_L, size=12)
            arrow(d, 320, 92, x + 58, 118, GREY)
        if i > 32:
            n2 = min(10, (i - 32) // 3 + 1)
            c = 0
            for k in range(5):
                for j, s in enumerate(l2[k]):
                    if c < n2:
                        x = 14 + k * 124
                        y = 180 + j * 50
                        box(d, x + 6, y, 104, 36, s, AMBER, AMBER_L, size=10)
                    c += 1
            text(d, (320, 300), "unterste Ebene = Arbeitspakete: abgrenzbar, schätzbar, mit Verantwortlichem", 12, True, INK, "mm")
        caption(d, "Erst das Was zerlegen, dann das Wann planen")
        a.frame(img, 90)
    a.hold(3000)
    a.save(NR, "psp.gif")


def netzplan():
    """Vorgangsknotennetz A(3), B(5), C(2), D(4): Vorwärts-, Rückwärtsrechnung, kritischer Pfad."""
    nodes = {"A": (40, 150, 3, 0, 3, 0, 3), "B": (230, 70, 5, 3, 8, 3, 8), "C": (230, 230, 2, 3, 5, 6, 8), "D": (430, 150, 4, 8, 12, 8, 12)}
    a = Anim()
    for i in range(90):
        img, d = canvas()
        title(d, "Netzplan: frühe und späte Termine, Puffer, kritischer Pfad")
        st = 0 if i < 25 else 1 if i < 50 else 2
        edges = [("A", "B"), ("A", "C"), ("B", "D"), ("C", "D")]
        for u, v in edges:
            x1, y1 = nodes[u][0] + 150, nodes[u][1] + 40
            x2, y2 = nodes[v][0], nodes[v][1] + 40
            crit = st == 2 and (u, v) in (("A", "B"), ("B", "D"))
            arrow(d, x1, y1, x2, y2, CORAL if crit else GREY, 3 if crit else 2)
        for k, (x, y, dur, faz, fez, saz, sez) in nodes.items():
            puf = saz - faz
            crit = st == 2 and puf == 0
            col = CORAL if crit else INK
            d.rectangle(p(x, y, x + 150, y + 80), outline=col, width=(3 if crit else 2) * 2, fill=WHITE)
            d.line(p(x, y + 27, x + 150, y + 27), fill=GRID, width=2)
            d.line(p(x, y + 53, x + 150, y + 53), fill=GRID, width=2)
            text(d, (x + 8, y + 14), f"FAZ {faz}", 11, False, TEAL if st >= 0 else BG, "lm")
            text(d, (x + 142, y + 14), f"FEZ {fez}", 11, False, TEAL, "rm")
            text(d, (x + 75, y + 40), f"{k} · Dauer {dur}", 13, True, INK, "mm")
            if st >= 1:
                text(d, (x + 8, y + 66), f"SAZ {saz}", 11, False, VIOLET, "lm")
                text(d, (x + 142, y + 66), f"SEZ {sez}", 11, False, VIOLET, "rm")
                text(d, (x + 75, y + 66), f"GP {puf}", 11, True, CORAL if puf == 0 else AMBER, "mm")
        if st == 0:
            caption(d, "Vorwärts: FAZ = größtes FEZ der Vorgänger, FEZ = FAZ + Dauer")
        elif st == 1:
            caption(d, "Rückwärts: SEZ = kleinstes SAZ der Nachfolger, SAZ = SEZ − Dauer; Puffer = SAZ − FAZ")
        else:
            caption(d, "Kritischer Pfad A–B–D (Puffer 0): jede Verzögerung verschiebt das Projektende (12)")
        a.frame(img, 100)
    a.hold(3200)
    a.save(NR, "netzplan.gif")


def gantt():
    """Gantt-Diagramm mit Meilenstein und Heute-Linie."""
    tasks = [("Analyse", 0, 3, TEAL), ("Datenaufbereitung", 2, 5, SKY), ("Modelltraining", 6, 4, VIOLET), ("Integration", 8, 4, AMBER), ("Pilot", 12, 3, CORAL), ("Rollout", 15, 3, TEAL)]
    a = Anim()
    for i in range(60):
        t = ease(i / 40)
        img, d = canvas()
        title(d, "Gantt-Diagramm: Termine auf einen Blick")
        X0, S_ = 170, 24
        for w in range(19):
            d.line(p(X0 + w * S_, 60, X0 + w * S_, 290), fill=GRID, width=1)
            if w % 2 == 0:
                text(d, (X0 + w * S_, 300), f"KW {w + 1}", 9, False, MUTED, "mm")
        for k, (n, s, dur, col) in enumerate(tasks):
            y = 70 + k * 36
            text(d, (X0 - 10, y + 12), n, 12, False, INK, "rm")
            d.rounded_rectangle(p(X0 + s * S_, y, X0 + (s + dur * t) * S_, y + 24), radius=5 * 2, fill=col)
        if t > .9:
            mx = X0 + 12 * S_
            d.polygon([p(mx, 280), p(mx + 8, 272), p(mx + 16, 280), p(mx + 8, 288)], fill=INK)
            text(d, (mx + 22, 280), "Meilenstein: Go/No-Go Pilot", 11, True, INK, "lm")
            hx = X0 + 9 * S_
            d.line(p(hx, 60, hx, 290), fill=CORAL, width=2 * 2)
            text(d, (hx + 4, 62), "heute", 10, True, CORAL, "la")
        caption(d, "Überlappende Balken = parallele Arbeit; Meilensteine = Entscheidungspunkte")
        a.frame(img, 80)
    a.hold(3000)
    a.save(NR, "gantt.gif")


def risikomatrix():
    """Risiken wandern in die Matrix nach Wahrscheinlichkeit und Auswirkung."""
    risks = [("Datenqualität schlecht", 4, 4), ("Schlüsselperson fällt aus", 2, 4), ("Lizenzkosten steigen", 3, 2), ("Betriebsrat stimmt nicht zu", 2, 5), ("Modell zu ungenau", 3, 4)]
    a = Anim()
    X0, Y0, S_ = 150, 50, 50
    for i in range(80):
        img, d = canvas()
        title(d, "Risikomatrix: Wahrscheinlichkeit × Auswirkung")
        for r in range(5):
            for c in range(5):
                score = (c + 1) * (5 - r)
                col = TEAL_L if score <= 5 else AMBER_L if score <= 12 else CORAL_L
                d.rectangle(p(X0 + c * S_, Y0 + r * S_, X0 + (c + 1) * S_, Y0 + (r + 1) * S_), fill=col, outline=WHITE, width=2)
        text(d, (X0 + 125, Y0 + 268), "Wahrscheinlichkeit 1 → 5", 11, False, MUTED, "mm")
        text(d, (X0 - 10, Y0 + 125), "Auswirkung", 11, False, MUTED, "rm")
        n = min(len(risks), i // 10 + 1)
        for k in range(n):
            nme, w_, au = risks[k]
            cx, cy = X0 + (w_ - .5) * S_, Y0 + (5 - au + .5) * S_
            d.ellipse(p(cx - 11, cy - 11, cx + 11, cy + 11), fill=INK)
            text(d, (cx, cy), str(k + 1), 11, True, WHITE, "mm")
            text(d, (430, 70 + k * 30), f"{k + 1}  {nme}  ({w_}×{au}={w_ * au})", 12, False, INK)
        caption(d, "Rot zuerst behandeln: vermeiden, vermindern, übertragen oder bewusst akzeptieren")
        a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "risikomatrix.gif")


def earned_value():
    """PV-, EV-, AC-Kurven; Stichtag; Abweichungen."""
    a = Anim()
    T = 10
    pv = [0, 8, 18, 30, 44, 58, 70, 80, 90, 96, 100]
    ev = [0, 7, 15, 24, 34, 44]
    ac = [0, 9, 20, 32, 44, 55]
    for i in range(60):
        t = ease(i / 40)
        img, d = canvas()
        title(d, "Earned Value: Plan, Fertigstellung, Istkosten")
        X0, Y0, X1, Y1 = 60, 50, 420, 310
        axes(d, X0, Y0, X1, Y1, "Monat", "T€")
        sx = lambda m: X0 + m / T * (X1 - X0)
        sy = lambda v: Y1 - v / 105 * (Y1 - Y0)
        d.line([p(sx(m), sy(v)) for m, v in enumerate(pv)], fill=GREY, width=3 * 2)
        nm = int(5 * t) + 1
        d.line([p(sx(m), sy(v)) for m, v in enumerate(ev[:nm])], fill=TEAL, width=3 * 2)
        d.line([p(sx(m), sy(v)) for m, v in enumerate(ac[:nm])], fill=CORAL, width=3 * 2)
        d.line(p(sx(5), Y0, sx(5), Y1), fill=VIOLET, width=2)
        text(d, (sx(5) + 4, Y0 + 4), "Stichtag", 11, True, VIOLET, "la")
        text(d, (440, 70), "PV Planwert 58", 13, True, GREY)
        text(d, (440, 94), "EV Fertigstellungswert 44", 13, True, TEAL)
        text(d, (440, 118), "AC Istkosten 55", 13, True, CORAL)
        if t > .95:
            text(d, (440, 160), "CPI = 44 / 55 = 0,80", 13, True, INK)
            text(d, (440, 184), "SPI = 44 / 58 ≈ 0,76", 13, True, INK)
            text(d, (440, 216), "teurer und später", 13, False, CORAL)
            text(d, (440, 236), "als geplant", 13, False, CORAL)
        caption(d, "Kennzahlen unter 1 heißen: über Budget bzw. hinter dem Zeitplan")
        a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "earned-value.gif")


def scrum():
    """Scrum-Ablauf: Product Backlog → Sprint Planning → Sprint (Daily) → Review → Retro → Increment."""
    a = Anim()
    for i in range(100):
        img, d = canvas()
        title(d, "Scrum: in Sprints zu einem nutzbaren Ergebnis")
        st = min(6, i // 13)
        # Backlog
        for k in range(6):
            d.rectangle(p(24, 70 + k * 26, 120, 92 + k * 26), fill=SKY_L if k > 1 or st < 1 else GRID, outline=SKY, width=2)
        text(d, (72, 60), "Product Backlog", 11, True, SKY, "mm")
        text(d, (72, 250), "Product Owner", 11, True, MUTED, "mm")
        text(d, (72, 266), "priorisiert", 10, False, MUTED, "mm")
        if st >= 1:
            arrow(d, 124, 110, 170, 110, GREY)
            box(d, 172, 86, 100, 48, "Sprint Planning", VIOLET, VIOLET_L, size=11)
        if st >= 2:
            arrow(d, 274, 110, 300, 110, GREY)
            cx, cy, R = 370, 140, 62
            d.ellipse(p(cx - R, cy - R, cx + R, cy + R), outline=TEAL, width=4 * 2)
            ang = (i % 13) / 13 * 2 * math.pi
            d.ellipse(p(cx + R * math.cos(ang) - 7, cy + R * math.sin(ang) - 7, cx + R * math.cos(ang) + 7, cy + R * math.sin(ang) + 7), fill=TEAL)
            text(d, (cx, cy - 8), "Sprint", 14, True, TEAL, "mm")
            text(d, (cx, cy + 12), "1–4 Wochen", 11, False, MUTED, "mm")
            d.ellipse(p(cx + 40, cy - 90, cx + 76, cy - 54), outline=AMBER, width=2 * 2)
            text(d, (cx + 58, cy - 72), "Daily", 9, True, AMBER, "mm")
            text(d, (cx, 220), "Developers", 11, True, MUTED, "mm")
        if st >= 3:
            arrow(d, 434, 140, 470, 140, GREY)
            box(d, 472, 70, 140, 40, "Sprint Review", AMBER, AMBER_L, size=12)
        if st >= 4:
            box(d, 472, 120, 140, 40, "Retrospektive", CORAL, CORAL_L, size=12)
        if st >= 5:
            box(d, 472, 180, 140, 46, "Increment", TEAL, TEAL_L, "erfüllt Definition of Done", size=12)
        if st >= 6:
            text(d, (320, 290), "Scrum Master sorgt dafür, dass Scrum verstanden und gelebt wird", 12, True, INK, "mm")
        caption(d, "3 Verantwortlichkeiten · 5 Ereignisse · 3 Artefakte (Scrum Guide 2020)")
        a.frame(img, 90)
    a.hold(3000)
    a.save(NR, "scrum.gif")


def kanban():
    """Kanban-Board: Karten wandern; WIP-Limit blockiert die Spalte."""
    cols = [("Offen", None), ("In Arbeit", 3), ("Prüfung", 2), ("Fertig", None)]
    # Positionen der Karten über die Zeit
    plan = [[0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0], [1, 1, 1, 0, 0, 0], [2, 1, 1, 0, 0, 0], [2, 1, 1, 1, 0, 0],
            [3, 2, 1, 1, 0, 0], [3, 2, 1, 1, 1, 0], [3, 3, 2, 1, 1, 0], [3, 3, 2, 2, 1, 1]]
    a = Anim()
    for step in plan:
        for f in range(10):
            img, d = canvas()
            title(d, "Kanban: Arbeit sichtbar machen, Menge in Arbeit begrenzen")
            for c, (n, wip) in enumerate(cols):
                x = 24 + c * 152
                d.rectangle(p(x, 56, x + 144, 320), fill=WHITE, outline=GRID, width=2)
                cnt = sum(1 for s in step if s == c)
                full = wip is not None and cnt >= wip
                text(d, (x + 72, 72), n + (f" (WIP {wip})" if wip else ""), 12, True, CORAL if full else INK, "mm")
                k = 0
                for idx, s in enumerate(step):
                    if s == c:
                        d.rounded_rectangle(p(x + 12, 92 + k * 42, x + 132, 126 + k * 42), radius=6 * 2, fill=[AMBER_L, SKY_L, VIOLET_L, TEAL_L, CORAL_L, AMBER_L][idx], outline=GREY, width=2)
                        text(d, (x + 72, 109 + k * 42), f"Aufgabe {idx + 1}", 11, False, INK, "mm")
                        k += 1
            caption(d, "Erst fertig machen, dann Neues anfangen: „Stop starting, start finishing“")
            a.frame(img, 90)
    a.hold(2600)
    a.save(NR, "kanban.gif")


def skalierung():
    """Vom PoC über Pilot zum Rollout: Trichter mit Entscheidungstoren."""
    stages = [("Idee", "50 Use Cases", GREY, WHITE, 170), ("Proof of Concept", "12 technisch machbar", SKY, SKY_L, 140), ("Pilot", "4 mit Nutzen im Betrieb", VIOLET, VIOLET_L, 110),
              ("Rollout", "2 an allen Standorten", TEAL, TEAL_L, 80)]
    a = Anim()
    for i in range(70):
        img, d = canvas()
        title(d, "KI-Projekte skalieren: vom Proof of Concept zum Rollout")
        n = min(4, i // 12 + 1)
        for k in range(n):
            nme, sub, c, cl, w = stages[k]
            y = 60 + k * 62
            box(d, 320 - w, y, 2 * w, 50, nme, c, cl, sub, size=13)
            if k:
                text(d, (320 + w + 20, y - 6), "Gate: weiter?", 11, True, CORAL, "lm")
        if i > 52:
            text(d, (24, 320), "Für die Skalierung nötig: Datenplattform, MLOps, Betriebsmodell, Schulung, Change, Budget", 12, True, INK)
        caption(d, "")
        a.frame(img, 90)
    a.hold(3000)
    a.save(NR, "skalierung.gif")


if __name__ == "__main__":
    dreieck()
    psp()
    netzplan()
    gantt()
    risikomatrix()
    earned_value()
    scrum()
    kanban()
    skalierung()
