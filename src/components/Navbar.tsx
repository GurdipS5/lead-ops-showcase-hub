
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { jsPDF } from "jspdf";
import { toast } from "@/components/ui/use-toast";

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
      
      // Get content from about section
      const aboutSection = document.getElementById("about");
      const experienceSection = document.getElementById("experience");
      
      if (!aboutSection || !experienceSection) {
        toast({
          title: "Error generating resume",
          description: "Could not find required sections",
          variant: "destructive",
        });
        return;
      }
      
      // Add header
      pdf.setFontSize(22);
      pdf.setTextColor(51, 195, 240); // #33c3f0
      pdf.text("Gurdip Sira - Resume", 105, 20, { align: "center" });
      
      // About section
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text("About", 20, 40);
      
      // Extract and add about text
      const aboutText = aboutSection.textContent?.replace(/\s+/g, ' ').trim() || 
        "DevOps Engineer with experience in CI/CD, containerization, and cloud infrastructure.";
      pdf.setFontSize(12);
      pdf.setTextColor(60, 60, 60);
      
      const splitAbout = pdf.splitTextToSize(aboutText, 170);
      pdf.text(splitAbout, 20, 50);
      
      // Experience section
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Experience", 20, 90);
      
      // Extract experience details
      const experienceItems = experienceSection.querySelectorAll("h3, h4, p");
      let yPosition = 100;
      
      experienceItems.forEach((item) => {
        const text = item.textContent?.trim() || "";
        if (text) {
          if (item.tagName === "H3") {
            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 0);
            yPosition += 10;
          } else if (item.tagName === "H4") {
            pdf.setFontSize(12);
            pdf.setTextColor(80, 80, 80);
          } else {
            pdf.setFontSize(10);
            pdf.setTextColor(60, 60, 60);
          }
          
          const splitText = pdf.splitTextToSize(text, 170);
          pdf.text(splitText, 20, yPosition);
          yPosition += splitText.length * 5 + 2;
          
          // Add new page if needed
          if (yPosition > 270) {
            pdf.addPage();
            yPosition = 20;
          }
        }
      });
      
      // Save the PDF with a name
      pdf.save("Gurdip_Sira_Resume.pdf");
      
      toast({
        title: "Resume downloaded",
        description: "Your resume has been successfully generated and downloaded.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error generating resume",
        description: "There was a problem creating your resume PDF.",
        variant: "destructive",
      });
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
            <span className="font-sans">Gurdip </span><span className="text-[#33c3f0] font-sans">Sira</span>
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
