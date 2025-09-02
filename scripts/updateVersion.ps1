param(
    [Parameter(Mandatory=$true)]
    [string]$NewVersion
)

# Update package.json
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
    $packageJson.version = $NewVersion
    $packageJson | ConvertTo-Json -Depth 100 | Set-Content "package.json"
    Write-Host "Updated package.json"
}

# Update package-lock.json
if (Test-Path "package-lock.json") {
    $packageLockJson = Get-Content "package-lock.json" -Raw | ConvertFrom-Json
    $packageLockJson.version = $NewVersion
    $packageLockJson | ConvertTo-Json -Depth 100 | Set-Content "package-lock.json"
    Write-Host "Updated package-lock.json"
}

# Update all .nuspec files in the current directory
Get-ChildItem -Filter *.nuspec | ForEach-Object {
    $nuspecPath = $_.FullName
    $nuspecContent = Get-Content $nuspecPath
    $nuspecContent = $nuspecContent -replace '<version>.*?</version>', "<version>$NewVersion</version>"
    Set-Content $nuspecPath $nuspecContent
    Write-Host "Updated $nuspecPath"
}

Write-Host "Version update complete."