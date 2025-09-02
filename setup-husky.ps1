# Install Husky
npm install husky --save-dev

# Initialize Husky
npx husky install

# Make the pre-commit hook executable
$preCommitPath = ".husky/pre-commit"
if (Test-Path $preCommitPath) {
    $acl = Get-Acl $preCommitPath
    $rule = New-Object System.Security.AccessControl.FileSystemAccessRule("Everyone", "FullControl", "Allow")
    $acl.SetAccessRule($rule)
    Set-Acl $preCommitPath $acl
    Write-Host "✅ Husky pre-commit hook is now executable"
} else {
    Write-Host "❌ Error: pre-commit hook not found at $preCommitPath"
    exit 1
}

Write-Host "✅ Husky setup complete!" 