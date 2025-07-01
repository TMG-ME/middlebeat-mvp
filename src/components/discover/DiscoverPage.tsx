import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Star, Users, Music, Heart, MessageCircle } from 'lucide-react';
import { mockProfiles, availableSkills, availableGenres, getUserTypeDisplayName } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Profile, UserType, SearchFilters } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export const DiscoverPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProfiles = useMemo(() => {
    let results = mockProfiles.filter(profile => profile.userId !== user?.id);

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(profile =>
        profile.fullName.toLowerCase().includes(query) ||
        profile.bio.toLowerCase().includes(query) ||
        profile.skills.some(skill => skill.toLowerCase().includes(query)) ||
        profile.genres.some(genre => genre.toLowerCase().includes(query)) ||
        profile.location.toLowerCase().includes(query)
      );
    }

    // Filters
    if (filters.skills && filters.skills.length > 0) {
      results = results.filter(profile =>
        filters.skills!.some(skill => profile.skills.includes(skill))
      );
    }

    if (filters.genres && filters.genres.length > 0) {
      results = results.filter(profile =>
        filters.genres!.some(genre => profile.genres.includes(genre))
      );
    }

    if (filters.location) {
      results = results.filter(profile =>
        profile.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.isVerified !== undefined) {
      results = results.filter(profile => profile.isVerified === filters.isVerified);
    }

    if (filters.rating) {
      results = results.filter(profile => profile.rating >= filters.rating!);
    }

    return results;
  }, [searchQuery, filters, user?.id]);

  const toggleSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills?.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...(prev.skills || []), skill]
    }));
  };

  const toggleGenre = (genre: string) => {
    setFilters(prev => ({
      ...prev,
      genres: prev.genres?.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...(prev.genres || []), genre]
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const ProfileCard: React.FC<{ profile: Profile }> = ({ profile }) => (
    <Card className="card-music overflow-hidden">
      <div className="relative h-32 bg-gradient-to-br from-primary/20 via-accent/20 to-music-500/20">
        {profile.headerImageUrl && (
          <img 
            src={profile.headerImageUrl} 
            alt="Header" 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      
      <CardContent className="p-6 relative">
        <div className="flex items-start space-x-4 -mt-12 relative z-10">
          <Avatar className="w-20 h-20 ring-4 ring-background">
            <AvatarImage src={profile.profilePictureUrl} alt={profile.fullName} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg font-bold">
              {profile.fullName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 pt-12">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-display font-semibold text-lg">{profile.fullName}</h3>
                  {profile.isVerified && (
                    <Star className="w-4 h-4 text-accent fill-current" />
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{profile.location}</span>
                </div>
              </div>
              <Button size="sm" className="btn-primary">
                <Users className="w-4 h-4 mr-1" />
                Connect
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {profile.bio}
            </p>

            <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{profile.followerCount} followers</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>{profile.rating.toFixed(1)} rating</span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {profile.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {profile.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{profile.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Genres</p>
                <div className="flex flex-wrap gap-1">
                  {profile.genres.slice(0, 3).map((genre) => (
                    <Badge key={genre} variant="outline" className="text-xs border-primary/30 text-primary">
                      {genre}
                    </Badge>
                  ))}
                  {profile.genres.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{profile.genres.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Button size="sm" variant="outline" className="flex-1">
                <MessageCircle className="w-3 h-3 mr-1" />
                Message
              </Button>
              <Button size="sm" variant="outline">
                <Heart className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Discover Collaborators</h1>
            <p className="text-muted-foreground">
              Find talented artists, producers, and industry professionals to work with
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, skills, genres, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 input-music"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(showFilters && "bg-muted")}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="card-music">
              <CardHeader>
                <CardTitle className="text-lg">Filter Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Location Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input
                      placeholder="Enter city or region..."
                      value={filters.location || ''}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      className="input-music"
                    />
                  </div>

                  {/* Verified Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Verification</label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={filters.isVerified === true}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({ 
                            ...prev, 
                            isVerified: checked ? true : undefined 
                          }))
                        }
                      />
                      <label htmlFor="verified" className="text-sm">Verified only</label>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Minimum Rating: {filters.rating || 0}
                    </label>
                    <Slider
                      value={[filters.rating || 0]}
                      onValueChange={([value]) => 
                        setFilters(prev => ({ ...prev, rating: value }))
                      }
                      max={5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Skills Filter */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {availableSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={filters.skills?.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/80"
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Genres Filter */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Genres</label>
                  <div className="flex flex-wrap gap-2">
                    {availableGenres.map((genre) => (
                      <Badge
                        key={genre}
                        variant={filters.genres?.includes(genre) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/80"
                        onClick={() => toggleGenre(genre)}
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Found {filteredProfiles.length} collaborator{filteredProfiles.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>

          {filteredProfiles.length === 0 && (
            <Card className="card-music">
              <CardContent className="p-12 text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No collaborators found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
