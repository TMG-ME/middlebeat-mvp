import { User, Profile, Project, MediaItem, UserType } from '@/types';

// Skills and Genres data
export const availableSkills = [
  'Vocals', 'Guitar', 'Piano', 'Drums', 'Bass', 'Violin', 'Saxophone',
  'Music Production', 'Audio Engineering', 'Songwriting', 'Mixing', 'Mastering',
  'Video Editing', 'Photography', 'Content Creation', 'Social Media Marketing',
  'Graphic Design', 'Branding', 'Marketing Strategy', 'Analytics'
];

export const availableGenres = [
  'Pop', 'Rock', 'Hip Hop', 'R&B', 'Jazz', 'Classical', 'Electronic',
  'Country', 'Folk', 'Blues', 'Reggae', 'Latin', 'Indie', 'Alternative',
  'Funk', 'Soul', 'Experimental', 'Lo-fi', 'Ambient'
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'alex.music@example.com',
    userType: 'music_collaborator',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    email: 'sarah.marketing@example.com',
    userType: 'influencer_marketer',
    createdAt: '2024-01-16T11:00:00Z',
    updatedAt: '2024-01-16T11:00:00Z'
  },
  {
    id: '3',
    email: 'mike.scout@recordlabel.com',
    userType: 'record_label_scout',
    createdAt: '2024-01-17T12:00:00Z',
    updatedAt: '2024-01-17T12:00:00Z'
  },
  {
    id: '4',
    email: 'emma.creator@example.com',
    userType: 'music_collaborator',
    createdAt: '2024-01-18T13:00:00Z',
    updatedAt: '2024-01-18T13:00:00Z'
  },
  {
    id: '5',
    email: 'david.brand@company.com',
    userType: 'brand_sponsorship_manager',
    createdAt: '2024-01-19T14:00:00Z',
    updatedAt: '2024-01-19T14:00:00Z'
  },
  {
    id: '6',
    email: 'lisa.manager@agency.com',
    userType: 'content_creator_manager',
    createdAt: '2024-01-20T15:00:00Z',
    updatedAt: '2024-01-20T15:00:00Z'
  },
  {
    id: '7',
    email: 'carlos.beats@example.com',
    userType: 'music_collaborator',
    createdAt: '2024-01-21T16:00:00Z',
    updatedAt: '2024-01-21T16:00:00Z'
  },
  {
    id: '8',
    email: 'maya.vocalist@example.com',
    userType: 'music_collaborator',
    createdAt: '2024-01-22T17:00:00Z',
    updatedAt: '2024-01-22T17:00:00Z'
  }
];

