import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2, 
  Heart, 
  Share2, 
  Flag,
  CheckCircle,
  ArrowLeft,
  Briefcase,
  Globe,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/layout/PageLayout';
import JobCard from '@/components/jobs/JobCard';
import { jobs } from '@/lib/data';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

const JobDetails = () => {
  const { id } = useParams();
  const { savedJobs, toggleSavedJob } = useApp();
  
  const job = jobs.find(j => j.id === Number(id));
  const isSaved = job ? savedJobs.includes(job.id) : false;

  if (!job) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/jobs">Browse All Jobs</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  const similarJobs = jobs
    .filter(j => j.id !== job.id && (j.type === job.type || j.skills.some(s => job.skills.includes(s))))
    .slice(0, 3);

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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/jobs" className="hover:text-primary transition-colors">Jobs</Link>
            <span>/</span>
            <span className="text-foreground">{job.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Back Button */}
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-20 h-20 rounded-2xl btn-gradient flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0">
                  {job.logo}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                        {job.title}
                      </h1>
                      <p className="text-lg text-muted-foreground flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        {job.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSavedJob(job.id)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isSaved ? 'fill-destructive text-destructive' : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                      <button
                        onClick={handleShare}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Share2 className="w-5 h-5 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Flag className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <Badge className={`${getTypeColor(job.type)} border`}>{job.type}</Badge>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {job.posted}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Job Description</h2>
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {job.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About Company */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">About {job.company}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{job.about}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">www.{job.company.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">50-200 employees</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">Technology</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Apply Card */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold gradient-text mb-1">{job.salary}</div>
                  <p className="text-sm text-muted-foreground">per year</p>
                </div>
                <Button variant="gradient" size="lg" className="w-full mb-3" asChild>
                  <Link to={`/apply/${job.id}`}>Apply Now</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => toggleSavedJob(job.id)}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${
                      isSaved ? 'fill-destructive text-destructive' : ''
                    }`}
                  />
                  {isSaved ? 'Saved' : 'Save Job'}
                </Button>
              </div>

              {/* Job Summary */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Job Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Job Type</span>
                    <span className="text-foreground text-sm font-medium">{job.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Location</span>
                    <span className="text-foreground text-sm font-medium">{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Posted</span>
                    <span className="text-foreground text-sm font-medium">{job.posted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Experience</span>
                    <span className="text-foreground text-sm font-medium">3+ years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Similar Jobs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
};

export default JobDetails;
