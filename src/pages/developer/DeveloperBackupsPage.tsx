import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Database, Archive, Download, RefreshCw, CheckCircle2, Shield, AlertTriangle } from 'lucide-react';

export const DeveloperBackupsPage: React.FC = () => {
  const [backups, setBackups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingDb, setCreatingDb] = useState(false);
  const [creatingMedia, setCreatingMedia] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const fetchBackups = async () => {
    try {
      const data = await api.get('/api/developer/backups');
      setBackups(data);
    } catch (e) {
      console.warn('Could not load backups:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  const handleCreateDatabaseBackup = async () => {
    setCreatingDb(true);
    setLastAction(null);
    try {
      const res = await api.post('/api/developer/backups/database');
      setLastAction(`Database backup created: ${res.filename} (${(res.file_size / 1024).toFixed(1)} KB)`);
      await fetchBackups();
    } catch (err: any) {
      alert(err.message || 'Database backup failed');
    } finally {
      setCreatingDb(false);
    }
  };

  const handleCreateMediaBackup = async () => {
    setCreatingMedia(true);
    setLastAction(null);
    try {
      const res = await api.post('/api/developer/backups/media');
      setLastAction(`Media backup created: ${res.filename} (${(res.file_size / 1024).toFixed(1)} KB)`);
      await fetchBackups();
    } catch (err: any) {
      alert(err.message || 'Media backup failed');
    } finally {
      setCreatingMedia(false);
    }
  };

  return (
    <div className="space-y-8 font-mono max-w-6xl">
      <div className="bg-[#151412] p-6 border border-[#33312C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-emerald-400 font-semibold block mb-1">
            Cold Storage &amp; Disaster Recovery
          </span>
          <h2 className="font-serif text-2xl font-light text-white">
            Database &amp; Media Backups ({backups.length})
          </h2>
          <p className="text-xs text-[#77786B] mt-1 font-sans">
            Pure PHP SQL dump engine compatible with Hostinger shared hosting where mysqldump exec is disabled.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            disabled={creatingDb}
            onClick={handleCreateDatabaseBackup}
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold px-4 py-2 text-xs tracking-wider uppercase transition-colors disabled:opacity-50"
          >
            {creatingDb ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Database className="w-3.5 h-3.5" />}
            <span>Export Database SQL</span>
          </button>

          <button
            type="button"
            disabled={creatingMedia}
            onClick={handleCreateMediaBackup}
            className="inline-flex items-center space-x-2 bg-[#22211D] border border-[#33312C] hover:border-emerald-500 text-white px-4 py-2 text-xs tracking-wider uppercase transition-colors disabled:opacity-50"
          >
            {creatingMedia ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Archive className="w-3.5 h-3.5" />}
            <span>Archive Media (ZIP)</span>
          </button>
        </div>
      </div>

      {lastAction && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
          <span>{lastAction}</span>
        </div>
      )}

      {/* Security Architecture Note */}
      <div className="p-4 bg-[#151412] border border-[#33312C] text-xs text-[#A39783] space-y-1">
        <div className="flex items-center space-x-2 text-white font-medium">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Storage Protection Policy</span>
        </div>
        <p className="text-[11px] text-[#77786B]">
          Backups are stored inside <code>storage/backups/</code> with an Apache <code>.htaccess</code> rule executing <code>Require all denied</code>. Direct browser URL access is blocked by the web server.
        </p>
      </div>

      {/* Backups List */}
      <div className="bg-[#151412] border border-[#33312C] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#77786B]">Loading backup history...</div>
        ) : backups.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#77786B]">
            No backups created yet. Click &quot;Export Database SQL&quot; to generate an initial baseline dump.
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0D0C0B] border-b border-[#33312C] text-[#77786B] font-mono text-[10px] uppercase tracking-wider">
                <th className="p-4">Type</th>
                <th className="p-4">Filename</th>
                <th className="p-4">Size</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#22211D]">
              {backups.map((b) => (
                <tr key={b.id} className="hover:bg-[#1A1916]">
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-0.5 text-[10px] font-mono rounded-sm ${
                        b.backup_type === 'database'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {b.backup_type === 'database' ? <Database className="w-3 h-3" /> : <Archive className="w-3 h-3" />}
                      <span className="uppercase">{b.backup_type}</span>
                    </span>
                  </td>
                  <td className="p-4 font-mono text-white text-xs">{b.filename}</td>
                  <td className="p-4 text-[#77786B]">{(b.file_size / 1024).toFixed(1)} KB</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded-sm bg-emerald-950 text-emerald-400">
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-[11px] text-[#77786B]">{b.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
