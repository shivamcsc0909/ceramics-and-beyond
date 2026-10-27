import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useClientAuth } from '../../context/ClientAuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('client.admin@ceramicsandbeyond.com');
  const [password, setPassword] = useState('ClientAdmin2026!Secure');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useClientAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#292824] flex flex-col justify-center items-center px-6 py-12">
      {/* Brand Header */}
      <div className="text-center mb-8 max-w-sm">
        <Link to="/" className="inline-block group mb-3">
          <span className="font-serif text-2xl tracking-[0.2em] uppercase font-light text-[#292824]">
            Ceramics &amp; Beyond
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A76F55] block mt-1 font-semibold">
            Client Content CMS
          </span>
        </Link>
        <p className="text-xs text-[#77786B] font-light">
          Editorial control for collections, living case studies, factory journals, and inquiries.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white border border-[#C9BDAA]/40 shadow-xl p-8 sm:p-10">
        <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-[#A76F55] font-semibold mb-6 pb-3 border-b border-[#C9BDAA]/20">
          <ShieldCheck className="w-4 h-4" />
          <span>Atelier Admin Realm</span>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2 rounded-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-architectural text-[#292824] font-medium mb-1.5">
              Client Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#77786B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client.admin@ceramicsandbeyond.com"
                className="w-full pl-10 pr-4 py-3 bg-[#FAF9F6] border border-[#C9BDAA]/60 text-xs sm:text-sm text-[#292824] focus:outline-none focus:border-[#292824] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs uppercase tracking-architectural text-[#292824] font-medium">
                Password
              </label>
              <span className="text-[10px] text-[#77786B] font-mono">Bcrypt Sec</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#77786B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-[#FAF9F6] border border-[#C9BDAA]/60 text-xs sm:text-sm text-[#292824] focus:outline-none focus:border-[#292824] transition-colors font-mono"
              />
            </div>
          </div>

          <div className="p-3 bg-[#FAF9F6] border border-[#C9BDAA]/30 text-[11px] text-[#77786B] space-y-1">
            <p className="font-semibold text-[#292824]">Default Credentials for Verification:</p>
            <p className="font-mono text-[10px]">Email: client.admin@ceramicsandbeyond.com</p>
            <p className="font-mono text-[10px]">Pass: ClientAdmin2026!Secure</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center space-x-2 bg-[#292824] text-[#FAF9F6] py-3.5 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Enter Content CMS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-xs text-[#77786B]">
        <Link to="/" className="hover:text-[#292824] transition-colors">
          &larr; Return to Public Atelier
        </Link>
      </div>
    </div>
  );
};
