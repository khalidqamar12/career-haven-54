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
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/layout/PageLayout';
import { jobs } from '@/lib/data';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

const ApplyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addApplication } = useApp();
  
  const job = jobs.find(j => j.id === Number(id));
  
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

  if (!job) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-6">The job you're trying to apply for doesn't exist.</p>
          <Button asChild>
            <Link to="/jobs">Browse All Jobs</Link>
          </Button>
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
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Application Submitted!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for applying to <span className="text-foreground font-semibold">{job.title}</span> at{' '}
              <span className="text-foreground font-semibold">{job.company}</span>.
            </p>
            <p className="text-muted-foreground mb-8">
              A confirmation email has been sent to <span className="text-foreground">{formData.email}</span>.
              We'll review your application and get back to you soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/candidate/dashboard">View My Applications</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/jobs">Browse More Jobs</Link>
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Back Button */}
        <Link
          to={`/jobs/${job.id}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Job Details
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Apply for this position</h1>
              <p className="text-muted-foreground mb-8">Fill out the form below to submit your application.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    Personal Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={errors.fullName ? 'border-destructive' : ''}
                      />
                      {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className={errors.phone ? 'border-destructive' : ''}
                      />
                      {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </div>
                  </div>
                </div>

                {/* Resume & Portfolio */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    Resume & Portfolio
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="resume">Resume (PDF/DOC) *</Label>
                      <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                        errors.resume ? 'border-destructive' : 'border-border hover:border-primary/50'
                      }`}>
                        {resumeFile ? (
                          <div className="flex items-center justify-center gap-3">
                            <CheckCircle className="w-5 h-5 text-success" />
                            <span className="text-foreground">{resumeFile.name}</span>
                            <button
                              type="button"
                              onClick={() => setResumeFile(null)}
                              className="p-1 hover:bg-muted rounded"
                            >
                              <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                        ) : (
                          <label htmlFor="resume" className="cursor-pointer">
                            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">
                              Drag and drop your resume or{' '}
                              <span className="text-primary">browse files</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">PDF, DOC up to 5MB</p>
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
                      {errors.resume && <p className="text-destructive text-sm mt-1">{errors.resume}</p>}
                    </div>
                    <div>
                      <Label htmlFor="portfolio">Portfolio Link (optional)</Label>
                      <Input
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Experience & Skills */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    Experience & Skills
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className={`w-full h-10 px-3 rounded-md border bg-background text-foreground ${
                          errors.experience ? 'border-destructive' : 'border-input'
                        }`}
                      >
                        <option value="">Select experience level</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                      {errors.experience && <p className="text-destructive text-sm mt-1">{errors.experience}</p>}
                    </div>
                    <div>
                      <Label>Skills *</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={skillInput}
                          onChange={e => setSkillInput(e.target.value)}
                          placeholder="Add a skill"
                          onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        />
                        <Button type="button" variant="outline" onClick={addSkill}>
                          Add
                        </Button>
                      </div>
                      {formData.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map(skill => (
                            <Badge key={skill} variant="secondary" className="gap-1">
                              {skill}
                              <button type="button" onClick={() => removeSkill(skill)}>
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                      {errors.skills && <p className="text-destructive text-sm mt-1">{errors.skills}</p>}
                    </div>
                    <div>
                      <Label htmlFor="availability">Availability *</Label>
                      <select
                        id="availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className={`w-full h-10 px-3 rounded-md border bg-background text-foreground ${
                          errors.availability ? 'border-destructive' : 'border-input'
                        }`}
                      >
                        <option value="">Select availability</option>
                        <option value="immediately">Immediately</option>
                        <option value="1-week">Within 1 week</option>
                        <option value="2-weeks">Within 2 weeks</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="negotiable">Negotiable</option>
                      </select>
                      {errors.availability && <p className="text-destructive text-sm mt-1">{errors.availability}</p>}
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">4</span>
                    </div>
                    Cover Letter
                  </h2>
                  <div>
                    <Label htmlFor="coverLetter">Why are you a good fit for this role? *</Label>
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      placeholder="Tell us about your experience and why you're interested in this position..."
                      rows={6}
                      className={errors.coverLetter ? 'border-destructive' : ''}
                    />
                    {errors.coverLetter && <p className="text-destructive text-sm mt-1">{errors.coverLetter}</p>}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6 border-t border-border">
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Job Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Applying for</h3>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl btn-gradient flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {job.logo}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{job.title}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {job.company}
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  {job.type}
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-medium text-foreground mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
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
