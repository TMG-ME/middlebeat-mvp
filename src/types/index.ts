// User Types
export type UserType = 
  | 'music_collaborator' 
  | 'influencer_marketer' 
  | 'record_label_scout' 
  | 'brand_sponsorship_manager' 
  | 'content_creator_manager';

export interface User {
  id: string;
  email: string;
  userType: UserType;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  fullName: string;
  bio: string;
  location: string;
  profilePictureUrl?: string;
  headerImageUrl?: string;
  isVerified: boolean;
  socialMedia: {
    spotify?: string;
    soundcloud?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  skills: string[];
  genres: string[];
  experience: string;
  followerCount: number;
  followingCount: number;
  rating: number;
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  requiredSkills: string[];
  genres: string[];
  budget?: {
    min: number;
    max: number;
  };
  deadline?: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  applicants: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  profileId: string;
  mediaType: 'audio' | 'video' | 'image';
  url: string;
  title: string;
  description?: string;
  thumbnail?: string;
}

export interface SearchFilters {
  userType?: UserType;
  skills?: string[];
  genres?: string[];
  location?: string;
  isVerified?: boolean;
  rating?: number;
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  userType: UserType;
  fullName: string;
}

export interface AuthState {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
