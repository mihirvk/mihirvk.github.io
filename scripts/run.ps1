param(
    [ValidateSet('dev', 'check', 'build', 'preview', 'test', 'test:site', 'test:browser')]
    [string]$Task = 'dev'
)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$portableRoot = Join-Path $projectRoot '.tools'
if (Test-Path -LiteralPath $portableRoot) {
    $portableNode = Get-ChildItem -LiteralPath $portableRoot -Directory -Filter 'node-v24.*-win-x64' |
        Sort-Object { [version]($_.Name -replace '^node-v','' -replace '-win-x64$','') } -Descending |
        Select-Object -First 1
    if ($portableNode) { $env:Path = "$($portableNode.FullName);$env:Path" }
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Install Node.js 24 LTS, or put its official portable Windows distribution in .tools, then retry.' }
Push-Location $projectRoot
try { & npm.cmd run $Task; $taskExit = $LASTEXITCODE } finally { Pop-Location }
exit $taskExit
