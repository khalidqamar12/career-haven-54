import { useState } from 'react';
import { Search, MapPin, Briefcase, ChevronDown, Building2, Users, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const stats = [
    { icon: Briefcase, value: '12,000+', label: 'Active Jobs' },
    { icon: Building2, value: '5,000+', label: 'Companies' },
    { icon: Users, value: '100,000+', label: 'Job Seekers' },
    { icon: FileCheck, value: '50,000+', label: 'Successful Hires' },
  ];

  const popularSearches = ['Remote', 'Software Engineer', 'Marketing', 'Design', 'Data Science'];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-bg" />
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white/90 text-sm font-medium mb-8"
          >
            <motion.span 
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Over 12,000 jobs available today
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white mb-6 leading-tight"
          >
            Find Your Dream
            <span className="block mt-2 bg-gradient-to-r from-white via-white/90 to-secondary bg-clip-text text-transparent">
              Career Today
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-12"
          >
            Connect with top companies and discover opportunities that match your skills, 
            experience, and career aspirations.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-3 sm:p-4 max-w-4xl mx-auto mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 bg-background/80 rounded-xl px-4 py-3 border border-border/50">
                <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 bg-background/80 rounded-xl px-4 py-3 border border-border/50">
                <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="lg:w-48 flex items-center gap-3 bg-background/80 rounded-xl px-4 py-3 border border-border/50 cursor-pointer hover:border-primary/30 transition-colors">
                <Briefcase className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <span className="flex-1 text-muted-foreground">Category</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button variant="gradient" size="xl" className="lg:w-auto w-full">
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Search Jobs</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            <span className="text-white/60 text-sm">Popular:</span>
            {popularSearches.map((search, index) => (
              <motion.button
                key={search}
                className="px-4 py-2 rounded-full glass text-white/90 text-sm font-medium transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                {search}
              </motion.button>
            ))}
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-card p-4 sm:p-6 text-center group cursor-default"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <stat.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
