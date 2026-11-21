"""Erklär-GIFs für Modul 15: Personalmanagement und Führung."""
import math

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, cell)

NR = 15


def personalprozess():
    """Kreislauf der Personalarbeit."""
    st = [("Bedarf planen", SKY, SKY_L), ("Beschaffen, auswählen", TEAL, TEAL_L), ("Einsetzen", VIOLET, VIOLET_L),
          ("Entwickeln", AMBER, AMBER_L), ("Führen, binden", CORAL, CORAL_L), ("Freisetzen", GREY, WHITE)]
    cx, cy, R = 320, 200, 120
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Personalmanagement: der Kreislauf")
        d.ellipse(p(cx - R, cy - R, cx + R, cy + R), outline=GRID, width=3 * 2)
        n = min(6, i // 9 + 1)
        for k in range(n):
            am = -math.pi / 2 + (k + .5) * 2 * math.pi / 6
            if k < n - 1 or n == 6:
                arrow(d, cx + R * math.cos(am - .1), cy + R * math.sin(am - .1), cx + R * math.cos(am + .1), cy + R * math.sin(am + .1), GREY, 3)
        for k in range(n):
            ang = -math.pi / 2 + k * 2 * math.pi / 6
            x, y = cx + R * math.cos(ang), cy + R * math.sin(ang)
            n_, c, cl = st[k]
            box(d, x - 72, y - 22, 144, 44, n_, c, cl, size=12)
        if i > 58:
            text(d, (cx, cy - 8), "Strategie,", 13, True, INK, "mm")
            text(d, (cx, cy + 12), "Talentmanagement", 13, True, INK, "mm")
        caption(d, "Für KI-Teams besonders: knappe Fachkräfte gewinnen und durch Entwicklung binden")
        a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "personalprozess.gif")


