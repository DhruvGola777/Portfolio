import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProjects as apiFetchProjects } from '../api';
import GlowCard from './GlowCard';
import MagneticButton from './MagneticButton';

const ProjectMedia = ({ project }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // Combine mediaUrl and gallery so the main image is included in the slideshow
  const fullGallery = [];
  if (project.mediaUrl && !project.mediaUrl.match(/\.(mp4|webm)$/i)) {
    fullGallery.push(project.mediaUrl);
  }
  if (project.gallery && project.gallery.length > 0) {
    fullGallery.push(...project.gallery);
  }

  const galleryLen = fullGallery.length;
  const currentIndex = galleryLen ? ((page % galleryLen) + galleryLen) % galleryLen : 0;

  useEffect(() => {
    if (galleryLen > 1) {
      const interval = setInterval(() => {
        setPage([page + 1, 1]);
      }, 2000); // 2 second interval as requested
      return () => clearInterval(interval);
    }
  }, [galleryLen, page]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%' }),
    center: { x: 0, zIndex: 1 },
    exit: (direction) => ({ x: direction < 0 ? '100%' : '-100%', zIndex: 0 })
  };

  if (galleryLen > 0) {
    return (
      <div className="w-full h-full relative group/gallery overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={fullGallery[currentIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover object-top absolute inset-0"
            alt={`${project.title} gallery ${currentIndex + 1}`}
            loading="lazy"
          />
        </AnimatePresence>

        {galleryLen > 1 && (
          <>
            <button 
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-black text-2xl font-black rounded-full flex items-center justify-center opacity-60 group-hover/gallery:opacity-100 hover:scale-110 transition-all duration-300 z-10 shadow-xl"
            >
              &#8592;
            </button>
            <button 
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-black text-2xl font-black rounded-full flex items-center justify-center opacity-60 group-hover/gallery:opacity-100 hover:scale-110 transition-all duration-300 z-10 shadow-xl"
            >
              &#8594;
            </button>
          </>
        )}
      </div>
    );
  }

  if (project.mediaUrl) {
    if (project.mediaUrl.match(/\.(mp4|webm)$/i)) {
      return (
        <video 
          src={project.mediaUrl} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      );
    } else {
      return (
        <img 
          src={project.mediaUrl} 
          alt={project.title} 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
          loading="lazy"
        />
      );
    }
  }

  return (
    <>
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIi8+PC9zdmc+')] mix-blend-overlay"></div>
      <div className="w-full h-full flex items-center justify-center relative">
        <p className="text-muted text-sm font-bold tracking-[0.4em] uppercase">Project Media</p>
      </div>
    </>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiFetchProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-32 px-6 md:px-16 bg-transparent relative z-10">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-sm font-bold tracking-[0.3em] text-muted mb-24 uppercase">
          001 // Selected Works
        </h2>

        {loading ? (
          <p className="text-muted text-xl">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-muted text-xl">No projects available.</p>
        ) : (
          <div className="flex flex-col gap-48">
            {projects.map((project, index) => {
              const displayId = String(index + 1).padStart(2, '0');
              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="group flex flex-col gap-12"
                >
                  {/* Media container wrapped with GlowCard */}
                  <GlowCard className="w-full aspect-[16/9] md:aspect-[21/9] rounded-sm bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 flex items-center justify-center overflow-hidden">
                    <ProjectMedia project={project} />
                  </GlowCard>

                  {/* Project Details */}
                  <div className="flex flex-col lg:flex-row justify-between gap-12 pt-8 border-t border-white/10">
                    <div className="lg:w-1/2">
                      <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 transition-colors duration-300 group-hover:text-accent">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-4 py-2 border border-white/10 bg-white/[0.02] text-xs font-bold tracking-[0.2em] text-muted uppercase">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:w-1/3 flex flex-col justify-between gap-8">
                      <p className="text-muted text-xl leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4">
                        <MagneticButton href={`/project/${project._id}`}>
                          <div className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-sm font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors w-fit cursor-pointer">
                            View Case Study
                          </div>
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
