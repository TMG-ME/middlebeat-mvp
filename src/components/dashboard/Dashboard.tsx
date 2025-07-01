import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FolderOpen, 
  MessageCircle, 
  Search, 
  TrendingUp, 
  Star,
  Music,
  Play,
  Heart,
  Eye
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockProfiles, mockProjects, getUserTypeDisplayName } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();

  if (!user || !profile) {
    return null;
  }

  const quickStats = [
    {
      title: 'Connections',
      value: profile.followerCount,
      icon: Users,
      color: 'text-blue-500',
      change: '+12 this week',
      href: '/connections'
    },
    {
      title: 'Active Projects',
      value: mockProjects.filter(p => p.status === 'open' || p.status === 'in_progress').length,
      icon: FolderOpen,
      color: 'text-green-500',
      change: '2 new this week',
      href: '/projects'
    },
    {
      title: 'Messages',
      value: 8,
      icon: MessageCircle,
      color: 'text-purple-500',
      change: '3 unread',
      href: '/messages'
    },
    {
      title: 'Profile Views',
      value: 156,
      icon: Eye,
      color: 'text-orange-500',
      change: '+24 this week',
      href: '/profile'
    }
  ];

  const recentProjects = mockProjects.slice(0, 3);
  const suggestedConnections = mockProfiles
    .filter(p => p.userId !== user.id)
    .slice(0, 4);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl"></div>
          <Card className="relative glass border-primary/20">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-3xl font-display font-bold mb-2">
                    {getGreeting()}, {profile.fullName}! 👋
                  </h1>
                  <p className="text-muted-foreground text-lg mb-4">
                    Welcome back to MiddleBeat. Ready to create some amazing music today?
                  </p>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="text-primary border-primary/30">
                      {getUserTypeDisplayName(user.userType)}
                    </Badge>
                    {profile.isVerified && (
                      <Badge variant="outline" className="text-accent border-accent/30">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="mt-6 lg:mt-0 flex space-x-3">
                  <Button asChild className="btn-primary">
                    <Link to="/discover">
                      <Search className="w-4 h-4 mr-2" />
                      Discover Artists
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/projects/create">
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Create Project
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Link key={index} to={stat.href} className="block">
              <Card className="card-music hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <Card className="card-music">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <FolderOpen className="w-5 h-5 text-primary" />
                    <span>Recent Projects</span>
                  </CardTitle>
                  <CardDescription>Latest collaboration opportunities</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to="/projects">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{project.title}</h4>
                      <Badge 
                        variant={project.status === 'open' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {project.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>by {project.creatorName}</span>
                      <span>{project.applicants.length} applicants</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Suggested Connections */}
          <div>
            <Card className="card-music">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Suggested for You</span>
                  </CardTitle>
                  <CardDescription>People you might want to connect with</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to="/discover">Explore</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedConnections.map((suggestedProfile) => (
                  <div key={suggestedProfile.id} className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                      <AvatarImage src={suggestedProfile.profilePictureUrl} alt={suggestedProfile.fullName} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm">
                        {suggestedProfile.fullName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <p className="font-medium text-sm truncate">{suggestedProfile.fullName}</p>
                        {suggestedProfile.isVerified && (
                          <Star className="w-3 h-3 text-accent fill-current" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{suggestedProfile.location}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {suggestedProfile.genres.slice(0, 2).map((genre) => (
                          <Badge key={genre} variant="outline" className="text-xs px-1 py-0">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      Connect
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="card-music">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Jump into the most popular features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-20 flex-col space-y-2">
                <Link to="/projects/create">
                  <FolderOpen className="w-6 h-6 text-primary" />
                  <span>Start a Project</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col space-y-2">
                <Link to="/discover">
                  <Search className="w-6 h-6 text-primary" />
                  <span>Find Collaborators</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col space-y-2">
                <Link to="/profile">
                  <Music className="w-6 h-6 text-primary" />
                  <span>Update Portfolio</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
