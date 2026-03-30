import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

// Configure axios
axios.defaults.withCredentials = true;

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('https://ecose-backend.vercel.app/api/auth/me');
        if (response.data.status === 'success') {
          setAuthenticated(true);
        }
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-900 flex flex-col items-center justify-center p-6 text-center">
        <Loader2 size={48} className="text-school-green animate-spin mb-6" />
        <h2 className="text-white text-xs font-black uppercase tracking-[0.4em]">Establishing Secure Session</h2>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
