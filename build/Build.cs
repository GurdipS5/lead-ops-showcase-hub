using _build;
using CliWrap;
using Microsoft.Build.Execution;
using Nuke.Common;
using Nuke.Common.CI;
using Nuke.Common.CI.TeamCity;
using Nuke.Common.Execution;
using Nuke.Common.Git;
using Nuke.Common.IO;
using Nuke.Common.ProjectModel;
using Nuke.Common.Tooling;
using Nuke.Common.Tools.GitHub;
using Nuke.Common.Tools.GitVersion;
using Nuke.Common.Tools.Npm;
using Nuke.Common.Utilities.Collections;
using Octokit;
using Serilog;
using Serilog.Core;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using static Nuke.Common.EnvironmentInfo;
using static Nuke.Common.IO.PathConstruction;


partial class Build : NukeBuild
{
    /// Support plugins are available for:
    ///   - JetBrains ReSharper        https://nuke.build/resharper
    ///   - JetBrains Rider            https://nuke.build/rider
    ///   - Microsoft VisualStudio     https://nuke.build/visualstudio
    ///   - Microsoft VSCode           https://nuke.build/vscode



    public string projectUuid { get; set; } = "50676847-301a-4d0b-a6c6-9e76040a95cf";

    public string FlowName { get; private set; } = "PortfolioFlow";
    public string TrailName { get; private set; } = "PortfolioTrail";
    public string PackageVersion { get; private set; }

    public string PackageId { get; set; }

    public string simpleVersion { get; set; }

    // Secret Parameters
    [Parameter]
    [Secret]
    readonly string KOSLI_API_TOKEN;

    // Secret Parameters
    [Parameter]
    [Secret]
    readonly string GitHubToken;

    [Parameter]
    [Secret]
    readonly string DependencyTrackApiKey;

    [Parameter]
    [Secret]
    readonly string SnykToken;

    [Parameter]
    [Secret]
    readonly string SonarqubeToken;

    [Parameter]
    [Secret]
    string OctopusApiKey;

    [Parameter]
    [Secret]
    string ProGetApiKey;


    [Parameter("Release Version")]
    readonly string ReleaseVersion = "1.0.0";

    [Parameter("DependencyTrack URL")]
    readonly string DependencyTrackUrl = "http://dependencytrack.gssira.com:8081";

    [Parameter("DependencyTrack Project Name")]
    readonly string DependencyTrackProject = "LeadOps-Showcase";

    [Parameter("Octopus URL")]
    readonly string OctopusUrl = "http://octopusd.gssira.com";

    [Parameter("Octopus Project Name")]
    readonly string OctopusProjectName = "LeadOps-Showcase";

    [Parameter("Octopus Project Name")]
    readonly string OctopusSpace = "Default";

    [Parameter("Octopus Environment")]
    readonly string OctopusEnvironment = "Development";

    [Parameter("ProGet URL")]
    readonly string ProGetUrl = "http://proget.gssira.com:8624";

    [Parameter("ProGet Feed Name")]
    readonly string ProGetFeedName = "LeadOps-Showcase";

    // Only run versioning tasks on server builds (TeamCity) for PR and main/master branches
    //bool ShouldRunVersioning =>
    //    IsServerBuild
    //    && (
    //        TeamCity.Instance?.BranchName?.Contains("pull") == true
    //        || TeamCity.Instance?.BranchName?.Equals("main", StringComparison.OrdinalIgnoreCase)
    //            == true
    //        || TeamCity.Instance?.BranchName?.Equals("master", StringComparison.OrdinalIgnoreCase)
    //            == true
    //    );

    public static int Main() => Execute<Build>(x => x.PushToProGet);

    [GitRepository]
    readonly GitRepository Repository;

    string TargetBranch => Environment.GetEnvironmentVariable("SYSTEM_PULLREQUEST_TARGETBRANCH")
                       ?? Repository.Branch;

    // =========================
    // Build Parameter Variables Section
    // =========================

    private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
    {
        PropertyNamingPolicy = null, // keep property names as-is
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        WriteIndented = false
    };


    // Non-secret Parameters
    [Parameter("Configuration to build - Default is 'Debug' (local) or 'Release' (server)")]
    readonly Configuration Configuration = IsLocalBuild
        ? Configuration.Debug
        : Configuration.Release;



    // =========================
    // End Build Parameter Variables
    // =========================

    // Root directory for all artifacts
    AbsolutePath ArtifactsDirectory => RootDirectory / "artifacts";

    AbsolutePath distDir = RootDirectory / "dist";

    AbsolutePath publishPath = RootDirectory / "publish" / "packages";

    // SBOM specific file paths
    AbsolutePath PackageJSONPath = RootDirectory / "package.json";
    AbsolutePath PackageLockJSONPath = RootDirectory / "package-lock.json";
    AbsolutePath NuspecPath = RootDirectory / ".nuspec";

