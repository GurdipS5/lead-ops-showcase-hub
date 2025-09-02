//using Microsoft.Build.Tasks;
//using Nuke.Common;
//using Nuke.Common.Git;
//using Nuke.Common.IO;
//using Nuke.Common.Tools.Git;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Text;
//using System.Text.Json;
//using System.Threading.Tasks;
//using Nuke.Common.Tooling;
//using Nuke.Common.Utilities;
//using Serilog.Core;
//using Serilog;

//namespace _build
//{

//    public class BuildInformationHelper
//    {
//        [PathVariable("git")]
//        readonly Tool Git;

//        private readonly Build _build;
//        private readonly GitRepository _gitRepository;

//        private string distPath;

//        private string artifactsPath;

//        public BuildInformationHelper(Build build, GitRepository gitRepository)
//        {
//            _build = build;
//            _gitRepository = gitRepository;
//        }

//        /// <summary>
//        /// 
//        /// </summary>
//        /// <returns></returns>
//        public static OctopusBuildInfo CollectBuildInformation(string rootDirectory, string artifactsPath, string distPath, string publishPath)
//        {
//            var commits = BuildInformationHelper.CollectCommitInformation(rootDirectory);
//            var workItems = CollectWorkItems(commits);

//            var artifacts = CollectBuildArtifacts(artifactsPath, distPath, publishPath);

//            return new OctopusBuildInfo
//            {
//                PackageId = PackageId,
//                Version = Version,
//                BuildUrl = BuildInformationHelper.GetTeamCityBuildUrl(),
//                BuildNumber = BuildInformationHelper.GetTeamCityBuildNumber(),
//                BuildEnvironment = "TeamCity",
//                VcsType = "Git",
//                VcsRoot = _gitRepository.HttpsUrl,
//                VcsCommitNumber = _gitRepository.Commit,
//                Branch = _gitRepository.Branch,
//                Commits = commits,
//                WorkItems = workItems,
//                IncompleteDataWarning = null
//            };
//        }

//        /// <summary>
//        /// 
//        /// </summary>
//        /// <returns></returns>
//        private static List<CommitDetail> CollectCommitInformation(string rootDirectory)
//        {
//            var commits = new List<CommitDetail>();

//            try
//            {
//                // Get commits since last tag or last 50 commits
//                var lastTag = BuildInformationHelper.GetLastTag(rootDirectory);
//                var gitLogArgs = lastTag != null
//                    ? $"log {lastTag}..HEAD --pretty=format:\"%H|%an|%ae|%ad|%s\" --date=iso"
//                    : "log -50 --pretty=format:\"%H|%an|%ae|%ad|%s\" --date=iso";

//                var gitLog = Git($"{gitLogArgs}", workingDirectory: rootDirectory);

//                foreach (var line in gitLog.Where(l => !string.IsNullOrWhiteSpace(l.Text)))
//                {
//                    var parts = line.Text.Split('|');
//                    if (parts.Length >= 5)
//                    {
//                        commits.Add(new CommitDetail
//                        {
//                            Id = parts[0],
//                            Comment = parts[4],
//                            Author = new CommitAuthor
//                            {
//                                Name = parts[1],
//                                EmailAddress = parts[2]
//                            },
//                            Date = DateTime.Parse(parts[3])
//                        });
//                    }
//                }
//            }
//            catch (Exception ex)
//            {
//                Log.Warning($"Failed to collect commit information: {ex.Message}");
//            }

//            return commits;
//        }

//        private List<WorkItem> CollectWorkItems(List<CommitDetail> commits)
//        {
//            var workItems = new List<WorkItem>();
//            var processedIds = new HashSet<string>();

//            // Extract work item references from commit messages
//            // Supports patterns like: #123, JIRA-123, TFS-123, etc.
//            var workItemPatterns = new[]
//            {
//                @"#(\d+)",                          // GitHub issues: #123
//                @"([A-Z]+-\d+)",                    // JIRA: PROJ-123
//                @"(?:TFS|AB#)(\d+)",               // TFS/Azure DevOps: TFS123, AB#123
//                @"(?:work item|wi)\s*:?\s*(\d+)"   // Generic: work item: 123
//            };

//            foreach (var commit in commits)
//            {
//                foreach (var pattern in workItemPatterns)
//                {
//                    var matches = System.Text.RegularExpressions.Regex.Matches(
//                        commit.Comment, pattern,
//                        System.Text.RegularExpressions.RegexOptions.IgnoreCase);

//                    foreach (System.Text.RegularExpressions.Match match in matches)
//                    {
//                        var workItemId = match.Groups[1].Value;
//                        if (processedIds.Add(workItemId))
//                        {
//                            workItems.Add(new WorkItem
//                            {
//                                Id = workItemId,
//                                Description = ExtractWorkItemDescription(commit.Comment, workItemId),
//                                Source = DetermineWorkItemSource(match.Value),
//                                LinkUrl = GenerateWorkItemUrl(workItemId, match.Value)
//                            });
//                        }
//                    }
//                }
//            }

//            return workItems;
//        }

//        private List<BuildArtifact> CollectBuildArtifacts(string artifactsPath, string distPath, string publishPath)
//        {
//            var artifacts = new List<BuildArtifact>();

//            try
//            {
//                // Collect from common artifact directories
//                var artifactDirs = new AbsolutePath[]
//                {

//                            artifactsPath, distPath, publishPath

//                };

//                foreach (var dir in artifactDirs.Where(d => d.DirectoryExists()))
//                {
//                    var files = dir.GlobFiles("**/*.{nupkg,zip,tar.gz,exe,msi,dll}")
//                        .Where(f => !f.Name.Contains("symbols", StringComparison.OrdinalIgnoreCase));

