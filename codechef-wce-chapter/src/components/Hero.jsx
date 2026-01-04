import React from 'react';
import { ChevronRight, MapPin } from 'lucide-react';
import TechBackground from './TechBackground';

const Hero = () => {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <TechBackground />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-sm font-medium backdrop-blur-sm animate-fade-in-up">
          <a
            href="https://maps.app.goo.gl/FPKrfq1AiPWpDLQ77"
            target="_blank"
            rel="noopener noreferrer"
className="inline-flex items-center px-6 py-2.5 rounded-full bg-teal-600 text-white font-medium hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-0.5"
          >
            <MapPin className="w-4 h-4 mr-2" />
              Walchand College of Engineering, Sangli
            </a>

        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
          We are Chefs, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-fuchsia-400">
            We Cook Algorithms
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The official CodeChef Chapter of WCE. We foster a culture of competitive programming, 
          turning logic into code and students into champions.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <a href="#events" className="group relative px-8 py-4 rounded-xl bg-white text-slate-950 font-bold overflow-hidden transition-all hover:scale-105 shadow-xl shadow-teal-500/20">
            <span className="relative z-10 flex items-center">
              Explore Events <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a href="#about" className="px-8 py-4 rounded-xl border border-slate-700 text-white font-medium hover:bg-slate-800/50 hover:border-slate-500 transition-all backdrop-blur-sm">
            Learn More
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-600">
        <ChevronRight className="rotate-90 w-8 h-8" />
      </div>
    </header>
  );
};

export default Hero;
