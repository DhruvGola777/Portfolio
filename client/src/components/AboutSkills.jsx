import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchProfile as apiFetchProfile } from '../api';
import { SKILLS_MARQUEE_1, SKILLS_MARQUEE_2 } from '../assets/index.js';

const AboutSkills = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiFetchProfile();
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading || !profile) {
    return (
      <section id="about" className="py-32 bg-transparent relative z-10 overflow-hidden">
        <div className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-48 text-center">
          <p className="text-muted text-xl">Loading profile...</p>
        </div>
      </section>
    );
  }

  const marqueeItems1 = [...SKILLS_MARQUEE_1, ...SKILLS_MARQUEE_1, ...SKILLS_MARQUEE_1, ...SKILLS_MARQUEE_1, ...SKILLS_MARQUEE_1];
  const marqueeItems2 = [...SKILLS_MARQUEE_2, ...SKILLS_MARQUEE_2, ...SKILLS_MARQUEE_2, ...SKILLS_MARQUEE_2, ...SKILLS_MARQUEE_2];
  return (
    <section id="about" className="py-32 bg-transparent relative z-10 overflow-hidden">
      
      {/* Massive Two Column Layout */}
      <div className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-48">
        <h2 className="text-sm font-bold tracking-[0.3em] text-muted mb-16 uppercase">
          002 // Narrative & Context
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-24 lg:gap-32">
          {/* Left Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex flex-col justify-between"
          >
            <p className="text-3xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight tracking-tight mb-24">
              {profile.narrative}
            </p>
            
            <div className="flex flex-wrap gap-16 md:gap-24 border-t border-white/10 pt-12">
              {profile.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-5xl md:text-7xl font-black text-foreground">{stat.value}</p>
                  <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mt-4">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Detailed Skills Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 flex flex-col gap-12"
          >
            {profile.skillCategories.map((cat, i) => (
              <div key={i} className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <h3 className="text-xs font-bold tracking-[0.3em] text-accent mb-6 uppercase">{cat.title}</h3>
                <p className="text-xl text-foreground font-medium leading-relaxed mb-4">{cat.skills}</p>
                <p className="text-sm text-muted">{cat.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Infinite Marquee Skills Section */}
      <div className="flex flex-col gap-10">
        <div className="w-full border-y border-white/10 py-12 bg-white/[0.02] hover:bg-white transition-colors duration-500 group cursor-default">
          <div className="marquee-container overflow-hidden">
            <div className="flex animate-marquee w-max">
              {marqueeItems1.map((item, index) => (
                <div key={index} className="flex items-center mx-8">
                  <img src={item.image} alt={item.name} className="w-12 h-12 md:w-16 md:h-16 mr-6 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" loading="lazy" />
                  <span className="text-4xl md:text-6xl font-black tracking-tighter text-white/20 uppercase transition-colors duration-300 group-hover:text-black hover:!text-accent">
                    {item.name}
                  </span>
                  <span className="mx-8 text-accent text-4xl transition-colors duration-300 group-hover:text-black">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full border-y border-white/10 py-12 bg-white/[0.02] hover:bg-white transition-colors duration-500 group cursor-default">
          <div className="marquee-container overflow-hidden">
            <div className="flex animate-marquee-reverse w-max">
              {marqueeItems2.map((item, index) => (
                <div key={index} className="flex items-center mx-8">
                  <img src={item.image} alt={item.name} className="w-12 h-12 md:w-16 md:h-16 mr-6 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" loading="lazy" />
                  <span className="text-4xl md:text-6xl font-black tracking-tighter text-white/20 uppercase transition-colors duration-300 group-hover:text-black hover:!text-accent">
                    {item.name}
                  </span>
                  <span className="mx-8 text-accent text-4xl transition-colors duration-300 group-hover:text-black">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSkills;
