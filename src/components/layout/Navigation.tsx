import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Users, 
  FolderOpen, 
  MessageCircle, 
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Music,
  Star,
  Briefcase
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserTypeDisplayName } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/discover', label: 'Discover', icon: Search },
    { path: '/connections', label: 'Connections', icon: Users },
    { path: '/projects', label: 'Projects', icon: FolderOpen },
    { path: '/messages', label: 'Messages', icon: MessageCircle },
  ];

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-border">
        <Link to="/dashboard" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-gradient">
              MiddleBeat
            </h1>
            <p className="text-xs text-muted-foreground">Music Collaboration</p>
          </div>
        </Link>
      </div>

      {/* User Profile Section */}
      {profile && (
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 ring-2 ring-primary/20">
              <AvatarImage src={profile.profilePictureUrl} alt={profile.fullName} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                {profile.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{profile.fullName}</p>
              <p className="text-sm text-muted-foreground truncate">
                {user && getUserTypeDisplayName(user.userType)}
              </p>
              {profile.isVerified && (
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-3 h-3 text-accent fill-current" />
                  <span className="text-xs text-accent">Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              isActivePath(item.path)
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-1">
        <Link
          to="/profile"
          className={cn(
            "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            isActivePath('/profile')
              ? "bg-primary text-primary-foreground shadow-lg"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
        
        <Link
          to="/settings"
          className={cn(
            "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            isActivePath('/settings')
              ? "bg-primary text-primary-foreground shadow-lg"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start space-x-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          size="sm"
          variant="outline"
          className="glass"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-card border-r border-border transition-transform duration-300 z-40",
          "lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
