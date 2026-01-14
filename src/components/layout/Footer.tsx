import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const footerLinks = {
    forJobSeekers: [
      { name: 'Browse Jobs', href: '#jobs' },
      { name: 'Browse Companies', href: '#companies' },
      { name: 'Career Resources', href: '#' },
      { name: 'Salary Guide', href: '#' },
      { name: 'Resume Builder', href: '#' },
    ],
    forEmployers: [
      { name: 'Post a Job', href: '#' },
      { name: 'Browse Candidates', href: '#' },
      { name: 'Pricing Plans', href: '#' },
      { name: 'Employer Resources', href: '#' },
      { name: 'Success Stories', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Accessibility', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <footer ref={ref} className="bg-foreground text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12 border-b border-white/10"
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl font-bold mb-4"
            >
              Get the Latest Jobs Delivered to Your Inbox
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/70 mb-6"
            >
              Subscribe to our newsletter and never miss a new opportunity
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex-1 bg-white/10 rounded-xl px-4 py-3 border border-white/20 transition-colors hover:border-white/40"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent outline-none text-white placeholder:text-white/50"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="gradient" className="gap-2 shrink-0">
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center shadow-glow"
              >
                <Briefcase className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold group-hover:text-primary transition-colors">JobFlow</span>
            </Link>
            <p className="text-white/70 mb-6 max-w-xs">
              Connecting talented professionals with their dream careers. 
              Your next opportunity is just a click away.
            </p>
            <div className="space-y-3 text-sm text-white/70">
              {[
                { icon: Mail, text: 'support@jobflow.com' },
                { icon: Phone, text: '+1 (555) 123-4567' },
                { icon: MapPin, text: 'San Francisco, CA' },
              ].map((item, index) => (
                <motion.div 
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5, color: 'rgba(255,255,255,1)' }}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <item.icon className="w-4 h-4" />
                  {item.text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* For Job Seekers */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-white mb-4">For Job Seekers</h4>
            <ul className="space-y-3">
              {footerLinks.forJobSeekers.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: 'rgba(255,255,255,1)' }}
                    className="text-white/70 hover:text-white transition-colors text-sm inline-block"
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* For Employers */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-white mb-4">For Employers</h4>
            <ul className="space-y-3">
              {footerLinks.forEmployers.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: 'rgba(255,255,255,1)' }}
                    className="text-white/70 hover:text-white transition-colors text-sm inline-block"
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: 'rgba(255,255,255,1)' }}
                    className="text-white/70 hover:text-white transition-colors text-sm inline-block"
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: 'rgba(255,255,255,1)' }}
                    className="text-white/70 hover:text-white transition-colors text-sm inline-block"
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-white/60">
            © 2024 JobFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;