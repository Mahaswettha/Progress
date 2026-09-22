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
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
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
    <div className="min-h-screen w-full bg-[#0b0f17] flex flex-col items-center justify-center p-4 sm:p-6 text-[#e6edf3] font-sans antialiased">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 z-10 backdrop-blur-sm">
        {/* Brand / Logo Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-500/15 border border-brand-500/30 text-brand-500 mb-1">
            <Layers className="w-6 h-6" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
            <span className="text-brand-500">Progress</span> Tracker
          </h1>

          <p className="text-xs sm:text-sm text-dark-muted">
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
            <label className="text-xs font-semibold text-dark-muted block">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 absolute left-3 text-dark-muted pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your allowed email"
                autoComplete="email"
                required
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-dark-muted/50 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

          {/* Password Field with Show/Hide */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-dark-muted block">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-3 text-dark-muted pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-dark-muted/50 focus:outline-none focus:border-brand-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-dark-muted hover:text-[#e6edf3] transition-colors p-0.5"
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
        <div className="pt-2 border-t border-[#21262d] text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-dark-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
            <span>Personal access control for admin </span>
          </div>
        </div>
      </div>
    </div>
  );
};
