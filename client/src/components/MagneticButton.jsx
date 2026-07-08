import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MagneticButton = ({ children, className = '', onClick, href }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Adjust the divisor to control the strength of the magnetic effect
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  const content = (
    <motion.div
      className={className}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link to={href} className="inline-block">
          {content}
        </Link>
      );
    }
    
    // Internal anchor links (e.g., #projects) should smooth scroll
    if (href.startsWith('#')) {
      const handleSmoothScroll = (e) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      };
      
      return (
        <a href={href} className="inline-block" onClick={handleSmoothScroll}>
          {content}
        </a>
      );
    }

    // External links (e.g., https://github.com) should open in a new tab
    return (
      <a href={href} className="inline-block" target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <div className="inline-block">{content}</div>;
};

export default MagneticButton;
