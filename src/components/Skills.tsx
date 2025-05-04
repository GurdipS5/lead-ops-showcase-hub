
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const Skills = () => {
  // This is already a JavaScript object array that can be easily modified or loaded from an API
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
  
  // This is a JavaScript object array for tools and technologies with fixed AWS logo URL
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
  
  // This is a JavaScript object array for certifications
  const certifications = [
    { name: "AWS Certified DevOps Engineer - Professional", issuer: "Amazon Web Services", year: "2022" },
    { name: "CKA: Certified Kubernetes Administrator", issuer: "Cloud Native Computing Foundation", year: "2021" },
    { name: "CKAD: Certified Kubernetes Application Developer", issuer: "Cloud Native Computing Foundation", year: "2021" },
    { name: "HashiCorp Certified: Terraform Associate", issuer: "HashiCorp", year: "2020" },
    { name: "Microsoft Certified: Azure DevOps Engineer Expert", issuer: "Microsoft", year: "2020" }
  ];
  
  return (
    <section id="skills" className="py-20 bg-black text-white">
      <div className="container">
        <h2 className="section-heading">Skills & Expertise</h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4">Technical Proficiency</h3>
            <Card className="bg-black border border-gray-700">
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
            <Card className="bg-black border border-gray-700">
              <CardContent className="p-6">
                <ScrollArea className="h-[320px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="w-[50%] sticky top-0 bg-black z-10 text-white">Certification</TableHead>
                        <TableHead className="sticky top-0 bg-black z-10 text-white">Issuer</TableHead>
                        <TableHead className="text-right sticky top-0 bg-black z-10 text-white">Year</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {certifications.map((cert) => (
                        <TableRow key={cert.name} className="border-gray-700">
                          <TableCell className="font-medium text-white">{cert.name}</TableCell>
                          <TableCell className="text-gray-300">{cert.issuer}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-devops-dark text-white text-sm font-medium border-gray-600">
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
            <Card className="h-full bg-black border border-gray-700">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {toolsAndTechnologies.map((tool) => (
                    <div 
                      key={tool.name} 
                      className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg border border-gray-700 hover:shadow-md transition-shadow"
                    >
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
                  <h3 className="text-xl font-bold mb-4">Core Competencies</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                      <h4 className="font-medium mb-2">Cloud Architecture</h4>
                      <p className="text-sm text-gray-400">Designing scalable and resilient cloud solutions across major providers.</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                      <h4 className="font-medium mb-2">CI/CD Pipeline Design</h4>
                      <p className="text-sm text-gray-400">Building efficient and reliable continuous delivery workflows.</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                      <h4 className="font-medium mb-2">Infrastructure as Code</h4>
                      <p className="text-sm text-gray-400">Automating infrastructure deployment with Terraform and CloudFormation.</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                      <h4 className="font-medium mb-2">Container Orchestration</h4>
                      <p className="text-sm text-gray-400">Managing complex Kubernetes environments with best practices.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-4">GitHub Activity</h3>
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 overflow-hidden">
                    <iframe 
                      src="https://github-readme-stats.vercel.app/api?username=gurdiprowo&show_icons=true&theme=dark&hide_border=true&bg_color=111827" 
                      width="100%" 
                      height="200" 
                      frameBorder="0"
                      title="GitHub Stats"
                      className="rounded-lg"
                    ></iframe>
                    <iframe 
                      src="https://github-readme-streak-stats.herokuapp.com/?user=gurdiprowo&theme=dark&background=111827&hide_border=true" 
                      width="100%" 
                      height="200" 
                      frameBorder="0"
                      title="GitHub Streak"
                      className="rounded-lg mt-4"
                    ></iframe>
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