    AbsolutePath KosliSnyk => ArtifactsDirectory / "Kosli" / "Snyk" / "snyk-results.sarif.json";

    AbsolutePath SBOMFile => ArtifactsDirectory / "cyclonedx" / "sbom.json";
    AbsolutePath QodanaDir => ArtifactsDirectory / "qodana";
    AbsolutePath SonarDir => ArtifactsDirectory / "sonar" / "sonar.json";
    AbsolutePath GitGuardianDir => ArtifactsDirectory / "gitguardian" / "gitguardian.sarif.json";
    AbsolutePath SnykDir => ArtifactsDirectory / "snyk";

    // =========================
    // Build PathVariable Variables Section
    // =========================

    [PathVariable("cspell")]
    readonly Tool CSpell;

    [PathVariable("npx")]
    readonly Tool Npx;

    [PathVariable("snyk")]
    readonly Tool Snyk;

    [PathVariable("kosli")]
    readonly Tool Kosli;

    [PathVariable("git")]
    readonly Tool Git;

    System.Collections.Generic.Dictionary<string, string> Attestations;

    // =========================
    // End Build PathVariable Variables
    // =========================

    /// <summary>
    /// Installs npm dependencies locally or on the server.
    /// </summary>
    Target NpmInstall =>
        _ =>
            _.Executes(() =>
            {
                if (IsLocalBuild)
                {
                    NpmTasks.NpmInstall(settings =>
                        settings.SetProcessWorkingDirectory(RootDirectory)
                    );
                }

                if (IsServerBuild)
                {
                    var command = "npm install";
                    ProcessTasks
                        .StartProcess(
                            toolPath: "/bin/bash",
                            arguments: $"-c {command}",
                            logOutput: true
                        )
                        .AssertZeroExitCode();
                }
            });

    /// <summary>
    /// Builds the site using npm.
    /// </summary>
    Target NpmBuild =>
        _ =>
            _.DependsOn(NpmInstall)
                .Executes(() =>
                {
                    Log.Information("🚀 Building site with npm...");

                    try
                    {
                        if (IsLocalBuild)
                        {
                            NpmTasks.NpmRun(settings =>
                                settings
                                    .SetProcessWorkingDirectory(RootDirectory)
                                    .SetCommand("build")
                            );
                        }
                        else if (IsServerBuild)
                        {
                            var command = "npm run build";
                            ProcessTasks
                                .StartProcess(
                                    toolPath: "/bin/bash",
                                    arguments: $"-c \"{command}\"",
                                    logOutput: true
                                )
                                .AssertZeroExitCode();
                        }

                        // Verify build output
                        var distDir = RootDirectory / "dist";
                        if (!Directory.Exists(distDir))
                            throw new InvalidOperationException("Build output directory not found");

                        if (!Directory.EnumerateFiles(distDir).Any())
                            throw new InvalidOperationException("Build output directory is empty");

                        Log.Information("✅ Site built successfully");
                    }
                    catch (Exception ex)
                    {
                        Log.Error(ex, "❌ Failed to build site: {ErrorMessage}", ex.Message);
                        throw;
                    }
                });

    Target CSpellCheck => _ => _
    .DependsOn(NpmBuild)
    .AssuredAfterFailure()
    .Executes(async () =>
    {
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? "cmd.exe" : "/bin/bash",
                Arguments = RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
                    ? "/c npx cspell \"**/*.{js,ts,md,txt}\""
                    : "-c \"npx cspell '**/*.{js,ts,md,txt}'\"",
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                CreateNoWindow = true,
                WorkingDirectory = Environment.CurrentDirectory
            }
        };

