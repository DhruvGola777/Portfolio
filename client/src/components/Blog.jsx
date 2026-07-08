import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

const posts = [
  {
    title: 'Building Scalable Web Apps with React and Vite',
    excerpt: 'Learn the best practices for setting up a modern React application that scales well with your team and user base.',
    date: 'July 15, 2026',
    readTime: '5 min read',
    category: 'Development'
  },
  {
    title: 'The Future of CSS: What to Expect in 2027',
    excerpt: 'An in-depth look at upcoming CSS features, including native mixins, advanced container queries, and more.',
    date: 'June 28, 2026',
    readTime: '4 min read',
    category: 'Design'
  },
  {
    title: 'Optimizing Node.js Microservices for Performance',
    excerpt: 'A case study on how we reduced our API response times by 50% using Redis caching and worker threads.',
    date: 'June 10, 2026',
    readTime: '8 min read',
    category: 'Backend'
  }
];

const Blog = () => {
  return (
    <section id="blog" className="w-full max-w-6xl mx-auto px-6 py-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Articles</span>
          </h2>
          <p className="text-muted text-lg max-w-xl">
            Thoughts, tutorials, and insights on software development and design.
          </p>
        </div>
        <a href="#" className="hidden md:flex items-center text-accent hover:text-white transition-colors duration-300 font-medium group">
          View all posts 
          <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {post.date}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 hover:text-accent transition-colors duration-300 cursor-pointer">
              {post.title}
            </h3>
            <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
              <span className="text-xs text-gray-500">{post.readTime}</span>
              <a href="#" className="text-sm font-medium text-white hover:text-accent flex items-center transition-colors group">
                Read More
                <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
      
      <div className="mt-8 text-center md:hidden">
        <a href="#" className="inline-flex items-center text-accent hover:text-white transition-colors duration-300 font-medium group">
          View all posts 
          <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default Blog;
