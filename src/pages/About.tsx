import { Users, Target, Award, Heart } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { stats } from '@/lib/data';

const About = () => (
  <PageLayout>
    <section className="gradient-bg py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About JobFlow</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">Connecting talent with opportunity since 2020</p>
      </div>
    </section>
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">We believe everyone deserves a fulfilling career. JobFlow bridges the gap between talented professionals and forward-thinking companies.</p>
            <p className="text-muted-foreground">Our platform uses smart matching to connect the right people with the right opportunities, making hiring efficient and job searching enjoyable.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ icon: Users, label: 'Candidates', value: stats.candidates }, { icon: Target, label: 'Placements', value: stats.placements }, { icon: Award, label: 'Companies', value: stats.companies }, { icon: Heart, label: 'Jobs Posted', value: stats.jobsPosted }].map((item, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-6 text-center">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold gradient-text">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default About;
