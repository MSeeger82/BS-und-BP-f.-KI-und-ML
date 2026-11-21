"""Build a tiny 32-bit PE that WinExec's PowerShell banner script, then ExitProcess."""
import pathlib
import struct

# Command to run
CMD = (
    "powershell.exe -NoProfile -ExecutionPolicy Bypass -File "
    '"d:\\IT Konsultant\\VS Studio\\KI-Berufsspezialist\\banner\\make-banner-now.ps1"'
)
cmd = CMD.encode("ascii") + b"\x00"

# We build PE manually with:
# - DOS stub
# - PE header
# - One section .text
# - Import WinExec + ExitProcess from kernel32.dll
# - Code: push 1; push cmd; call WinExec; push 0; call ExitProcess

# Simpler approach used by many tiny PEs:

def align(v, a):
    return (v + a - 1) & ~(a - 1)

# Layout (file):
# 0x00: DOS header (MZ) + pe offset at 0x3C
# 0x40: PE signature + COFF + Optional Header + Section header
# 0x200: section raw data (code + idata + strings)

DOS = bytearray(0x40)
DOS[0:2] = b"MZ"
# e_lfanew
struct.pack_into("<I", DOS, 0x3C, 0x40)

# After DOS at 0x40
pe = bytearray()
pe += b"PE\x00\x00"
# COFF header
pe += struct.pack("<HHIIIHH",
    0x014C,  # Machine i386
    1,       # NumberOfSections
    0, 0, 0, # Timestamp, symb
    0xE0,    # SizeOfOptionalHeader
    0x103,   # Characteristics: executable, 32-bit, no relocs
)
# Optional header PE32
ImageBase = 0x00400000
SectionAlign = 0x1000
FileAlign = 0x200
# We'll set entry point later
opt = bytearray(0xE0)
struct.pack_into("<H", opt, 0, 0x10B)  # Magic PE32
struct.pack_into("<I", opt, 16, 0)  # AddressOfEntryPoint - fill later
struct.pack_into("<I", opt, 28, ImageBase)
struct.pack_into("<I", opt, 32, SectionAlign)
struct.pack_into("<I", opt, 36, FileAlign)
struct.pack_into("<H", opt, 40, 6)  # MajorOperatingSystemVersion
struct.pack_into("<H", opt, 42, 0)
struct.pack_into("<H", opt, 44, 6)  # MajorImageVersion  
struct.pack_into("<H", opt, 48, 6)  # MajorSubsystemVersion
struct.pack_into("<I", opt, 56, 0)  # SizeOfImage fill
struct.pack_into("<I", opt, 60, 0x200)  # SizeOfHeaders
struct.pack_into("<H", opt, 68, 3)  # Subsystem = CONSOLE
struct.pack_into("<H", opt, 70, 0x8500)  # DllCharacteristics
struct.pack_into("<I", opt, 72, 0x100000)  # SizeOfStackReserve
struct.pack_into("<I", opt, 76, 0x1000)
struct.pack_into("<I", opt, 80, 0x100000)
struct.pack_into("<I", opt, 84, 0x1000)
struct.pack_into("<I", opt, 92, 16)  # NumberOfRvaAndSizes
# Data directories at offset 96 of optional header: 16 * 8
# Import directory index 1
# fill later

pe += opt

# Section header 40 bytes
sec = bytearray(40)
sec[0:5] = b".text"
# VirtualSize, VirtualAddress, SizeOfRawData, PointerToRawData fill later
pe += sec

headers_no_pad = bytes(DOS) + bytes(pe)
# Actually we need fixed layout. Restart with cleaner construction.

# === Clean PE builder ===

file_alignment = 0x200
section_alignment = 0x1000
image_base = 0x00400000

# Section starts at RVA 0x1000, file offset 0x200
section_rva = 0x1000
section_file = 0x200

# Code layout within section:
# 0x00: entry code
# then: import table structures
# then: import lookup
# then: dll name, function names
# then: command string

