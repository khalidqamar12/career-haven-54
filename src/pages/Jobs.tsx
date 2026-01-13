import { useState, useMemo } from 'react';
import { Search, MapPin, Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import PageLayout from '@/components/layout/PageLayout';
import JobCard from '@/components/jobs/JobCard';
import { jobs } from '@/lib/data';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('relevance');

  const jobTypes = ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship', 'Hybrid'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Executive'];

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

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedExperience([]);
    setSalaryRange([0, 200]);
    setSearchQuery('');
    setLocationQuery('');
  };

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        job =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Location filter
    if (locationQuery) {
      result = result.filter(job =>
        job.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }

    // Type filter
    if (selectedTypes.length > 0) {
      result = result.filter(job => selectedTypes.includes(job.type));
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result = result.sort((a, b) => {
          const getPostedDays = (posted: string) => {
            if (posted.includes('day')) return parseInt(posted);
            if (posted.includes('week')) return parseInt(posted) * 7;
            return 0;
          };
          return getPostedDays(a.posted) - getPostedDays(b.posted);
        });
        break;
      case 'salary-high':
        result = result.sort((a, b) => {
          const getSalary = (salary: string) => {
            const match = salary.match(/\$(\d+)k/);
            return match ? parseInt(match[1]) : 0;
          };
          return getSalary(b.salary) - getSalary(a.salary);
        });
        break;
      case 'salary-low':
        result = result.sort((a, b) => {
          const getSalary = (salary: string) => {
            const match = salary.match(/\$(\d+)k/);
            return match ? parseInt(match[1]) : 0;
          };
          return getSalary(a.salary) - getSalary(b.salary);
        });
        break;
      default:
        // Keep featured jobs first for relevance
        result = result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [searchQuery, locationQuery, selectedTypes, sortBy]);

  const activeFiltersCount = selectedTypes.length + selectedExperience.length + 
    (salaryRange[0] > 0 || salaryRange[1] < 200 ? 1 : 0);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="gradient-bg py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Job
            </h1>
            <p className="text-lg text-white/80">
              Browse {jobs.length}+ opportunities from top companies
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Job title, keyword, or company"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 border-0 bg-muted/50"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="City, state, or remote"
                  value={locationQuery}
                  onChange={e => setLocationQuery(e.target.value)}
                  className="pl-12 h-12 border-0 bg-muted/50"
                />
              </div>
              <Button variant="gradient" size="lg" className="h-12">
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-28">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Job Type */}
                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-3">Job Type</h4>
                  <div className="space-y-2">
                    {jobTypes.map(type => (
                      <label
                        key={type}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={() => toggleType(type)}
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-3">Experience Level</h4>
                  <div className="space-y-2">
                    {experienceLevels.map(level => (
                      <label
                        key={level}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox
                          checked={selectedExperience.includes(level)}
                          onCheckedChange={() => toggleExperience(level)}
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Salary Range */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">
                    Salary Range: ${salaryRange[0]}k - ${salaryRange[1]}k
                  </h4>
                  <Slider
                    value={salaryRange}
                    onValueChange={setSalaryRange}
                    max={200}
                    step={10}
                    className="mt-2"
                  />
                </div>
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
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm"
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
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="relevance">Sort by: Relevance</option>
                    <option value="newest">Sort by: Newest</option>
                    <option value="salary-high">Sort by: Salary (High to Low)</option>
                    <option value="salary-low">Sort by: Salary (Low to High)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedTypes.map(type => (
                    <span
                      key={type}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {type}
                      <button onClick={() => toggleType(type)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedExperience.map(level => (
                    <span
                      key={level}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary text-sm rounded-full"
                    >
                      {level}
                      <button onClick={() => toggleExperience(level)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden bg-card rounded-2xl border border-border p-6 mb-6 animate-fade-up">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Filters</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2 text-sm">Job Type</h4>
                      <div className="space-y-2">
                        {jobTypes.map(type => (
                          <label
                            key={type}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Checkbox
                              checked={selectedTypes.includes(type)}
                              onCheckedChange={() => toggleType(type)}
                            />
                            <span className="text-xs text-muted-foreground">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2 text-sm">Experience</h4>
                      <div className="space-y-2">
                        {experienceLevels.map(level => (
                          <label
                            key={level}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Checkbox
                              checked={selectedExperience.includes(level)}
                              onCheckedChange={() => toggleExperience(level)}
                            />
                            <span className="text-xs text-muted-foreground">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
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
                    Try adjusting your search or filters
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
