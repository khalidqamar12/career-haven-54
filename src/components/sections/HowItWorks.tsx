import { UserPlus, Search, FileCheck, PartyPopper, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up and build your professional profile. Upload your resume and highlight your skills.',
      color: 'from-primary to-primary/80',
    },
    {
      icon: Search,
      number: '02',
      title: 'Search & Discover',
      description: 'Browse thousands of job listings. Use filters to find roles that match your preferences.',
      color: 'from-secondary to-secondary/80',
    },
    {
      icon: FileCheck,
      number: '03',
      title: 'Apply with Ease',
      description: 'Submit applications with a single click. Track your application status in real-time.',
      color: 'from-accent to-accent/80',
    },
    {
      icon: PartyPopper,
      number: '04',
      title: 'Get Hired',
      description: 'Connect with employers, ace your interviews, and land your dream job.',
      color: 'from-success to-success/80',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 gradient-bg relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-white/90 text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-white/80">
            Your journey to the perfect job is just four simple steps away
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-white/0 via-white/30 to-white/0" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative text-center group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Step Number (Mobile) */}
              <div className="lg:hidden text-7xl font-bold text-white/10 absolute -top-4 left-1/2 -translate-x-1/2">
                {step.number}
              </div>

              {/* Icon Container */}
              <div className="relative inline-block mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-primary font-bold text-sm flex items-center justify-center shadow-lg">
                  {step.number.replace('0', '')}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/70 leading-relaxed">{step.description}</p>

              {/* Arrow (Desktop) */}
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-20 -right-4 w-8 h-8 text-white/30" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="hero" size="xl" className="gap-2">
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
