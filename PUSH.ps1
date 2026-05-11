# PUSH.ps1 -- applies the prepared commit and pushes to GitHub.
# Vercel auto-deploys on push to main. Run from anywhere:
#
#   powershell -ExecutionPolicy Bypass -File "C:\Users\kenny\Documents\Claude\Projects\ZebraWell NEW\PUSH.ps1"
#
# Or right-click the file and "Run with PowerShell."

$ErrorActionPreference = "Stop"

$BundlePath = "C:\Users\kenny\Documents\Claude\Projects\ZebraWell NEW\zebra-changes.bundle"
$RepoUrl    = "https://github.com/kenchapmanpdx-png/ZebraPreSellWarm.git"
$Workdir    = Join-Path $env:TEMP ("zebra-push-" + (Get-Date -Format "yyyyMMdd-HHmmss"))

Write-Host ""
Write-Host "==> Verifying bundle..." -ForegroundColor Cyan
if (-not (Test-Path $BundlePath)) {
    Write-Host "ERROR: bundle not found at $BundlePath" -ForegroundColor Red
    exit 1
}

# Test git is available
try {
    $null = git --version
} catch {
    Write-Host "ERROR: git is not installed or not on PATH." -ForegroundColor Red
    exit 1
}

Write-Host "==> Cloning a fresh copy to $Workdir ..." -ForegroundColor Cyan
git clone --quiet $RepoUrl $Workdir
if ($LASTEXITCODE -ne 0) { Write-Host "Clone failed." -ForegroundColor Red; exit 1 }

Push-Location $Workdir
try {
    Write-Host "==> Verifying bundle compatibility..." -ForegroundColor Cyan
    git bundle verify $BundlePath
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: bundle is not compatible with current main." -ForegroundColor Red
        Write-Host "       This usually means main has moved. Pull latest, regenerate, retry." -ForegroundColor Yellow
        exit 1
    }

    Write-Host "==> Fetching commit from bundle..." -ForegroundColor Cyan
    git fetch $BundlePath HEAD
    if ($LASTEXITCODE -ne 0) { Write-Host "Fetch from bundle failed." -ForegroundColor Red; exit 1 }

    Write-Host "==> Fast-forwarding main..." -ForegroundColor Cyan
    git merge --ff-only FETCH_HEAD
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: cannot fast-forward. main has new commits since bundle was made." -ForegroundColor Red
        exit 1
    }

    Write-Host ""
    Write-Host "==> About to push the following commit:" -ForegroundColor Cyan
    git log --oneline -1
    Write-Host ""

    $confirm = Read-Host "Push to origin/main? [y/N]"
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-Host "Cancelled. Workdir kept at $Workdir if you want to inspect." -ForegroundColor Yellow
        exit 0
    }

    Write-Host "==> Pushing..." -ForegroundColor Cyan
    git push origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "Push failed. Common causes:" -ForegroundColor Red
        Write-Host "  - GitHub credentials not configured locally (run gh auth login or set up a PAT)"
        Write-Host "  - Network issue"
        Write-Host "Workdir kept at $Workdir for retry."
        exit 1
    }

    Write-Host ""
    Write-Host "==> Push succeeded." -ForegroundColor Green
    Write-Host "    Vercel should start auto-building the new deployment now."
    Write-Host "    Watch progress: https://vercel.com/kenchapmanpdx-pngs-projects/zebra-pre-sell-warm"
    Write-Host ""
    Write-Host "    Once live, check:"
    Write-Host "      https://zebra-pre-sell-warm.vercel.app/           - main site"
    Write-Host "      https://zebra-pre-sell-warm.vercel.app/preorder   - preorder funnel"
    Write-Host "      https://zebra-pre-sell-warm.vercel.app/showcase   - orphan components preview"
    Write-Host ""
} finally {
    Pop-Location
    Write-Host "==> Cleaning up workdir..."
    Remove-Item -Recurse -Force $Workdir -ErrorAction SilentlyContinue
}