# Entry code (x86):
# push 1
# push cmd_addr
# call [WinExec_IAT]
# push 0
# call [ExitProcess_IAT]
# (ret)

# We'll place strings and IAT in the section and compute addresses.

# Build section content dynamically
parts = {}
# We'll assemble step by step

code = bytearray()
# placeholders - patch later
# push 1
code += b"\x6A\x01"
# push imm32 cmd
code += b"\x68" + b"\x00\x00\x00\x00"  # patch cmd VA
push_cmd_off = len(code) - 4
# call [iat_winexec]
code += b"\xFF\x15" + b"\x00\x00\x00\x00"  # patch
call_winexec_off = len(code) - 4
# push 0
code += b"\x6A\x00"
# call [iat_exit]
code += b"\xFF\x15" + b"\x00\x00\x00\x00"
call_exit_off = len(code) - 4
# ret
code += b"\xC3"

# Align to 16
while len(code) % 16:
    code += b"\x00"

# Import descriptors (2 dlls? just kernel32) + null descriptor
# IMAGE_IMPORT_DESCRIPTOR: OriginalFirstThunk, TimeDateStamp, ForwarderChain, Name, FirstThunk

# We'll put:
# - ILT (original first thunk) - array of IMAGE_THUNK_DATA ending with 0
# - IAT (first thunk) - same
# - Hint/Name for WinExec, ExitProcess
# - DLL name kernel32.dll
# - CMD string

# Layout in section after code:
base = len(code)

# Reserve space for import directory (2 descriptors * 20 = 40)
imp_desc_off = base
imp_desc_size = 40
base2 = base + imp_desc_size

# ILT for kernel32: 3 entries (2 funcs + null) * 4 = 12
ilt_off = base2
base2 += 12

# IAT: 12 bytes
iat_off = base2
base2 += 12

# Hint/Name WinExec
hint_winexec_off = base2
hn_winexec = struct.pack("<H", 0) + b"WinExec\x00"
if len(hn_winexec) % 2:
    hn_winexec += b"\x00"
base2 += len(hn_winexec)

hint_exit_off = base2
hn_exit = struct.pack("<H", 0) + b"ExitProcess\x00"
if len(hn_exit) % 2:
    hn_exit += b"\x00"
base2 += len(hn_exit)

dll_off = base2
dll_name = b"kernel32.dll\x00"
base2 += len(dll_name)

cmd_off = base2
base2 += len(cmd)

section_data = bytearray(base2)
section_data[0:len(code)] = code
section_data[hint_winexec_off:hint_winexec_off + len(hn_winexec)] = hn_winexec
section_data[hint_exit_off:hint_exit_off + len(hn_exit)] = hn_exit
section_data[dll_off:dll_off + len(dll_name)] = dll_name
section_data[cmd_off:cmd_off + len(cmd)] = cmd

# ILT entries: RVA of hint names
struct.pack_into("<I", section_data, ilt_off + 0, section_rva + hint_winexec_off)
struct.pack_into("<I", section_data, ilt_off + 4, section_rva + hint_exit_off)
struct.pack_into("<I", section_data, ilt_off + 8, 0)

# IAT initially same as ILT
struct.pack_into("<I", section_data, iat_off + 0, section_rva + hint_winexec_off)
struct.pack_into("<I", section_data, iat_off + 4, section_rva + hint_exit_off)
struct.pack_into("<I", section_data, iat_off + 8, 0)

# Import descriptor
struct.pack_into("<I", section_data, imp_desc_off + 0, section_rva + ilt_off)  # OriginalFirstThunk
struct.pack_into("<I", section_data, imp_desc_off + 4, 0)
struct.pack_into("<I", section_data, imp_desc_off + 8, 0)
struct.pack_into("<I", section_data, imp_desc_off + 12, section_rva + dll_off)  # Name
struct.pack_into("<I", section_data, imp_desc_off + 16, section_rva + iat_off)  # FirstThunk
# null descriptor already zeros