//                    artifacts.AddRange(files.Select(file => new BuildArtifact
//                    {
//                        Name = file.Name,
//                        Path = file.ToString(),
//                        Size = new FileInfo(file).Length,
//                        Hash = CalculateFileHash(file)
//                    }));
//                }
//            }
//            catch (Exception ex)
//            {
//                Log.Warning($"Failed to collect build artifacts: {ex.Message}");
//            }

//            return artifacts;
//        }

//        public static void PushBuildInformationToOctopus(Dictionary<string, string> OctopusDetails, AbsolutePath buildInfoFile, string rootDirectory)
//        {

//            var arguments = new List<string>
//                {
//                    "build-information",
//                    "--server", OctopusDetails["OctopusServerUrl"],
//                    "--apiKey", OctopusDetails["OctopusApiKey"],
//                    "--space", OctopusDetails["OctopusSpace"],
//                    "--packageId", OctopusDetails["PackageId"],
//                    "--version", OctopusDetails["Version"],
//                    "--file", buildInfoFile,
//                    "--overwrite-mode", "OverwriteExisting",
//                    "--logLevel", "Info"
//                };

//            var process = ProcessTasks.StartProcess(
//                    toolPath: ToolPathResolver.GetPathExecutable("octo"),
//                    arguments: arguments.JoinSpace(),
//                    workingDirectory: rootDirectory)
//                .AssertZeroExitCode();
//        }

//        public static string SerializeBuildInformation(OctopusBuildInfo buildInfo)
//        {
//            var options = new JsonSerializerOptions
//            {
//                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
//                WriteIndented = true,
//                DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
//            };

//            return JsonSerializer.Serialize(buildInfo, options);
//        }

//        private static string GetLastTag(string rootDirectory)
//        {
//            try
//            {
//                var result = Git("describe --tags --abbrev=0", workingDirectory: rootDirectory);
//                return result.FirstOrDefault().Text?.Trim();
//            }
//            catch
//            {
//                return null;
//            }
//        }

//        private string GetTeamCityBuildUrl()
//        {
//            var buildId = Environment.GetEnvironmentVariable("BUILD_ID");
//            var serverUrl = Environment.GetEnvironmentVariable("TEAMCITY_SERVER_URL");

//            return !string.IsNullOrEmpty(buildId) && !string.IsNullOrEmpty(serverUrl)
//                ? $"{serverUrl}/viewLog.html?buildId={buildId}"
//                : null;
//        }

//        private string GetTeamCityBuildNumber()
//        {
//            return Environment.GetEnvironmentVariable("BUILD_NUMBER") ?? "unknown";
//        }

//        private string ExtractWorkItemDescription(string commitMessage, string workItemId)
//        {
//            // Extract description after work item reference
//            var lines = commitMessage.Split('\n');
//            var firstLine = lines[0];

//            // Remove work item reference and return clean description
//            return System.Text.RegularExpressions.Regex.Replace(
//                firstLine,
//                @"(?:#\d+|[A-Z]+-\d+|(?:TFS|AB#)\d+|(?:work item|wi)\s*:?\s*\d+)",
//                "",
//                System.Text.RegularExpressions.RegexOptions.IgnoreCase)
//                .Trim(' ', ':', '-', '.');
//        }

//        private string DetermineWorkItemSource(string pattern)
//        {
//            if (pattern.StartsWith("#")) return "GitHub";
//            if (pattern.Contains("-")) return "JIRA";
//            if (pattern.ToUpper().Contains("TFS") || pattern.ToUpper().Contains("AB#")) return "Azure DevOps";
//            return "Generic";
//        }

//        private string GenerateWorkItemUrl(string workItemId, string pattern)
//        {
//            // Configure these URLs based on your systems
//            var baseUrls = new Dictionary<string, string>
//            {
//                ["GitHub"] = Environment.GetEnvironmentVariable("GITHUB_REPOSITORY_URL"),
//                ["JIRA"] = Environment.GetEnvironmentVariable("JIRA_BASE_URL"),
//                ["Azure DevOps"] = Environment.GetEnvironmentVariable("AZDO_BASE_URL")
//            };

//            var source = DetermineWorkItemSource(pattern);
//            if (baseUrls.TryGetValue(source, out var baseUrl) && !string.IsNullOrEmpty(baseUrl))
//            {
//                return source switch
//                {
//                    "GitHub" => $"{baseUrl}/issues/{workItemId}",
//                    "JIRA" => $"{baseUrl}/browse/{workItemId}",
//                    "Azure DevOps" => $"{baseUrl}/_workitems/edit/{workItemId}",
//                    _ => null
//                };
//            }

//            return null;
//        }

//        private string CalculateFileHash(AbsolutePath file)
//        {
//            try
//            {
//                using var sha256 = System.Security.Cryptography.SHA256.Create();
//                using var stream = File.OpenRead(file);
//                var hash = sha256.ComputeHash(stream);
//                return Convert.ToHexString(hash).ToLowerInvariant();
//            }
//            catch
//            {
//                return null;
//            }
//        }

//        // Configuration properties - set these in your build class
//        [Parameter] readonly string OctopusServerUrl = Environment.GetEnvironmentVariable("OCTOPUS_SERVER_URL");
//        [Parameter] readonly string OctopusApiKey = Environment.GetEnvironmentVariable("OCTOPUS_API_KEY");
//        [Parameter] readonly string OctopusSpace = Environment.GetEnvironmentVariable("OCTOPUS_SPACE") ?? "Default";
//        [Parameter] readonly string PackageId;
//        [Parameter] readonly string Version;
//    }






//}