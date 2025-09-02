param(
    [Parameter(Mandatory=$true)]
    [string]$OctopusUrl,
    
    [Parameter(Mandatory=$true)]
    [string]$OctopusApiKey,
    
    [Parameter(Mandatory=$true)]
    [string]$ProjectName,
    
    [Parameter(Mandatory=$true)]
    [string]$Version,
    
    [Parameter(Mandatory=$true)]
    [string]$Environment,
    
    [Parameter(Mandatory=$false)]
    [string]$ReleaseNotes = ""
)

# Ensure Octopus CLI is installed
$octopusInstalled = dotnet tool list --global | Select-String "Octopus.DotNet.Cli"
if (-not $octopusInstalled) {
    Write-Host "Installing Octopus CLI..."
    dotnet tool install --global Octopus.DotNet.Cli
}

# Create release
Write-Host "Creating Octopus release..."
octo create-release `
    --project $ProjectName `
    --version $Version `
    --releaseNotes $ReleaseNotes `
    --server $OctopusUrl `
    --apiKey $OctopusApiKey

# Deploy release
Write-Host "Deploying to $Environment..."
octo deploy-release `
    --project $ProjectName `
    --version $Version `
    --deployTo $Environment `
    --server $OctopusUrl `
    --apiKey $OctopusApiKey `
    --waitForDeployment

Write-Host "✅ Deployment to Octopus completed successfully!" 