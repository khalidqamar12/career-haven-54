import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  FileText,
  Heart,
  Settings,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Building2,
  MapPin,
  TrendingUp,
  Bell,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/layout/PageLayout';
import { jobs } from '@/lib/data';
import { useApp } from '@/contexts/AppContext';

const CandidateDashboard = () => {
  const { applications, savedJobs, user } = useApp();
  const [activeTab, setActiveTab] = useState<'applications' | 'saved' | 'profile'>('applications');

  const savedJobsList = jobs.filter(job => savedJobs.includes(job.id));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'reviewed':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'shortlisted':
        return 'bg-success/10 text-success border-success/20';
      case 'rejected':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'hired':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'reviewed':
        return <Eye className="w-4 h-4" />;
      case 'shortlisted':
        return <TrendingUp className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'hired':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Track your applications and manage your job search</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{applications.length}</div>
                <div className="text-sm text-muted-foreground">Applications</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {applications.filter(a => a.status === 'shortlisted').length}
                </div>
                <div className="text-sm text-muted-foreground">Shortlisted</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {applications.filter(a => a.status === 'reviewed').length}
                </div>
                <div className="text-sm text-muted-foreground">Reviewed</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{savedJobs.length}</div>
                <div className="text-sm text-muted-foreground">Saved Jobs</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-28">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto rounded-full btn-gradient flex items-center justify-center text-white font-bold text-2xl mb-3">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <h3 className="font-semibold text-foreground">{user?.name || 'User'}</h3>
                <p className="text-sm text-muted-foreground">{user?.email || 'user@example.com'}</p>
              </div>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'applications'
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  My Applications
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'saved'
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  Saved Jobs
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'applications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">My Applications</h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/jobs">
                      <Search className="w-4 h-4 mr-2" />
                      Find Jobs
                    </Link>
                  </Button>
                </div>
                {applications.length === 0 ? (
                  <div className="bg-card rounded-2xl border border-border p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                      <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No applications yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start applying to jobs and track your progress here
                    </p>
                    <Button asChild>
                      <Link to="/jobs">Browse Jobs</Link>
                    </Button>
                  </div>
                ) : (
                  applications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-card rounded-2xl border border-border p-6 hover:shadow-card transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center text-white font-bold">
                            {app.company.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{app.jobTitle}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {app.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={`${getStatusColor(app.status)} border flex items-center gap-1`}>
                            {getStatusIcon(app.status)}
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(app.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Saved Jobs</h2>
                {savedJobsList.length === 0 ? (
                  <div className="bg-card rounded-2xl border border-border p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                      <Heart className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No saved jobs</h3>
                    <p className="text-muted-foreground mb-6">
                      Save jobs to apply later
                    </p>
                    <Button asChild>
                      <Link to="/jobs">Browse Jobs</Link>
                    </Button>
                  </div>
                ) : (
                  savedJobsList.map((job) => (
                    <div
                      key={job.id}
                      className="bg-card rounded-2xl border border-border p-6 hover:shadow-card transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center text-white font-bold">
                            {job.logo}
                          </div>
                          <div>
                            <Link to={`/jobs/${job.id}`} className="font-semibold text-foreground hover:text-primary">
                              {job.title}
                            </Link>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {job.company}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {job.location}
                              </span>
                              <span>{job.salary}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" asChild>
                          <Link to={`/apply/${job.id}`}>Apply Now</Link>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Profile Settings</h2>
                <div className="text-center py-12">
                  <Settings className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Profile settings coming soon...</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Please <Link to="/login" className="text-primary hover:underline">sign in</Link> to manage your profile
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CandidateDashboard;
