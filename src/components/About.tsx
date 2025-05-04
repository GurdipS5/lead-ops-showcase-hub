
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Globe, Users } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container">
        <h2 className="section-heading">About Me</h2>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-lg">
              I'm a seasoned <span className="highlight-text">DevOps Leader</span> with a passion for building scalable infrastructure and optimizing development workflows. With extensive experience in cloud architecture, containerization, and continuous integration/delivery, I specialize in transforming traditional IT operations into streamlined, automated processes.
            </p>
            
            <p>
              Throughout my career, I've led teams that implemented efficient DevOps practices across various industries, resulting in faster deployment cycles, improved system reliability, and enhanced collaboration between development and operations teams.
            </p>
            
            <p>
              My approach combines technical expertise with a deep understanding of business needs, ensuring that infrastructure decisions support both engineering excellence and organizational goals.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-devops-accent/10 p-3 rounded-full">
                      <Briefcase className="text-devops-accent h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">10+ Years</h3>
                      <p className="text-devops-medium">Industry Experience</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-devops-accent/10 p-3 rounded-full">
                      <Globe className="text-devops-accent h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">50+ Projects</h3>
                      <p className="text-devops-medium">Successfully Delivered</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="sm:col-span-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-devops-accent/10 p-3 rounded-full">
                      <Users className="text-devops-accent h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">15+ Team Members</h3>
                      <p className="text-devops-medium">Led and Mentored</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <Card className="h-full">
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xl mb-4">Core Expertise</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-devops-accent"></span>
                      <span>CI/CD Pipeline Optimization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-devops-accent"></span>
                      <span>Cloud Architecture (AWS, Azure, GCP)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-devops-accent"></span>
                      <span>Infrastructure as Code</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-devops-accent"></span>
                      <span>Kubernetes Orchestration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-devops-accent"></span>
                      <span>Container Management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-devops-accent"></span>
                      <span>Microservices Architecture</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-devops-accent"></span>
                      <span>Site Reliability Engineering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-devops-accent"></span>
                      <span>Automated Testing & Monitoring</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-bold mb-2">Current Role</h3>
                  <p className="text-devops-medium">Lead DevOps Engineer at TechSolutions Inc.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
