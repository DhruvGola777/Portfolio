import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Smartphone, Layout, Database, Terminal } from 'lucide-react';

const services = [
  {
    icon: <Layout className="w-8 h-8" />,
    title: 'Frontend Development',
    description: 'Creating stunning, responsive, and accessible user interfaces using React, Vue, and modern CSS frameworks like Tailwind.'
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: 'Backend Architecture',
    description: 'Building robust, scalable RESTful APIs and microservices using Node.js, Express, and Python.'
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Database Design',
    description: 'Designing efficient schemas and optimizing queries for both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases.'
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: 'Mobile App Development',
    description: 'Developing cross-platform mobile applications using React Native with near-native performance.'
  },
  {
    icon: <Terminal className="w-8 h-8" />,
    title: 'DevOps & CI/CD',
    description: 'Automating deployment pipelines and managing cloud infrastructure on AWS and Vercel.'
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    title: 'Clean Code Audits',
    description: 'Reviewing codebases to ensure best practices, improve performance, and reduce technical debt.'
  }
];

const GlowCard = ({ children, className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.1)] ${className}`}
    >
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section id="services" className="w-full max-w-6xl mx-auto px-6 py-24 relative">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Do</span>
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          I provide a range of services to help businesses build secure, scalable, and beautiful digital products.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlowCard>
              <div className="text-accent mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
