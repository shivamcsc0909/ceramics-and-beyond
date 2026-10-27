import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { FileText, Search, RefreshCw, Shield, Terminal } from 'lucide-react';

export const DeveloperLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  const fetchLogs = async () => {
    try {
      const data = await api.get('/api/developer/logs');
      setLogs(data);
    } catch (e) {
      console.warn('Could not load logs:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      (l.user_email && l.user_email.toLowerCase().includes(search.toLowerCase())) ||
      (l.ip_address && l.ip_address.includes(search))
  );

  return (
    <div className="space-y-8 font-mono max-w-6xl">
      <div className="bg-[#151412] p-6 border border-[#33312C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-emerald-400 font-semibold block mb-1">
            Tamper-Resistant Auditing
          </span>
          <h2 className="font-serif text-2xl font-light text-white">
            Audit Trail &amp; Access Logs ({logs.length})
          </h2>
          <p className="text-xs text-[#77786B] mt-1 font-sans">
            Chronological record of logins, role updates, content revisions, and configuration mutations.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchLogs}
          className="inline-flex items-center space-x-2 bg-[#22211D] border border-[#33312C] hover:border-emerald-500 text-white px-3.5 py-2 text-xs transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Trail</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-xs text-xs">
          <Search className="w-4 h-4 text-[#77786B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search action, user, or IP..."
            className="w-full pl-9 pr-3 py-2 bg-[#151412] border border-[#33312C] text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-[#151412] border border-[#33312C] overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-xs text-[#77786B]">Streaming audit log entries...</div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#77786B]">No matching audit records found.</div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0D0C0B] border-b border-[#33312C] text-[#77786B] text-[10px] uppercase tracking-wider">
                  <th className="p-3.5">Action</th>
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">IP</th>
                  <th className="p-3.5">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22211D]">
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className={`hover:bg-[#1A1916] cursor-pointer transition-colors ${
                      selectedLog?.id === log.id ? 'bg-[#22211D]' : ''
                    }`}
                  >
                    <td className="p-3.5">
                      <span className="font-semibold text-emerald-400 block">{log.action}</span>
                      <span className="text-[10px] text-[#77786B]">
                        {log.portal_type} · {log.entity_type || 'system'} #{log.entity_id || '0'}
                      </span>
                    </td>
                    <td className="p-3.5 text-[#C9BDAA]">
                      <span>{log.user_email || `ID ${log.user_id}`}</span>
                    </td>
                    <td className="p-3.5 text-[#77786B] font-mono text-[11px]">{log.ip_address}</td>
                    <td className="p-3.5 text-[11px] text-[#77786B]">{log.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Selected Log Inspector */}
        <div className="lg:col-span-4 bg-[#151412] border border-[#33312C] p-6 sticky top-24 space-y-4">
          <div className="pb-3 border-b border-[#22211D] flex items-center justify-between">
            <span className="text-[10px] uppercase text-emerald-400 font-bold">Event Details</span>
            <span className="text-[10px] text-[#77786B]">ID #{selectedLog?.id || '—'}</span>
          </div>

          {selectedLog ? (
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] text-[#77786B] uppercase block">Action Code</span>
                <span className="text-white font-bold">{selectedLog.action}</span>
              </div>

              <div>
                <span className="text-[10px] text-[#77786B] uppercase block">Actor</span>
                <span className="text-white">{selectedLog.user_email || 'System / Unauthenticated'}</span>
              </div>

              <div>
                <span className="text-[10px] text-[#77786B] uppercase block">Origin IP Address</span>
                <span className="text-[#A39783] font-mono">{selectedLog.ip_address}</span>
              </div>

              <div>
                <span className="text-[10px] text-[#77786B] uppercase block">Execution Timestamp</span>
                <span className="text-[#A39783] font-mono">{selectedLog.created_at}</span>
              </div>

              <div>
                <span className="text-[10px] text-[#77786B] uppercase block mb-1">Payload Details (JSON)</span>
                <pre className="p-3 bg-[#0D0C0B] border border-[#22211D] text-[10px] text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(selectedLog.details, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-[#77786B]">
              <Terminal className="w-8 h-8 mx-auto mb-2 text-[#33312C]" />
              <p>Select any event from the stream to view structured payload details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
