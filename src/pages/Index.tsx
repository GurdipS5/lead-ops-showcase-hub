
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <ScrollArea className="h-screen">
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </main>
      </ScrollArea>
    </div>
  );
};

export default Index;
