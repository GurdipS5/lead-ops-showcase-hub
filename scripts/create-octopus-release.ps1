param(
    [Parameter(Mandatory=$true)]
    [string]$OctopusUrl,
    
    [Parameter(Mandatory=$true)]
    [string]$OctopusApiKey,
    
    [Parameter(Mandatory=$true)]
    [string]$ProjectName,
    
    [Parameter(Mandatory=$true)]
    [string]$Version,
    
    [Parameter(Mandatory=$false)]
    [string]$ReleaseNotes = "",
    
    [Parameter(Mandatory=$false)]
    [string]$Environment = "Development"
)

# Ensure Octopus CLI is installed
$octopusInstalled = dotnet tool list --global | Select-String "Octopus.DotNet.Cli"
if (-not $octopusInstalled) {
    Write-Host "Installing Octopus CLI..."
    dotnet tool install --global Octopus.DotNet.Cli
}

# Create release information
$releaseInfo = @{
    "ProjectName" = $ProjectName
    "Version" = $Version
    "ReleaseNotes" = $ReleaseNotes
    "Environment" = $Environment
    "CreatedAt" = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    "GitCommit" = (git rev-parse HEAD)
    "GitBranch" = (git rev-parse --abbrev-ref HEAD)
} | ConvertTo-Json

# Save release information to file
$releaseInfo | Out-File -FilePath "octopus-release.json" -Encoding utf8

Write-Host "✅ Octopus release information created successfully!" 