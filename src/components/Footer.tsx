
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white py-10 border-t border-gray-800">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <a href="#hero" className="text-xl font-bold flex items-center">
              <span className="text-[#33c3f0] font-sans">&lt;</span><span className="font-sans">Gurdip</span><span className="text-[#33c3f0] font-sans">Sira</span><span className="text-[#33c3f0] font-sans">/&gt;</span>
            </a>
            <p className="text-gray-400 mt-2 max-w-md">
              Bridging the gap between development and operations with streamlined infrastructure and automated workflows.
            </p>
          </div>
          
          <div className="flex gap-4">
            <a
              href="https://github.com/gurdipsira"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/gurdipsira"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:gurdip.sira@example.com"
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Gurdip Sira. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">
              About
            </a>
            <a href="#experience" className="text-sm text-gray-400 hover:text-white transition-colors">
              Experience
            </a>
            <a href="#projects" className="text-sm text-gray-400 hover:text-white transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
