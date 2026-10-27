import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Wrench, Shield, Check, AlertTriangle, Save, RefreshCw } from 'lucide-react';

export const DeveloperMaintenancePage: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('We are currently performing scheduled refinement. Please return shortly.');
  const [reason, setReason] = useState('Routine Refinement');
  const [allowedIps, setAllowedIps] = useState('127.0.0.1');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchHealth = async () => {
    try {
      const data = await api.get('/api/developer/health');
      if (data?.maintenance) {
        setIsActive(!!data.maintenance.is_active);
        if (data.maintenance.message) setMessage(data.maintenance.message);
        if (data.maintenance.reason) setReason(data.maintenance.reason);
        if (Array.isArray(data.maintenance.allowed_ips) && data.maintenance.allowed_ips.length > 0) {
          setAllowedIps(data.maintenance.allowed_ips.join(', '));
        }
      }
    } catch (e) {
      console.warn('Could not load maintenance settings:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const ips = allowedIps
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await api.put('/api/developer/maintenance', {
        is_active: isActive,
        message,
        reason,
        allowed_ips: ips,
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Maintenance update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16 font-mono text-xs text-[#77786B]">
        <RefreshCw className="w-4 h-4 animate-spin mr-2 text-emerald-400" />
        <span>Loading Maintenance Configuration...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-mono max-w-4xl">
      <div className="bg-[#151412] p-6 border border-[#33312C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-emerald-400 font-semibold block mb-1">
            Service Availability Controls
          </span>
          <h2 className="font-serif text-2xl font-light text-white">
            Maintenance Mode &amp; Suspension
          </h2>
          <p className="text-xs text-[#77786B] mt-1 font-sans">
            Toggles public frontend lock while keeping /admin and /developer-portal fully operational.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold px-4 py-2 text-xs tracking-wider uppercase transition-colors disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : saveSuccess ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Applied!</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save Mode</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Toggle Switch */}
        <div className="bg-[#151412] border border-[#33312C] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-sm text-white font-medium block">Enable Maintenance Mode</span>
              <p className="text-xs text-[#77786B] font-sans">
                When active, all public visitors receive a branded Atelier maintenance notice.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isActive ? 'bg-amber-500' : 'bg-[#33312C]'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div
            className={`p-3 text-xs border rounded-sm flex items-center space-x-2 ${
              isActive
                ? 'bg-amber-950/40 border-amber-800 text-amber-300'
                : 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
            }`}
          >
            {isActive ? (
              <>
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Public site is currently locked with HTTP 503 maintenance response.</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>Public site is currently live and serving visitors normally.</span>
              </>
            )}
          </div>
        </div>

        {/* Message & Reason */}
        <div className="bg-[#151412] border border-[#33312C] p-6 space-y-4 text-xs">
          <div>
            <label className="block text-[10px] uppercase text-[#A39783] mb-1">
              Public Customer Message
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0D0C0B] border border-[#33312C] text-white focus:outline-none focus:border-emerald-500 font-sans"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase text-[#A39783] mb-1">
              Internal Rationale (Recorded in Audit Logs)
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Hostinger PHP Upgrade / Quarry Database Sync"
              className="w-full px-3.5 py-2.5 bg-[#0D0C0B] border border-[#33312C] text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase text-[#A39783] mb-1">
              Allowed IP Addresses (Comma-separated bypass)
            </label>
            <input
              type="text"
              value={allowedIps}
              onChange={(e) => setAllowedIps(e.target.value)}
              placeholder="127.0.0.1, 192.168.1.1"
              className="w-full px-3.5 py-2.5 bg-[#0D0C0B] border border-[#33312C] text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
