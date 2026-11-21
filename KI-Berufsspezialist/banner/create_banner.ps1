# YouTube banner generator using System.Drawing (no pip required)
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$W = 2560
$H = 1440
$outDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$outMain = Join-Path $outDir "youtube-banner-2560x1440.png"
$outSafe = Join-Path $outDir "youtube-banner.png"

$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Background gradient
$rect = New-Object System.Drawing.Rectangle 0, 0, $W, $H
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rect,
    [System.Drawing.Color]::FromArgb(255, 7, 11, 18),
    [System.Drawing.Color]::FromArgb(255, 12, 21, 34),
    90.0
)
$g.FillRectangle($bgBrush, $rect)

# Radial-ish glow (layered ellipses)
for ($i = 0; $i -lt 12; $i++) {
    $alpha = [int](18 - $i * 1.2)
    if ($alpha -lt 2) { $alpha = 2 }
    $glowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($alpha, 34, 180, 210))
    $pad = $i * 70
    $g.FillEllipse($glowBrush, [int]($W * 0.35 - $pad), [int]($H * 0.15 - $pad), [int]($W * 0.45 + 2 * $pad), [int]($H * 0.55 + 2 * $pad))
    $glowBrush.Dispose()
}

# Left orb
for ($i = 0; $i -lt 8; $i++) {
    $alpha = [int](14 - $i)
    if ($alpha -lt 2) { $alpha = 2 }
    $glowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($alpha, 20, 120, 140))
    $pad = $i * 40
    $g.FillEllipse($glowBrush, [int]($W * 0.08 - $pad), [int]($H * 0.4 - $pad), [int](280 + 2 * $pad), [int](280 + 2 * $pad))
    $glowBrush.Dispose()
}

# Grid
$gridPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(45, 30, 58, 78), 1.0)
for ($x = 0; $x -lt $W; $x += 80) { $g.DrawLine($gridPen, $x, 0, $x, $H) }
for ($y = 0; $y -lt $H; $y += 80) { $g.DrawLine($gridPen, 0, $y, $W, $y) }
$gridPen.Dispose()

$cyan = [System.Drawing.Color]::FromArgb(255, 34, 211, 238)
$teal = [System.Drawing.Color]::FromArgb(255, 45, 212, 191)
$white = [System.Drawing.Color]::FromArgb(255, 248, 250, 252)
$muted = [System.Drawing.Color]::FromArgb(255, 148, 163, 184)
$foot = [System.Drawing.Color]::FromArgb(255, 100, 116, 139)

# Neural net left
$layers = @(
    @(@(180,420), @(160,560), @(190,700), @(150,820)),
    @(@(340,380), @(360,520), @(350,660), @(370,780), @(330,900)),
    @(@(520,460), @(540,600), @(510,740), @(530,860))
)
$edgePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(55, 34, 211, 238), 1.0)
for ($li = 0; $li -lt $layers.Count - 1; $li++) {
    foreach ($a in $layers[$li]) {
        foreach ($b in $layers[$li + 1]) {
            $g.DrawLine($edgePen, $a[0], $a[1], $b[0], $b[1])
        }
    }
}
$edgePen.Dispose()
$nodeBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220, 34, 211, 238))
$nodePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(70, 34, 211, 238), 2.0)
foreach ($layer in $layers) {
    foreach ($p in $layer) {
        $g.FillEllipse($nodeBrush, $p[0] - 6, $p[1] - 6, 12, 12)
        $g.DrawEllipse($nodePen, $p[0] - 10, $p[1] - 10, 20, 20)
    }
}
$nodeBrush.Dispose(); $nodePen.Dispose()

# Bar chart right
$baseX = 2100; $baseY = 920
$bars = @(90, 140, 110, 180, 150, 220, 190)
$bw = 28; $gap = 18
for ($i = 0; $i -lt $bars.Count; $i++) {
    $h = $bars[$i]
    $x0 = $baseX + $i * ($bw + $gap)
    $br = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(50 + $i * 12, 34, 211, 238))
    $g.FillRectangle($br, $x0, $baseY - $h, $bw, $h)
    $br.Dispose()
    $bp = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(150, 34, 211, 238), 1.0)
    $g.DrawRectangle($bp, $x0, $baseY - $h, $bw, $h)
    $bp.Dispose()
}
$basePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(120, 34, 211, 238), 2.0)
$g.DrawLine($basePen, $baseX - 10, $baseY, $baseX + $bars.Count * ($bw + $gap), $baseY)
$basePen.Dispose()

