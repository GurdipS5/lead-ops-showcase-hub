
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

  return (
    <header className="w-full z-50 bg-background py-5">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="#"
            className="text-xl font-pixel text-foreground flex items-center gap-1"
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
              className="font-nerd text-sm text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <ThemeToggle />
          <Button className="font-nerd text-sm bg-accent hover:bg-accent/90">
            Resume
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-background shadow-md py-4 px-6 flex flex-col gap-4 z-50">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-nerd text-sm text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent py-2 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button className="font-nerd text-sm bg-accent hover:bg-accent/90 w-full">
            Resume
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
