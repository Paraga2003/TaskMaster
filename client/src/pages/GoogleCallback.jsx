import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function GoogleCallback() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token  = params.get('token');
    const name   = params.get('name');
    const email  = params.get('email');
    const id     = params.get('id');

    if (token) {
      login({ id, name, email }, token);
      navigate('/dashboard');
    } else {
      navigate('/login?error=google_failed');
    }
  }, []);

  return <div className="min-h-screen flex items-center justify-center">Signing you in...</div>;
}

