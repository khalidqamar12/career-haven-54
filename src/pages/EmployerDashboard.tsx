import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  FileText,
  Users,
  Plus,
  Eye,
  Edit,
  Trash2,
  Building2,
  TrendingUp,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  DollarSign,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/layout/PageLayout';
import { jobs } from '@/lib/data';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';

const EmployerDashboard = () => {
  const { applications } = useApp();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'applications' | 'settings'>('overview');

  // Simulate employer's posted jobs (first 4 jobs)
  const postedJobs = jobs.slice(0, 4);

  // Get applications for employer's jobs
  const employerApplications = applications.filter(app => 
    postedJobs.some(job => job.id === app.jobId)
  );

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'E';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Employer Dashboard</h1>
            <p className="text-muted-foreground">Manage your job postings and applications</p>
          </div>
          <Button variant="gradient" asChild>
            <Link to="/employer/post-job">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{postedJobs.length}</div>
                <div className="text-sm text-muted-foreground">Active Jobs</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{employerApplications.length}</div>
                <div className="text-sm text-muted-foreground">Applications</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {employerApplications.filter(a => a.status === 'shortlisted').length}
                </div>
                <div className="text-sm text-muted-foreground">Shortlisted</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">89%</div>
                <div className="text-sm text-muted-foreground">Response Rate</div>
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
                  {getInitials(profile?.company_name || profile?.full_name)}
                </div>
                <h3 className="font-semibold text-foreground">{profile?.company_name || profile?.full_name || 'Employer'}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'jobs'
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  Posted Jobs
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'applications'
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Applications
                  {employerApplications.filter(a => a.status === 'pending').length > 0 && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      {employerApplications.filter(a => a.status === 'pending').length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">Dashboard Overview</h2>
                
                {/* Recent Applications */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Recent Applications</h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('applications')}>
                      View All
                    </Button>
                  </div>
                  {employerApplications.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No applications yet</p>
                  ) : (
                    <div className="space-y-3">
                      {employerApplications.slice(0, 3).map(app => (
                        <div key={app.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                              {app.fullName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{app.fullName}</p>
                              <p className="text-sm text-muted-foreground">{app.jobTitle}</p>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(app.status)} border`}>
                            {app.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Posted Jobs Summary */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Your Job Postings</h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('jobs')}>
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {postedJobs.slice(0, 3).map(job => (
                      <div key={job.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center text-white font-bold text-sm">
                            {job.logo}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{job.title}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{job.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">Posted Jobs</h2>
                  <Button variant="gradient" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                  </Button>
                </div>
                {postedJobs.map(job => (
                  <div key={job.id} className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-14 h-14 rounded-xl btn-gradient flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {job.logo}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{job.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {job.salary}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {job.posted}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{job.type}</Badge>
                            {job.featured && (
                              <Badge className="bg-primary/10 text-primary border-primary/20 border">Featured</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.skills.map(skill => (
                            <span key={skill} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                          <span className="text-sm text-muted-foreground">
                            {employerApplications.filter(a => a.jobId === job.id).length} applications
                          </span>
                          <div className="flex-1" />
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Applications</h2>
                {employerApplications.length === 0 ? (
                  <div className="bg-card rounded-2xl border border-border p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                      <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No applications yet</h3>
                    <p className="text-muted-foreground">Applications for your jobs will appear here</p>
                  </div>
                ) : (
                  employerApplications.map(app => (
                    <div key={app.id} className="bg-card rounded-2xl border border-border p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
                          {app.fullName.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-foreground">{app.fullName}</h3>
                              <p className="text-sm text-muted-foreground">{app.email}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Applied for: <span className="text-foreground">{app.jobTitle}</span>
                              </p>
                            </div>
                            <Badge className={`${getStatusColor(app.status)} border`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {app.skills.map(skill => (
                              <span key={skill} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                            <span className="text-xs text-muted-foreground">
                              Applied {new Date(app.submittedAt).toLocaleDateString()}
                            </span>
                            <div className="flex-1" />
                            <Button variant="ghost" size="sm">View Profile</Button>
                            <Button variant="outline" size="sm" className="text-success border-success/20 hover:bg-success/10">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Shortlist
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Company Settings</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <p className="text-sm text-muted-foreground">Company Name</p>
                      <p className="font-medium text-foreground">{profile?.company_name || 'Not set'}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{user?.email || 'Not set'}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <p className="text-sm text-muted-foreground">Website</p>
                      <p className="font-medium text-foreground">{profile?.company_website || 'Not set'}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <p className="text-sm text-muted-foreground">Account Type</p>
                      <p className="font-medium text-foreground capitalize">{profile?.user_type || 'Employer'}</p>
                    </div>
                  </div>
                  <div className="pt-4 text-center">
                    <p className="text-sm text-muted-foreground">Company settings editing coming soon...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EmployerDashboard;
