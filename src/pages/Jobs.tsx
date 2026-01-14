import { useState, useMemo } from 'react';
import { Search, MapPin, Filter, X, ChevronDown, Calendar, Building2, Briefcase, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PageLayout from '@/components/layout/PageLayout';
import JobCard from '@/components/jobs/JobCard';
import { jobs } from '@/lib/data';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [datePosted, setDatePosted] = useState('any');
  const [salaryRange, setSalaryRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('relevance');

  const jobTypes = ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship', 'Hybrid'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Executive'];
  const categories = ['Technology', 'Design', 'Marketing', 'Sales', 'Finance', 'HR', 'Data Science', 'Engineering'];
  const dateOptions = [
    { value: 'any', label: 'Any time' },
    { value: '24h', label: 'Last 24 hours' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' },
  ];

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleExperience = (level: string) => {
    setSelectedExperience(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedExperience([]);
    setSelectedCategories([]);
    setDatePosted('any');
    setSalaryRange([0, 200]);
    setSearchQuery('');
    setLocationQuery('');
  };

  const getPostedDays = (posted: string): number => {
    if (posted.includes('day')) return parseInt(posted);
    if (posted.includes('week')) return parseInt(posted) * 7;
    if (posted.includes('month')) return parseInt(posted) * 30;
    return 0;
  };

  const getSalaryValue = (salary: string): number => {
    const match = salary.match(/\$(\d+)k/);
    return match ? parseInt(match[1]) : 0;
  };

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        job =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.skills.some(skill => skill.toLowerCase().includes(query)) ||
          job.description.toLowerCase().includes(query)
      );
    }

    // Location filter
    if (locationQuery) {
      const location = locationQuery.toLowerCase();
      result = result.filter(job =>
        job.location.toLowerCase().includes(location) ||
        (location.includes('remote') && job.type === 'Remote')
      );
    }

    // Type filter
    if (selectedTypes.length > 0) {
      result = result.filter(job => selectedTypes.includes(job.type));
    }

    // Experience filter (based on job title keywords)
    if (selectedExperience.length > 0) {
      result = result.filter(job => {
        const title = job.title.toLowerCase();
        if (selectedExperience.includes('Entry Level') && (title.includes('junior') || title.includes('intern') || title.includes('associate'))) return true;
        if (selectedExperience.includes('Mid Level') && !title.includes('senior') && !title.includes('junior') && !title.includes('lead') && !title.includes('director')) return true;
        if (selectedExperience.includes('Senior') && (title.includes('senior') || title.includes('lead') || title.includes('principal'))) return true;
        if (selectedExperience.includes('Executive') && (title.includes('director') || title.includes('vp') || title.includes('chief') || title.includes('head'))) return true;
        // If no specific keyword found, include for Mid Level
        if (selectedExperience.includes('Mid Level')) return true;
        return false;
      });
    }

    // Category filter (based on job title/skills)
    if (selectedCategories.length > 0) {
      result = result.filter(job => {
        const titleAndSkills = (job.title + ' ' + job.skills.join(' ')).toLowerCase();
        return selectedCategories.some(cat => {
          const catLower = cat.toLowerCase();
          if (catLower === 'technology') return titleAndSkills.includes('developer') || titleAndSkills.includes('engineer') || titleAndSkills.includes('react') || titleAndSkills.includes('node');
          if (catLower === 'design') return titleAndSkills.includes('design') || titleAndSkills.includes('ux') || titleAndSkills.includes('ui') || titleAndSkills.includes('figma');
          if (catLower === 'marketing') return titleAndSkills.includes('marketing') || titleAndSkills.includes('seo') || titleAndSkills.includes('content');
          if (catLower === 'sales') return titleAndSkills.includes('sales') || titleAndSkills.includes('business development');
          if (catLower === 'finance') return titleAndSkills.includes('finance') || titleAndSkills.includes('analyst') || titleAndSkills.includes('accounting');
          if (catLower === 'hr') return titleAndSkills.includes('hr') || titleAndSkills.includes('recruiting') || titleAndSkills.includes('talent');
          if (catLower === 'data science') return titleAndSkills.includes('data') || titleAndSkills.includes('machine learning') || titleAndSkills.includes('analytics');
          if (catLower === 'engineering') return titleAndSkills.includes('engineer') || titleAndSkills.includes('devops') || titleAndSkills.includes('infrastructure');
          return false;
        });
      });
    }

    // Date posted filter
    if (datePosted !== 'any') {
      result = result.filter(job => {
        const days = getPostedDays(job.posted);
        switch (datePosted) {
          case '24h': return days <= 1;
          case 'week': return days <= 7;
          case 'month': return days <= 30;
          default: return true;
        }
      });
    }

    // Salary range filter
    if (salaryRange[0] > 0 || salaryRange[1] < 200) {
      result = result.filter(job => {
        const salary = getSalaryValue(job.salary);
        return salary >= salaryRange[0] && salary <= salaryRange[1];
      });
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result = result.sort((a, b) => getPostedDays(a.posted) - getPostedDays(b.posted));
        break;
      case 'salary-high':
        result = result.sort((a, b) => getSalaryValue(b.salary) - getSalaryValue(a.salary));
        break;
      case 'salary-low':
        result = result.sort((a, b) => getSalaryValue(a.salary) - getSalaryValue(b.salary));
        break;
      default:
        result = result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [searchQuery, locationQuery, selectedTypes, selectedExperience, selectedCategories, datePosted, salaryRange, sortBy]);

  const activeFiltersCount = 
    selectedTypes.length + 
    selectedExperience.length + 
    selectedCategories.length +
    (datePosted !== 'any' ? 1 : 0) +
    (salaryRange[0] > 0 || salaryRange[1] < 200 ? 1 : 0);

  const FilterSection = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-primary" />
        <h4 className="font-medium text-foreground">{title}</h4>
      </div>
      {children}
    </div>
  );

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="gradient-bg py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Job
            </h1>
            <p className="text-lg text-white/80">
              Browse {jobs.length}+ opportunities from top companies
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-xl border border-white/10">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Job title, keyword, or company"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 border-0 bg-muted/50 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="City, state, or remote"
                      value={locationQuery}
                      onChange={e => setLocationQuery(e.target.value)}
                      className="pl-12 h-12 border-0 bg-muted/50 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                
                {/* Quick Filters */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/50">
                  <span className="text-sm text-muted-foreground mr-2">Quick filters:</span>
                  {['Remote', 'Full-time', 'Part-time'].map(type => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                        selectedTypes.includes(type)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                  <Select value={datePosted} onValueChange={setDatePosted}>
                    <SelectTrigger className="w-auto h-8 border-0 bg-muted text-sm gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <SelectValue placeholder="Date posted" />
                    </SelectTrigger>
                    <SelectContent>
                      {dateOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-28 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Filters</h3>
                  </div>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Clear all ({activeFiltersCount})
                    </button>
                  )}
                </div>

                {/* Job Type */}
                <FilterSection title="Job Type" icon={Briefcase}>
                  <div className="space-y-2">
                    {jobTypes.map(type => (
                      <label
                        key={type}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={() => toggleType(type)}
                          className="border-muted-foreground/30"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1">
                          {type}
                        </span>
                        <span className="text-xs text-muted-foreground/60">
                          {jobs.filter(j => j.type === type).length}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Experience Level */}
                <FilterSection title="Experience Level" icon={Building2}>
                  <div className="space-y-2">
                    {experienceLevels.map(level => (
                      <label
                        key={level}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox
                          checked={selectedExperience.includes(level)}
                          onCheckedChange={() => toggleExperience(level)}
                          className="border-muted-foreground/30"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Category/Industry */}
                <FilterSection title="Category" icon={Building2}>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                          selectedCategories.includes(category)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-transparent hover:border-border'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Date Posted */}
                <FilterSection title="Date Posted" icon={Calendar}>
                  <div className="space-y-2">
                    {dateOptions.map(option => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox
                          checked={datePosted === option.value}
                          onCheckedChange={() => setDatePosted(option.value)}
                          className="border-muted-foreground/30"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Salary Range */}
                <FilterSection title="Salary Range" icon={DollarSign}>
                  <div className="px-1">
                    <div className="flex justify-between text-sm text-muted-foreground mb-3">
                      <span>${salaryRange[0]}k</span>
                      <span>${salaryRange[1]}k{salaryRange[1] >= 200 ? '+' : ''}</span>
                    </div>
                    <Slider
                      value={salaryRange}
                      onValueChange={setSalaryRange}
                      max={200}
                      step={10}
                      className="mt-2"
                    />
                  </div>
                </FilterSection>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <p className="text-muted-foreground">
                    Showing <span className="text-foreground font-semibold">{filteredJobs.length}</span> jobs
                  </p>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-muted transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px] bg-card border-border">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Sort by: Relevance</SelectItem>
                    <SelectItem value="newest">Sort by: Newest</SelectItem>
                    <SelectItem value="salary-high">Sort by: Salary (High to Low)</SelectItem>
                    <SelectItem value="salary-low">Sort by: Salary (Low to High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedTypes.map(type => (
                    <span
                      key={type}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      <Briefcase className="w-3 h-3" />
                      {type}
                      <button onClick={() => toggleType(type)} className="hover:bg-primary/20 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedExperience.map(level => (
                    <span
                      key={level}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary text-sm rounded-full"
                    >
                      <Building2 className="w-3 h-3" />
                      {level}
                      <button onClick={() => toggleExperience(level)} className="hover:bg-secondary/20 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedCategories.map(category => (
                    <span
                      key={category}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-sm rounded-full"
                    >
                      {category}
                      <button onClick={() => toggleCategory(category)} className="hover:bg-accent/20 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {datePosted !== 'any' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-warning/10 text-warning text-sm rounded-full">
                      <Calendar className="w-3 h-3" />
                      {dateOptions.find(d => d.value === datePosted)?.label}
                      <button onClick={() => setDatePosted('any')} className="hover:bg-warning/20 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {(salaryRange[0] > 0 || salaryRange[1] < 200) && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success text-sm rounded-full">
                      <DollarSign className="w-3 h-3" />
                      ${salaryRange[0]}k - ${salaryRange[1]}k
                      <button onClick={() => setSalaryRange([0, 200])} className="hover:bg-success/20 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden bg-card rounded-2xl border border-border p-6 mb-6 animate-fade-up shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Filter className="w-5 h-5 text-primary" />
                      Filters
                    </h3>
                    <div className="flex items-center gap-4">
                      {activeFiltersCount > 0 && (
                        <button onClick={clearFilters} className="text-sm text-primary">
                          Clear all
                        </button>
                      )}
                      <button onClick={() => setShowFilters(false)}>
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3 text-sm flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        Job Type
                      </h4>
                      <div className="space-y-2">
                        {jobTypes.map(type => (
                          <label key={type} className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                              checked={selectedTypes.includes(type)}
                              onCheckedChange={() => toggleType(type)}
                            />
                            <span className="text-sm text-muted-foreground">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-3 text-sm flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        Experience
                      </h4>
                      <div className="space-y-2">
                        {experienceLevels.map(level => (
                          <label key={level} className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                              checked={selectedExperience.includes(level)}
                              onCheckedChange={() => toggleExperience(level)}
                            />
                            <span className="text-sm text-muted-foreground">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <h4 className="font-medium text-foreground mb-3 text-sm">Category</h4>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                          <button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                              selectedCategories.includes(category)
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <h4 className="font-medium text-foreground mb-3 text-sm flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        Salary: ${salaryRange[0]}k - ${salaryRange[1]}k
                      </h4>
                      <Slider
                        value={salaryRange}
                        onValueChange={setSalaryRange}
                        max={200}
                        step={10}
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-6" 
                    onClick={() => setShowFilters(false)}
                  >
                    Show {filteredJobs.length} Results
                  </Button>
                </div>
              )}

              {/* Jobs Grid */}
              {filteredJobs.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredJobs.map((job, index) => (
                    <JobCard key={job.id} job={job} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters to find more opportunities
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Jobs;
