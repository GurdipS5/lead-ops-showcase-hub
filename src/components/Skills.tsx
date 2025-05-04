
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const Skills = () => {
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
  
  const toolsAndTechnologies = [
    { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
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
  
  const certifications = [
    { name: "AWS Certified DevOps Engineer - Professional", issuer: "Amazon Web Services", year: "2022" },
    { name: "CKA: Certified Kubernetes Administrator", issuer: "Cloud Native Computing Foundation", year: "2021" },
    { name: "CKAD: Certified Kubernetes Application Developer", issuer: "Cloud Native Computing Foundation", year: "2021" },
    { name: "HashiCorp Certified: Terraform Associate", issuer: "HashiCorp", year: "2020" },
    { name: "Microsoft Certified: Azure DevOps Engineer Expert", issuer: "Microsoft", year: "2020" }
  ];
  
  return (
    <section id="skills" className="py-20 bg-devops-light">
      <div className="container">
        <h2 className="section-heading">Skills & Expertise</h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4">Technical Proficiency</h3>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {technicalSkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-devops-medium">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <h3 className="text-xl font-bold mb-4 mt-10">Certifications</h3>
            <Card>
              <CardContent className="p-6">
                <ScrollArea className="h-[320px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50%] sticky top-0 bg-background z-10">Certification</TableHead>
                        <TableHead className="sticky top-0 bg-background z-10">Issuer</TableHead>
                        <TableHead className="text-right sticky top-0 bg-background z-10">Year</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {certifications.map((cert) => (
                        <TableRow key={cert.name}>
                          <TableCell className="font-medium">{cert.name}</TableCell>
                          <TableCell>{cert.issuer}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-devops-dark text-white text-sm font-medium">
                              {cert.year}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Tools & Technologies</h3>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {toolsAndTechnologies.map((tool) => (
                    <div 
                      key={tool.name} 
                      className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-border hover:shadow-md transition-shadow"
                    >
                      <img 
                        src={tool.icon} 
                        alt={tool.name} 
                        className="w-12 h-12 mb-2"
                      />
                      <span className="text-xs font-medium text-center">{tool.name}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-4">Core Competencies</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-border">
                      <h4 className="font-medium mb-2">Cloud Architecture</h4>
                      <p className="text-sm text-devops-medium">Designing scalable and resilient cloud solutions across major providers.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-border">
                      <h4 className="font-medium mb-2">CI/CD Pipeline Design</h4>
                      <p className="text-sm text-devops-medium">Building efficient and reliable continuous delivery workflows.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-border">
                      <h4 className="font-medium mb-2">Infrastructure as Code</h4>
                      <p className="text-sm text-devops-medium">Automating infrastructure deployment with Terraform and CloudFormation.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-border">
                      <h4 className="font-medium mb-2">Container Orchestration</h4>
                      <p className="text-sm text-devops-medium">Managing complex Kubernetes environments with best practices.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
