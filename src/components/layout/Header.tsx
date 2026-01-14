import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const getDashboardLink = () => {
    return profile?.user_type === 'employer' ? '/employer/dashboard' : '/candidate/dashboard';
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-card/80 backdrop-blur-xl shadow-lg border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              <img src={logo} alt="JobFlow Logo" className="w-full h-full object-contain" />
            </div>
            <span className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}>
              JobFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-medium transition-all duration-300 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                  isScrolled ? 'text-foreground/80' : 'text-white/90'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons / User Menu */}
          <div className="hidden lg:flex items-center gap-4">
            {!loading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(profile?.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className={`font-medium ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                      {profile?.full_name || user.email}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardLink()} className="flex items-center gap-2 cursor-pointer">
                      {profile?.user_type === 'employer' ? (
                        <Building2 className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant={isScrolled ? "ghost" : "heroOutline"} 
                  size="default"
                  asChild
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button 
                  variant={isScrolled ? "gradient" : "hero"} 
                  size="default"
                  asChild
                >
                  <Link to="/login">Post a Job</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              isScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border shadow-xl transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-foreground/80 font-medium py-2 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            {!loading && user ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(profile?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{profile?.full_name || user.email}</span>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to={getDashboardLink()} onClick={() => setIsMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-destructive" 
                  onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                </Button>
                <Button variant="gradient" className="w-full" asChild>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Post a Job</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
