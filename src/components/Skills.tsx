
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const Skills = () => {
  // Technical skills data
  const technicalSkills = [
    { name: "Kubernetes", level: 95 },
    { name: "AWS / Cloud Platforms", level: 90 },
    { name: "Docker / Containerization", level: 95 },
    { name: "CI/CD Pipelines", level: 95 },
    { name: "Terraform / IaC", level: 90 },
    { name: "Monitoring & Observability", level: 85 },
    { name: "Python / Scripting", level: 80 },
    { name: "Linux Administration", level: 90 }
  ];
  
  // Tools and technologies data
  const toolsAndTechnologies = [
    { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
    { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
    { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
    { name: "Ansible", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
    { name: "TeamCity", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8e/TeamCity_Icon.png" },
    { name: "Octopus Deploy", icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHBhdGggZmlsbD0iIzJGOTNFMCIgZD0iTTE4LjUgODAuNGMuMSAwIC4xIDAgMCAwbC41LjNjLTEuMy0uMi0yLjctLjUtNC0uNy0yLjEtLjItNC4xLS43LTYuMi0xQzYuNiA3OS4xIDQgNzguNyAxLjQgNzhjLjcgMCAxLjMuMSAyIC4xIDMuNC41IDYuOS44IDEwLjMgMS41IDEuNi4zIDMuMi42IDQuOC44em02My45IDUuMWMtLjQgMC0uNy0uMS0xLjEtLjEtMS44LS4zLTMuNy0uMy01LjUtLjUtMi4yLS4xLTQuMy0uMi02LjUtLjQtNC40LS4zLTguNy0uNy0xMy0xLjEtNC4yLS40LTguNS0uOC0xMi43LTEuMi0yLjctLjItNS40LS41LTguMi0uNGwtMiAuMWMtLjcgMC0xLjQtLjEtMi0uMy0xLjIgMC0yLjIuMS0zLjEuMS0xLjYgMC0zLjItLjMtNC44LS40bC03LjEtLjVjLTUtLjQtMTAuMS0uOC0xNS4xLTEuMy0uOS0uMS0xLjgtLjMtMi44LS40LS4xIDAgLS4yLjEtLjIuMiAwIC4xIDAgLjIuMi4yLjItLjEuMy0uMS41LS4yLS4xLjEtLjEuMi0uMS4yLjIgMCAuMy0uMS41LS4xaC40YzEuNC4zIDIuNy43IDQgMS4xbDEyIDEuOSA1LjIuOWM2LjEgMSAxMi4yIDIgMTguMyAyLjggMSAuMSAyIC4yIDMgLjNoMS4xLjNjOC4yLjkgMTYuNCAxLjQgMjQuNiAxLjMgNS4xIDAgMTAuMi0uNCAxNS4xLTEuMS0uOSAwLTEuNy0uMS0yLjQtLjJ6TTQyLjMgMzUuN2MwIDYuMy00LjggMTEuNC0xMC43IDExLjQtNS45IDAtMTAuNy01LjEtMTAuNy0xMS40IDAtNi4zIDQuOC0xMS40IDEwLjctMTEuNCA1LjkgMCAxMC43IDUuMSAxMC43IDExLjR6TTE5LjkgNzUuM2MtMS4xLjYtMi4yIDEuMi0zLjMgMS44LS42LjItMS4zLjQtMS45LjZoLS4xYy4xLS4xLS4xLS4yLS4yLS4xaC0uMWwtLjMuMXYtLjFjLS4xIDAtLjEgMC0uMi0uMWwuMy0uMWMtLjEtLjItLjItLjMtLjQtLjQtLjEtLjEtLjEtLjEtLjItLjEtLjEgMC0uMSAwLS4xLjFsLS4yLjFjLS4xLjEgMCAuMi4xLjNoLS4yYzAtLjIuMS0uNC4zLS42LjItLjMuNS0uNS44LS43bC44LS40LjMtLjEuMS0uMWMuMS0uMS4xLS4yLjItLjMgMC0uMiAwLS4zLS4yLS40LS4xIDAtLjEgMC0uMi0uMS0uMSAwLS4xIDAtLjIuMSAwIC4xLS4xLjMtLjEuNC0uMS4xLS4xLjEtLjIuMS0uMS4xLS4zLjEtLjQuMi0uMy4xLS42LjMtLjkuNC0uMy4xLS41LjMtLjguNC0uNS4zLTEuMS42LTEuNSAxLS40LjMtLjcuNy0xIDEuMS0uMi4zLS40LjctLjQgMXYuM2MwIC4yLjEuMy4xLjUuMS4zLjMuNi41LjguMi4yLjUuNC44LjYgMSAuNSAxLjkuOCAyLjkgMS4xIDEuOC40IDMuNy40IDUuNS44aDMuOWMuMS4xLjIuMS4zLjEuMSAwIC4xLjEuMS4yLjEgMCAuMS0uMS4xLS4xLjEtLjIuMS0uNC4xLS42IDAtLjIuMS0uNS4yLS43IDAtLjIuMi0uNC40LS41LjItLjIuNS0uNC44LS41bC40LS4yYy4yIDAgLjQtLjEuNy0uMS4yLS4xLjQtLjMuNS0uNC0uMSAwLS4yLS4xLS4zLS4yIDAtLjEtLjEtLjItLjEtLjMgMC0uMi4yLS4zLjMtLjQgMC0uMi4xLS40LjItLjYtLjEtLjEtLjMtLjEtLjUtLjItLjEtLjEtLjMtLjItLjMtLjRoMWMuMi4xLjMuMi40LjQgMCAuMS4xLjEuMi4yLjEuMS4yLjMuMi40LjEuMS4yLjIuMy4yLjIgMCAuNS0uMS43LS4ybC4zLS4xYy4xLS4xLjEtLjIuMy0uMi4xIDAgLjItLjEuMy0uMi4xLS4xLjMtLjEuNCAwIC4yLjEuNS4yLjcuNGwuNC42Yy4yLjEuMy4yLjUuM3YuMmMtLjMtLjEtLjYtLjMtLjktLjRsLS4zLS4zYy0uMS0uMS0uMi0uMS0uNC0uMi0uMSAwLS4yLS4xLS40LS4xLS4xIDAtLjIuMi0uNC4xLS4yLS4xLS40LS4yLS41LS40LjEuMiAwIC40LS4xLjYgMCAuMSAwIC4yLS4xLjMtLjEuMS0uMy4xLS40LjEtLjIgMC0uNC4xLS42LjMtLjEgMC0uMS4xLS4yLjEtLjEgMC0uMi4xLS4yLjFsLjEuMS0uMy4xYzAgLjEuMS4yLjEuMy0uMSAwLS4zLS4xLS4zLS4xIDAtLjEtLjEtLjEtLjItLjEtLjEuMS0uMi4xLS4zLjItLjEgMC0uMi4xLS4zLjItLjEuMS0uMi4zLS4yLjQtLjEuMS0uMS4xLS4xLjIgMCAuMS0uMS4yLS4yLjItLjEuMS0uMi4xLS4zLjItLjMgMC0uNiAwLS45LjEtLjItLjItLjMtLjQtLjMtLjZ6TTcwLjUgNThjMS41LS45IDMuMS0xLjcgNC44LTIuMiAzLjQtLjkgNy0uNSAxMC4xLjkgMy4xIDEuNSA1LjcgMy44IDcuNiA2LjcgMiAzIDIuOCA2LjUgMi44IDEwLjEgMCAuNyAwIDEuMy0uMSAyLS4zIDMuNy0xLjMgNy4yLTIuOSAxMC41LS45IDEuOS0yIDMuOC0zLjMgNS41LTIuMSAyLjgtNC43IDUuMi03LjYgNy4zLTIuOCAyLTUuOCAzLjgtOSA1LjEtLjcuMy0xLjMuNi0yIC44LTEuNi42LTMuMiAxLTQuOSAxLjQtMy4zLjgtNi44IDEuMi0xMC4yIDEuNS00LjMuMi04LjYuMS0xMyAwLTIuNy0uMS01LjQtLjItOC4xLS41LS45LS4xLTEuOC0uMi0yLjgtLjNsLTEuNy0uM2MtLjUtLjEtMS0uMS0xLjUtLjJsLS44LS4xYy0xLjMtLjEtMi41LS4zLTMuOC0uNmwtMS44LS40YzEuMy4xIDMuMS4xIDIuNi0xLjUtLjItLjUtLjctLjktMS4xLTEuMy0xLjEtLjktMi40LTEuNC0zLjgtMS44LTEuNC0uMy0yLjgtLjQtNC4yLS40LTIuOCAwLTUuNS40LTguMiAxLjItLjUuMS0xIC4zLTEuNi41LS41LjItMS4xLjQtMS42LjctLjUuMi0xIC41LTEuNS43bC0uNy40Yy41LjEgMS4xLjEgMS42LjIgMS4xLjEgMi4xLjIgMy4yLjQgMi4xLjMgNC4yLjYgNi4zLjkgNC4zLjcgOC43IDEuNCAxMy4xIDIgNy41IDEuMSAxNS4xIDIuMiAyMi42IDIuOSA3LjQuNyAxNC45IDEgMjIuMy40LjctLjEgMS4zLS4xIDItLjIgMi45LS4zIDUuNy0uOCA4LjQtMS43IDMuNC0xLjEgNi41LTIuOSA5LjEtNS4zIDIuNi0yLjQgNC41LTUuMyA1LjYtOC43IDEuMS0zLjMgMS4yLTYuOC42LTEwLjEtLjYtMy40LTItNi41LTQuMi05LjEtMi4xLTIuNi00LjktNC41LTgtNS44LTMuMS0xLjMtNi42LTEuOC05LjktMS40LTEuNi4yLTMuMi42LTQuNyAxLjEtMS41LjYtMi45IDEuNC00LjIgMi40LTIuNiAyLTQuNiA0LjYtNS44IDcuNWwtMS41LjFjLS4xLS4yLS4yLS40LS4zLS42LjgtMi4zIDIuMi00LjQgMy44LTYuMiAxLjMtMS40IDIuOC0yLjYgNC40LTMuNnptNi43LTI0LjhjMC02LjMgNC44LTExLjQgMTAuNy0xMS40czEwLjcgNS4xIDEwLjcgMTEuNFM5NCAxOS45IDg4IDQ0LjcgNzcuMyA0NC43IDc3LjMgMzMuMnptLTMgNDQuMmMtMS40LjYtMi44IDEuMS00LjMgMS42LTEuNS40LTIuOS44LTQuNCAxLjEtMy4xLjUtNi4xLTEuMy03LjQtNC0xLjMtMi44LS42LTYuMiAxLjctOC40IDIuMy0yLjEgNS44LTIuOCA4LjctMS42IDMgMS4xIDUuNCAzLjYgNi4zIDYuN2wuNS0uMmMtMS05LjEtMTEtMTMuNi0xOC44LTkuNS03LjQgMy45LTkgMTQuMS0yLjcgMTkuNSA2LjUgNS42IDE2LjUgMi42IDIwLjMtNC43di0uNXoiLz48L3N2Zz4=" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Prometheus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" },
    { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" }
  ];
  
  // Certifications data
  const certifications = [
    { name: "AWS Certified DevOps Engineer - Professional", issuer: "Amazon Web Services", year: "2022" },
    { name: "CKA: Certified Kubernetes Administrator", issuer: "Cloud Native Computing Foundation", year: "2021" },
    { name: "CKAD: Certified Kubernetes Application Developer", issuer: "Cloud Native Computing Foundation", year: "2021" },
    { name: "HashiCorp Certified: Terraform Associate", issuer: "HashiCorp", year: "2020" },
    { name: "Microsoft Certified: Azure DevOps Engineer Expert", issuer: "Microsoft", year: "2020" }
  ];
  
  return (
    <section id="skills" className="py-20 bg-[#0a0f1f] text-white">
      <div className="container">
        <h2 className="text-3xl font-bold mb-10 relative">
          Skills & Expertise
          <div className="absolute w-16 h-1 bg-accent mt-2"></div>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Technical Proficiency Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Technical Proficiency</h3>
            <div className="bg-[#101630] border border-[#1e293b] rounded-lg p-6 space-y-6">
              {technicalSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="relative h-2 w-full bg-[#1e293b] rounded-full overflow-hidden">
                    <div 
                      className="absolute h-2 bg-accent rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <h3 className="text-xl font-bold mb-6 mt-10">Certifications</h3>
            <div className="bg-[#101630] border border-[#1e293b] rounded-lg p-6">
              <table className="w-full text-left">
                <thead className="border-b border-[#1e293b]">
                  <tr>
                    <th className="pb-3 font-medium text-gray-300 w-[50%]">Certification</th>
                    <th className="pb-3 font-medium text-gray-300">Issuer</th>
                    <th className="pb-3 font-medium text-gray-300 text-right">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {certifications.map((cert, index) => (
                    <tr key={cert.name} className={index !== certifications.length - 1 ? "border-b border-[#1e293b]" : ""}>
                      <td className="py-4 font-medium">{cert.name}</td>
                      <td className="py-4 text-gray-300">{cert.issuer}</td>
                      <td className="py-4 text-right">
                        <Badge className="bg-[#1e293b] text-white border-none">{cert.year}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Tools & Technologies Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Tools & Technologies</h3>
            <div className="bg-[#101630] border border-[#1e293b] rounded-lg p-6">
              <div className="grid grid-cols-4 gap-4">
                {toolsAndTechnologies.map((tool) => (
                  <div key={tool.name} className="flex flex-col items-center justify-center p-3 bg-[#192040] rounded-lg">
                    <img 
                      src={tool.icon} 
                      alt={tool.name} 
                      className="w-12 h-12 mb-2"
                    />
                    <span className="text-xs font-medium text-center text-gray-300">{tool.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold mb-6">Core Competencies</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#192040] p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Cloud Architecture</h4>
                    <p className="text-sm text-gray-400">Designing scalable and resilient cloud solutions across major providers.</p>
                  </div>
                  <div className="bg-[#192040] p-4 rounded-lg">
                    <h4 className="font-medium mb-2">CI/CD Pipeline Design</h4>
                    <p className="text-sm text-gray-400">Building efficient and reliable continuous delivery workflows.</p>
                  </div>
                  <div className="bg-[#192040] p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Infrastructure as Code</h4>
                    <p className="text-sm text-gray-400">Automating infrastructure deployment with Terraform and CloudFormation.</p>
                  </div>
                  <div className="bg-[#192040] p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Container Orchestration</h4>
                    <p className="text-sm text-gray-400">Managing complex Kubernetes environments with best practices.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
