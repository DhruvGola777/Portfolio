import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContactForm } from '../api';
import { SOCIAL_LINKS } from '../assets/index.js';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error', ''

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const data = await submitContactForm(formData);
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        toast.success('Message sent successfully!');
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        toast.error('Failed to send message.');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      setStatus('error');
      toast.error('Failed to send message.');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-16 bg-transparent relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">

        {/* Left Side: Status / Form */}
        <div className="flex flex-col gap-12 md:w-1/2">
          <div>
            <h2 className="text-sm font-bold tracking-[0.3em] text-muted mb-4 uppercase">
              003 // Availability
            </h2>
            <p className="text-xl text-foreground font-medium">
              Looking for an internship or full-time opportunity starting immediately.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-[0.3em] text-muted mb-8 uppercase">
              Get in Touch
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={4}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-white text-black font-bold tracking-[0.2em] uppercase py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="text-green-500 text-sm font-medium">Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium">Failed to send. Please try again.</p>
              )}
            </form>
          </div>
        </div>

        {/* Right Side: Massive Social Links */}
        <div className="flex flex-col gap-6 w-full md:w-1/2 md:items-end">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-muted hover:text-white transition-colors duration-300"
            >
              {social.name} <span className="text-accent">/&gt;</span>
            </a>
          ))}
        </div>
      </div>

      {/* Massive Marquee Footer */}
      <div className="w-full mt-32 border-t border-white/10 pt-16 overflow-hidden hover:bg-white transition-colors duration-500 group cursor-crosshair">
        <div className="marquee-container flex">
          <div className="flex whitespace-nowrap w-max animate-marquee">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-[10vw] font-black tracking-tighter text-white/5 uppercase mx-8 select-none transition-colors duration-500 group-hover:text-black hover:!text-accent">
                LET'S WORK TOGETHER —
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pb-16 flex justify-between items-center text-xs font-bold tracking-[0.2em] text-muted uppercase">
        <p>Built with React & Three.js</p>
        <p>&copy; {new Date().getFullYear()} Dhruv Gola</p>
      </div>
    </section>
  );
};

export default Contact;
