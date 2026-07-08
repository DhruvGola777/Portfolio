import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { NAV_LINKS } from '../assets/index.js';
import { fetchProfile as apiFetchProfile } from '../api';

const Navbar = () => {
  const [resumeUrl, setResumeUrl] = useState('#');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiFetchProfile();
        if (data && data.resumeUrl) {
          setResumeUrl(data.resumeUrl);
        }
      } catch (err) {
        console.error('Failed to fetch profile for navbar', err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <nav className="fixed bottom-8 w-full z-50 flex justify-center pointer-events-none px-4">
      <div className="flex items-center space-x-6 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 pointer-events-auto shadow-2xl">
        {NAV_LINKS.map((link) => (
          <MagneticButton key={link.name} href={link.href}>
            <div className="text-xs font-bold tracking-[0.2em] text-white/70 hover:text-white transition-colors uppercase py-2">
              {link.name}
            </div>
          </MagneticButton>
        ))}
        <div className="w-[1px] h-4 bg-white/20 hidden sm:block"></div>
        <MagneticButton href={resumeUrl}>
          <div className="text-xs font-bold tracking-[0.2em] text-accent hover:text-white transition-colors uppercase flex items-center gap-2 py-2">
            <Download size={14} />
            <span className="hidden sm:inline">RESUME</span>
          </div>
        </MagneticButton>
      </div>
    </nav>
  );
};

export default Navbar;
