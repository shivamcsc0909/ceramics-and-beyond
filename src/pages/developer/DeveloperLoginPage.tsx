import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeveloperAuth } from '../../context/DeveloperAuthContext';
import { Terminal, Shield, Lock, ArrowRight, AlertTriangle } from 'lucide-react';

export const DeveloperLoginPage: React.FC = () => {
  const [email, setEmail] = useState('dev.portal@ceramicsandbeyond.com');
  const [password, setPassword] = useState('DevPortal2026!Master');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useDeveloperAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      await login(email, password);
      navigate('/developer-portal/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Access denied. You do not possess authorizations for this administration realm.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0C0B] text-[#FAF9F6] flex flex-col justify-center items-center px-6 py-12 font-mono">
      {/* Console Header */}
      <div className="text-center mb-8 max-w-sm">
        <div className="inline-flex items-center space-x-2 text-emerald-400 mb-3 text-xs">
          <Terminal className="w-4 h-4" />
          <span className="uppercase tracking-widest font-bold">Confidential Access</span>
        </div>
        <h1 className="font-serif text-2xl font-light tracking-wider text-white">
          Engineering Console
        </h1>
        <p className="text-[11px] text-[#77786B] mt-1 font-mono">
          Private Infrastructure Management · Non-Indexable Realm
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-[#151412] border border-[#33312C] shadow-2xl p-8 sm:p-10">
        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-6 pb-3 border-b border-[#22211D]">
          <Shield className="w-3.5 h-3.5" />
          <span>Realm: CB_DEV_SESSION (HttpOnly)</span>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-start space-x-2 rounded-sm">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="block uppercase tracking-wider text-[#C9BDAA] mb-1.5 text-[10px]">
              Developer Identity
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dev.portal@ceramicsandbeyond.com"
              className="w-full px-3.5 py-3 bg-[#0D0C0B] border border-[#33312C] text-white focus:outline-none focus:border-emerald-500 font-mono text-xs transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="uppercase tracking-wider text-[#C9BDAA] text-[10px]">
                Master Secret
              </label>
              <span className="text-[10px] text-[#77786B]">Isolated Key</span>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-3 bg-[#0D0C0B] border border-[#33312C] text-white focus:outline-none focus:border-emerald-500 font-mono text-xs transition-colors"
            />
          </div>

          <div className="p-3 bg-[#0D0C0B] border border-[#22211D] text-[10px] text-[#77786B] space-y-1">
            <p className="text-white font-medium">Default Dev Credentials:</p>
            <p>dev.portal@ceramicsandbeyond.com</p>
            <p>DevPortal2026!Master</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold py-3.5 text-xs tracking-wider uppercase transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating Realm...</span>
            ) : (
              <>
                <span>Enter Developer Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-[10px] text-[#555]">
        Private System · All Access Logged via Audit Trail with IP
      </div>
    </div>
  );
};
