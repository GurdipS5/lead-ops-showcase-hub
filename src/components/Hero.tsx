
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative pt-16 bg-gradient-to-br from-white to-devops-light"
    >
      <div className="container grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-devops-dark leading-tight">
            Hi, I'm <span className="text-devops-accent">John Doe</span>
            <br />
            DevOps <span className="text-devops-medium">Lead & Architect</span>
          </h1>
          <p className="text-lg text-devops-medium max-w-lg">
            Bridging the gap between development and operations with 10+ years of
            experience in streamlining deployment pipelines and implementing
            robust cloud infrastructure.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-devops-accent hover:bg-devops-accent/90"
              onClick={() => document.getElementById("contact")?.scrollIntoView()}
            >
              Get in Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-devops-dark text-devops-dark"
            >
              View Resume
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:block animate-fade-in animate-delay-300">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-devops-accent/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-devops-accent/20 rounded-full"></div>
          <div className="bg-white p-6 rounded-xl shadow-lg z-10 relative">
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
                alt="DevOps Visualization"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white shadow-md rounded-lg px-4 py-2">
              <div className="text-sm font-mono">
                <span className="text-devops-accent">$</span> kubectl get pods
              </div>
            </div>
            <div className="absolute -top-5 -right-5 bg-white shadow-md rounded-lg px-4 py-2">
              <div className="text-sm font-mono">
                <span className="text-green-500">●</span> CI/CD Pipeline: Success
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
        <a href="#about">
          <ArrowDown className="mx-auto text-devops-medium" />
          <span className="text-sm text-devops-medium block mt-1">
            Scroll Down
          </span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
