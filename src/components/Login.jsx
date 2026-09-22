import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, TrendingUp, Sparkles, Eye, EyeOff } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Harap isi email dan kata sandi.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({
        name: email.split('@')[0] || 'Executive User',
        email: email,
        role: 'Chief Financial Officer'
      });
    }, 600);
  };

  const handleDemoLogin = () => {
    setEmail('cfo@finpulse.id');
    setPassword('demofinance2026');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({
        name: 'Adrian Pratama',
        email: 'cfo@finpulse.id',
        role: 'Chief Financial Officer',
        company: 'Nusantara Global Tech'
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-600/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Side: Brand narrative (clean, no slop) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            FinPulse Enterprise v2.4
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Keputusan finansial akurat, didukung kecerdasan buatan.
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Platform manajemen arus kas, analitik margin operasional, dan asisten strategi bisnis berbasis Google Gemini untuk para eksekutif dan pemilik usaha.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-xs text-slate-400">Total Arus Kas Terkelola</div>
              <div className="text-lg font-bold text-white mt-1">Rp 18,4 Miliar</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                <TrendingUp size={12} /> +14.2% MoM
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-xs text-slate-400">Efisiensi Audit AI</div>
              <div className="text-lg font-bold text-white mt-1">99.8% Akurasi</div>
              <div className="text-[11px] text-blue-400 flex items-center gap-1 mt-0.5">
                <Sparkles size={12} /> Powered by Gemini
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" /> Enkripsi End-to-End
            </span>
            <span>•</span>
            <span>Standar Laporan PSAK/IFRS</span>
          </div>
        </div>

        {/* Right Side: Clean Login Card */}
        <div className="lg:col-span-6">
          <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-7 shadow-2xl backdrop-blur-xl">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-base">
                  FP
                </div>
                <span className="text-lg font-bold tracking-tight text-white">FinPulse</span>
              </div>
              <h2 className="text-xl font-semibold text-white">Masuk ke Portal Bisnis</h2>
              <p className="text-xs text-slate-400 mt-1">Gunakan akun perusahaan Anda untuk melanjutkan.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Korporat
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@perusahaan.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Kata Sandi
                  </label>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-emerald-400 hover:underline">
                    Lupa sandi?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0 focus:ring-offset-0"
                  />
                  Ingat perangkat ini
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                {loading ? 'Mengotentikasi...' : (
                  <>
                    Masuk ke Dashboard
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-slate-900 px-2 text-slate-500">atau eksplorasi instan</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-medium text-xs transition-colors cursor-pointer"
            >
              <Sparkles size={14} className="text-emerald-400" />
              Masuk dengan Demo Akun CFO (1-Klik)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
