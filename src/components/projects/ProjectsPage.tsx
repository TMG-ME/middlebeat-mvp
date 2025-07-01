import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Filter, 
  Search, 
  Calendar, 
  DollarSign, 
  Users, 
  Clock,
  MapPin,
  Star
} from 'lucide-react';
import { mockProjects, mockProfiles, availableSkills, availableGenres } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export const ProjectsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const filteredProjects = React.useMemo(() => {
    let results = [...mockProjects];

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.requiredSkills.some(skill => skill.toLowerCase().includes(query)) ||
        project.genres.some(genre => genre.toLowerCase().includes(query)) ||
        project.creatorName.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      results = results.filter(project => project.status === statusFilter);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        results.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'budget-high':
        results.sort((a, b) => (b.budget?.max || 0) - (a.budget?.max || 0));
        break;
      case 'budget-low':
        results.sort((a, b) => (a.budget?.min || 0) - (b.budget?.min || 0));
        break;
      case 'applicants':
        results.sort((a, b) => b.applicants.length - a.applicants.length);
        break;
    }

    return results;
  }, [searchQuery, statusFilter, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatBudget = (budget?: { min: number; max: number }) => {
    if (!budget) return 'Budget not specified';
    return `$${budget.min.toLocaleString()} - $${budget.max.toLocaleString()}`;
  };

  const getCreatorProfile = (creatorId: string) => {
    return mockProfiles.find(p => p.userId === creatorId);
  };

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const creatorProfile = getCreatorProfile(project.creatorId);
    const isApplied = project.applicants.includes(user?.id || '');

    return (
      <Card className="card-music">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                <Badge className={cn("text-xs", getStatusColor(project.status))}>
                  {project.status.replace('_', ' ')}
                </Badge>
              </div>
              <CardDescription className="line-clamp-3">
                {project.description}
              </CardDescription>
            </div>
          </div>

          {/* Creator Info */}
          <div className="flex items-center space-x-3 pt-4 border-t border-border">
            <Avatar className="w-8 h-8">
              <AvatarImage src={creatorProfile?.profilePictureUrl} alt={project.creatorName} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                {project.creatorName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{project.creatorName}</p>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {creatorProfile?.location && (
                  <>
                    <MapPin className="w-3 h-3" />
                    <span>{creatorProfile.location}</span>
                  </>
                )}
                {creatorProfile?.isVerified && (
                  <Star className="w-3 h-3 text-accent fill-current ml-1" />
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Skills and Genres */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-1">
                {project.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Genres</p>
              <div className="flex flex-wrap gap-1">
                {project.genres.map((genre) => (
                  <Badge key={genre} variant="outline" className="text-xs border-primary/30 text-primary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span>{formatBudget(project.budget)}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{project.applicants.length} applicant{project.applicants.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <div className="space-y-2">
              {project.deadline && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.deadline).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Posted {new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 pt-4 border-t border-border">
            <Button 
              className="flex-1 btn-primary" 
              disabled={isApplied || project.status !== 'open'}
            >
              {isApplied ? 'Applied' : 'Apply Now'}
            </Button>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-display font-bold">Projects</h1>
            <p className="text-muted-foreground">
              Discover collaboration opportunities and showcase your projects
            </p>
          </div>
          <Button asChild className="btn-primary">
            <Link to="/projects/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="card-music">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects by title, skills, genres, or creator..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 input-music"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="budget-high">Highest Budget</SelectItem>
                    <SelectItem value="budget-low">Lowest Budget</SelectItem>
                    <SelectItem value="applicants">Most Applicants</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <Card className="card-music">
              <CardContent className="p-12 text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or create a new project
                </p>
                <Button asChild>
                  <Link to="/projects/create">Create Project</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
