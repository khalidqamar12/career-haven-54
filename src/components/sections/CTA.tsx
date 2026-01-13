import { ArrowRight, Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Job Seekers CTA */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 sm:p-10 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Ready to Find Your Dream Job?
                </h3>
                <p className="text-white/80 mb-8 text-lg">
                  Join thousands of job seekers who have found their perfect career match. 
                  Create your profile and start applying today.
                </p>
                
                <Button variant="hero" size="lg" className="gap-2">
                  Start Job Search
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Employers CTA */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-foreground to-foreground/80 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl p-8 sm:p-10 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Looking to Hire Top Talent?
                </h3>
                <p className="text-white/70 mb-8 text-lg">
                  Post your job listings and connect with qualified candidates. 
                  Our platform makes hiring fast, easy, and effective.
                </p>
                
                <Button variant="outline" size="lg" className="gap-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  Post a Job
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