// Mock Profiles
export const mockProfiles: Profile[] = [
  {
    id: '1',
    userId: '1',
    fullName: 'Alex Martinez',
    bio: 'Passionate music producer and songwriter with 5+ years of experience. Specializing in electronic and pop music. Looking to collaborate with talented vocalists and musicians.',
    location: 'Los Angeles, CA',
    profilePictureUrl: '/images/profiles/alex.jpg',
    headerImageUrl: '/images/headers/studio.jpg',
    isVerified: true,
    socialMedia: {
      spotify: 'alexmartinezmusic',
      soundcloud: 'alexbeats',
      instagram: '@alexmartinezproducer'
    },
    skills: ['Music Production', 'Audio Engineering', 'Songwriting', 'Piano'],
    genres: ['Electronic', 'Pop', 'Indie'],
    experience: '5+ years',
    followerCount: 2840,
    followingCount: 156,
    rating: 4.8,
    ratingCount: 42,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    fullName: 'Sarah Chen',
    bio: 'Digital marketing specialist focusing on music industry. Helping artists grow their online presence and connect with their audience through strategic campaigns.',
    location: 'New York, NY',
    profilePictureUrl: '/images/profiles/sarah.jpg',
    headerImageUrl: '/images/headers/marketing.jpg',
    isVerified: true,
    socialMedia: {
      instagram: '@sarahchen_marketing'
    },
    skills: ['Social Media Marketing', 'Analytics', 'Content Creation', 'Branding'],
    genres: ['Pop', 'Hip Hop', 'R&B'],
    experience: '7+ years',
    followerCount: 1920,
    followingCount: 892,
    rating: 4.9,
    ratingCount: 28,
    createdAt: '2024-01-16T11:00:00Z',
    updatedAt: '2024-01-16T11:00:00Z'
  },
  {
    id: '3',
    userId: '3',
    fullName: 'Mike Thompson',
    bio: 'A&R Scout at Universal Music Group. Constantly searching for the next big talent in music. If you think you have what it takes, let me hear your sound.',
    location: 'Nashville, TN',
    profilePictureUrl: '/images/profiles/mike.jpg',
    headerImageUrl: '/images/headers/studio2.jpg',
    isVerified: true,
    socialMedia: {},
    skills: ['A&R', 'Music Industry', 'Talent Scouting'],
    genres: ['Country', 'Rock', 'Pop', 'Alternative'],
    experience: '12+ years',
    followerCount: 890,
    followingCount: 423,
    rating: 4.7,
    ratingCount: 15,
    createdAt: '2024-01-17T12:00:00Z',
    updatedAt: '2024-01-17T12:00:00Z'
  },
  {
    id: '4',
    userId: '4',
    fullName: 'Emma Rodriguez',
    bio: 'Singer-songwriter with a soulful voice and heartfelt lyrics. Currently working on my debut album and looking for collaborators who share my passion for authentic music.',
    location: 'Austin, TX',
    profilePictureUrl: '/images/profiles/emma.jpg',
    headerImageUrl: '/images/headers/concert.jpg',
    isVerified: false,
    socialMedia: {
      spotify: 'emmarodriguezmusic',
      instagram: '@emma_sings',
      youtube: 'EmmaRodriguezOfficial'
    },
    skills: ['Vocals', 'Songwriting', 'Guitar', 'Piano'],
    genres: ['Folk', 'Indie', 'Alternative'],
    experience: '3+ years',
    followerCount: 1245,
    followingCount: 234,
    rating: 4.6,
    ratingCount: 18,
    createdAt: '2024-01-18T13:00:00Z',
    updatedAt: '2024-01-18T13:00:00Z'
  },
  {
    id: '5',
    userId: '5',
    fullName: 'David Kim',
    bio: 'Brand Partnership Manager at Sony Music. Working with artists to create meaningful brand collaborations that benefit both parties and reach new audiences.',
    location: 'San Francisco, CA',
    profilePictureUrl: '/images/profiles/david.jpg',
    headerImageUrl: '/images/headers/brand.jpg',
    isVerified: true,
    socialMedia: {},
    skills: ['Brand Partnerships', 'Marketing Strategy', 'Negotiation'],
    genres: ['Pop', 'Electronic', 'Hip Hop'],
    experience: '8+ years',
    followerCount: 654,
    followingCount: 321,
    rating: 4.8,
    ratingCount: 22,
    createdAt: '2024-01-19T14:00:00Z',
    updatedAt: '2024-01-19T14:00:00Z'
  },
  {
    id: '6',
    userId: '6',
    fullName: 'Lisa Park',
    bio: 'Content Creator Manager at Digital Arts Agency. Specializing in helping musicians create engaging content and grow their digital presence across platforms.',
    location: 'Miami, FL',
    profilePictureUrl: '/images/profiles/lisa.jpg',
    headerImageUrl: '/images/headers/content.jpg',
    isVerified: true,
    socialMedia: {
      instagram: '@lisapark_agency'
    },
    skills: ['Content Strategy', 'Video Editing', 'Social Media Marketing', 'Analytics'],
    genres: ['Latin', 'Pop', 'R&B'],
    experience: '6+ years',
    followerCount: 987,
    followingCount: 445,
    rating: 4.7,
    ratingCount: 31,
    createdAt: '2024-01-20T15:00:00Z',
    updatedAt: '2024-01-20T15:00:00Z'
  },
  {
    id: '7',
    userId: '7',
    fullName: 'Carlos Rivera',
    bio: 'Beat maker and hip-hop producer from Chicago. Creating fire beats for talented rappers and singers. Let me help bring your vision to life with my production skills.',
    location: 'Chicago, IL',
    profilePictureUrl: '/images/profiles/carlos.jpg',
    headerImageUrl: '/images/headers/hiphop.jpg',
    isVerified: false,
    socialMedia: {
      soundcloud: 'carlosbeats',
      instagram: '@carlos_produces'
    },
    skills: ['Music Production', 'Beat Making', 'Mixing'],
    genres: ['Hip Hop', 'R&B', 'Trap'],
    experience: '4+ years',
    followerCount: 1567,
    followingCount: 287,
    rating: 4.5,
    ratingCount: 25,
    createdAt: '2024-01-21T16:00:00Z',
    updatedAt: '2024-01-21T16:00:00Z'
  },
  {
    id: '8',
    userId: '8',
    fullName: 'Maya Johnson',
    bio: 'Professional vocalist with extensive experience in jazz and soul music. Available for session work, collaborations, and live performances. Let my voice elevate your project.',
    location: 'Seattle, WA',
    profilePictureUrl: '/images/profiles/maya.jpg',
    headerImageUrl: '/images/headers/jazz.jpg',
    isVerified: true,
    socialMedia: {
      spotify: 'mayajohnsonvocals',
      youtube: 'MayaJohnsonMusic'
    },
    skills: ['Vocals', 'Songwriting', 'Performance'],
    genres: ['Jazz', 'Soul', 'R&B', 'Blues'],
    experience: '10+ years',
    followerCount: 3245,
    followingCount: 198,
    rating: 4.9,
    ratingCount: 67,
    createdAt: '2024-01-22T17:00:00Z',
    updatedAt: '2024-01-22T17:00:00Z'
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Looking for Vocalist for Electronic Pop Track',
    description: 'I have an instrumental electronic pop track that needs a powerful vocal performance. The song has a dreamy, atmospheric vibe with driving beats. Looking for someone with experience in pop vocals who can bring emotional depth to the lyrics.',
    creatorId: '1',
    creatorName: 'Alex Martinez',
    requiredSkills: ['Vocals', 'Songwriting'],
    genres: ['Electronic', 'Pop'],
    budget: { min: 500, max: 1000 },
    deadline: '2024-07-01',
    status: 'open',
    applicants: ['4', '8'],
    createdAt: '2024-06-10T14:30:00Z',
    updatedAt: '2024-06-10T14:30:00Z'
  },
  {
    id: '2',
    title: 'Hip-Hop Artist Needed for Brand Campaign',
    description: 'Our client is looking for an up-and-coming hip-hop artist for a summer brand campaign. The project involves creating original music for commercials and social media content. Great opportunity for exposure and paid collaboration.',
    creatorId: '2',
    creatorName: 'Sarah Chen',
    requiredSkills: ['Vocals', 'Performance', 'Content Creation'],
    genres: ['Hip Hop'],
    budget: { min: 2000, max: 5000 },
    deadline: '2024-06-30',
    status: 'open',
    applicants: ['7'],
    createdAt: '2024-06-12T10:15:00Z',
    updatedAt: '2024-06-12T10:15:00Z'
  },
  {
    id: '3',
    title: 'Seeking Acoustic Guitar Player for Folk Album',
    description: 'Working on my debut folk album and need a skilled acoustic guitar player for several tracks. The style is intimate and storytelling-focused. Looking for someone who can complement the emotional narrative of the songs.',
    creatorId: '4',
    creatorName: 'Emma Rodriguez',
    requiredSkills: ['Guitar', 'Folk Music'],
    genres: ['Folk', 'Indie'],
    budget: { min: 300, max: 600 },
    deadline: '2024-07-15',
    status: 'open',
    applicants: [],
    createdAt: '2024-06-14T16:45:00Z',
    updatedAt: '2024-06-14T16:45:00Z'
  },
  {
    id: '4',
    title: 'Beat Producer for R&B Collaboration',
    description: 'Jazz vocalist looking to explore R&B territory. Need a producer who can create smooth, soulful beats that will complement my vocal style. Open to creative experimentation and fusion of genres.',
    creatorId: '8',
    creatorName: 'Maya Johnson',
    requiredSkills: ['Music Production', 'Beat Making'],
    genres: ['R&B', 'Soul', 'Jazz'],
    budget: { min: 400, max: 800 },
    status: 'open',
    applicants: ['1', '7'],
    createdAt: '2024-06-16T12:20:00Z',
    updatedAt: '2024-06-16T12:20:00Z'
  },
  {
    id: '5',
    title: 'Music Video Content Creator Needed',
    description: 'Looking for a content creator to help develop social media strategy and create engaging video content for an upcoming single release. Experience with TikTok and Instagram reels preferred.',
    creatorId: '6',
    creatorName: 'Lisa Park',
    requiredSkills: ['Video Editing', 'Content Creation', 'Social Media Marketing'],
    genres: ['Pop', 'Latin'],
    budget: { min: 800, max: 1500 },
    deadline: '2024-06-28',
    status: 'in_progress',
    applicants: ['2'],
    createdAt: '2024-06-08T09:30:00Z',
    updatedAt: '2024-06-15T14:20:00Z'
  }
];

