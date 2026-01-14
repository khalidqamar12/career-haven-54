import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  DollarSign,
  Upload,
  X,
  CheckCircle,
  Briefcase,
  Loader2,
  User,
  FileText,
  Sparkles,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/layout/PageLayout';
import { useJob } from '@/hooks/useJobs';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

const ApplyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addApplication } = useApp();
  
  const { data: job, isLoading: jobLoading } = useJob(id || '');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [skillInput, setSkillInput] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
    linkedin: '',
    coverLetter: '',
    experience: '',
    skills: [] as string[],
    availability: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (jobLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground mt-4">Loading job details...</p>
        </div>
      </PageLayout>
    );
  }

  if (!job) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Briefcase className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Job Not Found</h1>
            <p className="text-muted-foreground mb-8">The job you're trying to apply for doesn't exist or has been removed.</p>
            <Button asChild className="btn-gradient">
              <Link to="/jobs">Browse All Jobs</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast.error('Only PDF and DOC files are allowed');
        return;
      }
      setResumeFile(file);
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: '' }));
      }
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!resumeFile) newErrors.resume = 'Resume is required';
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
    if (!formData.experience) newErrors.experience = 'Experience level is required';
    if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (!formData.availability) newErrors.availability = 'Availability is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      resume: resumeFile?.name || '',
      portfolio: formData.portfolio,
      linkedin: formData.linkedin,
      coverLetter: formData.coverLetter,
      experience: formData.experience,
      skills: formData.skills,
      availability: formData.availability,
      submittedAt: new Date(),
      status: 'pending' as const
    };

    addApplication(application);
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success('Application submitted successfully!');
  };

  if (submitted) {
    return (
      <PageLayout>
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="max-w-lg mx-auto text-center animate-fade-up">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center shadow-lg">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Application Submitted!</h1>
            <p className="text-lg text-muted-foreground mb-2">
              Thank you for applying to <span className="text-foreground font-semibold">{job.title}</span>
            </p>
            <p className="text-muted-foreground mb-3">
              at <span className="text-foreground font-semibold">{job.company}</span>
            </p>
            <div className="bg-muted/50 rounded-xl p-4 mb-8">
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to <span className="text-foreground font-medium">{formData.email}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-gradient">
                <Link to="/candidate/dashboard">View My Applications</Link>
              </Button>
              <Button variant="outline" asChild className="border-2">
                <Link to="/jobs">Browse More Jobs</Link>
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  const formSections = [
    { number: 1, icon: User, title: 'Personal Information' },
    { number: 2, icon: FileText, title: 'Resume & Portfolio' },
    { number: 3, icon: Sparkles, title: 'Experience & Skills' },
    { number: 4, icon: Send, title: 'Cover Letter' },
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {/* Back Button */}
          <Link
            to={`/jobs/${job.id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Job Details</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2 animate-fade-up">
              <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 px-6 sm:px-8 py-6 border-b border-border">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Apply for this position</h1>
                  <p className="text-muted-foreground">Complete the form below to submit your application. Fields marked with * are required.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-10">
                  {/* Personal Information */}
                  <section>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                        <User className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-primary uppercase tracking-wider">Step 1 of 4</p>
                        <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className={`h-12 rounded-xl bg-muted/50 border-2 transition-all focus:bg-background ${errors.fullName ? 'border-destructive focus:border-destructive' : 'border-transparent focus:border-primary'}`}
                        />
                        {errors.fullName && <p className="text-destructive text-sm flex items-center gap-1"><X className="w-3 h-3" />{errors.fullName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className={`h-12 rounded-xl bg-muted/50 border-2 transition-all focus:bg-background ${errors.email ? 'border-destructive focus:border-destructive' : 'border-transparent focus:border-primary'}`}
                        />
                        {errors.email && <p className="text-destructive text-sm flex items-center gap-1"><X className="w-3 h-3" />{errors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className={`h-12 rounded-xl bg-muted/50 border-2 transition-all focus:bg-background ${errors.phone ? 'border-destructive focus:border-destructive' : 'border-transparent focus:border-primary'}`}
                        />
                        {errors.phone && <p className="text-destructive text-sm flex items-center gap-1"><X className="w-3 h-3" />{errors.phone}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn Profile</Label>
                        <Input
                          id="linkedin"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          placeholder="linkedin.com/in/johndoe"
                          className="h-12 rounded-xl bg-muted/50 border-2 border-transparent transition-all focus:bg-background focus:border-primary"
                        />
                      </div>
                    </div>
                  </section>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Resume & Portfolio */}
                  <section>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg shadow-secondary/20">
                        <FileText className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-secondary uppercase tracking-wider">Step 2 of 4</p>
                        <h2 className="text-xl font-semibold text-foreground">Resume & Portfolio</h2>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="resume" className="text-sm font-medium">Resume (PDF/DOC) *</Label>
                        <div className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                          errors.resume ? 'border-destructive bg-destructive/5' : resumeFile ? 'border-success bg-success/5' : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5'
                        }`}>
                          {resumeFile ? (
                            <div className="flex items-center justify-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-success" />
                              </div>
                              <div className="text-left">
                                <span className="text-foreground font-medium block">{resumeFile.name}</span>
                                <span className="text-sm text-muted-foreground">Click to replace</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setResumeFile(null)}
                                className="p-2 hover:bg-muted rounded-lg transition-colors ml-auto"
                              >
                                <X className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                              </button>
                            </div>
                          ) : (
                            <label htmlFor="resume" className="cursor-pointer block">
                              <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4">
                                <Upload className="w-7 h-7 text-muted-foreground" />
                              </div>
                              <p className="text-foreground font-medium mb-1">
                                Drop your resume here or <span className="text-primary">browse</span>
                              </p>
                              <p className="text-sm text-muted-foreground">PDF, DOC up to 5MB</p>
                            </label>
                          )}
                          <input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeChange}
                            className="hidden"
                          />
                        </div>
                        {errors.resume && <p className="text-destructive text-sm flex items-center gap-1"><X className="w-3 h-3" />{errors.resume}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio" className="text-sm font-medium">Portfolio Link (optional)</Label>
                        <Input
                          id="portfolio"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleInputChange}
                          placeholder="https://yourportfolio.com"
                          className="h-12 rounded-xl bg-muted/50 border-2 border-transparent transition-all focus:bg-background focus:border-primary"
                        />
                      </div>
                    </div>
                  </section>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Experience & Skills */}
                  <section>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/20">
                        <Sparkles className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-accent uppercase tracking-wider">Step 3 of 4</p>
                        <h2 className="text-xl font-semibold text-foreground">Experience & Skills</h2>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="experience" className="text-sm font-medium">Years of Experience *</Label>
                        <select
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className={`w-full h-12 px-4 rounded-xl bg-muted/50 text-foreground border-2 transition-all focus:bg-background focus:outline-none ${
                            errors.experience ? 'border-destructive' : 'border-transparent focus:border-primary'
                          }`}
                        >
                          <option value="">Select experience level</option>
                          <option value="0-1">0-1 years (Entry Level)</option>
                          <option value="1-3">1-3 years (Junior)</option>
                          <option value="3-5">3-5 years (Mid-Level)</option>
                          <option value="5-10">5-10 years (Senior)</option>
                          <option value="10+">10+ years (Expert)</option>
                        </select>
                        {errors.experience && <p className="text-destructive text-sm flex items-center gap-1"><X className="w-3 h-3" />{errors.experience}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Skills *</Label>
                        <div className="flex gap-3">
                          <Input
                            value={skillInput}
                            onChange={e => setSkillInput(e.target.value)}
                            placeholder="Add a skill (e.g., React, Python)"
                            onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                            className="h-12 rounded-xl bg-muted/50 border-2 border-transparent transition-all focus:bg-background focus:border-primary"
                          />
                          <Button type="button" variant="outline" onClick={addSkill} className="h-12 px-6 rounded-xl border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary">
                            Add
                          </Button>
                        </div>
                        {formData.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {formData.skills.map(skill => (
                              <Badge key={skill} variant="secondary" className="gap-2 py-2 px-4 rounded-lg bg-primary/10 text-primary border-0 hover:bg-primary/20">
                                {skill}
                                <button type="button" onClick={() => removeSkill(skill)} className="hover:text-destructive transition-colors">
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                        {errors.skills && <p className="text-destructive text-sm flex items-center gap-1"><X className="w-3 h-3" />{errors.skills}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="availability" className="text-sm font-medium">Availability *</Label>
                        <select
                          id="availability"
                          name="availability"
                          value={formData.availability}
                          onChange={handleInputChange}
                          className={`w-full h-12 px-4 rounded-xl bg-muted/50 text-foreground border-2 transition-all focus:bg-background focus:outline-none ${
                            errors.availability ? 'border-destructive' : 'border-transparent focus:border-primary'
                          }`}
                        >
                          <option value="">Select availability</option>
                          <option value="immediately">Immediately</option>
                          <option value="1-week">Within 1 week</option>
                          <option value="2-weeks">Within 2 weeks</option>
                          <option value="1-month">Within 1 month</option>
                          <option value="negotiable">Negotiable</option>
                        </select>
                        {errors.availability && <p className="text-destructive text-sm flex items-center gap-1"><X className="w-3 h-3" />{errors.availability}</p>}
                      </div>
                    </div>
                  </section>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Cover Letter */}
                  <section>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center shadow-lg shadow-warning/20">
                        <Send className="w-5 h-5 text-warning-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-warning uppercase tracking-wider">Step 4 of 4</p>
                        <h2 className="text-xl font-semibold text-foreground">Cover Letter</h2>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coverLetter" className="text-sm font-medium">Why are you a great fit? *</Label>
                      <Textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself, your experience, and why you'd be a great fit for this role..."
                        rows={6}
                        className={`rounded-xl bg-muted/50 border-2 transition-all focus:bg-background resize-none ${errors.coverLetter ? 'border-destructive focus:border-destructive' : 'border-transparent focus:border-primary'}`}
                      />
                      <div className="flex justify-between items-center">
                        {errors.coverLetter ? (
                          <p className="text-destructive text-sm flex items-center gap-1"><X className="w-3 h-3" />{errors.coverLetter}</p>
                        ) : (
                          <p className="text-xs text-muted-foreground">Minimum 50 characters recommended</p>
                        )}
                        <p className="text-xs text-muted-foreground">{formData.coverLetter.length} characters</p>
                      </div>
                    </div>
                  </section>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-lg font-semibold btn-gradient rounded-2xl"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Submit Application
                        </>
                      )}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground mt-4">
                      By submitting, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Job Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                {/* Job Card */}
                <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
                  <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent p-6">
                    <p className="text-xs font-medium text-primary uppercase tracking-wider mb-4">Applying for</p>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg text-white font-bold text-xl">
                        {job.company.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-foreground leading-tight mb-1">{job.title}</h3>
                        <p className="text-muted-foreground flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{job.company}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{job.type}</span>
                    </div>
                  </div>
                </div>

                {/* Skills Card */}
                <div className="bg-card rounded-3xl border border-border shadow-card p-6">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-muted text-muted-foreground text-sm font-medium rounded-xl"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tips Card */}
                <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl border border-primary/10 p-6">
                  <h4 className="font-semibold text-foreground mb-3">💡 Application Tips</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>Tailor your cover letter to the job</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>Highlight relevant experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>Keep your resume updated</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ApplyForm;
