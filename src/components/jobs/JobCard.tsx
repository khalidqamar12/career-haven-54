import { Heart, MapPin, Clock, DollarSign, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/lib/data';
import { useApp } from '@/contexts/AppContext';

interface JobCardProps {
  job: Job;
  index?: number;
}

const JobCard = ({ job, index = 0 }: JobCardProps) => {
  const { savedJobs, toggleSavedJob } = useApp();
  const isSaved = savedJobs.includes(job.id);

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
      case 'Hybrid':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div
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
        onClick={(e) => {
          e.preventDefault();
          toggleSavedJob(job.id);
        }}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isSaved ? 'fill-destructive text-destructive' : 'text-muted-foreground'
          }`}
        />
      </button>

      {/* Company Logo & Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl btn-gradient flex items-center justify-center text-white font-bold text-lg shadow-md">
          {job.logo}
        </div>
        <div className="flex-1 min-w-0">
          <Link to={`/jobs/${job.id}`}>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {job.title}
            </h3>
          </Link>
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
          <Badge className={`${getTypeColor(job.type)} border`}>{job.type}</Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {job.posted}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary" asChild>
          <Link to={`/apply/${job.id}`}>
            Apply
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
