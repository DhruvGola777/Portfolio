import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { fetchExperience as apiFetchExperience } from '../api';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await apiFetchExperience();
        setExperiences(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="w-full max-w-6xl mx-auto px-6 py-24 relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Journey & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Experience</span>
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          A timeline of my professional career and educational background.
        </p>
      </motion.div>

      <div className="relative border-l border-white/10 ml-4 md:ml-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp._id || index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-12 relative pl-8 md:pl-12"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[17px] top-1 h-8 w-8 rounded-full bg-background border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              {exp.type === 'work' ? (
                <Briefcase size={14} className="text-accent" />
              ) : (
                <GraduationCap size={14} className="text-purple-400" />
              )}
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                <div className="flex items-center text-sm text-accent bg-accent/10 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">
                  <Calendar size={12} className="mr-2" />
                  {exp.date}
                </div>
              </div>
              <h4 className="text-md text-muted mb-4 font-medium">{exp.company}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
