import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import { fetchProjectById } from '../api';

const CaseStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when loading
    window.scrollTo(0, 0);
    
    const fetchProject = async () => {
      try {
        const data = await fetchProjectById(id);
        if (data) {
          setProject(data);
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error('Failed to fetch project', err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted text-xl font-bold tracking-widest uppercase">Loading Case Study...</p>
      </div>
    );
  }

  if (!project) return null;

  const heroImageUrl = project.mediaUrl || (project.gallery && project.gallery.length > 0 ? project.gallery[0] : '');

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white pb-32">
      {/* Decorative noise/texture effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIi8+PC9zdmc+')] mix-blend-overlay z-50"></div>
      
      {/* Navbar Minimal */}
      <nav className="w-full p-6 md:px-16 flex justify-between items-center border-b border-white/10 sticky top-0 bg-background/80 backdrop-blur-md z-40">
        <button onClick={() => navigate('/')} className="text-sm font-bold tracking-[0.2em] uppercase hover:text-accent transition-colors">
          &larr; Back to Portfolio
        </button>
      </nav>

      {/* Hero Section */}
      <header className="px-6 md:px-16 max-w-screen-xl mx-auto pt-24 md:pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xs font-bold tracking-[0.4em] text-accent mb-6 uppercase">Case Study</h2>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12">
            {project.title}
          </h1>
          
          <div className="flex flex-col md:flex-row gap-12 md:gap-32 border-t border-white/10 pt-12">
            <div className="md:w-1/2">
              <h3 className="text-xs font-bold tracking-[0.3em] text-muted mb-4 uppercase">The Project</h3>
              <p className="text-xl leading-relaxed text-gray-300">
                {project.description}
              </p>
            </div>
            
            <div className="md:w-1/2 flex flex-col gap-8">
              <div>
                <h3 className="text-xs font-bold tracking-[0.3em] text-muted mb-4 uppercase">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-white/[0.03] border border-white/10 text-xs font-bold tracking-[0.1em] text-gray-300 uppercase rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              
              {(project.liveLink || project.githubLink) && (
                <div>
                  <h3 className="text-xs font-bold tracking-[0.3em] text-muted mb-4 uppercase">Links</h3>
                  <div className="flex flex-wrap gap-4">
                    {project.liveLink && (
                      <MagneticButton href={project.liveLink}>
                        <div className="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors w-fit cursor-pointer">
                          Live Site
                        </div>
                      </MagneticButton>
                    )}
                    {project.githubLink && (
                      <MagneticButton href={project.githubLink}>
                        <div className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-colors w-fit cursor-pointer">
                          GitHub
                        </div>
                      </MagneticButton>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </header>

      {/* Hero Image (Placeholder for now) */}
      <div className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full aspect-[21/9] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden"
        >
          {project.mediaUrl ? (
            project.mediaUrl.match(/\.(mp4|webm)$/i) ? (
              <video 
                src={project.mediaUrl} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <img 
                src={project.mediaUrl} 
                alt={project.title} 
                className="w-full h-full object-cover object-top" 
              />
            )
          ) : (
            <>
              <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIi8+PC9zdmc+')] mix-blend-overlay"></div>
              <h2 className="text-6xl md:text-9xl font-black text-white/[0.02] uppercase tracking-tighter text-center">
                {project.title}
              </h2>
            </>
          )}
        </motion.div>
      </div>

      {/* The Case Study Body */}
      <section className="px-6 md:px-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold tracking-tight mb-12 pb-4 border-b border-white/10">In-Depth Overview</h2>
          
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 whitespace-pre-wrap leading-loose">
            {project.caseStudy ? (
              project.caseStudy
            ) : (
              <p className="italic text-gray-500">No detailed case study has been written for this project yet.</p>
            )}
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default CaseStudy;
