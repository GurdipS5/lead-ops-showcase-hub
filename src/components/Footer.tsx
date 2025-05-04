
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-devops-dark text-white py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <a href="#hero" className="text-xl font-bold flex items-center">
              <span className="text-devops-accent">&lt;</span>
              DevOps<span className="text-devops-accent">Lead</span>
              <span className="text-devops-accent">/&gt;</span>
            </a>
            <p className="text-devops-medium mt-2 max-w-md">
              Bridging the gap between development and operations with streamlined infrastructure and automated workflows.
            </p>
          </div>
          
          <div className="flex gap-4">
            <a
              href="https://github.com/johndoe"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/johndoe"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:john.doe@example.com"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-devops-medium">
              © {currentYear} John Doe. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#about" className="text-sm text-devops-medium hover:text-white transition-colors">
              About
            </a>
            <a href="#experience" className="text-sm text-devops-medium hover:text-white transition-colors">
              Experience
            </a>
            <a href="#projects" className="text-sm text-devops-medium hover:text-white transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-sm text-devops-medium hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
