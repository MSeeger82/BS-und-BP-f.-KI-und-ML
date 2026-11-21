# Generate a minimal 32-bit PE that runs: cmd.exe /c <command-line-from-GetCommandLine>
# and also a simpler PE that WinExec's a fixed command.
# This writes bash_shim.exe bytes.

import struct
import pathlib

# Strategy: PE with import WinExec from kernel32, call WinExec(cmd, 1), ExitProcess(0)
# cmd = 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File "d:\\IT Konsultant\\VS Studio\\KI-Berufsspezialist\\banner\\make-banner-now.ps1"'

cmd = (
    'powershell.exe -NoProfile -ExecutionPolicy Bypass -File '
    '"d:\\IT Konsultant\\VS Studio\\KI-Berufsspezialist\\banner\\make-banner-now.ps1"'
)
cmd_bytes = cmd.encode("ascii") + b"\x00"

# We'll build a simple PE manually.
# For reliability, use a different approach: write pure PNG with zlib in this script instead.

def crc32(data: bytes) -> int:
    table = []
    for i in range(256):
        c = i
        for _ in range(8):
            c = (0xEDB88320 ^ (c >> 1)) if (c & 1) else (c >> 1)
        table.append(c)
    c = 0xFFFFFFFF
    for b in data:
        c = table[(c ^ b) & 0xFF] ^ (c >> 8)
    return c ^ 0xFFFFFFFF


def adler32(data: bytes) -> int:
    MOD = 65521
    a, b = 1, 0
    # fast path for zeros
    if all(x == 0 for x in data):
        n = len(data)
        # a stays 1; b increases by 1 each byte
        b = n % MOD
        return (b << 16) | a
    for x in data:
        a = (a + x) % MOD
        b = (b + a) % MOD
    return (b << 16) | a


class BitWriter:
    def __init__(self):
        self.buf = bytearray()
        self.cur = 0
        self.nbits = 0

    def write_bit(self, bit: int):
        if bit:
            self.cur |= (1 << self.nbits)
        self.nbits += 1
        if self.nbits == 8:
            self.buf.append(self.cur)
            self.cur = 0
            self.nbits = 0

    def write_bits_msb(self, val: int, n: int):
        for i in range(n - 1, -1, -1):
            self.write_bit((val >> i) & 1)

    def write_bits_lsb(self, val: int, n: int):
        for i in range(n):
            self.write_bit((val >> i) & 1)

    def finish(self) -> bytes:
        if self.nbits:
            self.buf.append(self.cur)
            self.cur = 0
            self.nbits = 0
        return bytes(self.buf)


# Length code table: (code, extra_bits, base)
LENGTH_TABLE = []
_base = 3
_extras = (
    [0] * 8
    + [1] * 4
    + [2] * 4
    + [3] * 4
    + [4] * 4
    + [5] * 4
    + [0]  # 258
)
for i, eb in enumerate(_extras):
    code = 257 + i
    LENGTH_TABLE.append((code, eb, _base))
    _base += 1 << eb


def encode_length(bw: BitWriter, length: int):
    assert 3 <= length <= 258
    for code, eb, base in LENGTH_TABLE:
        span = 1 << eb
        if base <= length < base + span or (length == 258 and code == 285):
            # fixed huffman for code
            if code <= 279:
                # 257-279: 7-bit codes 0000001 - 0010111
                fh = code - 256  # 1..23
                bw.write_bits_msb(fh, 7)
            else:
                # 280-285: 8-bit 11000000 - 11000101
                fh = 0xC0 + (code - 280)
                bw.write_bits_msb(fh, 8)
            if eb:
                bw.write_bits_lsb(length - base, eb)
            # distance 1 = code 0
            bw.write_bits_msb(0, 5)
            return
    raise ValueError(length)


