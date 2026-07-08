import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Product Manager @ TechFlow',
    content: 'Working with them was an absolute pleasure. They brought our vision to life with incredible attention to detail and delivered ahead of schedule. The codebase is incredibly clean and maintainable.',
    image: 'https://i.pravatar.cc/150?img=47'
  },
  {
    name: 'Michael Chen',
    role: 'CTO @ StartupX',
    content: 'An exceptional developer who not only writes great code but understands the business requirements perfectly. Their architecture decisions saved us months of development time in the long run.',
    image: 'https://i.pravatar.cc/150?img=11'
  },
  {
    name: 'Emma Watson',
    role: 'Lead Designer @ CreativeStudio',
    content: 'As a designer, I am very picky about UI implementations. They nailed every single micro-interaction and animation flawlessly. The final product looks exactly like the Figma files, but even better because it is alive.',
    image: 'https://i.pravatar.cc/150?img=5'
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="w-full max-w-6xl mx-auto px-6 py-24 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Feedback</span>
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Here is what some of the amazing people I've worked with have to say.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-3xl relative group hover:bg-white/10 transition-colors duration-300"
          >
            <Quote className="absolute top-6 right-6 text-white/10 w-12 h-12 rotate-180 transform group-hover:text-accent/20 transition-colors duration-300" />
            <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed">
              "{testimonial.content}"
            </p>
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full border-2 border-accent/50 object-cover"
              />
              <div>
                <h4 className="text-white font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-accent">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
