import { useState } from 'react';
import { Star, Quote, Users, Briefcase, CheckCircle, Building2 } from 'lucide-react';
import { testimonials, stats } from '@/lib/data';
import { motion } from 'framer-motion';
import { FadeInUp, StaggerContainer, fadeInUp, staggerContainer } from '@/components/ui/motion';

const Testimonials = () => {
  const [filter, setFilter] = useState<'all' | 'candidate' | 'employer'>('all');

  const filteredTestimonials = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.type === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" as const
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" 
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <FadeInUp className="text-center max-w-3xl mx-auto mb-12">
          <motion.span 
            variants={fadeInUp}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
          >
            Success Stories
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            What People Say About Us
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-muted-foreground"
          >
            Hear from candidates and employers who found success with JobFlow
          </motion.p>
        </FadeInUp>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-3 mb-10"
        >
          {[
            { key: 'all', label: 'All', icon: Users },
            { key: 'candidate', label: 'Candidates', icon: Briefcase },
            { key: 'employer', label: 'Employers', icon: Building2 },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                filter === tab.key
                  ? 'btn-gradient text-white shadow-glow'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          key={filter}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)',
                borderColor: 'hsl(var(--primary) / 0.3)'
              }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ rotate: -10, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
              </motion.div>

              {/* Quote Text */}
              <p className="text-foreground/80 mb-6 text-sm leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Star className="w-4 h-4 fill-warning text-warning" />
                  </motion.div>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                {testimonial.avatarImage ? (
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    src={testimonial.avatarImage} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                  />
                ) : (
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full btn-gradient flex items-center justify-center text-white font-semibold"
                  >
                    {testimonial.avatar}
                  </motion.div>
                )}
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Type Badge */}
              <div className="mt-4 pt-4 border-t border-border">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                  testimonial.type === 'candidate' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-secondary/10 text-secondary'
                }`}>
                  {testimonial.type === 'candidate' ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      Hired Candidate
                    </>
                  ) : (
                    <>
                      <Building2 className="w-3 h-3" />
                      Employer
                    </>
                  )}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: stats.jobsPosted, label: 'Jobs Posted' },
            { value: stats.candidates, label: 'Active Candidates' },
            { value: stats.companies, label: 'Companies' },
            { value: stats.placements, label: 'Successful Placements' },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              variants={statVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-card rounded-2xl border border-border"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-3xl font-bold gradient-text mb-1"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;