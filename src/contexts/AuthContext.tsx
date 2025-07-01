import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Profile, AuthState, LoginCredentials, RegisterData, UserType } from '@/types';
import { mockUsers, mockProfiles } from '@/data/mockData';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: Partial<Profile>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('middlebeat_user');
    const savedProfile = localStorage.getItem('middlebeat_profile');
    
    if (savedUser && savedProfile) {
      try {
        const user = JSON.parse(savedUser);
        const profile = JSON.parse(savedProfile);
        setAuthState({
          user,
          profile,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error('Error loading saved auth state:', error);
        localStorage.removeItem('middlebeat_user');
        localStorage.removeItem('middlebeat_profile');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email (case insensitive)
    const user = mockUsers.find(u => 
      u.email.toLowerCase() === credentials.email.toLowerCase()
    );
    
    if (!user) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
    
    // Find associated profile
    const profile = mockProfiles.find(p => p.userId === user.id);
    
    if (!profile) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
    
    // Save to localStorage
    localStorage.setItem('middlebeat_user', JSON.stringify(user));
    localStorage.setItem('middlebeat_profile', JSON.stringify(profile));
    
    setAuthState({
      user,
      profile,
      isAuthenticated: true,
      isLoading: false
    });
    
    return true;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if email already exists
    const existingUser = mockUsers.find(u => 
      u.email.toLowerCase() === data.email.toLowerCase()
    );
    
    if (existingUser) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      userType: data.userType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Create new profile
    const newProfile: Profile = {
      id: Date.now().toString(),
      userId: newUser.id,
      fullName: data.fullName,
      bio: '',
      location: '',
      isVerified: false,
      socialMedia: {},
      skills: [],
      genres: [],
      experience: '',
      followerCount: 0,
      followingCount: 0,
      rating: 0,
      ratingCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to mock data (in a real app, this would be sent to the server)
    mockUsers.push(newUser);
    mockProfiles.push(newProfile);
    
    // Save to localStorage
    localStorage.setItem('middlebeat_user', JSON.stringify(newUser));
    localStorage.setItem('middlebeat_profile', JSON.stringify(newProfile));
    
    setAuthState({
      user: newUser,
      profile: newProfile,
      isAuthenticated: true,
      isLoading: false
    });
    
    return true;
  };

  const logout = () => {
    localStorage.removeItem('middlebeat_user');
    localStorage.removeItem('middlebeat_profile');
    setAuthState({
      user: null,
      profile: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const updateProfile = async (profileUpdate: Partial<Profile>): Promise<boolean> => {
    if (!authState.profile) return false;
    
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedProfile = {
      ...authState.profile,
      ...profileUpdate,
      updatedAt: new Date().toISOString()
    };
    
    // Update in mock data
    const profileIndex = mockProfiles.findIndex(p => p.id === authState.profile!.id);
    if (profileIndex !== -1) {
      mockProfiles[profileIndex] = updatedProfile;
    }
    
    // Save to localStorage
    localStorage.setItem('middlebeat_profile', JSON.stringify(updatedProfile));
    
    setAuthState(prev => ({
      ...prev,
      profile: updatedProfile,
      isLoading: false
    }));
    
    return true;
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