        try
        {
            process.Start();

            // Read streams asynchronously to avoid deadlocks
            var outputTask = process.StandardOutput.ReadToEndAsync();
            var errorTask = process.StandardError.ReadToEndAsync();

            process.WaitForExit();

            var output = await outputTask;
            var error = await errorTask;

            bool exitCode = process.ExitCode == 0;

            // Print all output
            Console.WriteLine($"=== CSpell Results (Exit Code: {process.ExitCode}) ===");

            if (!string.IsNullOrEmpty(output))
            {
                Console.WriteLine("Standard Output:");
                Console.WriteLine(output);
            }

            if (!string.IsNullOrEmpty(error))
            {
                Console.WriteLine("Standard Error:");
                Console.WriteLine(error);
            }

            if (string.IsNullOrEmpty(output) && string.IsNullOrEmpty(error))
            {
                Console.WriteLine("No output received from CSpell");
            }

            Console.WriteLine($"Success: {exitCode}");
            Console.WriteLine("=== End CSpell Results ===");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to run CSpell: {ex.Message}");
            Console.WriteLine($"Stack Trace: {ex.StackTrace}");
        }
    });

    ///
    /// Generates version number using Nerdbank.
    ///
    Target GenerateVersion =>
        _ =>
            _.DependsOn(CSpellCheck)
                .AssuredAfterFailure()
                .Executes(async () =>
                {
                    // Use 'cloud' command in CI/server environments, 'get-version' locally
                    var nbgvCommand = IsServerBuild ? "cloud --format json" : "get-version --format json";

                    string versionOutput = null;

      
                    var process = new Process
                    {
                        StartInfo = new ProcessStartInfo
                        {
                            FileName = RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? "cmd.exe" : "/bin/bash",
                            Arguments = RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
                                ? $"/c npx nbgv {nbgvCommand}"
                                : $"-c \"npx nbgv {nbgvCommand}\"",
                            UseShellExecute = false,
                            RedirectStandardOutput = true,
                            RedirectStandardError = true,
                            CreateNoWindow = true,
                            WorkingDirectory = Environment.CurrentDirectory
                        }
                    };

                  

                    try
                    {
                        process.Start();

                        // Read streams asynchronously to avoid deadlocks
                        var outputTask = process.StandardOutput.ReadToEndAsync();
                        var errorTask = process.StandardError.ReadToEndAsync();

                        process.WaitForExit();

                        var output = await outputTask;
                        var error = await errorTask;

                        if (process.ExitCode == 0)
                        {
                            versionOutput = output.Trim();
                            Serilog.Log.Information($"Successfully generated version using nbgv");
                        }
                        else
                        {
                            Serilog.Log.Error($"NBGV failed with exit code {process.ExitCode}");
                            if (!string.IsNullOrEmpty(output))
                            {
                                Serilog.Log.Error($"NBGV Output: {output}");
                            }
                            if (!string.IsNullOrEmpty(error))
                            {
                                Serilog.Log.Error($"NBGV Error: {error}");
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Serilog.Log.Error($"Failed to run NBGV: {ex.Message}");
                        Serilog.Log.Error($"Stack Trace: {ex.StackTrace}");
                    }

                    if (string.IsNullOrEmpty(versionOutput))
                    {
                        throw new InvalidOperationException(
                            $"Failed to generate version using npx nbgv. " +
                            "Make sure Node.js and the nbgv npm package are installed: 'npm install -g nbgv' or 'npm install nbgv'"
                        );
                    }

                    var versionJson = JsonDocument.Parse(versionOutput);
                    // For local builds, use Version (includes patch) instead of SimpleVersion
                    var versionProperty = IsServerBuild ? "SimpleVersion" : "Version";
                    simpleVersion = versionJson
                        .RootElement.GetProperty(versionProperty)
                        .GetString();

                    Serilog.Log.Information($"Generated version: {simpleVersion}");
                    // Store version for use in other targets
                    Environment.SetEnvironmentVariable("GENERATED_VERSION", simpleVersion);
                });

    Target UpdatePackageFiles =>
        _ =>
            _.DependsOn(GenerateVersion)
                .AssuredAfterFailure()
                .Executes(() =>
                {
                    var version = Environment.GetEnvironmentVariable("GENERATED_VERSION");

                    if (string.IsNullOrEmpty(version))
                    {
                        throw new InvalidOperationException("Version not generated");
                    }

                    // Update package.json
                    Helpers.UpdatePackageJson(version, PackageJSONPath);

                    // Update package-lock.json
                    Helpers.UpdatePackageLockJson(version, PackageLockJSONPath);

                    Log.Information(NuspecPath);

                    // Update .nuspec file
                    Helpers.UpdateNuspecFile(NuspecPath, version
                        );
                });

    Target UpdateChangelog =>
        _ =>
            _.DependsOn(UpdatePackageFiles)
                .AssuredAfterFailure()
                .Executes(() =>
                {
                 
                    if (IsServerBuild)
                    {
                        var version = Environment.GetEnvironmentVariable("GENERATED_VERSION");
                        if (string.IsNullOrEmpty(version))
                        {
                            throw new InvalidOperationException("Version not generated");
                        }

                        // Check if this is a major or minor version (not patch)
                        if (Helpers.IsMajorOrMinorVersion(version))
                        {
                            // Use auto-changelog with emoji support for conventional commits
                            var changelogArgs = string.Join(
                                " ",
                                new[]
                                {
                                $"--latest-version {version}",
                                "--commit-limit false",
                                "--unreleased",
                                "--template compact",
                                "--commit-url false",
                                "--issue-url false",
                                "--merge-url false",
                                "--compare-url false",
                                "--breaking-pattern \"BREAKING CHANGE:\"",
                                "--tag-prefix \"v\"",
                                // Add emojis for conventional commit types
                                "--type-to-emoji feat=✨",
                                "--type-to-emoji fix=🐛",
                                "--type-to-emoji perf=⚡",
                                "--type-to-emoji refactor=♻️",
                                "--type-to-emoji style=💄",
                                "--type-to-emoji docs=📚",
                                "--type-to-emoji test=🧪",
                                "--type-to-emoji build=🏗️",
                                "--type-to-emoji ci=👷",
                                "--type-to-emoji chore=🔧",
                                "--type-to-emoji revert=⏪",
                                "--type-to-emoji security=🔒",
                                }
                            );

                            Helpers.RunProcess("auto-changelog", changelogArgs);

                            Serilog.Log.Information(
                                $"Updated changelog using auto-changelog for version {version} with emojis"
                            );
                        }
                        else
                        {
                            Serilog.Log.Information(
                                $"Skipping changelog update for patch version {version}"
                            );
                        }
                    }
                });

    /// <summary>
    /// Generates a CycloneDX SBOM (Software Bill of Materials) file for dependency tracking.
    /// </summary>
    Target CycloneDX =>
        _ =>
            _.DependsOn(UpdateChangelog)
                .AssuredAfterFailure()
                .Executes(() =>
                {
                    if (IsLocalBuild)
                    {
                        Npx($"cyclonedx-npm --output-file {SBOMFile}", RootDirectory);
                    }
                    else if (IsServerBuild)
                    {
                        var command = $"npx cyclonedx-npm --output-file {SBOMFile}";
                        var result = ProcessTasks
                            .StartProcess(
                                toolPath: "/bin/bash",
                                arguments: $"-c {command}",
                                logOutput: true
                            )
                            .AssertZeroExitCode();
                    }
                });

    /// <summary>
    /// Pushes the SBOM to DependencyTrack for vulnerability analysis.
    /// </summary>
    /// <summary>
    /// Pushes the SBOM to DependencyTrack for vulnerability analysis.
    /// </summary>
    Target PushToDTrack =>
        _ =>
            _.DependsOn(CycloneDX)
                .AssuredAfterFailure()
                .Executes(() =>
                {
                    Log.Information("📤 Pushing SBOM to DependencyTrack...");

                    try
                    {
                        var sbomPath = SBOMFile;
                        if (!File.Exists(sbomPath))
                            throw new InvalidOperationException(
                                $"SBOM file not found at {sbomPath}"
                            );

                        var command =
                            $"dtrack-audit -a -k {DependencyTrackApiKey} -n {DependencyTrackProject} -u {DependencyTrackUrl} -v 1.1.1 -i {sbomPath}";

                        if (IsLocalBuild)
                        {
          
                            var process = new Process
                            {
                                StartInfo = new ProcessStartInfo
                                {
                                    FileName = "dtrack-audit",
                                    Arguments = $"-a -k {DependencyTrackApiKey} -n {DependencyTrackProject} -u {DependencyTrackUrl} -v 1.1.1 -i {sbomPath}",
                                    RedirectStandardOutput = true,
                                    RedirectStandardError = true,
                                    UseShellExecute = false,
                                    CreateNoWindow = true
                                }
                            };

                            process.OutputDataReceived += (sender, e) =>
                            {
                                if (!string.IsNullOrEmpty(e.Data))
                                    Console.WriteLine(e.Data);
                            };

                            process.ErrorDataReceived += (sender, e) =>
                            {
                                if (!string.IsNullOrEmpty(e.Data))
                                    Console.Error.WriteLine(e.Data);
                            };

                            process.Start();
                            process.BeginOutputReadLine();
                            process.BeginErrorReadLine();
                            process.WaitForExit();

                            if (process.ExitCode != 0)
                                throw new Exception($"Process exited with code {process.ExitCode}");

                        }
                        else if (IsServerBuild)
                        {
                            ProcessTasks
                                .StartProcess(
                                    toolPath: "/bin/bash",
                                    arguments: $"-c \"{command}\"",
                                    logOutput: true
                                )
                                .AssertZeroExitCode();
                        }

                        Log.Information("✅ Successfully pushed SBOM to DependencyTrack");
                    }
                    catch (Exception ex)
                    {
                        Log.Error(
                            ex,
                            "❌ Failed to push SBOM to DependencyTrack: {ErrorMessage}",
                            ex.Message
                        );
                        throw;
                    }
                });

    /// <summary>
    /// Runs Snyk security scan on the project.
    /// </summary>
    Target SnykScan =>
        _ =>
            _.DependsOn(PushToDTrack)
                .AssuredAfterFailure()
                .Executes(() =>
                {
                    Log.Information("🔍 Running Snyk security scan...");

                    try
                    {
                        if (IsLocalBuild)
                        {
                            // Authenticate and run scan
                            Snyk($"auth {SnykToken}");
                            Snyk("code test");
                        }
                        else
                        {
                            var commands = new[]
                            {
                                $"snyk auth {SnykToken}",
                                $"snyk code test --sarif-file-output= {SnykDir}",
                            };

                            foreach (var command in commands)
                            {
                                ProcessTasks
                                    .StartProcess(
                                        toolPath: "/bin/bash",
                                        arguments: $"-c \"{command}\"",
                                        logOutput: true
                                    )
                                    .AssertZeroExitCode();
                            }
                        }

                        Log.Information("✅ Snyk security scan completed successfully");
                    }
                    catch (Exception ex)
                    {
                        Log.Error(ex, "❌ Snyk security scan failed: {ErrorMessage}", ex.Message);
                        throw;
                    }
                });

    /// <summary>
    /// Runs Sonarqube scan and prettier code style checks.
    /// </summary>
    Target SonarqubeScan =>
        _ =>
            _.DependsOn(SnykScan)
                .AssuredAfterFailure()
                .Executes(() =>
                {
                    Log.Information("🔍 Running Sonarqube scan and code style checks...");

                    try
                    {

                        if (IsLocalBuild) {            // This assumes your JS file is at ./scripts/myscript.js
                            string scriptPath = RootDirectory / "sonar.js".ToString();

                            ProcessTasks.StartProcess("node", scriptPath).AssertZeroExitCode();

                            Log.Information(
                                "✅ Sonarqube scan and code style checks completed successfully"
                            );
                            }
                    }

                    catch (Exception ex)
                    {
                        Log.Error(ex, "❌ Sonarqube scan failed: {ErrorMessage}", ex.Message);
                        throw;
                    }
                });

    /// <summary>
    /// Scans the last commit for secrets using GitGuardian.
    /// </summary>
    Target GitGuardianScan =>
        _ =>
            _.DependsOn(SonarqubeScan)
                .AssuredAfterFailure()
                .Executes(() =>
                {
                    Log.Information($"Scanning commit with GitGuardian...");

                    var result = ProcessTasks
                        .StartProcess(
                            toolPath: "ggshield",
                            arguments: $"secret scan commit-range HEAD~1 --format sarif --output {GitGuardianDir}",
                            logOutput: true
                        )
                        .AssertZeroExitCode();
                });

    /// <summary>
    /// Scans the code with Qodana.
    /// </summary>
    Target QodanaScan =>
        _ =>
            _.DependsOn(GitGuardianScan)
                .AssuredAfterFailure()
                .Executes(() =>
                {
                    Log.Information($"Scanning code with Qodana...");

                    ProcessTasks
                        .StartProcess(
                            toolPath: "qodana",
                            arguments: $"scan --linter qodana-js --results-dir {QodanaDir} --save-report --within-docker=false",
                            logOutput: true
                        )
                        .AssertZeroExitCode();
                });

    Target KosliBeginTrail => _ => _
    .DependsOn(QodanaScan)
    .AssuredAfterFailure()
    .Executes(() =>
    {

        var psi = new ProcessStartInfo
        {
            FileName = "kosli",
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        // Build arguments explicitly:
        psi.ArgumentList.Add("begin");
        psi.ArgumentList.Add("trail");
        psi.ArgumentList.Add("PortfolioTrailTest");
        psi.ArgumentList.Add("--flow");
        psi.ArgumentList.Add("PortfolioFlow");
        psi.ArgumentList.Add("--description");
        psi.ArgumentList.Add("test");  // no quotes needed here
        psi.ArgumentList.Add("--org");
        psi.ArgumentList.Add("gurdipdev");
        psi.ArgumentList.Add("--api-token");
        psi.ArgumentList.Add(KOSLI_API_TOKEN);

        using var proc = Process.Start(psi) ?? throw new Exception("Failed to start kosli process");

        // Forward output and error:
        proc.OutputDataReceived += (s, e) => { if (e.Data != null) Console.Out.WriteLine(e.Data); };
        proc.ErrorDataReceived += (s, e) => { if (e.Data != null) Console.Error.WriteLine(e.Data); };
        proc.BeginOutputReadLine();
        proc.BeginErrorReadLine();
        proc.WaitForExit();

        if (proc.ExitCode != 0)
            throw new Exception($"Kosli exited with code {proc.ExitCode}");


    });


    Target AttestSnyk =>
        _ =>
            _.Description("Run Snyk scan and attest to Kosli")
                .DependsOn(KosliBeginTrail)
                .AssuredAfterFailure()
                .Executes(() =>
                {
                    // Run Snyk security scan
                    var snykArgs = $"test --json --file=package.json --sarif-file-output={KosliSnyk}";
                    var snykResult = ProcessTasks
                        .StartProcess("snyk", snykArgs, workingDirectory: RootDirectory)
                        .AssertWaitForExit();

                    // Save results to file (Snyk outputs to stdout)
                    var snykResultsFile = KosliSnyk;

                    // Attest to Kosli (Kosli will determine compliance automatically)
                    var kosliArgs =
                        $"attest snyk --flow {FlowName} --trail {TrailName} --name snyk-vulnerabilities --scan-results {snykResultsFile} --org gurdipdev --api-token {KOSLI_API_TOKEN}";
                    ProcessTasks
                        .StartProcess("kosli", kosliArgs, workingDirectory: RootDirectory)
                        .AssertZeroExitCode();

                    Log.Information("Snyk attestation completed");
                });

    Target AttestSonarQube => _ => _
       .DependsOn(AttestSnyk)
         .AssuredAfterFailure().
            Description("Attest SonarQube analysis to Kosli")
                .Executes(() =>
                {
                    // Attest to Kosli (Kosli will check SonarQube quality gates automatically)
                    var kosliArgs =
                        $"attest sonar --flow {FlowName} --trail {TrailName} --name code-quality --sonar-project-key Portfolio --org gurdipdev --api-token {KOSLI_API_TOKEN} --sonar-api-token {SonarqubeToken}";
                    ProcessTasks
                        .StartProcess("kosli", kosliArgs, workingDirectory: RootDirectory)
                        .AssertZeroExitCode();

                    Log.Information("SonarQube attestation completed");
                });
    Target AttestAdditionalTools => _ => _
        .DependsOn(AttestSonarQube)
        .AssuredAfterFailure()
        .Description("Attest Qodana, Pa11y, and GitGuardian results (scans already executed earlier)")
        .Executes(() =>
        {
            var attestations = new[]
            {
            new {
                Name = "qodana-code-quality",
                ResultsFile = QodanaDir,
                KosliCommand = $"attest generic --flow {FlowName} --trail {TrailName} --name qodana-analysis --attachments {QodanaDir} --org gurdipdev --api-token {KOSLI_API_TOKEN}"
            },
            new {
                Name = "gitguardian-secrets",
                ResultsFile = GitGuardianDir,
                KosliCommand = $"attest generic --flow {FlowName} --trail {TrailName} --name secret-scan --attachments {GitGuardianDir} --org gurdipdev --api-token {KOSLI_API_TOKEN}"
            }
            };

            foreach (var attestation in attestations)
            {
                try
                {
                    Log.Information($"Attesting results for {attestation.Name}...");

                    if (!File.Exists(attestation.ResultsFile))
                    {
                        Log.Warning($"Results file not found for {attestation.Name}: {attestation.ResultsFile}");
                        continue;
                    }

                    // Assume compliance check can be based on the file content
                    bool compliant = Helpers.DetermineCompliance(attestation.Name, attestation.ResultsFile, exitCode: 0);

                    // Attest to Kosli
                    var kosliArgs = $"{attestation.KosliCommand} --compliant={compliant.ToString().ToLower()}";
                    ProcessTasks.StartProcess("kosli", kosliArgs, workingDirectory: RootDirectory)
                        .AssertZeroExitCode();

                    Log.Information($"{attestation.Name} attestation completed - Compliant: {compliant}");
                }
                catch (Exception ex)
                {
                    Log.Error($"Failed to attest {attestation.Name}: {ex.Message}");
                    throw;
                }
            }
        });

    /// <summary>
    /// 
    /// </summary>
    Target CheckInToGitHub =>
        _ =>
            _.Description("Commits and pushes changes back to GitHub repository")
                .AssuredAfterFailure()
                .DependsOn(AttestAdditionalTools)
                .Requires(() => GitHubToken)
                .Executes(async () =>
                {

                    try
                    {
                        var stdOutBuffer = new StringBuilder();
                        var dbDailyTasks = Cli.Wrap("pwsh")
                            .WithArguments(new[] { "-Command", "Split-Path -Leaf (git remote get-url origin)" })
                            .WithStandardOutputPipe(PipeTarget.ToStringBuilder(stdOutBuffer))
                            .WithValidation(CommandResultValidation.None) // Handle errors manually
                            .ExecuteAsync();

                        var result = await dbDailyTasks; // Make sure to await the async operation

                        if (result.ExitCode != 0)
                        {
                            Log.Error($"Failed to get repository name. Exit code: {result.ExitCode}");
                            // Fallback: try to extract repo name from a different method
                            throw new InvalidOperationException("Could not determine repository name");
                        }

                        var repoName = stdOutBuffer.ToString().Trim();
                        Log.Information(stdOutBuffer.ToString());
                        Log.Information(Repository.Endpoint);

                        var gitCommand = "git";
                        var gitAddArgument = @"add -A";
                        var gitCommitArgument = @"commit --no-verify -m ""chore(ci): checking in changed code from local ci""";
                        var gitPushArgument = $@"push https://{GitHubToken}@github.com/{Repository.GetGitHubOwner()}/{repoName}";

                        string replacement = Regex.Replace(gitPushArgument, @"\t|\n|\r", "");

                        // Execute git commands with better error handling
                        var addProcess = Process.Start(gitCommand, gitAddArgument);
                        addProcess.WaitForExit();
                        if (addProcess.ExitCode != 0)
                        {
                            Log.Warning($"Git add failed with exit code: {addProcess.ExitCode}");
                        }

                        var commitProcess = Process.Start(gitCommand, gitCommitArgument);
                        commitProcess.WaitForExit();
                        if (commitProcess.ExitCode != 0)
                        {
                            Log.Warning($"Git commit failed with exit code: {commitProcess.ExitCode}");
                            // Don't push if commit failed
                            return;
                        }

                        var pushProcess = Process.Start(gitCommand, replacement);
                        pushProcess.WaitForExit();
                        if (pushProcess.ExitCode != 0)
                        {
                            Log.Error($"Git push failed with exit code: {pushProcess.ExitCode}");
                        }
                        else
                        {
                            Log.Information("Successfully pushed changes to GitHub");
                        }
                    }
                    catch (Exception ex)
                    {
                        Log.Error($"Failed to check in to GitHub: {ex.Message}");
                        throw;
                    }

                });

    /// <summary>
    /// Creates a NuGet package from the compiled site output.
    /// </summary>
    Target CreateNuGetPackage =>
        _ =>
            _.DependsOn(CheckInToGitHub)
                .AssuredAfterFailure()
                .Executes(async () =>
                {
                    var packageId = "Portfolio of Gurdip Sira";
                    var version = PackageVersion;
                    var outputDir = RootDirectory / "artifacts" / "publish" / "packages"; // output of the artifact (zip)
                    var contentDir = RootDirectory / "dist"; // output of the build
                    var nuspecPath = RootDirectory / $"{packageId}.nuspec";

                    Log.Information(
                        "Starting NuGet package creation for {PackageId} version {Version}",
                        packageId,
                        version
                    );

                    Log.Debug("Ensured output directory exists at {OutputDir}", outputDir);

                    // Create nuspec file
                    Log.Debug("Creating nuspec file at {NuspecPath}", nuspecPath);
                    File.WriteAllText(
                        nuspecPath,
                        $@"<?xml version=""1.0"" encoding=""utf-8""?>
                          <package xmlns=""http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd"">
                            <metadata>
                              <id>{packageId}</id>
                              <version>{version}</version>
                              <title>Portfolio of Gurdip Sira</title>
                              <authors>Gurdip Sira</authors>
                              <owners>Gurdip Sira</owners>
                              <requireLicenseAcceptance>false</requireLicenseAcceptance>
                              <description>Portfolio of Gurdip Sira Package</description>
                              <releaseNotes>Initial release</releaseNotes>
                              <copyright>Copyright © {DateTime.Now.Year}</copyright>
                            </metadata>
                            <files>
                              <file src=""**\*.*"" target=""content"" />
                            </files>
                          </package>"
                    );

                    // Create package
                    var nugetCommand =
                        $"pack {nuspecPath} -OutputDirectory {outputDir} -BasePath {contentDir}";
                    Log.Debug("Executing NuGet pack command: {Command}", nugetCommand);

                    try
                    {
                        if (IsLocalBuild)
                        {
                            var process = new Process
                            {
                                StartInfo = new ProcessStartInfo
                                {
                                    FileName = RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? "cmd.exe" : "/bin/bash",
                                    Arguments = RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
               ? $"/c nuget {nugetCommand}"
               : $"-c \"nuget {nugetCommand}\"",
                                    UseShellExecute = false,
                                    RedirectStandardOutput = true,
                                    RedirectStandardError = true,
                                    CreateNoWindow = true,
                                    WorkingDirectory = Environment.CurrentDirectory
                                }
                            };

                            try
                            {
                                process.Start();

                                // Read streams asynchronously to avoid deadlocks
                                var outputTask = process.StandardOutput.ReadToEndAsync();
                                var errorTask = process.StandardError.ReadToEndAsync();

                                process.WaitForExit();

                                var output = await outputTask;
                                var error = await errorTask;

                                // Log output
                                if (!string.IsNullOrEmpty(output))
                                {
                                    Serilog.Log.Information($"NuGet Output: {output}");
                                }

                                if (!string.IsNullOrEmpty(error))
                                {
                                    Serilog.Log.Error($"NuGet Error: {error}");
                                }

                                if (process.ExitCode != 0)
                                {
                                    throw new InvalidOperationException($"NuGet command failed with exit code {process.ExitCode}");
                                }

                                Serilog.Log.Information($"NuGet command completed successfully");
                            }
                            catch (Exception ex)
                            {
                                Serilog.Log.Error($"Failed to run NuGet command: {ex.Message}");
                                throw;
                            }
                        }
                        else if (IsServerBuild)
                        {
                            ProcessTasks
                                .StartProcess(
                                    toolPath: "/bin/bash",
                                    arguments: $"-c \"nuget {nugetCommand}\"",
                                    logOutput: true
                                )
                                .AssertZeroExitCode();
                        }

                        var packageFile = $"{packageId}.{version}.nupkg";
                        var fullPackagePath = outputDir / packageFile;

                        if (File.Exists(fullPackagePath))
                        {
                            Log.Information(
                                "✅ Successfully created NuGet package at {PackagePath}",
                                fullPackagePath
                            );
                        }
                        else
                        {
                            Log.Warning(
                                "Package file not found at expected location: {PackagePath}",
                                fullPackagePath
                            );
                        }
                    }
                    catch (Exception ex)
                    {
                        Log.Error(
                            ex,
                            "❌ Failed to create NuGet package: {ErrorMessage}",
                            ex.Message
                        );
                        throw;
                    }
                    finally
                    {
                        if (File.Exists(nuspecPath))
                        {
                            Log.Debug("Cleaning up temporary nuspec file");
                            File.Delete(nuspecPath);
                        }
                    }
                });

    Target PushToProGet =>
        _ =>
            _.DependsOn(CreateNuGetPackage)
             .AssuredAfterFailure()
                .Executes(() =>
                {
                    Log.Information("📤 Pushing NuGet package to ProGet...");

                    try
                    {
                        var packageId = "LeadOps.Showcase.Web";
                        var packageFile = $"{packageId}.{PackageVersion}.nupkg";
                        var packagePath = RootDirectory / "artifacts" / "packages" / packageFile;

                        if (!File.Exists(packagePath))
                        {
                            throw new InvalidOperationException(
                                $"NuGet package not found at {packagePath}"
                            );
                        }

                        var sourceUrl = $"{ProGetUrl}/nuget/{ProGetFeedName}/v3/index.json";
                        var command =
                            $"nuget push {packagePath} -Source {sourceUrl} -ApiKey {ProGetApiKey}";

                        if (IsLocalBuild)
                        {

                        }
                        else if (IsServerBuild)
                        {
                            ProcessTasks
                                .StartProcess(
                                    toolPath: "/bin/bash",
                                    arguments: $"-c \"{command}\"",
                                    logOutput: true
                                )
                                .AssertZeroExitCode();
                        }

                        Log.Information("✅ Successfully pushed package to ProGet");
                    }
                    catch (Exception ex)
                    {
                        Log.Error(
                            ex,
                            "❌ Failed to push package to ProGet: {ErrorMessage}",
                            ex.Message
                        );
                        throw;
                    }
                });

    Target PushBuildInformation => _ => _.DependsOn(PushToProGet).Executes(() => { });


    public Target CreateOctopusBuildInformation  => _ =>
            _.DependsOn(CreateNuGetPackage)
              .Description("Creates and pushes build information to Octopus Deploy")
          
        .Requires(() => OctopusUrl)
        .Requires(() => OctopusApiKey)
        .Requires(() => OctopusSpace)
        .Requires(() => PackageId)
        .Requires(() => PackageVersion)
        .Executes(() =>
        {

            // Path to octo.exe – make sure it's on PATH or specify full path
            var octoExe = "octo";

            // Arguments for creating build info
            var arguments = string.Join(" ",
                "build-information",
                "--server", OctopusUrl,
                "--apiKey", OctopusApiKey,
                "--space", "Default",
                "--packageId", PackageId,
                "--version", simpleVersion,
                "--file", "\"buildinfo.json\""
            );

            var startInfo = new ProcessStartInfo
            {
                FileName = octoExe,
                Arguments = arguments,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = startInfo };
            process.OutputDataReceived += (s, e) => { if (e.Data != null) Console.WriteLine(e.Data); };
            process.ErrorDataReceived += (s, e) => { if (e.Data != null) Console.Error.WriteLine(e.Data); };

            process.Start();
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();
            process.WaitForExit();

            if (process.ExitCode != 0)
            {
                throw new Exception($"Octo CLI failed with exit code {process.ExitCode}");
            }


        });


    /// <summary>
    ///
    /// </summary>
    /// <summary>
    /// Deploys to Octopus Deploy.
    /// </summary>
    Target OctopusDeploy =>
        _ =>
            _.DependsOn(PushToProGet)
                .Executes(async () =>
                {
                    // Create Octopus release using Process to call Octopus CLI directly
                    var octopusCliPath = "octo"; // Assumes octo.exe is in PATH, or specify full path

                    var processStartInfo = new ProcessStartInfo
                    {
                        FileName = octopusCliPath,
                        Arguments =
                            $"create-release "
                            + $"--server {OctopusUrl} "
                            + $"--apikey {OctopusApiKey} "
                            + $"--project \"{OctopusProjectName}\" "
                            + $"--version {ReleaseVersion} "
                            + $"--deployto {OctopusEnvironment}",
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        CreateNoWindow = true,
                    };

                    using var process = Process.Start(processStartInfo);
                    if (process != null)
                    {
                        var output = await process.StandardOutput.ReadToEndAsync();
                        var error = await process.StandardError.ReadToEndAsync();
                        await process.WaitForExitAsync();

                        if (process.ExitCode == 0)
                        {
                            Console.WriteLine("Octopus release created successfully:");
                            Console.WriteLine(output);
                        }
                        else
                        {
                            Console.WriteLine("Failed to create Octopus release:");
                            Console.WriteLine(error);
                            throw new Exception(
                                $"Octopus CLI failed with exit code {process.ExitCode}"
                            );
                        }
                    }
                });

}
