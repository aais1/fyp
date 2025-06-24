import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = setTimeout(() => {
      setLoading(false);
      if (!user) {
        sessionStorage.removeItem('user');
        navigate(
          '/auth/sign-in?error=Unauthorized! Please log in to continue.'
        );
      }
    }, 0);

    return () => clearTimeout(checkAuth);
  }, [user, navigate]);

  if (loading) {
    return (
      <p className="text-center py-6 text-gray-500">
        Checking authentication...
      </p>
    );
  }

  return user ? children : null;
};

export default Protected;
