
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/90 dark:bg-devops-darkbg/90 shadow-sm backdrop-blur-sm py-3"
          : "bg-black py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="#"
            className="text-xl font-bold text-devops-dark dark:text-white flex items-center gap-1"
          >
            <span className="text-accent">&lt;</span>
            Gurdip<span className="text-accent">Sira</span>
            <span className="text-accent">/&gt;</span>
          </a>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-devops-medium dark:text-gray-300 hover:text-devops-dark dark:hover:text-white transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <ThemeToggle />
          <Button className="bg-accent hover:bg-accent/90 dark:bg-devops-darkaccent dark:hover:bg-devops-darkaccent/90">
            Resume
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-devops-dark dark:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-black dark:bg-devops-darkbg shadow-md py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-devops-medium dark:text-gray-300 hover:text-devops-dark dark:hover:text-white py-2 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button className="bg-accent hover:bg-accent/90 dark:bg-devops-darkaccent dark:hover:bg-devops-darkaccent/90 w-full">
            Resume
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
