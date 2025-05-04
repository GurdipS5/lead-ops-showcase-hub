
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

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

  const handleResumeClick = async () => {
    try {
      // Create a new PDF document
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      // Handle About section
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        // Convert about section to image
        const aboutImage = await toPng(aboutSection, { quality: 0.95 });
        
        // Add about section to PDF
        pdf.text("ABOUT ME", 20, 20);
        pdf.addImage(aboutImage, "PNG", 10, 25, 190, 0);
        
        // Add page break after about section
        pdf.addPage();
      }
      
      // Handle Experience section
      const experienceSection = document.getElementById("experience");
      if (experienceSection) {
        // Convert experience section to image
        const expImage = await toPng(experienceSection, { quality: 0.95 });
        
        // Add experience section to PDF
        pdf.text("PROFESSIONAL EXPERIENCE", 20, 20);
        pdf.addImage(expImage, "PNG", 10, 25, 190, 0);
      }
      
      // Save the PDF with a name
      pdf.save("Gurdip_Sira_Resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
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
