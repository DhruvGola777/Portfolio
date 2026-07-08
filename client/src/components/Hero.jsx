import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Hero = () => {
  const titleLines = ["BUILDING", "SYSTEMS", "THAT WORK."];
  const [resumeUrl, setResumeUrl] = useState('#');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/profile');
        if (res.ok) {
          const data = await res.json();
          if (data.resumeUrl) {
            setResumeUrl(data.resumeUrl);
          }
        }
      } catch (err) {
        console.error('Failed to fetch profile for hero', err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-20 pb-32">
      <div className="z-10 w-full max-w-7xl mx-auto pointer-events-auto">
        <div className="space-y-4 pointer-events-none">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-muted font-bold tracking-[0.3em] uppercase ml-1 flex items-center gap-2"
          >
            <span className="text-xl md:text-2xl text-white tracking-widest">Dhruv Gola</span>
            <span className="text-sm mt-1">— Full Stack Developer</span>
          </motion.p>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground tracking-tighter leading-[0.9]">
            {titleLines.map((line, index) => (
              <div key={index} className="overflow-hidden pb-2 -mb-2">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.4 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex flex-wrap items-center gap-4 text-xs font-bold tracking-[0.2em] text-muted uppercase"
        >
          <span className="border border-white/10 rounded-full px-4 py-2 bg-black/50 backdrop-blur-sm pointer-events-none">React</span>
          <span className="border border-white/10 rounded-full px-4 py-2 bg-black/50 backdrop-blur-sm pointer-events-none">Node.js</span>
          <span className="border border-white/10 rounded-full px-4 py-2 bg-black/50 backdrop-blur-sm pointer-events-none">MERN Stack</span>
          <span className="border border-white/10 rounded-full px-4 py-2 bg-black/50 backdrop-blur-sm pointer-events-none relative overflow-hidden group">
            <span className="relative z-10">Available for work</span>
            <span className="absolute inset-0 bg-accent/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
          </span>

          <div className="ml-auto mt-4 sm:mt-0">
            <MagneticButton href={resumeUrl}>
              <div className="flex items-center gap-2 border border-accent/50 text-white rounded-full px-6 py-2.5 bg-accent/10 hover:bg-accent hover:text-white transition-colors duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] cursor-pointer relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                <Download size={16} className="relative z-10" />
                <span className="relative z-10">Download CV</span>
              </div>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-16 flex flex-col items-center gap-4 pointer-events-none"
      >
        <div className="w-[1px] h-24 bg-white/20 overflow-hidden relative">
          <motion.div
            animate={{ y: [0, 96] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-white absolute top-0"
          />
        </div>
        <span className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Scroll to Explore
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
