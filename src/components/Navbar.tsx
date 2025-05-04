
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const handleResumeClick = () => {
    // Create a link to download the resume PDF
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // The path to your resume PDF
    link.setAttribute('download', 'Gurdip_Sira_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="w-full z-50 bg-[#0a0f1f] py-5 fixed">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="#"
            className="text-xl font-arial font-bold text-white flex items-center gap-1"
          >
            <span className="text-[#33c3f0] font-sans">&lt;</span>
            <span className="font-sans">Gurdip</span><span className="text-[#33c3f0] font-sans">Sira</span>
            <span className="text-[#33c3f0] font-sans">/&gt;</span>
          </a>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-mono text-sm text-gray-300 hover:text-[#33c3f0] transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <ThemeToggle />
          <Button 
            className="font-mono text-sm bg-[#33c3f0] hover:bg-[#33c3f0]/90 text-white"
            onClick={handleResumeClick}
          >
            Resume
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-[#0a0f1f] shadow-md py-4 px-6 flex flex-col gap-4 z-50">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-mono text-sm text-gray-300 hover:text-[#33c3f0] py-2 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button 
            className="font-mono text-sm bg-[#33c3f0] hover:bg-[#33c3f0]/90 text-white w-full"
            onClick={handleResumeClick}
          >
            Resume
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
