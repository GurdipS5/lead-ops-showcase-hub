
import { Card, CardContent } from "@/components/ui/card";

const Experience = () => {
  const experiences = [
    {
      position: "DevOps Lead",
      company: "Virgin Money",
      period: "October 2022 - Present",
      description:
        "Leading cloud migration initiatives, infrastructure optimization, and DevOps transformation across the organization. Responsible for implementing modern CI/CD practices, Kubernetes orchestration, and fostering a culture of innovation through Research and Development.",
      achievements: [
        "Led a seamless migration of 50+ applications to AWS/Azure, resulting in a 30% reduction in infrastructure costs and improved scalability",
        "Successfully designed, deployed, and maintained highly available Kubernetes clusters supporting over 100 microservices",
        "Developed common Terraform modules, reducing code duplication and increasing developer productivity",
        "Built a Research and Development function focused on AI, Machine Learning and Data Engineering in Azure"
      ]
    },
    {
      position: "DevOps Lead",
      company: "TechSolutions Inc.",
      period: "2021 - 2022",
      description:
        "Leading a team of 8 engineers to implement and maintain CI/CD pipelines, cloud infrastructure, and monitoring solutions across the organization. Reduced deployment time by 70% and increased system reliability by implementing automated testing and monitoring.",
      achievements: [
        "Migrated legacy infrastructure to Kubernetes, improving scaling capabilities and reducing costs by 35%",
        "Implemented GitOps workflow with ArgoCD, enhancing deployment visibility and reliability",
        "Designed multi-region disaster recovery strategy with 99.99% uptime achievement"
      ]
    },
    {
      position: "Senior DevOps Engineer",
      company: "CloudScale Systems",
      period: "2018 - 2021",
      description:
        "Designed and implemented cloud-native infrastructure for high-traffic applications using AWS and Terraform. Led the containerization initiative and established monitoring and alerting standards.",
      achievements: [
        "Built fully automated CI/CD pipelines using GitHub Actions and AWS CodePipeline",
        "Implemented infrastructure as code using Terraform across 5 product lines",
        "Reduced mean time to recovery (MTTR) from 3 hours to 20 minutes"
      ]
    },
    {
      position: "Systems Engineer",
      company: "InnoTech Solutions",
      period: "2015 - 2018",
      description:
        "Managed and maintained on-premise and cloud infrastructure. Collaborated with developers to streamline deployment processes and implement monitoring solutions.",
      achievements: [
        "Orchestrated migration from on-premise to AWS cloud infrastructure",
        "Implemented Docker containers for local development environments",
        "Created automated backup and recovery procedures, reducing data loss risk"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-black">
      <div className="container">
        <h2 className="section-heading">Professional Experience</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-devops-accent/30 transform md:-translate-x-1/2"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.position + exp.company} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-devops-accent rounded-full transform -translate-y-1/2 md:-translate-x-1/2 border-4 border-black"></div>
                
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 ml-6 md:ml-0' : 'md:pl-12 ml-6 md:ml-auto'}`}>
                  <Card className="overflow-hidden animate-fade-in bg-devops-darkcard border-gray-700">
                    <div className="h-2 bg-devops-accent"></div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start flex-wrap mb-4">
                        <div>
                          <h3 className="font-bold text-xl text-white">{exp.position}</h3>
                          <p className="text-gray-300">{exp.company}</p>
                        </div>
                        <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                          {exp.period}
                        </span>
                      </div>
                      
                      <p className="mb-4 text-gray-300">{exp.description}</p>
                      
                      <div>
                        <h4 className="font-medium mb-2 text-sm uppercase tracking-wider text-gray-400">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-devops-accent font-bold">→</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
