
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
              Ever since I wrote my first line of code in high school, I've been captivated by the power of technology to transform ideas into reality. My journey into the world of <span className="highlight-text">DevOps</span> began with a fascination for how infrastructure and development can seamlessly work together to deliver robust, scalable, and efficient solutions. Over the past decade, I have dedicated myself to mastering the art of DevOps, spearheading initiatives that have revolutionized deployment pipelines, enhanced system reliability, and optimized workflows.
            </p>
            
            <p>
              From automating complex CI/CD processes to implementing comprehensive monitoring solutions, my career is a testament to my passion for continuous improvement and innovation. As a DevOps lead, I have successfully led cross-functional teams, driven cloud migration projects, and ensured the stability and performance of mission-critical applications. Join me as I share the milestones, projects, and experiences that define my professional journey and showcase my commitment to excellence in the ever-evolving field of DevOps.
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
                  <p className="text-devops-medium">DevOps Lead at Virgin Money</p>
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