# Corner brackets
$bPen = New-Object System.Drawing.Pen $cyan, 3.0
$m = 48; $L = 70
$g.DrawLines($bPen, @((New-Object System.Drawing.Point $m, ($m+$L)), (New-Object System.Drawing.Point $m, $m), (New-Object System.Drawing.Point ($m+$L), $m)))
$g.DrawLines($bPen, @((New-Object System.Drawing.Point ($W-$m-$L), $m), (New-Object System.Drawing.Point ($W-$m), $m), (New-Object System.Drawing.Point ($W-$m), ($m+$L))))
$g.DrawLines($bPen, @((New-Object System.Drawing.Point $m, ($H-$m-$L)), (New-Object System.Drawing.Point $m, ($H-$m)), (New-Object System.Drawing.Point ($m+$L), ($H-$m))))
$g.DrawLines($bPen, @((New-Object System.Drawing.Point ($W-$m-$L), ($H-$m)), (New-Object System.Drawing.Point ($W-$m), ($H-$m)), (New-Object System.Drawing.Point ($W-$m), ($H-$m-$L))))
$bPen.Dispose()

# Bottom bars
$cyanBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(200, 34, 211, 238))
$tealBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(160, 45, 212, 191))
$g.FillRectangle($cyanBrush, 0, $H - 8, $W, 8)
$g.FillRectangle($tealBrush, 0, $H - 14, [int]($W/3), 6)
$cyanBrush.Dispose(); $tealBrush.Dispose()

# Fonts
function Get-Font([float]$size, [bool]$bold) {
    $style = if ($bold) { [System.Drawing.FontStyle]::Bold } else { [System.Drawing.FontStyle]::Regular }
    foreach ($name in @("Segoe UI", "Arial", "Calibri", "Tahoma")) {
        try { return New-Object System.Drawing.Font $name, $size, $style, [System.Drawing.GraphicsUnit]::Pixel } catch {}
    }
    return New-Object System.Drawing.Font "Microsoft Sans Serif", $size, $style, [System.Drawing.GraphicsUnit]::Pixel
}

$fontBadge = Get-Font 28 $true
$fontTitle = Get-Font 72 $true
$fontSub = Get-Font 34 $false
$fontChip = Get-Font 24 $false
$fontFoot = Get-Font 26 $false

$safeW = 1546; $safeH = 423
$safeL = [int](($W - $safeW) / 2)
$safeT = [int](($H - $safeH) / 2)

$sf = [System.Drawing.StringFormat]::GenericTypographic
$sf.Alignment = [System.Drawing.StringAlignment]::Near

function Measure-W($text, $font) {
    return [math]::Ceiling($g.MeasureString($text, $font, [System.Drawing.PointF]::new(0,0), $sf).Width)
}

# Badge
$badge = "IHK · KI & MASCHINELLES LERNEN"
$bw = Measure-W $badge $fontBadge
$bh = 28
$bx = $safeL + [int](($safeW - $bw) / 2)
$by = $safeT + 36
$padX = 28; $padY = 14
$pillRect = New-Object System.Drawing.RectangleF ($bx - $padX), ($by - $padY), ($bw + 2*$padX), ($bh + 2*$padY)
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$radius = 22.0
$r = $pillRect
$path.AddArc($r.X, $r.Y, $radius, $radius, 180, 90)
$path.AddArc($r.Right - $radius, $r.Y, $radius, $radius, 270, 90)
$path.AddArc($r.Right - $radius, $r.Bottom - $radius, $radius, $radius, 0, 90)
$path.AddArc($r.X, $r.Bottom - $radius, $radius, $radius, 90, 90)
$path.CloseFigure()
$pillBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(180, 8, 30, 40))
$g.FillPath($pillBrush, $path)
$pillPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(160, 34, 211, 238), 2.0)
$g.DrawPath($pillPen, $path)
$pillBrush.Dispose(); $pillPen.Dispose(); $path.Dispose()
$badgeBrush = New-Object System.Drawing.SolidBrush $cyan
$g.DrawString($badge, $fontBadge, $badgeBrush, $bx, $by)
$badgeBrush.Dispose()