def deflate_zeros(n: int) -> bytes:
    bw = BitWriter()
    # BFINAL=1 BTYPE=01
    bw.write_bit(1)
    bw.write_bits_lsb(1, 2)
    if n <= 0:
        bw.write_bits_msb(0, 7)  # EOB
        return bw.finish()
    # literal 0
    bw.write_bits_msb(0x30, 8)
    rem = n - 1
    while rem >= 258:
        encode_length(bw, 258)
        rem -= 258
    if rem >= 3:
        encode_length(bw, rem)
        rem = 0
    while rem > 0:
        bw.write_bits_msb(0x30, 8)
        rem -= 1
    bw.write_bits_msb(0, 7)  # EOB
    return bw.finish()


def chunk(tag: bytes, data: bytes) -> bytes:
    assert len(tag) == 4
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", crc32(tag + data))


def make_indexed_png(w: int, h: int, rows: bytes, palette: bytes) -> bytes:
    """rows = raw scanlines (filter + indices), palette = RGB*N."""
    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 3, 0, 0, 0)
    # compress
    raw = rows
    # try to use zlib if available; else hand deflate for zeros-only
    try:
        import zlib as z

        idat = z.compress(raw, 9)
    except Exception:
        if raw == bytes(len(raw)):
            comp = deflate_zeros(len(raw))
            # zlib wrap 78 01
            ad = adler32(raw)
            idat = b"\x78\x01" + comp + struct.pack(">I", ad)
        else:
            # stored blocks fallback
            idat = store_zlib(raw)
    out = sig
    out += chunk(b"IHDR", ihdr)
    out += chunk(b"PLTE", palette)
    out += chunk(b"IDAT", idat)
    out += chunk(b"IEND", b"")
    return out


def store_zlib(data: bytes) -> bytes:
    # BTYPE stored blocks
    bw = BitWriter()
    pos = 0
    while pos < len(data):
        block = data[pos : pos + 65535]
        pos += len(block)
        bfinal = 1 if pos >= len(data) else 0
        bw.write_bit(bfinal)
        bw.write_bits_lsb(0, 2)  # stored
        # pad to byte
        while bw.nbits != 0:
            bw.write_bit(0)
        ln = len(block)
        bw.buf.append(ln & 0xFF)
        bw.buf.append((ln >> 8) & 0xFF)
        bw.buf.append((~ln) & 0xFF)
        bw.buf.append(((~ln) >> 8) & 0xFF)
        bw.buf.extend(block)
    ad = adler32(data)
    # CMF/FLG 78 01
    return b"\x78\x01" + bytes(bw.buf) + struct.pack(">I", ad)


