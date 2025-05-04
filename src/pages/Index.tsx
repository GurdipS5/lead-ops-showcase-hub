
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LighthouseWidget from '@/components/LighthouseWidget';
import GitHubWidget from '@/components/GitHubWidget';

const Index = () => {
  return (
    <div className="min-h-screen font-sans text-sm bg-[#0a0f1f]">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <GitHubWidget />
        <Contact />
        <LighthouseWidget />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