# Title
$title = "Kompletter Lehrstoff als Erklärvideos"
$tw = Measure-W $title $fontTitle
$tx = $safeL + [int](($safeW - $tw) / 2)
$ty = $by + $bh + 40
# shadow
$shadowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(80, 0, 40, 60))
$g.DrawString($title, $fontTitle, $shadowBrush, ($tx + 2), ($ty + 2))
$shadowBrush.Dispose()
$titleBrush = New-Object System.Drawing.SolidBrush $white
$g.DrawString($title, $fontTitle, $titleBrush, $tx, $ty)
$titleBrush.Dispose()

# Subtitle
$sub = "Berufsspezialist & Bachelor Professional in KI und ML (IHK)"
$sw = Measure-W $sub $fontSub
$sx = $safeL + [int](($safeW - $sw) / 2)
$sy = $ty + 88
$subBrush = New-Object System.Drawing.SolidBrush $muted
$g.DrawString($sub, $fontSub, $subBrush, $sx, $sy)
$subBrush.Dispose()

# Chips
$chips = @("12 Module", "Praxisprojekte", "Prüfungsfit")
$chipGap = 18
$chipHeights = 40
$chipWidths = @()
foreach ($c in $chips) {
    $chipWidths += ([int](Measure-W $c $fontChip) + 36)
}
$totalCw = ($chipWidths | Measure-Object -Sum).Sum + $chipGap * ($chips.Count - 1)
$cx0 = $safeL + [int](($safeW - $totalCw) / 2)
$cy0 = $sy + 56
$x = $cx0
for ($i = 0; $i -lt $chips.Count; $i++) {
    $cw = $chipWidths[$i]
    $chipPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $cr = 12.0
    $rr = New-Object System.Drawing.RectangleF $x, $cy0, $cw, $chipHeights
    $chipPath.AddArc($rr.X, $rr.Y, $cr, $cr, 180, 90)
    $chipPath.AddArc($rr.Right - $cr, $rr.Y, $cr, $cr, 270, 90)
    $chipPath.AddArc($rr.Right - $cr, $rr.Bottom - $cr, $cr, $cr, 0, 90)
    $chipPath.AddArc($rr.X, $rr.Bottom - $cr, $cr, $cr, 90, 90)
    $chipPath.CloseFigure()
    $cBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(160, 15, 40, 55))
    $g.FillPath($cBrush, $chipPath)
    $cPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(100, 34, 211, 238), 1.0)
    $g.DrawPath($cPen, $chipPath)
    $cBrush.Dispose(); $cPen.Dispose(); $chipPath.Dispose()
    $tBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(230, 165, 243, 252))
    $lw = Measure-W $chips[$i] $fontChip
    $g.DrawString($chips[$i], $fontChip, $tBrush, ($x + ($cw - $lw) / 2), ($cy0 + 8))
    $tBrush.Dispose()
    $x += $cw + $chipGap
}

# Footers
$footBrush = New-Object System.Drawing.SolidBrush $foot
$g.DrawString("Prüfungsorientiert · Praxisnah · Strukturiert", $fontFoot, $footBrush, 64, ($H - 64))
$fr = "DQR 5 · DQR 6"
$frw = Measure-W $fr $fontFoot
$g.DrawString($fr, $fontFoot, $footBrush, ($W - 64 - $frw), ($H - 64))
$footBrush.Dispose()

$dotBrush = New-Object System.Drawing.SolidBrush $cyan
$g.FillEllipse($dotBrush, 48, ($H - 58), 8, 8)
$dotBrush.Dispose()
$dot2 = New-Object System.Drawing.SolidBrush $teal
$g.FillEllipse($dot2, ($W - 56), ($H - 58), 8, 8)
$dot2.Dispose()

# Save
$bmp.Save($outMain, [System.Drawing.Imaging.ImageFormat]::Png)
[System.IO.File]::Copy($outMain, $outSafe, $true)

$g.Dispose()
$bmp.Dispose()
$bgBrush.Dispose()
$fontBadge.Dispose(); $fontTitle.Dispose(); $fontSub.Dispose(); $fontChip.Dispose(); $fontFoot.Dispose()

$len = (Get-Item $outMain).Length
Write-Host "Wrote: $outMain"
Write-Host "Also:  $outSafe"
Write-Host ("Size:  {0} bytes ({1:N3} MB)" -f $len, ($len / 1MB))
Write-Host "Dims:  ${W}x${H}"
if ($len -gt 6MB) { throw "File exceeds 6MB" }
