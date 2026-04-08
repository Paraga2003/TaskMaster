import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Zap } from 'lucide-react';

const api = axios.create({ baseURL: 'http://localhost:8000' });

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-[32px] shadow-xl w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-[#2D22C6] p-2 rounded-xl"><Zap size={20} className="text-white" /></div>
          <span className="text-xl font-black">TaskMaster</span>
        </div>

        {sent ? (
          <div className="text-center">
            <h2 className="text-2xl font-black mb-2">Check your email</h2>
            <p className="text-gray-400 mb-6">We sent a reset link to <strong>{email}</strong></p>
            <Link to="/login" className="text-[#2D22C6] font-bold hover:underline">Back to login</Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-black mb-1">Forgot password?</h1>
            <p className="text-gray-400 mb-8">Enter your email and we'll send you a reset link</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email" placeholder="Email" required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2D22C6]/20"
              />
              <button type="submit"
                className="w-full bg-[#2D22C6] text-white font-bold py-3 rounded-full hover:opacity-90">
                Send Reset Link
              </button>
            </form>
            <p className="text-center mt-6">
              <Link to="/login" className="text-[#2D22C6] text-sm hover:underline">Back to login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}