// Mock Media Items
export const mockMediaItems: MediaItem[] = [
  {
    id: '1',
    profileId: '1',
    mediaType: 'audio',
    url: '/audio/alex_track1.mp3',
    title: 'Midnight Vibes - Demo',
    description: 'Electronic pop track with atmospheric elements',
    thumbnail: '/images/audio-thumbnails/midnight-vibes.jpg'
  },
  {
    id: '2',
    profileId: '1',
    mediaType: 'audio',
    url: '/audio/alex_track2.mp3',
    title: 'City Lights',
    description: 'Upbeat electronic track perfect for radio',
    thumbnail: '/images/audio-thumbnails/city-lights.jpg'
  },
  {
    id: '3',
    profileId: '4',
    mediaType: 'audio',
    url: '/audio/emma_track1.mp3',
    title: 'Whispered Dreams',
    description: 'Intimate folk ballad with acoustic guitar',
    thumbnail: '/images/audio-thumbnails/whispered-dreams.jpg'
  },
  {
    id: '4',
    profileId: '8',
    mediaType: 'audio',
    url: '/audio/maya_track1.mp3',
    title: 'Blue Moon Rising',
    description: 'Jazz standard with personal interpretation',
    thumbnail: '/images/audio-thumbnails/blue-moon.jpg'
  },
  {
    id: '5',
    profileId: '7',
    mediaType: 'audio',
    url: '/audio/carlos_beat1.mp3',
    title: 'Fire Beat #1',
    description: 'Hard-hitting hip-hop instrumental',
    thumbnail: '/images/audio-thumbnails/fire-beat.jpg'
  }
];

export const getUserTypeDisplayName = (userType: UserType): string => {
  const displayNames = {
    music_collaborator: 'Music Collaborator',
    influencer_marketer: 'Influencer Marketer', 
    record_label_scout: 'Record Label Scout',
    brand_sponsorship_manager: 'Brand Sponsorship Manager',
    content_creator_manager: 'Content Creator Manager'
  };
  return displayNames[userType];
};

export const getUserTypeDescription = (userType: UserType): string => {
  const descriptions = {
    music_collaborator: 'Connect with other musicians and create amazing music together',
    influencer_marketer: 'Discover talented creators for authentic influencer campaigns',
    record_label_scout: 'Find and sign the next generation of musical talent',
    brand_sponsorship_manager: 'Connect brands with creators for meaningful partnerships',
    content_creator_manager: 'Manage and develop content creators across platforms'
  };
  return descriptions[userType];
};
