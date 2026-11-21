#Requires -Version 5.1
# YouTube banner 2560x1440 — System.Drawing only (no Python/Node)
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$W = 2560
$H = 1440
$outDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $outDir) { $outDir = "d:\IT Konsultant\VS Studio\KI-Berufsspezialist\banner" }
$outMain = Join-Path $outDir "youtube-banner-2560x1440.png"

$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

function ARGB([int]$a, [int]$r, [int]$g, [int]$b) {
    return [System.Drawing.Color]::FromArgb($a, $r, $g, $b)
}

# BG #070b12
$rect = New-Object System.Drawing.Rectangle 0, 0, $W, $H
$bg1 = ARGB 255 7 11 18
$bg2 = ARGB 255 6 16 24
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $bg1, $bg2, 90.0)
$g.FillRectangle($bgBrush, $rect)
$bgBrush.Dispose()

# Radial cyan/teal glows
for ($i = 0; $i -lt 14; $i++) {
    $alpha = [Math]::Max(2, [int](22 - $i * 1.4))
    $br = New-Object System.Drawing.SolidBrush (ARGB $alpha 34 211 238)
    $pad = $i * 65
    $g.FillEllipse($br, [int]($W * 0.38 - $pad), [int]($H * 0.12 - $pad), [int]($W * 0.42 + 2 * $pad), [int]($H * 0.5 + 2 * $pad))
    $br.Dispose()
}
for ($i = 0; $i -lt 10; $i++) {
    $alpha = [Math]::Max(2, [int](16 - $i * 1.3))
    $br = New-Object System.Drawing.SolidBrush (ARGB $alpha 13 148 136)
    $pad = $i * 45
    $g.FillEllipse($br, [int]($W * 0.05 - $pad), [int]($H * 0.35 - $pad), [int](320 + 2 * $pad), [int](320 + 2 * $pad))
    $br.Dispose()
}

# Grid
$gridPen = New-Object System.Drawing.Pen (ARGB 28 45 212 191), 1.0
for ($x = 0; $x -lt $W; $x += 80) { $g.DrawLine($gridPen, $x, 0, $x, $H) }
for ($y = 0; $y -lt $H; $y += 80) { $g.DrawLine($gridPen, 0, $y, $W, $y) }
$gridPen.Dispose()

# Corner brackets
$brPen = New-Object System.Drawing.Pen (ARGB 200 34 211 238), 3.0
$cs = 70
foreach ($c in @(
    @(48, 48, 1, 1),
    @($W - 48, 48, -1, 1),
    @(48, $H - 48, 1, -1),
    @($W - 48, $H - 48, -1, -1)
)) {
    $cx = [int]$c[0]; $cy = [int]$c[1]; $dx = [int]$c[2]; $dy = [int]$c[3]
    $g.DrawLine($brPen, $cx, $cy, $cx + $dx * $cs, $cy)
    $g.DrawLine($brPen, $cx, $cy, $cx, $cy + $dy * $cs)
}
$brPen.Dispose()

# Fonts (Segoe UI)
$fontBadge = New-Object System.Drawing.Font "Segoe UI Semibold", 22, ([System.Drawing.FontStyle]::Bold)
$fontH1 = New-Object System.Drawing.Font "Segoe UI", 64, ([System.Drawing.FontStyle]::Bold)
$fontSub = New-Object System.Drawing.Font "Segoe UI", 28, ([System.Drawing.FontStyle]::Regular)
$fontChip = New-Object System.Drawing.Font "Segoe UI Semibold", 18, ([System.Drawing.FontStyle]::Bold)

$cyan = ARGB 255 34 211 238
$white = ARGB 255 241 245 249
$muted = ARGB 255 148 163 184
$chipBg = ARGB 255 12 24 36
$chipBd = ARGB 255 30 64 80

$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Near
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center

