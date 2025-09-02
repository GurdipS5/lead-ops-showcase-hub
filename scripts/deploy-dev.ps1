param(
    [Parameter(Mandatory=$true)]
    [string]$SiteName,
    
    [Parameter(Mandatory=$true)]
    [string]$NetlifyToken,
    
    [Parameter(Mandatory=$false)]
    [string]$Branch = "develop",
    
    [Parameter(Mandatory=$false)]
    [string]$PublishDirectory = "dist"
)

# Ensure we have the Netlify CLI installed
$netlifyInstalled = npm list -g netlify-cli --depth=0
if (-not $netlifyInstalled) {
    Write-Host "Installing Netlify CLI..."
    npm install -g netlify-cli
}

# Login to Netlify if not already logged in
$netlifyWhoami = netlify whoami 2>&1
if ($netlifyWhoami -match "Not logged in") {
    Write-Host "Logging in to Netlify..."
    netlify login
}

# Set the Netlify token
$env:NETLIFY_AUTH_TOKEN = $NetlifyToken

# Deploy to Netlify
Write-Host "Deploying to Netlify..."
$deployCommand = "netlify deploy --prod --site $SiteName --dir $PublishDirectory --branch $Branch"
Invoke-Expression $deployCommand

# Clean up
$env:NETLIFY_AUTH_TOKEN = $null

Write-Host "✅ Deployment complete!" 