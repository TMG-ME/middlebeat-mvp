import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2, Music } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    
    try {
      const success = await login({
        email: data.email,
        password: data.password
      });
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    }
  };

  // Demo account information
  const demoAccounts = [
    { email: 'alex.music@example.com', userType: 'Music Collaborator' },
    { email: 'sarah.marketing@example.com', userType: 'Influencer Marketer' },
    { email: 'mike.scout@recordlabel.com', userType: 'Record Label Scout' },
    { email: 'emma.creator@example.com', userType: 'Music Collaborator' },
    { email: 'david.brand@company.com', userType: 'Brand Sponsorship Manager' },
  ];

  const fillDemoAccount = (email: string) => {
    // Use setValue from react-hook-form
    const form = document.querySelector('form') as HTMLFormElement;
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = form.querySelector('input[name="password"]') as HTMLInputElement;
    
    if (emailInput && passwordInput) {
      emailInput.value = email;
      passwordInput.value = 'demo123';
      
      // Trigger change events to update form state
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-display font-bold">Welcome Back</h2>
        <p className="text-muted-foreground">
          Sign in to continue your music journey
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Demo Accounts */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="text-sm font-medium mb-3 text-center">Demo Accounts</h4>
        <div className="grid grid-cols-1 gap-2">
          {demoAccounts.map((account, index) => (
            <button
              key={index}
              type="button"
              onClick={() => fillDemoAccount(account.email)}
              className="text-left p-2 rounded border border-border hover:bg-muted transition-colors text-xs"
            >
              <div className="font-medium">{account.email}</div>
              <div className="text-muted-foreground">{account.userType}</div>
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Click any account to auto-fill (password: demo123)
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register('email')}
            className="input-music"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              className="input-music pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              <Music className="mr-2 h-4 w-4" />
              Sign In
            </>
          )}
        </Button>
      </form>

      <div className="text-center">
        <Button variant="link" className="text-sm text-muted-foreground">
          Forgot your password?
        </Button>
      </div>
    </div>
  );
};
