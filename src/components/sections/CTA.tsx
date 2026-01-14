import { ArrowRight, Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CTA = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Job Seekers CTA */}
          <motion.div 
            variants={cardVariants}
            className="relative group"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.2 }}
              whileHover={{ opacity: 0.35, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl blur-xl" 
            />
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 sm:p-10 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              <div className="relative z-10">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6"
                >
                  <Users className="w-7 h-7 text-white" />
                </motion.div>
                
                <motion.h3 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-2xl sm:text-3xl font-bold text-white mb-4"
                >
                  Ready to Find Your Dream Job?
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-white/80 mb-8 text-lg"
                >
                  Join thousands of job seekers who have found their perfect career match. 
                  Create your profile and start applying today.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="hero" size="lg" className="gap-2">
                    Start Job Search
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Employers CTA */}
          <motion.div 
            variants={cardVariants}
            className="relative group"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.1 }}
              whileHover={{ opacity: 0.2, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-foreground to-foreground/80 rounded-3xl blur-xl" 
            />
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl p-8 sm:p-10 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              <div className="relative z-10">
                <motion.div 
                  initial={{ scale: 0, rotate: 180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6"
                >
                  <Building2 className="w-7 h-7 text-white" />
                </motion.div>
                
                <motion.h3 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-2xl sm:text-3xl font-bold text-white mb-4"
                >
                  Looking to Hire Top Talent?
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-white/70 mb-8 text-lg"
                >
                  Post your job listings and connect with qualified candidates. 
                  Our platform makes hiring fast, easy, and effective.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="lg" className="gap-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                    Post a Job
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;