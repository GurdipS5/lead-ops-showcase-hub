
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
    "Kubernetes", "Docker", "AWS", "GCP", "Azure", "Terraform", "Ansible", 
    "Jenkins", "GitHub Actions", "ArgoCD", "Helm", "Prometheus", "Grafana", 
    "ELK Stack", "Istio", "Vault", "Python", "Bash", "Git", "Linux"
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
                      <Progress value={skill.level} className="h-2" indicatorClassName="bg-devops-accent" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <h3 className="text-xl font-bold mb-4 mt-10">Certifications</h3>
            <Card>
              <CardContent className="p-6">
                <ul className="divide-y">
                  {certifications.map((cert) => (
                    <li key={cert.name} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-devops-medium">{cert.issuer}</p>
                        </div>
                        <Badge className="bg-devops-dark">{cert.year}</Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Tools & Technologies</h3>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {toolsAndTechnologies.map((tool) => (
                    <span 
                      key={tool} 
                      className="bg-white px-4 py-2 rounded-full text-sm border border-devops-accent/20 hover:border-devops-accent/50 transition-colors"
                    >
                      {tool}
                    </span>
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

// Missing component that needs to be defined
const Badge = ({ children, className = "" }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-devops-accent text-white ${className}`}>
      {children}
    </span>
  );
};

export default Skills;
