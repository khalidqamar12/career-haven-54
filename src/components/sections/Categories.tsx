import { 
  Code, 
  Palette, 
  TrendingUp, 
  Heart, 
  GraduationCap, 
  Building, 
  Megaphone, 
  Wrench,
  BarChart3,
  Camera,
  Headphones,
  Briefcase
} from 'lucide-react';

const Categories = () => {
  const categories = [
    { icon: Code, name: 'Technology', jobs: 3420, color: 'from-primary to-secondary' },
    { icon: Palette, name: 'Design', jobs: 1850, color: 'from-pink-500 to-rose-500' },
    { icon: TrendingUp, name: 'Finance', jobs: 2100, color: 'from-emerald-500 to-teal-500' },
    { icon: Heart, name: 'Healthcare', jobs: 1680, color: 'from-red-500 to-pink-500' },
    { icon: GraduationCap, name: 'Education', jobs: 980, color: 'from-amber-500 to-orange-500' },
    { icon: Building, name: 'Real Estate', jobs: 560, color: 'from-slate-500 to-zinc-500' },
    { icon: Megaphone, name: 'Marketing', jobs: 1420, color: 'from-violet-500 to-purple-500' },
    { icon: Wrench, name: 'Engineering', jobs: 2340, color: 'from-blue-500 to-cyan-500' },
    { icon: BarChart3, name: 'Sales', jobs: 1890, color: 'from-green-500 to-emerald-500' },
    { icon: Camera, name: 'Media', jobs: 720, color: 'from-orange-500 to-red-500' },
    { icon: Headphones, name: 'Customer Service', jobs: 1150, color: 'from-indigo-500 to-blue-500' },
    { icon: Briefcase, name: 'Management', jobs: 890, color: 'from-cyan-500 to-teal-500' },
  ];

  return (
    <section id="categories" className="py-20 sm:py-28 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
            Explore Categories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Browse by Industry
          </h2>
          <p className="text-lg text-muted-foreground">
            Find opportunities in the industry that matches your expertise and passion
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="bg-card rounded-2xl border border-border p-6 text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 hover:border-primary/20">
                {/* Icon Container */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Category Name */}
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                {/* Job Count */}
                <p className="text-sm text-muted-foreground">
                  {category.jobs.toLocaleString()} jobs
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