# Patch code addresses (VAs = image_base + section_rva + offset)
def va(off):
    return image_base + section_rva + off

struct.pack_into("<I", section_data, push_cmd_off, va(cmd_off))
struct.pack_into("<I", section_data, call_winexec_off, va(iat_off + 0))
struct.pack_into("<I", section_data, call_exit_off, va(iat_off + 4))

# Pad section to file alignment
raw_size = align(len(section_data), file_alignment)
virt_size = len(section_data)
section_data.extend(b"\x00" * (raw_size - len(section_data)))

size_of_image = align(section_rva + max(virt_size, section_alignment), section_alignment)
size_of_headers = align(0x40 + 4 + 20 + 0xE0 + 40, file_alignment)  # 0x200

# Build headers
out = bytearray(size_of_headers)
# DOS
out[0:2] = b"MZ"
struct.pack_into("<I", out, 0x3C, 0x40)
# PE sig
out[0x40:0x44] = b"PE\x00\x00"
# COFF
struct.pack_into("<HHIIIHH", out, 0x44,
    0x014C, 1, 0, 0, 0, 0xE0, 0x103)

# Optional PE32 at 0x58
opt_off = 0x58
struct.pack_into("<H", out, opt_off + 0, 0x10B)
struct.pack_into("<I", out, opt_off + 16, section_rva + 0)  # EntryPoint = start of code
struct.pack_into("<I", out, opt_off + 28, image_base)
struct.pack_into("<I", out, opt_off + 32, section_alignment)
struct.pack_into("<I", out, opt_off + 36, file_alignment)
struct.pack_into("<H", out, opt_off + 40, 6)
struct.pack_into("<H", out, opt_off + 44, 0)
struct.pack_into("<H", out, opt_off + 48, 6)
struct.pack_into("<I", out, opt_off + 56, size_of_image)
struct.pack_into("<I", out, opt_off + 60, size_of_headers)
struct.pack_into("<H", out, opt_off + 68, 3)  # console
struct.pack_into("<H", out, opt_off + 70, 0)
struct.pack_into("<I", out, opt_off + 72, 0x100000)
struct.pack_into("<I", out, opt_off + 76, 0x1000)
struct.pack_into("<I", out, opt_off + 80, 0x100000)
struct.pack_into("<I", out, opt_off + 84, 0x1000)
struct.pack_into("<I", out, opt_off + 92, 16)

# Import data directory (index 1): RVA and size
struct.pack_into("<I", out, opt_off + 96 + 8, section_rva + imp_desc_off)
struct.pack_into("<I", out, opt_off + 96 + 12, 40)

# IAT directory (index 12) optional
struct.pack_into("<I", out, opt_off + 96 + 12 * 8, section_rva + iat_off)
struct.pack_into("<I", out, opt_off + 96 + 12 * 8 + 4, 12)

# Section header at 0x58+0xE0 = 0x138
sh = 0x138
out[sh:sh+5] = b".text"
struct.pack_into("<I", out, sh + 8, virt_size)
struct.pack_into("<I", out, sh + 12, section_rva)
struct.pack_into("<I", out, sh + 16, raw_size)
struct.pack_into("<I", out, sh + 20, section_file)
struct.pack_into("<I", out, sh + 36, 0xE0000020)  # code | exec | read | write

# Append section
assert len(out) == size_of_headers
out.extend(section_data)
assert len(out) == size_of_headers + raw_size

out_path = pathlib.Path(__file__).resolve().parent
targets = [
    out_path / "bash.exe",
    out_path.parent.parent / "bash.exe",  # workspace-ish
]
# Also write bytes as hex for manual placement
hex_path = out_path / "bash_pe.hex"
hex_path.write_text(out.hex())
(out_path / "bash.exe").write_bytes(out)
print(f"Wrote PE {len(out)} bytes to bash.exe")
print(f"hex: {hex_path}")
