import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useAuth } from '@/contexts/AuthContext';
import { Music, Headphones, Mic, Radio } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background dark flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-music-600 to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-20 animate-float">
          <Music className="w-12 h-12 text-white/30" />
        </div>
        <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: '2s' }}>
          <Headphones className="w-16 h-16 text-white/20" />
        </div>
        <div className="absolute bottom-40 left-32 animate-float" style={{ animationDelay: '4s' }}>
          <Mic className="w-14 h-14 text-white/25" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Radio className="w-10 h-10 text-white/30" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <h1 className="text-5xl font-display font-bold mb-4">
              Welcome to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                MiddleBeat
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Connect, collaborate, and create amazing music with talented artists, producers, and industry professionals from around the world.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Find Your Dream Team</h3>
                <p className="text-white/80">Connect with musicians, producers, and industry pros</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FolderOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Collaborate on Projects</h3>
                <p className="text-white/80">Create and manage music projects together</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Build Your Reputation</h3>
                <p className="text-white/80">Get discovered by record labels and brands</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Music className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-display font-bold text-gradient">
                MiddleBeat
              </h1>
            </div>
            <p className="text-muted-foreground">
              Your music collaboration platform
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex mb-8 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Auth Forms */}
          <div className="space-y-6">
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Import necessary components that we'll create
import { Users, FolderOpen, Star } from 'lucide-react';
