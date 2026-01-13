import { ArrowRight, Star, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Companies = () => {
  const companies = [
    {
      name: 'TechFlow Inc.',
      logo: 'TF',
      industry: 'Technology',
      location: 'San Francisco, CA',
      employees: '1,000-5,000',
      openings: 42,
      rating: 4.8,
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      name: 'DesignHub',
      logo: 'DH',
      industry: 'Design Agency',
      location: 'New York, NY',
      employees: '100-500',
      openings: 18,
      rating: 4.9,
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      name: 'CloudScale',
      logo: 'CS',
      industry: 'Cloud Computing',
      location: 'Seattle, WA',
      employees: '5,000-10,000',
      openings: 67,
      rating: 4.7,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'DataDriven',
      logo: 'DD',
      industry: 'Data Analytics',
      location: 'Austin, TX',
      employees: '500-1,000',
      openings: 29,
      rating: 4.6,
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      name: 'GrowthLabs',
      logo: 'GL',
      industry: 'Marketing Tech',
      location: 'Los Angeles, CA',
      employees: '200-500',
      openings: 15,
      rating: 4.5,
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      name: 'FinanceFlow',
      logo: 'FF',
      industry: 'FinTech',
      location: 'Chicago, IL',
      employees: '1,000-5,000',
      openings: 34,
      rating: 4.7,
      gradient: 'from-indigo-500 to-blue-600',
    },
  ];

  return (
    <section id="companies" className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
              Top Employers
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Companies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Join leading organizations that are actively hiring and building amazing teams
            </p>
          </div>
          <Button variant="outline" className="gap-2 shrink-0">
            View All Companies
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Companies Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <div
              key={company.name}
              className="group bg-card rounded-2xl border border-border p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${company.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {company.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {company.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{company.industry}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-medium text-foreground">{company.rating}</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {company.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {company.employees} employees
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-success/10 text-success text-sm font-semibold rounded-full">
                    {company.openings} openings
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  View Jobs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
