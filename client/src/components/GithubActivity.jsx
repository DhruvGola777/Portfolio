import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';

const GithubActivity = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_URL}/profile`);
        if (res.ok) {
          const data = await res.json();
          setUsername(data.githubUsername);
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };
    fetchProfile();
  }, []);

  // If no username is provided, show a fallback message
  if (!username) {
    return (
      <section id="github-activity" className="w-full max-w-5xl mx-auto px-6 py-24 relative text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Open Source <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Activity</span>
        </h2>
        <p className="text-muted text-lg">No GitHub username configured in the Admin Panel.</p>
      </section>
    );
  }

  // Customize the colors of the heatmap to match our dark theme with blue/purple accents
  const explicitTheme = {
    light: ['#1e1e1e', '#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa'],
    dark: ['#1e1e1e', '#1e3a5f', '#1e40af', '#2563eb', '#3b82f6'],
  };

  return (
    <section id="github-activity" className="w-full max-w-5xl mx-auto px-6 py-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Open Source <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Activity</span>
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          A snapshot of my daily coding habits and contributions to the open-source community.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-10 flex justify-center items-center overflow-x-auto"
      >
        <div className="min-w-fit">
          <GitHubCalendar 
            username={username} 
            colorScheme="dark"
            theme={explicitTheme}
            blockSize={14}
            blockMargin={4}
            fontSize={14}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default GithubActivity;