# Badge pill
$badge = "IHK · KI & MASCHINELLES LERNEN"
$badgeSize = $g.MeasureString($badge, $fontBadge)
$bx = 120
$by = 280
$padX = 28; $padY = 14
$bw = $badgeSize.Width; $bh = $badgeSize.Height
$pill = New-Object System.Drawing.Drawing2D.GraphicsPath
$pr = New-Object System.Drawing.RectangleF ($bx - $padX), ($by - $padY), ($bw + 2 * $padX), ($bh + 2 * $padY)
$rr = 24.0
$pill.AddArc($pr.X, $pr.Y, $rr, $rr, 180, 90)
$pill.AddArc($pr.Right - $rr, $pr.Y, $rr, $rr, 270, 90)
$pill.AddArc($pr.Right - $rr, $pr.Bottom - $rr, $rr, $rr, 0, 90)
$pill.AddArc($pr.X, $pr.Bottom - $rr, $rr, $rr, 90, 90)
$pill.CloseFigure()
$g.FillPath((New-Object System.Drawing.SolidBrush (ARGB 220 8 20 32)), $pill)
$g.DrawPath((New-Object System.Drawing.Pen $cyan, 2.0), $pill)
$g.DrawString($badge, $fontBadge, (New-Object System.Drawing.SolidBrush $cyan), $bx, $by, $sf)

# H1
$h1 = "Kompletter Lehrstoff als Erklärvideos"
$g.DrawString($h1, $fontH1, (New-Object System.Drawing.SolidBrush $white), 120, 420, $sf)

# Sub
$sub = "Berufsspezialist & Bachelor Professional in KI und ML (IHK)"
$g.DrawString($sub, $fontSub, (New-Object System.Drawing.SolidBrush $muted), 120, 560, $sf)

# Chips
$chips = @("12 Module", "Praxisprojekte", "Prüfungsfit")
$chipX = 120
$chipY = 680
foreach ($ch in $chips) {
    $sz = $g.MeasureString($ch, $fontChip)
    $cw = $sz.Width + 40
    $chh = $sz.Height + 20
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $cr = New-Object System.Drawing.RectangleF $chipX, $chipY, $cw, $chh
    $r = 16.0
    $path.AddArc($cr.X, $cr.Y, $r, $r, 180, 90)
    $path.AddArc($cr.Right - $r, $cr.Y, $r, $r, 270, 90)
    $path.AddArc($cr.Right - $r, $cr.Bottom - $r, $r, $r, 0, 90)
    $path.AddArc($cr.X, $cr.Bottom - $r, $r, $r, 90, 90)
    $path.CloseFigure()
    $g.FillPath((New-Object System.Drawing.SolidBrush $chipBg), $path)
    $g.DrawPath((New-Object System.Drawing.Pen $chipBd, 1.5), $path)
    $g.DrawString($ch, $fontChip, (New-Object System.Drawing.SolidBrush $cyan), ($chipX + 20), ($chipY + $chh / 2), $sf)
    $chipX += [int]($cw + 24)
}

# Bottom accent bars
$barY = $H - 90
$g.FillRectangle((New-Object System.Drawing.SolidBrush (ARGB 255 34 211 238)), 0, $barY, $W, 6)
$g.FillRectangle((New-Object System.Drawing.SolidBrush (ARGB 180 13 148 136)), 0, ($barY + 12), $W, 3)
$g.FillRectangle((New-Object System.Drawing.SolidBrush (ARGB 100 45 212 191)), 0, 0, $W, 4)

# Save PNG
$pngCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/png" }
$enc = [System.Drawing.Imaging.Encoder]::Quality
# PNG ignores quality; use default save
$bmp.Save($outMain, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$fontBadge.Dispose(); $fontH1.Dispose(); $fontSub.Dispose(); $fontChip.Dispose()

$item = Get-Item -LiteralPath $outMain
Write-Output "OK path=$($item.FullName) length=$($item.Length) size=$($item.Length)"
if ($item.Length -gt 6MB) { throw "File exceeds 6MB" }
if ($item.Length -lt 1000) { throw "File too small" }
