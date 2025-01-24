import { motion } from 'framer-motion';
import React from 'react';

// Hàm tạo hiệu ứng chuyển động
const generateVariants = (direction) => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const value = direction === 'right' || direction === 'down' ? 100 : -100;
  return {
    hidden: { filter: 'blur(10px)', opacity: 0, [axis]: value },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
};

// Viewport mặc định
const defaultViewport = { amount: 0.3, margin: '0px 0px -200px 0px' };

// Component ScrollElement
function ScrollElement({
  children,
  className = '', // Truyền trực tiếp className
  variants,
  viewport = defaultViewport,
  delay = 0,
  direction = 'down',
  ...rest
}) {
  const baseVariants = variants || generateVariants(direction);
  const modifiedVariants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...baseVariants.visible.transition,
        delay,
      },
    },
  };

  return (
    <motion.div
      whileInView="visible"
      initial="hidden"
      variants={modifiedVariants}
      viewport={viewport}
      className={className} // Truyền trực tiếp className
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default ScrollElement;
