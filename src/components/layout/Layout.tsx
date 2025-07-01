import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { useAuth } from '@/contexts/AuthContext';

export const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background dark">
      {isAuthenticated && <Navigation />}
      <main className={isAuthenticated ? 'ml-0 lg:ml-64' : ''}>
        <Outlet />
      </main>
    </div>
  );
};
