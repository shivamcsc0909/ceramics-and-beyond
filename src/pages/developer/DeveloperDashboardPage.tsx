import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import {
  Activity,
  HardDrive,
  Cpu,
  Clock,
  Database as DbIcon,
  Shield,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';

export const DeveloperDashboardPage: React.FC = () => {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    try {
      const data = await api.get('/api/developer/health');
      setHealth(data);
    } catch (e) {
      console.warn('Could not load health metrics:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16 font-mono text-xs text-[#77786B]">
        <RefreshCw className="w-4 h-4 animate-spin mr-2 text-emerald-400" />
        <span>Querying Host Runtime Environment...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-mono max-w-6xl">
      {/* Top Console Status Bar */}
      <div className="bg-[#151412] p-6 border border-[#33312C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold uppercase tracking-wider">Hostinger Shared Runtime Active</span>
          </div>
          <h2 className="font-serif text-2xl font-light text-white">
            System Health &amp; Runtime Metrics
          </h2>
          <p className="text-xs text-[#77786B] mt-1 font-sans">
            Real-time diagnostic metrics compliant with shared hosting execution constraints.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchHealth}
          className="inline-flex items-center space-x-2 bg-[#22211D] border border-[#33312C] hover:border-emerald-500 text-white px-3.5 py-2 text-xs transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Diagnostics</span>
        </button>
      </div>

      {/* Grid of 4 System Diagnostic Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* PHP Runtime */}
        <div className="bg-[#151412] border border-[#33312C] p-5 space-y-3">
          <div className="flex items-center justify-between text-[#77786B] text-xs">
            <span className="uppercase text-[10px]">PHP Engine</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl text-white font-bold">{health?.php_version || '8.3+'}</div>
          <div className="text-[11px] text-[#A39783] space-y-1 pt-2 border-t border-[#22211D]">
            <div>SAPI: {health?.php_sapi}</div>
            <div>Memory Limit: {health?.memory_limit}</div>
            <div>Max Exec: {health?.max_execution_time}</div>
          </div>
        </div>

        {/* Database & Latency */}
        <div className="bg-[#151412] border border-[#33312C] p-5 space-y-3">
          <div className="flex items-center justify-between text-[#77786B] text-xs">
            <span className="uppercase text-[10px]">Database PDO</span>
            <DbIcon className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl text-white font-bold uppercase">
            {health?.database?.driver}
          </div>
          <div className="text-[11px] text-[#A39783] space-y-1 pt-2 border-t border-[#22211D]">
            <div className="flex items-center space-x-1 text-emerald-400">
              <CheckCircle className="w-3 h-3" />
              <span>Status: Connected</span>
            </div>
            <div>Latency: {health?.database?.latency_ms} ms</div>
            <div>Prepared Stmts: Active</div>
          </div>
        </div>

        {/* Storage: Uploads & Backups */}
        <div className="bg-[#151412] border border-[#33312C] p-5 space-y-3">
          <div className="flex items-center justify-between text-[#77786B] text-xs">
            <span className="uppercase text-[10px]">Isolated Storage</span>
            <HardDrive className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl text-white font-bold">
            {((health?.storage?.uploads_bytes || 0) / 1024 / 1024).toFixed(2)} MB
          </div>
          <div className="text-[11px] text-[#A39783] space-y-1 pt-2 border-t border-[#22211D]">
            <div>Uploads: {health?.storage?.uploads_count} assets</div>
            <div>
              Backups: {((health?.storage?.backups_bytes || 0) / 1024).toFixed(1)} KB ({health?.storage?.backups_count} archives)
            </div>
            <div>Script Execution: Disabled</div>
          </div>
        </div>

        {/* Maintenance State */}
        <div className="bg-[#151412] border border-[#33312C] p-5 space-y-3">
          <div className="flex items-center justify-between text-[#77786B] text-xs">
            <span className="uppercase text-[10px]">Maintenance Status</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold">
            {health?.maintenance?.is_active ? (
              <span className="text-amber-400 flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4" />
                <span>ACTIVE</span>
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>ONLINE</span>
              </span>
            )}
          </div>
          <div className="text-[11px] text-[#A39783] space-y-1 pt-2 border-t border-[#22211D]">
            <div>Public Bypass: IP allowlist</div>
            <div>Dev/Admin: Always online</div>
            <div>Status: {health?.maintenance?.is_active ? 'In Maintenance' : 'Publicly Accessible'}</div>
          </div>
        </div>
      </div>

      {/* Security Architecture Verification Box */}
      <div className="bg-[#151412] border border-[#33312C] p-6 space-y-4">
        <div className="flex items-center space-x-2 text-white font-medium text-sm pb-3 border-b border-[#22211D]">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Hostinger Security Isolation Manifest</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-[#0D0C0B] border border-[#22211D] space-y-1">
            <span className="text-[10px] text-[#77786B] block">Session Namespaces</span>
            <span className="text-emerald-400 block font-semibold">Strict Separation</span>
            <p className="text-[10px] text-[#77786B]">CB_CLIENT_SESS vs CB_DEV_SESS</p>
          </div>

          <div className="p-3 bg-[#0D0C0B] border border-[#22211D] space-y-1">
            <span className="text-[10px] text-[#77786B] block">Rate Limit Policy</span>
            <span className="text-emerald-400 block font-semibold">5 Tries / 15 Min Lockout</span>
            <p className="text-[10px] text-[#77786B]">Recorded per IP in login_attempts</p>
          </div>

          <div className="p-3 bg-[#0D0C0B] border border-[#22211D] space-y-1">
            <span className="text-[10px] text-[#77786B] block">Search Engine Crawlers</span>
            <span className="text-emerald-400 block font-semibold">X-Robots-Tag: noindex</span>
            <p className="text-[10px] text-[#77786B]">Omitted from sitemap.xml &amp; robots.txt</p>
          </div>
        </div>
      </div>
    </div>
  );
};
