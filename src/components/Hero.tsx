
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative pt-16 bg-black"
    >
      <div className="container grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Hi, I'm <span className="text-accent">Gurdip Sira</span>
            <br />
            DevOps <span className="text-gray-300">Lead & Architect</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-lg">
            Bridging the gap between development and operations with 10+ years of
            experience in streamlining deployment pipelines and implementing
            robust cloud infrastructure.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90"
              onClick={() => document.getElementById("contact")?.scrollIntoView()}
            >
              Get in Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-gray-800"
            >
              View Resume
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:block animate-fade-in animate-delay-300">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full"></div>
          <div className="bg-devops-darkcard p-6 rounded-xl shadow-lg z-10 relative">
            <div className="rounded-lg overflow-hidden">
              <img
                src="/lovable-uploads/ceefd226-df40-4c4a-803e-dc30d68a8e10.png"
                alt="Nissan GTR R35 - Gray Edition"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-devops-darkcard shadow-md rounded-lg px-4 py-2">
              <div className="text-sm font-mono text-gray-300">
                <span className="text-accent">$</span> kubectl get pods
              </div>
            </div>
            <div className="absolute -top-5 -right-5 bg-devops-darkcard shadow-md rounded-lg px-4 py-2">
              <div className="text-sm font-mono text-gray-300">
                <span className="text-green-500">●</span> CI/CD Pipeline: Success
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
        <a href="#about">
          <ArrowDown className="mx-auto text-gray-300" />
          <span className="text-sm text-gray-300 block mt-1">
            Scroll Down
          </span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