def render_banner(w=2560, h=1440) -> bytes:
    # palette
    colors = [
        (7, 11, 18),  # 0 bg
        (34, 211, 238),  # 1 cyan
        (241, 245, 249),  # 2 white
        (13, 148, 136),  # 3 teal
        (12, 24, 36),  # 4 chip bg
        (148, 163, 184),  # 5 muted
        (30, 64, 80),  # 6 border
        (6, 16, 24),  # 7 darker
    ]
    pal = b"".join(bytes(c) for c in colors)

    # 5x7 font (subset)
    FONT = {
        " ": ["00000"] * 7,
        "A": ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
        "B": ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
        "C": ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
        "D": ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
        "E": ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
        "F": ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
        "G": ["01110", "10001", "10000", "10111", "10001", "10001", "01110"],
        "H": ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
        "I": ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
        "K": ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
        "L": ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
        "M": ["10001", "11011", "10101", "10001", "10001", "10001", "10001"],
        "N": ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
        "O": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
        "P": ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
        "R": ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
        "S": ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
        "T": ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
        "U": ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
        "V": ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
        "W": ["10001", "10001", "10001", "10001", "10101", "11011", "10001"],
        "Y": ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
        "Z": ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
        "a": ["00000", "00000", "01110", "00001", "01111", "10001", "01111"],
        "b": ["10000", "10000", "11110", "10001", "10001", "10001", "11110"],
        "c": ["00000", "00000", "01110", "10000", "10000", "10001", "01110"],
        "d": ["00001", "00001", "01111", "10001", "10001", "10001", "01111"],
        "e": ["00000", "00000", "01110", "10001", "11111", "10000", "01110"],
        "f": ["00110", "01001", "01000", "11100", "01000", "01000", "01000"],
        "g": ["00000", "00000", "01111", "10001", "01111", "00001", "01110"],
        "h": ["10000", "10000", "11110", "10001", "10001", "10001", "10001"],
        "i": ["00100", "00000", "01100", "00100", "00100", "00100", "01110"],
        "j": ["00010", "00000", "00110", "00010", "00010", "10010", "01100"],
        "k": ["10000", "10000", "10010", "10100", "11000", "10100", "10010"],
        "l": ["01100", "00100", "00100", "00100", "00100", "00100", "01110"],
        "m": ["00000", "00000", "11010", "10101", "10101", "10001", "10001"],
        "n": ["00000", "00000", "11110", "10001", "10001", "10001", "10001"],
        "o": ["00000", "00000", "01110", "10001", "10001", "10001", "01110"],
        "p": ["00000", "00000", "11110", "10001", "11110", "10000", "10000"],
        "r": ["00000", "00000", "10110", "11001", "10000", "10000", "10000"],
        "s": ["00000", "00000", "01111", "10000", "01110", "00001", "11110"],
        "t": ["01000", "01000", "11100", "01000", "01000", "01001", "00110"],
        "u": ["00000", "00000", "10001", "10001", "10001", "10011", "01101"],
        "v": ["00000", "00000", "10001", "10001", "10001", "01010", "00100"],
        "w": ["00000", "00000", "10001", "10001", "10101", "10101", "01010"],
        "x": ["00000", "00000", "10001", "01010", "00100", "01010", "10001"],
        "y": ["00000", "00000", "10001", "10001", "01111", "00001", "01110"],
        "z": ["00000", "00000", "11111", "00010", "00100", "01000", "11111"],
        "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
        "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
        "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
        "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
        "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
        "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
        "6": ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
        "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
        "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
        "9": ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
        ".": ["00000", "00000", "00000", "00000", "00000", "01100", "01100"],
        ",": ["00000", "00000", "00000", "00000", "01100", "00100", "01000"],
        ":": ["00000", "01100", "01100", "00000", "01100", "01100", "00000"],
        "&": ["01100", "10010", "10100", "01000", "10101", "10010", "01101"],
        "(": ["00100", "01000", "10000", "10000", "10000", "01000", "00100"],
        ")": ["00100", "00010", "00001", "00001", "00001", "00010", "00100"],
        "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
        "·": ["00000", "00000", "00100", "01110", "00100", "00000", "00000"],
        "ä": ["01010", "00000", "01110", "00001", "01111", "10001", "01111"],
        "ö": ["01010", "00000", "01110", "10001", "10001", "10001", "01110"],
        "ü": ["01010", "00000", "10001", "10001", "10001", "10011", "01101"],
        "Ä": ["01010", "01110", "10001", "11111", "10001", "10001", "10001"],
        "Ö": ["01010", "01110", "10001", "10001", "10001", "10001", "01110"],
        "Ü": ["01010", "10001", "10001", "10001", "10001", "10001", "01110"],
        "ß": ["01110", "10001", "10001", "11110", "10001", "10001", "10110"],
        "É": ["00100", "01000", "11111", "10000", "11110", "10000", "11111"],
        "é": ["00100", "01000", "01110", "10001", "11111", "10000", "01110"],
        "–": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
        "—": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
    }

    img = bytearray(w * h)  # index 0 = bg

    def fill_rect(x0, y0, x1, y1, c):
        x0 = max(0, int(x0)); y0 = max(0, int(y0))
        x1 = min(w, int(x1)); y1 = min(h, int(y1))
        for y in range(y0, y1):
            row = y * w
            for x in range(x0, x1):
                img[row + x] = c

    def draw_text(x, y, text, color, scale=3, spacing=1):
        cx = x
        for ch in text:
            g = FONT.get(ch) or FONT.get(ch.upper()) or FONT[" "]
            for row_i, row in enumerate(g):
                for col_i, bit in enumerate(row):
                    if bit == "1":
                        for sy in range(scale):
                            for sx in range(scale):
                                px = cx + col_i * scale + sx
                                py = y + row_i * scale + sy
                                if 0 <= px < w and 0 <= py < h:
                                    img[py * w + px] = color
            cx += (5 + spacing) * scale

    # top teal line
    fill_rect(0, 0, w, 4, 3)
    # soft center glow (approx)
    for yy in range(200, 900, 4):
        for xx in range(900, 2000, 4):
            # leave bg; skip heavy glow for size
            pass

    # corner brackets
    t = 3
    s = 70
    for (cx, cy, dx, dy) in ((48, 48, 1, 1), (w - 48, 48, -1, 1), (48, h - 48, 1, -1), (w - 48, h - 48, -1, -1)):
        fill_rect(cx, cy, cx + dx * s, cy + t * dy if dy < 0 else cy + t, 1)
        # fix bracket geometry
        if dx > 0 and dy > 0:
            fill_rect(cx, cy, cx + s, cy + t, 1)
            fill_rect(cx, cy, cx + t, cy + s, 1)
        elif dx < 0 and dy > 0:
            fill_rect(cx - s, cy, cx, cy + t, 1)
            fill_rect(cx - t, cy, cx, cy + s, 1)
        elif dx > 0 and dy < 0:
            fill_rect(cx, cy - t, cx + s, cy, 1)
            fill_rect(cx, cy - s, cx + t, cy, 1)
        else:
            fill_rect(cx - s, cy - t, cx, cy, 1)
            fill_rect(cx - t, cy - s, cx, cy, 1)

    # badge pill background
    fill_rect(100, 250, 820, 320, 4)
    fill_rect(100, 250, 820, 252, 1)
    fill_rect(100, 318, 820, 320, 1)
    fill_rect(100, 250, 102, 320, 1)
    fill_rect(818, 250, 820, 320, 1)

    draw_text(120, 268, "IHK · KI & MASCHINELLES LERNEN", 1, scale=4, spacing=1)

    draw_text(120, 400, "Kompletter Lehrstoff als Erklärvideos", 2, scale=7, spacing=1)

    draw_text(120, 540, "Berufsspezialist & Bachelor Professional in KI und ML (IHK)", 5, scale=4, spacing=1)

    # chips
    chips = ["12 Module", "Praxisprojekte", "Prüfungsfit"]
    chip_x = 120
    for ch in chips:
        tw = len(ch) * 6 * 3 + 40
        fill_rect(chip_x, 660, chip_x + tw, 720, 4)
        fill_rect(chip_x, 660, chip_x + tw, 662, 6)
        fill_rect(chip_x, 718, chip_x + tw, 720, 6)
        draw_text(chip_x + 16, 675, ch, 1, scale=3, spacing=1)
        chip_x += tw + 28

    # bottom bars
    fill_rect(0, h - 90, w, h - 84, 1)
    fill_rect(0, h - 78, w, h - 75, 3)

    # pack scanlines filter 0
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        raw.extend(img[y * w : (y + 1) * w])

    return make_indexed_png(w, h, bytes(raw), pal)


def main():
    out = pathlib.Path(__file__).resolve().parent / "youtube-banner-2560x1440.png"
    data = render_banner(2560, 1440)
    out.write_bytes(data)
    print(f"Wrote {out} ({len(data)} bytes)")
    if len(data) > 6 * 1024 * 1024:
        raise SystemExit("too large")


if __name__ == "__main__":
    main()
