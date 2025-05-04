
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
    { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
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
