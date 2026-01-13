import { useState } from 'react';
import { Search, MapPin, Briefcase, ChevronDown, Building2, Users, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-bg" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white/90 text-sm font-medium mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Over 12,000 jobs available today
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-up stagger-1 leading-tight">
            Find Your Dream
            <span className="block mt-2 bg-gradient-to-r from-white via-white/90 to-secondary bg-clip-text text-transparent">
              Career Today
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-12 animate-fade-up stagger-2">
            Connect with top companies and discover opportunities that match your skills, 
            experience, and career aspirations.
          </p>

          {/* Search Box */}
          <div className="glass-card p-3 sm:p-4 max-w-4xl mx-auto mb-8 animate-fade-up stagger-3">
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Job Title Input */}
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

              {/* Location Input */}
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

              {/* Category Dropdown */}
              <div className="lg:w-48 flex items-center gap-3 bg-background/80 rounded-xl px-4 py-3 border border-border/50 cursor-pointer">
                <Briefcase className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <span className="flex-1 text-muted-foreground">Category</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Search Button */}
              <Button variant="gradient" size="xl" className="lg:w-auto">
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Search Jobs</span>
              </Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16 animate-fade-up stagger-4">
            <span className="text-white/60 text-sm">Popular:</span>
            {popularSearches.map((search) => (
              <button
                key={search}
                className="px-4 py-2 rounded-full glass text-white/90 text-sm font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                {search}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto animate-fade-up stagger-5">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass-card p-4 sm:p-6 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
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
