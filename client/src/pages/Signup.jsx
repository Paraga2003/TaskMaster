import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Zap } from 'lucide-react';

const api = axios.create({ baseURL: 'http://localhost:8000' });

export default function Signup() {
  const { login }  = useAuth();
  const navigate    = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/register', form);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  const handleGoogle = async (credentialResponse) => {
    try {
      const { data } = await api.post('/api/auth/google', {
        credential: credentialResponse.credential
      });
      login(data.user, data.token);
      navigate('/dashboard');
    } catch {
      toast.error('Google signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-[32px] shadow-xl w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-[#2D22C6] p-2 rounded-xl">
            <Zap size={20} className="text-white" />
          </div>
          <span className="text-xl font-black">TaskMaster</span>
        </div>

        <h1 className="text-3xl font-black mb-1">Create account</h1>
        <p className="text-gray-400 mb-8">Start managing your tasks today</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" placeholder="Full Name" required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2D22C6]/20"
          />
          <input
            type="email" placeholder="Email" required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2D22C6]/20"
          />
          <input
            type="password" placeholder="Password (min 8 chars)" required minLength={8}
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2D22C6]/20"
          />
          <button type="submit"
            className="w-full bg-[#2D22C6] text-white font-bold py-3 rounded-full hover:opacity-90 transition-all">
            Create Account
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogle} onError={() => toast.error('Google signup failed')} />
        </div>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-[#2D22C6] font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}