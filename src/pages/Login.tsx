import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Briefcase, Mail, Lock, User, Building2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'candidate' | 'employer'>('candidate');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success('Welcome back!');
      } else {
        if (formData.password.length < 6) {
          toast.error('Password must be at least 6 characters');
          return;
        }
        const { error } = await signUp(formData.email, formData.password, formData.name, userType);
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success('Account created successfully!');
      }
      
      // Navigate based on user type
      navigate(userType === 'employer' ? '/employer/dashboard' : '/candidate/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-3 justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-bold text-white">JobFlow</span>
        </Link>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-foreground text-center mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            {isLogin ? 'Sign in to continue' : 'Join thousands of professionals'}
          </p>

          {!isLogin && (
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setUserType('candidate')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                  userType === 'candidate' ? 'bg-primary/10 border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary/30'
                }`}
              >
                <User className="w-5 h-5" />
                Job Seeker
              </button>
              <button
                type="button"
                onClick={() => setUserType('employer')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                  userType === 'employer' ? 'bg-primary/10 border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary/30'
                }`}
              >
                <Building2 className="w-5 h-5" />
                Employer
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="pl-10" 
                    value={formData.name} 
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} 
                    required 
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  className="pl-10" 
                  value={formData.email} 
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} 
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="pl-10 pr-10" 
                  value={formData.password} 
                  onChange={e => setFormData(p => ({ ...p, password: e.target.value }))} 
                  required 
                  disabled={isLoading}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-muted-foreground" /> : <Eye className="w-5 h-5 text-muted-foreground" />}
                </button>
              </div>
            </div>
            <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary hover:underline"
              disabled={isLoading}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
