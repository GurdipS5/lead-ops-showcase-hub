
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "Enterprise Cloud Migration",
      description: "Led the migration of a Fortune 500 company's entire infrastructure from on-premise to AWS cloud, implementing infrastructure as code with Terraform and establishing CI/CD pipelines with Jenkins.",
      tags: ["AWS", "Terraform", "Jenkins", "EKS", "CloudFormation"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
      link: "#"
    },
    {
      title: "Microservices Platform",
      description: "Designed and implemented a Kubernetes-based microservices platform supporting 50+ services with automated deployment, scaling, and monitoring capabilities.",
      tags: ["Kubernetes", "Istio", "Prometheus", "GitHub Actions", "ArgoCD"],
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80",
      link: "#"
    },
    {
      title: "Multi-Region Disaster Recovery",
      description: "Architected a robust multi-region disaster recovery solution for a financial services platform with real-time data replication and automated failover capabilities.",
      tags: ["AWS", "GCP", "Terraform", "PostgreSQL", "Load Balancing"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
      link: "#"
    }
  ];
  
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container">
        <h2 className="section-heading">Featured Projects</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={project.title} className="overflow-hidden animate-fade-in animate-delay-200 hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-devops-accent/10 text-devops-accent hover:bg-devops-accent/20">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline">+{project.tags.length - 3}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{project.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Case Study</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-devops-dark text-devops-dark">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
