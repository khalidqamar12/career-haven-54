import { ArrowRight, Star, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FadeInUp, fadeInUp } from '@/components/ui/motion';

const Companies = () => {
  const companies = [
    {
      name: 'TechFlow Inc.',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/react.svg',
      industry: 'Technology',
      location: 'San Francisco, CA',
      employees: '1,000-5,000',
      openings: 42,
      rating: 4.8,
      bgColor: 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10',
    },
    {
      name: 'DesignHub',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/figma.svg',
      industry: 'Design Agency',
      location: 'New York, NY',
      employees: '100-500',
      openings: 18,
      rating: 4.9,
      bgColor: 'bg-gradient-to-br from-pink-500/10 to-purple-500/10',
    },
    {
      name: 'CloudScale',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazonaws.svg',
      industry: 'Cloud Computing',
      location: 'Seattle, WA',
      employees: '5,000-10,000',
      openings: 67,
      rating: 4.7,
      bgColor: 'bg-gradient-to-br from-orange-500/10 to-amber-500/10',
    },
    {
      name: 'DataDriven',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/python.svg',
      industry: 'Data Analytics',
      location: 'Austin, TX',
      employees: '500-1,000',
      openings: 29,
      rating: 4.6,
      bgColor: 'bg-gradient-to-br from-blue-500/10 to-yellow-500/10',
    },
    {
      name: 'GrowthLabs',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googleanalytics.svg',
      industry: 'Marketing Tech',
      location: 'Los Angeles, CA',
      employees: '200-500',
      openings: 15,
      rating: 4.5,
      bgColor: 'bg-gradient-to-br from-orange-500/10 to-yellow-500/10',
    },
    {
      name: 'FinanceFlow',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg',
      industry: 'FinTech',
      location: 'Chicago, IL',
      employees: '1,000-5,000',
      openings: 34,
      rating: 4.7,
      bgColor: 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="companies" className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" 
      />
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" 
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <FadeInUp className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span 
              variants={fadeInUp}
              className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4"
            >
              Top Employers
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              Featured Companies
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl"
            >
              Join leading organizations that are actively hiring and building amazing teams
            </motion.p>
          </div>
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" className="gap-2 shrink-0">
              View All Companies
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </FadeInUp>

        {/* Companies Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {companies.map((company) => (
            <motion.div
              key={company.name}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
              }}
              className="group bg-card rounded-2xl border border-border p-6 transition-colors duration-300 hover:border-primary/20"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className={`w-16 h-16 rounded-2xl ${company.bgColor} flex items-center justify-center shadow-lg border border-border p-3`}
                >
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<span class="text-primary font-bold text-xl">${company.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>`;
                    }}
                  />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {company.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{company.industry}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-medium text-foreground">{company.rating}</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3 mb-5">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <MapPin className="w-4 h-4" />
                  {company.location}
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Users className="w-4 h-4" />
                  {company.employees} employees
                </motion.div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-border">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2"
                >
                  <span className="px-3 py-1 bg-success/10 text-success text-sm font-semibold rounded-full">
                    {company.openings} openings
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button variant="ghost" size="sm" className="gap-1 text-primary">
                    View Jobs
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Companies;