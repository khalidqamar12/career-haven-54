import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import FeaturedJobs from '@/components/sections/FeaturedJobs';
import Categories from '@/components/sections/Categories';
import Companies from '@/components/sections/Companies';
import HowItWorks from '@/components/sections/HowItWorks';
import CTA from '@/components/sections/CTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedJobs />
        <Categories />
        <Companies />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
