import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Zap } from 'lucide-react';

const api = axios.create({ baseURL: 'http://localhost:8000' });

export default function ResetPassword() {
  const { token }  = useParams();
  const navigate    = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/reset-password', { token, password });
      toast.success('Password reset! Please log in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-[32px] shadow-xl w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-[#2D22C6] p-2 rounded-xl"><Zap size={20} className="text-white" /></div>
          <span className="text-xl font-black">TaskMaster</span>
        </div>
        <h1 className="text-3xl font-black mb-1">New password</h1>
        <p className="text-gray-400 mb-8">Enter your new password below</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password" placeholder="New password (min 8 chars)" required minLength={8}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2D22C6]/20"
          />
          <button type="submit"
            className="w-full bg-[#2D22C6] text-white font-bold py-3 rounded-full hover:opacity-90">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}