import { useState } from 'react';
import { Star, Quote, Users, Briefcase, CheckCircle, Building2 } from 'lucide-react';
import { testimonials, stats } from '@/lib/data';

const Testimonials = () => {
  const [filter, setFilter] = useState<'all' | 'candidate' | 'employer'>('all');

  const filteredTestimonials = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.type === filter);

  return (
    <section className="py-20 sm:py-28 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            What People Say About Us
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from candidates and employers who found success with JobFlow
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              filter === 'all'
                ? 'btn-gradient text-white shadow-glow'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
            }`}
          >
            <Users className="w-4 h-4" />
            All
          </button>
          <button
            onClick={() => setFilter('candidate')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              filter === 'candidate'
                ? 'btn-gradient text-white shadow-glow'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Candidates
          </button>
          <button
            onClick={() => setFilter('employer')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              filter === 'employer'
                ? 'btn-gradient text-white shadow-glow'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Employers
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl border border-border p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/20 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-4" />

              {/* Quote Text */}
              <p className="text-foreground/80 mb-6 text-sm leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full btn-gradient flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Type Badge */}
              <div className="mt-4 pt-4 border-t border-border">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                  testimonial.type === 'candidate' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-secondary/10 text-secondary'
                }`}>
                  {testimonial.type === 'candidate' ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      Hired Candidate
                    </>
                  ) : (
                    <>
                      <Building2 className="w-3 h-3" />
                      Employer
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-card rounded-2xl border border-border">
            <div className="text-3xl font-bold gradient-text mb-1">{stats.jobsPosted}</div>
            <div className="text-sm text-muted-foreground">Jobs Posted</div>
          </div>
          <div className="text-center p-6 bg-card rounded-2xl border border-border">
            <div className="text-3xl font-bold gradient-text mb-1">{stats.candidates}</div>
            <div className="text-sm text-muted-foreground">Active Candidates</div>
          </div>
          <div className="text-center p-6 bg-card rounded-2xl border border-border">
            <div className="text-3xl font-bold gradient-text mb-1">{stats.companies}</div>
            <div className="text-sm text-muted-foreground">Companies</div>
          </div>
          <div className="text-center p-6 bg-card rounded-2xl border border-border">
            <div className="text-3xl font-bold gradient-text mb-1">{stats.placements}</div>
            <div className="text-sm text-muted-foreground">Successful Placements</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
