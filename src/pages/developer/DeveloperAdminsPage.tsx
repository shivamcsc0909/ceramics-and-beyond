import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Users, UserPlus, Key, ShieldAlert, CheckCircle2, Lock, X } from 'lucide-react';

export const DeveloperAdminsPage: React.FC = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [resetModalAdmin, setResetModalAdmin] = useState<any | null>(null);

  // Form states
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [processing, setProcessing] = useState(false);

  const fetchAdmins = async () => {
    try {
      const data = await api.get('/api/developer/admins');
      setAdmins(data);
    } catch (e) {
      console.warn('Could not load admins:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await api.post('/api/developer/admins', {
        email: newEmail,
        display_name: newName,
        password: newPassword,
      });
      setShowCreateModal(false);
      setNewEmail('');
      setNewName('');
      setNewPassword('');
      await fetchAdmins();
    } catch (err: any) {
      alert(err.message || 'Creation failed');
    } finally {
      setProcessing(false);
    }
  };

  const handleSetStatus = async (id: number, status: string) => {
    if (!window.confirm(`Set administrator status to ${status}?`)) return;
    try {
      await api.put(`/api/developer/admins/${id}/status`, { status });
      await fetchAdmins();
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalAdmin) return;
    setProcessing(true);
    try {
      await api.put(`/api/developer/admins/${resetModalAdmin.id}/password`, {
        password: resetPassword,
      });
      setResetModalAdmin(null);
      setResetPassword('');
      alert('Password reset successfully. Active sessions terminated.');
    } catch (err: any) {
      alert(err.message || 'Password reset failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8 font-mono max-w-6xl">
      <div className="bg-[#151412] p-6 border border-[#33312C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-emerald-400 font-semibold block mb-1">
            Access Control Realm
          </span>
          <h2 className="font-serif text-2xl font-light text-white">
            Administrator Accounts &amp; Identities ({admins.length})
          </h2>
          <p className="text-xs text-[#77786B] mt-1 font-sans">
            Provision, revoke, and manage Client Admin accounts without touching the database console.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold px-4 py-2 text-xs tracking-wider uppercase transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Provision Client Admin</span>
        </button>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151412] border border-[#33312C] shadow-2xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#22211D]">
              <h3 className="font-serif text-lg text-white font-medium">Provision Client Admin</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-[#77786B] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase text-[#A39783] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Atelier Director"
                  className="w-full px-3 py-2 bg-[#0D0C0B] border border-[#33312C] text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-[#A39783] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="admin@ceramicsandbeyond.com"
                  className="w-full px-3 py-2 bg-[#0D0C0B] border border-[#33312C] text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-[#A39783] mb-1">Initial Password (min 8 chars)</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 bg-[#0D0C0B] border border-[#33312C] text-white"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#22211D]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 border border-[#33312C] text-[#77786B] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-emerald-600 hover:bg-emerald-500 text-black px-4 py-1.5 font-bold uppercase text-[11px]"
                >
                  {processing ? 'Provisioning...' : 'Provision Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {resetModalAdmin && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151412] border border-[#33312C] shadow-2xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#22211D]">
              <h3 className="font-serif text-lg text-white font-medium">
                Reset Secret: {resetModalAdmin.email}
              </h3>
              <button
                type="button"
                onClick={() => setResetModalAdmin(null)}
                className="text-[#77786B] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase text-[#A39783] mb-1">New Secure Password</label>
                <input
                  type="password"
                  required
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 bg-[#0D0C0B] border border-[#33312C] text-white"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#22211D]">
                <button
                  type="button"
                  onClick={() => setResetModalAdmin(null)}
                  className="px-3 py-1.5 border border-[#33312C] text-[#77786B] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-emerald-600 hover:bg-emerald-500 text-black px-4 py-1.5 font-bold uppercase text-[11px]"
                >
                  {processing ? 'Overwriting...' : 'Reset Secret'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admins Table */}
      <div className="bg-[#151412] border border-[#33312C] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#77786B]">Loading administrative accounts...</div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0D0C0B] border-b border-[#33312C] text-[#77786B] font-mono text-[10px] uppercase tracking-wider">
                <th className="p-4">Identity / Email</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Failed Logins</th>
                <th className="p-4">Last Activity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#22211D]">
              {admins.map((adm) => (
                <tr key={adm.id} className="hover:bg-[#1A1916]">
                  <td className="p-4">
                    <span className="text-white font-medium block">{adm.display_name}</span>
                    <span className="text-[11px] text-[#77786B] font-mono">{adm.email}</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] rounded-sm font-mono ${
                        adm.role_name === 'DEVELOPER_ADMIN'
                          ? 'bg-purple-950/60 text-purple-300 border border-purple-800'
                          : 'bg-blue-950/60 text-blue-300 border border-blue-800'
                      }`}
                    >
                      {adm.role_name}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono rounded-sm ${
                        adm.status === 'active'
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'bg-red-950 text-red-400'
                      }`}
                    >
                      {adm.status}
                    </span>
                  </td>
                  <td className="p-4 text-[#77786B]">{adm.failed_logins || 0}</td>
                  <td className="p-4 text-[11px] text-[#77786B]">{adm.last_login_at || 'Never'}</td>
                  <td className="p-4 text-right space-x-3">
                    <button
                      type="button"
                      onClick={() => setResetModalAdmin(adm)}
                      className="text-emerald-400 hover:underline"
                    >
                      Reset Pass
                    </button>

                    {adm.role_name !== 'DEVELOPER_ADMIN' && (
                      adm.status === 'active' ? (
                        <button
                          type="button"
                          onClick={() => handleSetStatus(adm.id, 'revoked')}
                          className="text-red-400 hover:underline"
                        >
                          Revoke
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetStatus(adm.id, 'active')}
                          className="text-emerald-400 hover:underline"
                        >
                          Reactivate
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
