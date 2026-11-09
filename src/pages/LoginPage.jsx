import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, LogIn, AlertCircle, ArrowLeft, Shield } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('wasteuz_admin_token', data.token);
        if (onLoginSuccess) onLoginSuccess();
        navigate('/admin');
      } else {
        setError(data.error || "Noto'g'ri login yoki parol");
      }
    } catch (err) {
      setError("Server bilan bog'lanishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border-2 border-emerald-500/30 shadow-xl space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1b6b37] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bosh sahifaga qaytish</span>
        </Link>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-emerald-50 text-[#1b6b37] rounded-2xl flex items-center justify-center mx-auto border-2 border-emerald-200">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Tizimga kirish</h1>
          <p className="text-xs text-slate-500">
            Erasmus+ WASTE-UZ loyihasi konsorsium a'zolari va boshqaruv xodimlari uchun
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Foydalanuvchi nomi</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Login kiriting..."
              className="w-full px-4 py-3 rounded-xl border-2 border-emerald-500/25 focus:outline-hidden focus:ring-2 focus:ring-[#1b6b37] focus:border-[#1b6b37]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Parol</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl border-2 border-emerald-500/25 focus:outline-hidden focus:ring-2 focus:ring-[#1b6b37] focus:border-[#1b6b37]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#1b6b37] hover:bg-[#15542b] text-white font-bold transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 border-2 border-emerald-700"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Tekshirilmoqda...' : 'Kirish'}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-emerald-100 text-center text-xs text-slate-400">
          WASTE-UZ • Erasmus+ Project 101322962 • EACEA
        </div>
      </div>
    </div>
  );
}
