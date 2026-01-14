import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

// Animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

// Motion wrapper components
interface MotionDivProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

export const FadeInUp = ({ children, ...props }: MotionDivProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={fadeInUp}
    {...props}
  >
    {children}
  </motion.div>
);

export const FadeIn = ({ children, ...props }: MotionDivProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={fadeIn}
    {...props}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, ...props }: MotionDivProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={scaleIn}
    {...props}
  >
    {children}
  </motion.div>
);

export const SlideInLeft = ({ children, ...props }: MotionDivProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={slideInLeft}
    {...props}
  >
    {children}
  </motion.div>
);

export const SlideInRight = ({ children, ...props }: MotionDivProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={slideInRight}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, ...props }: MotionDivProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={staggerContainer}
    {...props}
  >
    {children}
  </motion.div>
);

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 400, damping: 17 }
};

export const hoverLift = {
  whileHover: { y: -8, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)' },
  transition: { type: 'spring', stiffness: 400, damping: 17 }
};

export const hoverGlow = {
  whileHover: { 
    boxShadow: '0 0 30px hsla(250, 87%, 60%, 0.3)',
  },
  transition: { duration: 0.3 }
};

// Button animation component
export const MotionButton = motion.button;

// Card animation component
interface MotionCardProps extends MotionDivProps {
  delay?: number;
}

export const MotionCard = ({ children, delay = 0, ...props }: MotionCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ 
      duration: 0.5, 
      delay, 
      ease: [0.22, 1, 0.36, 1] 
    }}
    whileHover={{ 
      y: -8, 
      transition: { duration: 0.3, ease: 'easeOut' } 
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// Section header animation
export const SectionHeader = ({ children, ...props }: MotionDivProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
      }
    }}
    {...props}
  >
    {children}
  </motion.div>
);

export { motion };
