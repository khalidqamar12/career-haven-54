// Shared job data and types for the job portal

export interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract' | 'Internship' | 'Hybrid';
  salary: string;
  posted: string;
  featured?: boolean;
  skills: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  about: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  type: 'candidate' | 'employer';
}

export interface Application {
  id: string;
  jobId: number;
  jobTitle: string;
  company: string;
  fullName: string;
  email: string;
  phone: string;
  resume: string;
  portfolio?: string;
  linkedin?: string;
  coverLetter: string;
  experience: string;
  skills: string[];
  availability: string;
  submittedAt: Date;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
}

export const jobs: Job[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechFlow Inc.',
    logo: 'TF',
    location: 'San Francisco, CA',
    type: 'Remote',
    salary: '$120k - $180k',
    posted: '2 days ago',
    featured: true,
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    description: 'We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications, collaborating with designers and backend developers to create seamless user experiences.',
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with modern CSS frameworks',
      'Understanding of web performance optimization',
      'Excellent communication skills'
    ],
    benefits: [
      'Competitive salary and equity',
      'Remote-first culture',
      'Health, dental, and vision insurance',
      'Unlimited PTO',
      '401(k) matching'
    ],
    about: 'TechFlow Inc. is a leading technology company focused on building innovative solutions for the modern workplace. We believe in empowering our employees to do their best work.'
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'DesignHub',
    logo: 'DH',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$90k - $130k',
    posted: '1 day ago',
    featured: true,
    skills: ['Figma', 'UI/UX', 'Prototyping'],
    description: 'Join our design team to create beautiful and intuitive user experiences. You will work closely with product managers and engineers to bring ideas to life.',
    requirements: [
      '3+ years of product design experience',
      'Proficiency in Figma',
      'Strong portfolio demonstrating UI/UX skills',
      'Experience with user research',
      'Ability to work in a fast-paced environment'
    ],
    benefits: [
      'Competitive compensation',
      'Flexible work hours',
      'Professional development budget',
      'Modern office in Manhattan',
      'Team retreats'
    ],
    about: 'DesignHub is a design-focused agency working with Fortune 500 companies to create world-class digital experiences.'
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'DataDriven',
    logo: 'DD',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$130k - $170k',
    posted: '3 days ago',
    skills: ['Python', 'Machine Learning', 'SQL'],
    description: 'We are seeking a Data Scientist to help us extract insights from large datasets and build predictive models.',
    requirements: [
      'Masters or PhD in a quantitative field',
      'Strong Python and SQL skills',
      'Experience with machine learning frameworks',
      'Ability to communicate complex findings',
      'Experience with big data technologies'
    ],
    benefits: [
      'Competitive salary',
      'Stock options',
      'Health benefits',
      'Learning stipend',
      'Gym membership'
    ],
    about: 'DataDriven helps companies make better decisions through data science and analytics.'
  },
  {
    id: 4,
    title: 'Marketing Manager',
    company: 'GrowthLabs',
    logo: 'GL',
    location: 'Remote',
    type: 'Remote',
    salary: '$80k - $110k',
    posted: '5 days ago',
    skills: ['SEO', 'Content Strategy', 'Analytics'],
    description: 'Lead our marketing efforts and help us scale our brand presence across multiple channels.',
    requirements: [
      '4+ years of marketing experience',
      'Strong understanding of digital marketing',
      'Experience with marketing analytics tools',
      'Excellent writing skills',
      'Team leadership experience'
    ],
    benefits: [
      'Remote work',
      'Flexible schedule',
      'Performance bonuses',
      'Health insurance',
      'Home office stipend'
    ],
    about: 'GrowthLabs is a growth marketing agency helping startups scale their businesses.'
  },
  {
    id: 5,
    title: 'Backend Engineer',
    company: 'CloudScale',
    logo: 'CS',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$140k - $200k',
    posted: '1 week ago',
    featured: true,
    skills: ['Node.js', 'AWS', 'PostgreSQL'],
    description: 'Build and scale our cloud infrastructure to support millions of users worldwide.',
    requirements: [
      '5+ years of backend development experience',
      'Strong Node.js skills',
      'Experience with AWS services',
      'Database design and optimization',
      'Microservices architecture experience'
    ],
    benefits: [
      'Top-tier compensation',
      'Significant equity',
      'Premium health benefits',
      'Unlimited PTO',
      'Relocation assistance'
    ],
    about: 'CloudScale provides cloud infrastructure solutions to enterprises worldwide.'
  },
  {
    id: 6,
    title: 'UX Researcher',
    company: 'UserFirst',
    logo: 'UF',
    location: 'Chicago, IL',
    type: 'Contract',
    salary: '$70k - $95k',
    posted: '4 days ago',
    skills: ['User Testing', 'Surveys', 'Analytics'],
    description: 'Conduct user research to inform product decisions and improve user experience.',
    requirements: [
      '2+ years of UX research experience',
      'Experience with various research methods',
      'Strong analytical skills',
      'Excellent presentation skills',
      'Empathy for users'
    ],
    benefits: [
      'Competitive hourly rate',
      'Flexible schedule',
      'Remote work options',
      'Professional development',
      'Great team culture'
    ],
    about: 'UserFirst is dedicated to creating user-centered products that people love.'
  },
  {
    id: 7,
    title: 'DevOps Engineer',
    company: 'InfraCore',
    logo: 'IC',
    location: 'Denver, CO',
    type: 'Hybrid',
    salary: '$110k - $150k',
    posted: '6 days ago',
    skills: ['Kubernetes', 'Docker', 'CI/CD'],
    description: 'Join our infrastructure team to build and maintain our deployment pipelines.',
    requirements: [
      '4+ years of DevOps experience',
      'Kubernetes expertise',
      'CI/CD pipeline experience',
      'Scripting skills (Python, Bash)',
      'Cloud platform experience'
    ],
    benefits: [
      'Competitive salary',
      'Hybrid work model',
      'Health benefits',
      'Stock options',
      '401k matching'
    ],
    about: 'InfraCore provides infrastructure automation solutions for modern companies.'
  },
  {
    id: 8,
    title: 'Mobile Developer',
    company: 'AppWorks',
    logo: 'AW',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$100k - $140k',
    posted: '2 days ago',
    featured: true,
    skills: ['React Native', 'iOS', 'Android'],
    description: 'Build cross-platform mobile applications for our diverse client base.',
    requirements: [
      '3+ years of mobile development',
      'React Native proficiency',
      'Understanding of iOS and Android platforms',
      'App store deployment experience',
      'Performance optimization skills'
    ],
    benefits: [
      'Competitive pay',
      'Creative environment',
      'Latest tech stack',
      'Team events',
      'Learning budget'
    ],
    about: 'AppWorks creates mobile experiences for brands around the world.'
  },
  {
    id: 9,
    title: 'Sales Representative',
    company: 'SalesForce Pro',
    logo: 'SP',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$60k - $100k + Commission',
    posted: '1 day ago',
    skills: ['B2B Sales', 'CRM', 'Negotiation'],
    description: 'Drive sales growth by building relationships with enterprise clients.',
    requirements: [
      '2+ years of B2B sales experience',
      'CRM proficiency',
      'Strong communication skills',
      'Target-driven mindset',
      'Travel flexibility'
    ],
    benefits: [
      'Uncapped commission',
      'Base salary',
      'Health benefits',
      'Car allowance',
      'Sales training'
    ],
    about: 'SalesForce Pro helps companies accelerate their sales processes.'
  },
  {
    id: 10,
    title: 'Content Writer',
    company: 'ContentCraft',
    logo: 'CC',
    location: 'Remote',
    type: 'Part-time',
    salary: '$40k - $60k',
    posted: '3 days ago',
    skills: ['Copywriting', 'SEO', 'Research'],
    description: 'Create engaging content for our blog, website, and marketing materials.',
    requirements: [
      '2+ years of content writing experience',
      'SEO knowledge',
      'Strong research skills',
      'Versatile writing style',
      'Meeting deadlines'
    ],
    benefits: [
      'Flexible hours',
      'Remote work',
      'Creative freedom',
      'Byline credit',
      'Growth opportunities'
    ],
    about: 'ContentCraft produces high-quality content for tech companies.'
  },
  {
    id: 11,
    title: 'HR Coordinator',
    company: 'PeopleFirst',
    logo: 'PF',
    location: 'Miami, FL',
    type: 'Full-time',
    salary: '$50k - $70k',
    posted: '5 days ago',
    skills: ['Recruiting', 'Onboarding', 'HRIS'],
    description: 'Support our growing HR team with recruiting and employee onboarding.',
    requirements: [
      '1+ years of HR experience',
      'Recruiting experience',
      'HRIS familiarity',
      'Excellent people skills',
      'Organizational abilities'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'PTO',
      'Career growth',
      'Great team'
    ],
    about: 'PeopleFirst is an HR consulting firm helping companies build great cultures.'
  },
  {
    id: 12,
    title: 'Finance Analyst',
    company: 'FinanceHub',
    logo: 'FH',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$85k - $120k',
    posted: '4 days ago',
    skills: ['Financial Modeling', 'Excel', 'Analysis'],
    description: 'Analyze financial data and provide insights to support business decisions.',
    requirements: [
      '2+ years of finance experience',
      'Advanced Excel skills',
      'Financial modeling expertise',
      'Analytical mindset',
      'CFA or MBA preferred'
    ],
    benefits: [
      'Competitive compensation',
      'Bonus structure',
      'Health benefits',
      'Professional development',
      '401k matching'
    ],
    about: 'FinanceHub provides financial advisory services to growing companies.'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    company: 'TechFlow Inc.',
    avatar: 'SJ',
    rating: 5,
    quote: 'I landed my first remote job in just 5 days using this platform. The process was smooth and transparent. The job matching algorithm really understood what I was looking for!',
    type: 'candidate'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'HR Director',
    company: 'CloudScale',
    avatar: 'MC',
    rating: 5,
    quote: 'We hired 3 qualified developers within a week. The filtering system saved us hours of screening. Best recruitment platform we have ever used!',
    type: 'employer'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Designer',
    company: 'DesignHub',
    avatar: 'ER',
    rating: 5,
    quote: 'The application process was seamless. I loved being able to track my applications in real-time and the personalized job recommendations were spot on.',
    type: 'candidate'
  },
  {
    id: 4,
    name: 'David Park',
    role: 'CEO',
    company: 'AppWorks',
    avatar: 'DP',
    rating: 5,
    quote: 'JobFlow has transformed our hiring process. We have reduced time-to-hire by 60% and the quality of candidates is exceptional. Highly recommended!',
    type: 'employer'
  },
  {
    id: 5,
    name: 'Jessica Williams',
    role: 'Data Scientist',
    company: 'DataDriven',
    avatar: 'JW',
    rating: 5,
    quote: 'After months of struggling with other platforms, I found my dream job here in just 2 weeks. The salary transparency feature was incredibly helpful.',
    type: 'candidate'
  },
  {
    id: 6,
    name: 'Robert Taylor',
    role: 'Talent Acquisition Manager',
    company: 'GrowthLabs',
    avatar: 'RT',
    rating: 5,
    quote: 'The employer dashboard is intuitive and powerful. We can manage all our job postings and applications in one place. The analytics are invaluable.',
    type: 'employer'
  },
  {
    id: 7,
    name: 'Amanda Foster',
    role: 'Marketing Manager',
    company: 'ContentCraft',
    avatar: 'AF',
    rating: 5,
    quote: 'Transitioning careers felt daunting until I discovered JobFlow. The platform helped me showcase my transferable skills and land a role I love.',
    type: 'candidate'
  },
  {
    id: 8,
    name: 'James Wilson',
    role: 'CTO',
    company: 'InfraCore',
    avatar: 'JW',
    rating: 5,
    quote: 'As a startup, we needed to scale our engineering team quickly. JobFlow delivered quality candidates that matched our culture perfectly.',
    type: 'employer'
  }
];

// Stats for display
export const stats = {
  jobsPosted: '10,000+',
  candidates: '50,000+',
  companies: '5,000+',
  placements: '25,000+'
};

// Categories with job counts
export const categories = [
  { name: 'Technology', count: 2340, icon: 'Code' },
  { name: 'Healthcare', count: 1850, icon: 'Heart' },
  { name: 'Finance', count: 1420, icon: 'DollarSign' },
  { name: 'Marketing', count: 980, icon: 'TrendingUp' },
  { name: 'Design', count: 760, icon: 'Palette' },
  { name: 'Sales', count: 1200, icon: 'ShoppingBag' },
  { name: 'Education', count: 540, icon: 'GraduationCap' },
  { name: 'Engineering', count: 890, icon: 'Settings' }
];
