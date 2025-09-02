using Octokit;
using Serilog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Nuke.Common.Git;
using Nuke.Common.Tooling;
using Nuke.Common.Tools.NerdbankGitVersioning;
using Serilog.Core;
using Nuke.Common.Utilities.Collections;
using Nuke.Common.Utilities;

namespace _build
{
    public static class Helpers
    {

        public static string RootDirectory;

        [GitRepository]
        readonly static GitRepository Repository;

        [PathVariable("git")]
        readonly static Tool Git;

        private static readonly NerdbankGitVersioning _gitVersioning;

        public static bool DetermineCompliance(string toolName, string resultsFile, int exitCode)
        {
            switch (toolName)
            {
                case "qodana-code-quality":
                    // Qodana: Check if there are any critical issues in SARIF
                    return CheckQodanaCompliance(resultsFile);
                case "pa11y-accessibility":
                    // Pa11y: Check if there are accessibility issues
                    return CheckPa11yCompliance(resultsFile);
                case "gitguardian-secrets":
                    // GitGuardian: Check if secrets were found
                    return CheckGitGuardianCompliance(resultsFile);
                default:
                    // Fallback to exit code
                    return exitCode == 0;
            }
        }

        private static bool CheckQodanaCompliance(string sarifFile)
        {
            try
            {
                var content = File.ReadAllText(sarifFile);
                var sarif = JsonSerializer.Deserialize<JsonElement>(content);
                if (sarif.TryGetProperty("runs", out var runs))
                {
                    foreach (var run in runs.EnumerateArray())
                    {
                        if (run.TryGetProperty("results", out var results))
                        {
                            foreach (var result in results.EnumerateArray())
                            {
                                if (result.TryGetProperty("level", out var level) &&
                                    level.GetString() == "error")
                                {
                                    return false; // Found critical issues
                                }
                            }
                        }
                    }
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        private static bool CheckPa11yCompliance(string jsonFile)
        {
            try
            {
                var content = File.ReadAllText(jsonFile);
                var results = JsonSerializer.Deserialize<JsonElement[]>(content);
                // Pa11y returns array of issues - empty array means compliant
                return results?.Length == 0;
            }
            catch
            {
                return false;
            }
        }

        private static bool CheckGitGuardianCompliance(string jsonFile)
        {
            try
            {
                var content = File.ReadAllText(jsonFile);
                var result = JsonSerializer.Deserialize<JsonElement>(content);
                if (result.TryGetProperty("secrets_detection_summary", out var summary) &&
                    summary.TryGetProperty("secrets_found", out var secretsFound))
                {
                    return secretsFound.GetInt32() == 0;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="arguments"></param>
        /// <param name="allowFailure"></param>
        /// <param name="workingDirectory"></param>
        /// <returns></returns>
        /// <exception cref="InvalidOperationException"></exception>
        public static string RunProcess(string fileName, string arguments, bool allowFailure = false, string workingDirectory = null)
        {
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = fileName,
                    Arguments = arguments,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                    WorkingDirectory = workingDirectory ?? RootDirectory
                }
            };
            Serilog.Log.Information($"Running: {fileName} {arguments} (in {process.StartInfo.WorkingDirectory})");
            process.Start();
            var output = process.StandardOutput.ReadToEnd();
            var error = process.StandardError.ReadToEnd();
            process.WaitForExit();
            if (process.ExitCode != 0 && !allowFailure)
            {
                var errorMessage = $"Process '{fileName} {arguments}' failed with exit code {process.ExitCode}";
                if (!string.IsNullOrEmpty(error))
                {
                    errorMessage += $"\nError: {error}";
                }
                if (!string.IsNullOrEmpty(output))
                {
                    errorMessage += $"\nOutput: {output}";
                }
                throw new InvalidOperationException(errorMessage);
            }
            if (!string.IsNullOrEmpty(error) && process.ExitCode == 0)
            {
                Serilog.Log.Warning($"Process warning: {error}");
            }
            return output.Trim();
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="version"></param>
        /// <returns></returns>
        public static bool IsMajorOrMinorVersion(string version)
        {
            var parts = version.Split('.');
            if (parts.Length >= 3)
            {
                // Check if patch version is 0 (meaning it's a major or minor release)
                return parts[2] == "0";
            }
            return true; // If we can't determine, assume it's major/minor
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="version"></param>
        /// <param name="PackageJsonPath"></param>
        public static void UpdatePackageJson(string version, string PackageJsonPath)
        {
            if (!File.Exists(PackageJsonPath))
            {
                Serilog.Log.Warning($"package.json not found at {PackageJsonPath}");
                return;
            }
            var json = File.ReadAllText(PackageJsonPath);
            var jsonDocument = JsonDocument.Parse(json);
            var root = jsonDocument.RootElement;
            var updatedJson = new Dictionary<string, object>();
            foreach (var property in root.EnumerateObject())
            {
                if (property.Name == "version")
                {
                    updatedJson[property.Name] = version;
                }
                else
                {
                    updatedJson[property.Name] = JsonSerializer.Deserialize<object>(property.Value.GetRawText());
                }
            }
            var options = new JsonSerializerOptions
            {
                WriteIndented = true
            };
            var updatedJsonString = JsonSerializer.Serialize(updatedJson, options);
            File.WriteAllText(PackageJsonPath, updatedJsonString);
            Serilog.Log.Information($"Updated package.json version to {version}");
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="version"></param>
        /// <param name="PackageLockJsonPath"></param>
        public static void UpdatePackageLockJson(string version, string PackageLockJsonPath)
        {
            if (!File.Exists(PackageLockJsonPath))
            {
                Serilog.Log.Warning($"package-lock.json not found at {PackageLockJsonPath}");
                return;
            }
            var json = File.ReadAllText(PackageLockJsonPath);
            var jsonDocument = JsonDocument.Parse(json);
            var root = jsonDocument.RootElement;
            var updatedJson = new Dictionary<string, object>();
            foreach (var property in root.EnumerateObject())
            {
                if (property.Name == "version")
                {
                    updatedJson[property.Name] = version;
                }
                else
                {
                    updatedJson[property.Name] = JsonSerializer.Deserialize<object>(property.Value.GetRawText());
                }
            }
            var options = new JsonSerializerOptions
            {
                WriteIndented = true
            };
            var updatedJsonString = JsonSerializer.Serialize(updatedJson, options);
            File.WriteAllText(PackageLockJsonPath, updatedJsonString);
            Serilog.Log.Information($"Updated package-loc    [GitRepository]\r\n    readonly GitRepository Repository;k.json version to {version}");
        }
        
        /// <summary>
        ///
        /// </summary>
        public static void ConfigureGitAuthentication(string GitHubToken )
        {
            Log.Information("Configuring Git authentication...");
            // Set up Git credentials for GitHub
            var gitHubUrl = Repository.HttpsUrl.Replace("https://", $"https://{GitHubToken}@");
            Git($"remote set-url origin {gitHubUrl}", workingDirectory: RootDirectory);
            // Configure Git user (required for commits)
            Git("config user.name \"TeamCity Build Agent\"", workingDirectory: RootDirectory);
            Git("config user.email \"build@teamcity.local\"", workingDirectory: RootDirectory);
        }

        public static string GetCurrentBranch()
        {
            var result = Git("branch --show-current", workingDirectory: RootDirectory, logOutput: false);
            return result.FirstOrDefault().Text?.Trim() ?? "main";
        }

        private static void SwitchToBranch(string branchName)
        {
            Log.Information($"Switching to branch: {branchName}");
            try
            {
                // Try to checkout existing branch
                Git($"checkout {branchName}", workingDirectory: RootDirectory);
            }
            catch
            {
                // If branch doesn't exist locally, create it
                Log.Information($"Branch {branchName} doesn't exist locally. Creating new branch...");
                Git($"checkout -b {branchName}", workingDirectory: RootDirectory);
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="RootDirectory"></param>
        /// <returns></returns>
        public static bool HasChangesToCommit(string RootDirectory)
        {
            var statusResult = Git("status --porcelain", workingDirectory: RootDirectory, logOutput: false);
            var hasChanges = statusResult.Any(x => !string.IsNullOrWhiteSpace(x.Text));
            Log.Information($"Changes detected: {hasChanges}");
            if (hasChanges)
            {
                Log.Information("Modified files:");
                statusResult.Where(x => !string.IsNullOrWhiteSpace(x.Text))
                    .ForEach(x => Log.Information($"  {x.Text}"));
            }
            return hasChanges;
        }

        public static string GetModifiedFiles(string RootDirectory)
        {
            var gitOutput = Git("status --porcelain", workingDirectory: RootDirectory);
            return gitOutput
                .Where(output => output.Text.StartsWith(" M") || output.Text.StartsWith("??"))
                .Select(output => output.Text.Substring(3))
                .JoinComma(); // Nuke extension method
        }

        public static void AddFilesToStaging()
        {
            Log.Information("Adding files to staging area...");
            string FilesToCommit = GetModifiedFiles(RootDirectory);
            if (!string.IsNullOrEmpty(FilesToCommit))
            {
                // Add specific files
                var files = FilesToCommit.Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(f => f.Trim())
                    .ToArray();
                foreach (var file in files)
                {
                    Log.Information($"Adding file: {file}");
                    Git($"add \"{file}\"", workingDirectory: RootDirectory);
                }
            }
            else
            {
                // Add all changes (be careful with this in production)
                Log.Information("Adding all modified files...");
                Git("add .", workingDirectory: RootDirectory);
            }
        }

        public static void CreateCommit(string CommitMessage)
        {
            Log.Information($"Creating commit with message: {CommitMessage}");
            // Check if there are staged changes
            var stagedResult = Git("diff --cached --name-only", workingDirectory: RootDirectory, logOutput: false);
            if (!stagedResult.Any(x => !string.IsNullOrWhiteSpace(x.Text)))
            {
                Log.Warning("No staged changes found. Nothing to commit.");
                return;
            }
            // Create the commit
            Git($"commit -m \"{CommitMessage}\"", workingDirectory: RootDirectory);
            Log.Information("Commit created successfully.");
        }

        public static void PushToGitHub(string branchName)
        {
            Log.Information($"Pushing changes to GitHub branch: {branchName}");
            try
            {
                // Push to GitHub
                Git($"push origin {branchName}", workingDirectory: RootDirectory);
                Log.Information("Successfully pushed to GitHub!");
            }
            catch (Exception ex)
            {
                Log.Error($"Failed to push to GitHub: {ex.Message}");
                // Try to set upstream branch if it doesn't exist
                Log.Information("Attempting to set upstream branch...");
                Git($"push --set-upstream origin {branchName}", workingDirectory: RootDirectory);
                Log.Information("Successfully pushed with upstream set!");
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="version"></param>
        public static void UpdateNuspecFile(string NuspecPath, string version)
        {
            if (!File.Exists(NuspecPath))
            {
                Serilog.Log.Warning($".nuspec file not found at {NuspecPath}");
                return;
            }
            var content = File.ReadAllText(NuspecPath);
            var versionRegex = new Regex(@"<version>.*?</version>", RegexOptions.IgnoreCase);
            var updatedContent = versionRegex.Replace(content, $"<version>{version}</version>");
            File.WriteAllText(NuspecPath, updatedContent);
            Serilog.Log.Information($"Updated .nuspec version to {version}");
        }
    }
}