def orgformen():
    """Linien-, Matrix- und Projektorganisation nacheinander."""
    a = Anim()

    def node(d, x, y, t, c=SKY, cl=SKY_L, w=96):
        box(d, x - w / 2, y - 16, w, 32, t, c, cl, size=11)

    for i in range(105):
        img, d = canvas()
        ph = min(2, i // 35)
        names = ["Linienorganisation", "Matrixorganisation", "reine Projektorganisation"]
        title(d, "Organisationsmodelle: " + names[ph])
        if ph == 0:
            node(d, 320, 70, "Leitung", INK, GRID)
            for k, t in enumerate(["Einkauf", "Produktion", "Vertrieb"]):
                x = 140 + k * 180
                d.line(p(320, 86, x, 134), fill=GREY, width=2)
                node(d, x, 150, t)
                for j in range(2):
                    d.line(p(x, 166, x - 40 + 80 * j, 214), fill=GREY, width=2)
                    node(d, x - 40 + 80 * j, 230, "Team", GREY, WHITE, 70)
            caption(d, "Eindeutige Unterstellung, klare Wege – aber langsam über Abteilungsgrenzen")
        elif ph == 1:
            node(d, 320, 60, "Leitung", INK, GRID)
            for k, t in enumerate(["Einkauf", "Produktion", "Vertrieb"]):
                x = 260 + k * 130
                node(d, x, 110, t, SKY, SKY_L, 110)
                d.line(p(x, 126, x, 300), fill=SKY, width=2)
            for j, t in enumerate(["KI-Projekt A", "KI-Projekt B", "KI-Projekt C"]):
                y = 170 + j * 50
                node(d, 110, y, t, CORAL, CORAL_L, 120)
                d.line(p(170, y, 590, y), fill=CORAL, width=2)
                for k in range(3):
                    d.ellipse(p(260 + k * 130 - 7, y - 7, 260 + k * 130 + 7, y + 7), fill=VIOLET)
            caption(d, "Zwei Weisungslinien: fachlich (Abteilung) und projektbezogen – Konflikte klar regeln")
        else:
            node(d, 320, 60, "Leitung", INK, GRID)
            for k, t in enumerate(["Einkauf", "Produktion", "Vertrieb"]):
                node(d, 130 + k * 130, 130, t)
                d.line(p(320, 76, 130 + k * 130, 114), fill=GREY, width=2)
            d.line(p(320, 76, 520, 114), fill=CORAL, width=2 * 2)
            node(d, 520, 130, "KI-Projekt", CORAL, CORAL_L, 120)
            for j in range(3):
                d.line(p(520, 146, 460 + 60 * j, 214), fill=CORAL, width=2)
                node(d, 460 + 60 * j, 230, "Team", CORAL, WHITE, 56)
            caption(d, "Eigenes Team mit voller Weisung – für große, wichtige Vorhaben auf Zeit")
        a.frame(img, 100)
        if i in (34, 69):
            a.hold(2200)
    a.hold(3000)
    a.save(NR, "orgformen.gif")


def sieben_s():
    """McKinsey-7-S: harte und weiche Faktoren um gemeinsame Werte."""
    hart = ["Strategie", "Struktur", "Systeme"]
    weich = ["Stil", "Stammpersonal", "Spezialkenntnisse"]
    cx, cy, R = 300, 200, 120
    a = Anim()
    for i in range(70):
        img, d = canvas()
        title(d, "7-S-Modell: Organisation ganzheitlich analysieren")
        n = min(7, i // 7 + 1)
        items = [("Selbstverständnis", "gemeinsame Werte", VIOLET, VIOLET_L, cx, cy)]
        for k in range(6):
            ang = -math.pi / 2 + k * math.pi / 3
            t = (hart + weich)[k]
            c, cl = (SKY, SKY_L) if k < 3 else (AMBER, AMBER_L)
            items.append((t, None, c, cl, cx + R * math.cos(ang), cy + R * math.sin(ang)))
        for k in range(1, 7):
            for j in range(k + 1, 7):
                if k < n and j < n:
                    d.line(p(items[k][4], items[k][5], items[j][4], items[j][5]), fill=GRID, width=1 * 2)
        for k in range(n):
            t, sub, c, cl, x, y = items[k]
            d.line(p(cx, cy, x, y), fill=GRID, width=2)
        for k in range(n):
            t, sub, c, cl, x, y = items[k]
            r = 50 if k == 0 else 42
            d.ellipse(p(x - r, y - r, x + r, y + r), fill=cl, outline=c, width=2 * 2)
            text(d, (x, y - (8 if sub else 0)), t, 11 if len(t) > 12 else 12, True, INK, "mm")
            if sub:
                text(d, (x, y + 10), sub, 10, False, MUTED, "mm")
        text(d, (470, 120), "harte Faktoren", 13, True, SKY)
        text(d, (470, 140), "Strategie, Struktur, Systeme", 11, False, INK)
        text(d, (470, 180), "weiche Faktoren", 13, True, AMBER)
        text(d, (470, 200), "Stil, Stammpersonal,", 11, False, INK)
        text(d, (470, 216), "Spezialkenntnisse", 11, False, INK)
        caption(d, "Alle sieben hängen zusammen: Neue KI-Systeme verlangen auch neue Kenntnisse und Werte")
        a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "sieben-s.gif")


def situativ():
    """Situatives Führen nach Hersey/Blanchard: vier Stile nach Reifegrad."""
    q = [("S1 unterweisen", "viel Anweisung, wenig Beziehung", "R1: wenig Können, wenig Wollen", CORAL, CORAL_L),
         ("S2 verkaufen / trainieren", "viel Anweisung, viel Beziehung", "R2: wenig Können, will", AMBER, AMBER_L),
         ("S3 beteiligen / unterstützen", "wenig Anweisung, viel Beziehung", "R3: kann, will unsicher / nicht", SKY, SKY_L),
         ("S4 delegieren", "wenig Anweisung, wenig Beziehung", "R4: kann und will", TEAL, TEAL_L)]
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Situatives Führen: Der Stil folgt dem Reifegrad")
        n = min(4, i // 14 + 1)
        pos = [(330, 190), (330, 60), (60, 60), (60, 190)]
        for k in range(n):
            nm, sub, rg, c, cl = q[k]
            x, y = pos[k]
            d.rounded_rectangle(p(x, y, x + 260, y + 120), radius=10 * 2, fill=cl, outline=c, width=2 * 2)
            text(d, (x + 130, y + 30), nm, 13, True, INK, "mm")
            text(d, (x + 130, y + 56), sub, 11, False, MUTED, "mm")
            text(d, (x + 130, y + 88), rg, 11, True, c, "mm")
        text(d, (325, 324), "← Reifegrad der Mitarbeitenden steigt (R4 links, R1 rechts)", 11, False, MUTED, "mm")
        caption(d, "Hersey/Blanchard: gleiche Person, andere Aufgabe – anderer Stil")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "situativ.gif")


def herzberg():
    """Zwei-Faktoren-Theorie: Hygienefaktoren und Motivatoren."""
    hyg = ["Gehalt", "Bedingungen", "Sicherheit", "Führungsstil", "Firmenpolitik"]
    mot = ["Anerkennung", "Verantwortung", "Arbeitsinhalt", "Erfolg", "Entwicklung"]
    a = Anim()
    for i in range(70):
        img, d = canvas()
        title(d, "Herzberg: Unzufriedenheit vermeiden ≠ Motivation schaffen")
        d.line(p(40, 190, 600, 190), fill=GREY, width=2 * 2)
        text(d, (40, 210), "Unzufriedenheit", 12, True, CORAL)
        text(d, (320, 210), "neutral", 12, True, MUTED, "ma")
        text(d, (600, 210), "Zufriedenheit", 12, True, TEAL, "ra")
        n = min(5, i // 8 + 1)
        for k in range(n):
            box(d, 36 + (k % 3) * 96, 72 + (k // 3) * 44, 92, 34, hyg[k], CORAL, CORAL_L, size=10)
            box(d, 330 + (k % 3) * 96, 72 + (k // 3) * 44, 92, 34, mot[k], TEAL, TEAL_L, size=10)
        if i > 44:
            arrow(d, 180, 250, 300, 250, CORAL, 3)
            text(d, (240, 270), "Hygienefaktoren: fehlen → unzufrieden;", 11, False, INK, "ma")
            text(d, (240, 286), "vorhanden → nur „nicht unzufrieden“", 11, False, INK, "ma")
            arrow(d, 340, 250, 470, 250, TEAL, 3)
            text(d, (460, 270), "Motivatoren erzeugen", 11, False, INK, "ma")
            text(d, (460, 286), "echte Zufriedenheit", 11, False, INK, "ma")
        caption(d, "Mehr Gehalt allein motiviert nicht dauerhaft – Inhalt und Verantwortung schon")
        a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "herzberg.gif")


def glasl():
    """Konflikteskalation nach Glasl: 9 Stufen abwärts in drei Ebenen."""
    st = ["Verhärtung", "Debatte, Polemik", "Taten statt Worte", "Koalitionen", "Gesichtsverlust", "Drohstrategien",
          "begrenzte Vernichtungsschläge", "Zersplitterung", "Gemeinsam in den Abgrund"]
    zones = [("win-win", TEAL, TEAL_L), ("win-lose", AMBER, AMBER_L), ("lose-lose", CORAL, CORAL_L)]
    a = Anim()
    for i in range(90):
        img, d = canvas()
        title(d, "Konflikteskalation nach Glasl")
        n = min(9, i // 7 + 1)
        for k in range(n):
            z = zones[k // 3]
            x = 30 + k * 62
            y = 60 + k * 26
            d.rectangle(p(x, y, x + 62, y + 26), fill=z[2], outline=z[1], width=2)
            text(d, (x + 31, y + 13), str(k + 1), 12, True, INK, "mm")
            text(d, (x + 70, y + 13), st[k], 11, False, INK, "lm") if k < 6 else text(d, (x - 6, y + 13), st[k], 11, False, INK, "rm")
        for j, (nm, c, cl) in enumerate(zones):
            if n > j * 3:
                text(d, (30 + j * 186 + 93, 330), nm, 13, True, c, "mm")
        caption(d, "Stufen 1–3 selbst lösbar, 4–6 Moderation/Mediation, 7–9 Machteingriff")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "glasl.gif")


def eisenhower():
    """Eisenhower-Matrix: Aufgaben wandern in die vier Felder."""
    q = [(0, 0, "Sofort selbst erledigen", "dringend und wichtig", CORAL, CORAL_L),
         (1, 0, "Einplanen, Termin setzen", "wichtig, nicht dringend", TEAL, TEAL_L),
         (0, 1, "Delegieren", "dringend, nicht wichtig", AMBER, AMBER_L),
         (1, 1, "Weglassen", "weder noch", GREY, WHITE)]
    tasks = [("Datenpanne melden (72 h)", 0, 0), ("KI-Strategie erarbeiten", 1, 0), ("Weiterbildung planen", 1, 0),
             ("Rückruf eines Lieferanten", 0, 1), ("Newsletter sortieren", 1, 1), ("Ausfall Produktivsystem", 0, 0)]
    a = Anim()
    X0, Y0, CW, CH = 160, 60, 220, 120
    for i in range(80):
        img, d = canvas()
        title(d, "Eisenhower-Matrix: wichtig vor dringend")
        for c_, r_, nm, sub, c, cl in q:
            d.rectangle(p(X0 + c_ * CW, Y0 + r_ * CH, X0 + (c_ + 1) * CW, Y0 + (r_ + 1) * CH), fill=cl, outline=WHITE, width=3)
            text(d, (X0 + c_ * CW + 10, Y0 + r_ * CH + 14), nm, 12, True, c if c != GREY else MUTED, "lm")
        text(d, (X0 + CW / 2, 50), "dringend", 11, True, MUTED, "mm")
        text(d, (X0 + CW * 1.5, 50), "nicht dringend", 11, True, MUTED, "mm")
        text(d, (X0 - 8, Y0 + CH / 2), "wichtig", 11, True, MUTED, "rm")
        text(d, (X0 - 8, Y0 + CH * 1.5), "nicht wichtig", 11, True, MUTED, "rm")
        n = min(6, i // 9 + 1)
        cnt = {}
        for k in range(n):
            nm, c_, r_ = tasks[k]
            j = cnt.get((c_, r_), 0)
            cnt[(c_, r_)] = j + 1
            text(d, (X0 + c_ * CW + 14, Y0 + r_ * CH + 42 + j * 22), "• " + nm, 11, False, INK, "lm")
        caption(d, "Führungskräfte gewinnen Zeit im Feld rechts oben: wichtig, aber (noch) nicht dringend")
        a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "eisenhower.gif")


if __name__ == "__main__":
    personalprozess()
    orgformen()
    sieben_s()
    situativ()
    herzberg()
    glasl()
    eisenhower()
