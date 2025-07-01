import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2, User, Users, Search, Briefcase, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserType } from '@/types';
import { getUserTypeDisplayName, getUserTypeDescription } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  userType: z.enum(['music_collaborator', 'influencer_marketer', 'record_label_scout', 'brand_sponsorship_manager', 'content_creator_manager'] as const)
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: 'music_collaborator'
    }
  });

  const selectedUserType = watch('userType');

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    
    try {
      const success = await registerUser({
        email: data.email,
        password: data.password,
        userType: data.userType,
        fullName: data.fullName
      });
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('An account with this email already exists.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    }
  };

  const userTypeOptions: { value: UserType; icon: React.ElementType; color: string }[] = [
    { value: 'music_collaborator', icon: User, color: 'text-blue-500' },
    { value: 'influencer_marketer', icon: Users, color: 'text-green-500' },
    { value: 'record_label_scout', icon: Search, color: 'text-purple-500' },
    { value: 'brand_sponsorship_manager', icon: Briefcase, color: 'text-orange-500' },
    { value: 'content_creator_manager', icon: Star, color: 'text-pink-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-display font-bold">Join MiddleBeat</h2>
        <p className="text-muted-foreground">
          Create your account and start collaborating
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* User Type Selection */}
        <div className="space-y-3">
          <Label>I am a...</Label>
          <RadioGroup
            value={selectedUserType}
            onValueChange={(value) => {
              register('userType').onChange({ target: { value } });
            }}
            className="space-y-2"
          >
            {userTypeOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex items-center space-x-3 cursor-pointer flex-1"
                >
                  <option.icon className={`w-5 h-5 ${option.color}`} />
                  <div>
                    <div className="font-medium">{getUserTypeDisplayName(option.value)}</div>
                    <div className="text-xs text-muted-foreground">
                      {getUserTypeDescription(option.value)}
                    </div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.userType && (
            <p className="text-sm text-destructive">{errors.userType.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              {...register('fullName')}
              className="input-music"
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          <div className="sm:col-span-2 space-y-2">
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
                placeholder="Create password"
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                {...register('confirmPassword')}
                className="input-music pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              <User className="mr-2 h-4 w-4" />
              Create Account
            </>
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        By creating an account, you agree to our{' '}
        <Button variant="link" className="p-0 h-auto text-sm">
          Terms of Service
        </Button>{' '}
        and{' '}
        <Button variant="link" className="p-0 h-auto text-sm">
          Privacy Policy
        </Button>
      </div>
    </div>
  );
};
