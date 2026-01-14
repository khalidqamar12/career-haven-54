import { 
  Code, 
  Palette, 
  TrendingUp, 
  Heart, 
  GraduationCap, 
  Building, 
  Megaphone, 
  Wrench,
  BarChart3,
  Camera,
  Headphones,
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/components/ui/motion';

const Categories = () => {
  const categories = [
    { icon: Code, name: 'Technology', jobs: 3420, color: 'from-primary to-secondary' },
    { icon: Palette, name: 'Design', jobs: 1850, color: 'from-pink-500 to-rose-500' },
    { icon: TrendingUp, name: 'Finance', jobs: 2100, color: 'from-emerald-500 to-teal-500' },
    { icon: Heart, name: 'Healthcare', jobs: 1680, color: 'from-red-500 to-pink-500' },
    { icon: GraduationCap, name: 'Education', jobs: 980, color: 'from-amber-500 to-orange-500' },
    { icon: Building, name: 'Real Estate', jobs: 560, color: 'from-slate-500 to-zinc-500' },
    { icon: Megaphone, name: 'Marketing', jobs: 1420, color: 'from-violet-500 to-purple-500' },
    { icon: Wrench, name: 'Engineering', jobs: 2340, color: 'from-blue-500 to-cyan-500' },
    { icon: BarChart3, name: 'Sales', jobs: 1890, color: 'from-green-500 to-emerald-500' },
    { icon: Camera, name: 'Media', jobs: 720, color: 'from-orange-500 to-red-500' },
    { icon: Headphones, name: 'Customer Service', jobs: 1150, color: 'from-indigo-500 to-blue-500' },
    { icon: Briefcase, name: 'Management', jobs: 890, color: 'from-cyan-500 to-teal-500' },
  ];

  return (
    <section id="categories" className="py-20 sm:py-28 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4"
          >
            Explore Categories
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-foreground mb-4"
          >
            Browse by Industry
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-muted-foreground"
          >
            Find opportunities in the industry that matches your expertise and passion
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.05, 
                duration: 0.4, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              whileHover={{ y: -8 }}
            >
              <motion.div 
                className="bg-card rounded-2xl border border-border p-6 text-center transition-all duration-300 h-full"
                whileHover={{ 
                  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)',
                  borderColor: 'hsl(var(--primary) / 0.3)'
                }}
              >
                {/* Icon Container */}
                <motion.div 
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <category.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                {/* Category Name */}
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                {/* Job Count */}
                <p className="text-sm text-muted-foreground">
                  {category.jobs.toLocaleString()} jobs
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
