using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _build
{
    public class OctopusBuildInfo
    {


        public string PackageId { get; set; }
        public string Version { get; set; }
        public string BuildUrl { get; set; }
        public string BuildNumber { get; set; }
        public string BuildEnvironment { get; set; }
        public string VcsType { get; set; }
        public string VcsRoot { get; set; }
        public string VcsCommitNumber { get; set; }
        public string Branch { get; set; }
        public List<CommitDetail> Commits { get; set; } = new();
        public List<WorkItem> WorkItems { get; set; } = new();
        public string IncompleteDataWarning { get; set; }
    }

}
