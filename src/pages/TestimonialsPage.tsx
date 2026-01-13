import PageLayout from '@/components/layout/PageLayout';
import Testimonials from '@/components/sections/Testimonials';

const TestimonialsPage = () => (
  <PageLayout>
    <section className="gradient-bg py-16 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Success Stories</h1>
        <p className="text-white/80 text-lg">Real experiences from our community</p>
      </div>
    </section>
    <Testimonials />
  </PageLayout>
);

export default TestimonialsPage;
