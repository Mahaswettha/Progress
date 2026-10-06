import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  AlertCircle,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { verifyCredentials, createSession, ALLOWED_EMAIL } from '../utils/auth';

interface LoginPageProps {
  darkMode: boolean;
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ darkMode, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const isValid = await verifyCredentials(trimmedEmail, password);

      if (isValid) {
        createSession(trimmedEmail);
        onLoginSuccess();
      } else {
        setError('Invalid email or password. Access restricted.');
      }
    } catch {
      setError('An unexpected error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 font-sans antialiased transition-colors ${
      darkMode ? 'bg-[#0b0f17] text-[#e6edf3]' : 'bg-[#f4f7fb] text-slate-800'
    }`}>
      {/* Background Glow Accents */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none ${darkMode ? 'bg-brand-500/10' : 'bg-brand-400/10'}`} />
      <div className={`absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none ${darkMode ? 'bg-cyan-500/5' : 'bg-cyan-400/10'}`} />

      {/* Main Login Card */}
      <div className={`relative w-full max-w-md border rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 z-10 backdrop-blur-sm ${
        darkMode ? 'bg-[#161b22] border-[#30363d]' : 'bg-white border-slate-200'
      }`}>
        {/* Brand / Logo Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-500/15 border border-brand-500/30 text-brand-500 mb-1">
            <Layers className="w-6 h-6" />
          </div>

          <h1 className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center justify-center gap-1.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            <span className="text-brand-500">Progress</span> Tracker
          </h1>

          <p className={`text-xs sm:text-sm ${darkMode ? 'text-dark-muted' : 'text-slate-500'}`}>
            Personal DSA Learning &amp; Revision Platform
          </p>
        </div>

        {/* Error Alert Message */}
        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className={`text-xs font-semibold block ${darkMode ? 'text-dark-muted' : 'text-slate-600'}`}>
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className={`w-4 h-4 absolute left-3 pointer-events-none ${darkMode ? 'text-dark-muted' : 'text-slate-400'}`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your allowed email"
                autoComplete="email"
                required
                className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-none focus:border-brand-500 transition-colors ${
                  darkMode
                    ? 'bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder:text-dark-muted/50'
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>

          {/* Password Field with Show/Hide */}
          <div className="space-y-1.5">
            <label className={`text-xs font-semibold block ${darkMode ? 'text-dark-muted' : 'text-slate-600'}`}>
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className={`w-4 h-4 absolute left-3 pointer-events-none ${darkMode ? 'text-dark-muted' : 'text-slate-400'}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className={`w-full pl-9 pr-10 py-2 text-xs sm:text-sm rounded-lg border focus:outline-none focus:border-brand-500 transition-colors ${
                  darkMode
                    ? 'bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder:text-dark-muted/50'
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 transition-colors p-0.5 ${darkMode ? 'text-dark-muted hover:text-[#e6edf3]' : 'text-slate-400 hover:text-slate-700'}`}
                title={showPassword ? 'Hide Password' : 'Show Password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Tracker'}</span>
          </button>
        </form>

        {/* Footer Note */}
        <div className={`pt-2 border-t text-center ${darkMode ? 'border-[#21262d]' : 'border-slate-200'}`}>
          <div className={`inline-flex items-center gap-1.5 text-[11px] ${darkMode ? 'text-dark-muted' : 'text-slate-500'}`}>
            <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
            <span>Personal access control for admin </span>
          </div>
        </div>
      </div>
    </div>
  );
};
