import { useState } from 'react';
import { Heart, MapPin, Clock, DollarSign, Bookmark, ArrowRight, Filter, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract' | 'Internship';
  salary: string;
  posted: string;
  featured?: boolean;
  skills: string[];
}

const FeaturedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Remote', 'Full-time', 'Part-time', 'Contract'];

  const jobs: Job[] = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechFlow Inc.',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/react.svg',
      location: 'San Francisco, CA',
      type: 'Remote',
      salary: '$120k - $180k',
      posted: '2 days ago',
      featured: true,
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'DesignHub',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/figma.svg',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$90k - $130k',
      posted: '1 day ago',
      featured: true,
      skills: ['Figma', 'UI/UX', 'Prototyping'],
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'DataDriven',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/python.svg',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$130k - $170k',
      posted: '3 days ago',
      skills: ['Python', 'Machine Learning', 'SQL'],
    },
    {
      id: 4,
      title: 'Marketing Manager',
      company: 'GrowthLabs',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googleanalytics.svg',
      location: 'Remote',
      type: 'Remote',
      salary: '$80k - $110k',
      posted: '5 days ago',
      skills: ['SEO', 'Content Strategy', 'Analytics'],
    },
    {
      id: 5,
      title: 'Backend Engineer',
      company: 'CloudScale',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazonaws.svg',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$140k - $200k',
      posted: '1 week ago',
      featured: true,
      skills: ['Node.js', 'AWS', 'PostgreSQL'],
    },
    {
      id: 6,
      title: 'UX Researcher',
      company: 'UserFirst',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/sketch.svg',
      location: 'Chicago, IL',
      type: 'Contract',
      salary: '$70k - $95k',
      posted: '4 days ago',
      skills: ['User Testing', 'Surveys', 'Analytics'],
    },
  ];

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Remote':
        return 'bg-success/10 text-success border-success/20';
      case 'Full-time':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Part-time':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Contract':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'Internship':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredJobs = activeFilter === 'All' 
    ? jobs 
    : jobs.filter(job => job.type === activeFilter);

  return (
    <section id="jobs" className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Featured Opportunities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Latest Job Openings
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover your next career move with hand-picked opportunities from top companies
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'btn-gradient text-white shadow-glow'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job, index) => (
            <div
              key={job.id}
              className={`group relative bg-card rounded-2xl border border-border p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/20 ${
                job.featured ? 'ring-2 ring-primary/20' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Featured Badge */}
              {job.featured && (
                <div className="absolute -top-3 left-6">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-glow">
                    Featured
                  </span>
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={() => toggleSaveJob(job.id)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    savedJobs.includes(job.id)
                      ? 'fill-destructive text-destructive'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>

              {/* Company Logo & Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center shadow-md border border-border overflow-hidden p-2.5">
                  <img 
                    src={job.logo} 
                    alt={`${job.company} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<span class="text-primary font-bold text-lg">${job.company.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>`;
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                    <Building2 className="w-4 h-4" />
                    {job.company}
                  </p>
                </div>
              </div>

              {/* Location & Salary */}
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Badge className={`${getTypeColor(job.type)} border`}>
                    {job.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {job.posted}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary">
                  Apply
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="gradient" size="lg" className="gap-2">
            View All Jobs
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
