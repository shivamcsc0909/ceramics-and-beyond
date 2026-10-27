import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDeveloperAuth } from '../../context/DeveloperAuthContext';
import {
  Activity,
  Users,
  Database as DbIcon,
  Wrench,
  FileText,
  LogOut,
  Shield,
  Terminal,
} from 'lucide-react';

export const DeveloperLayout: React.FC = () => {
  const { user, loading, logout } = useDeveloperAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#151412] text-[#FAF9F6] flex items-center justify-center font-mono text-xs">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 animate-spin text-[#A76F55]" />
          <span>Authenticating Developer Context...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/developer-portal/login');
    return null;
  }

  const menu = [
    { name: 'System Health & Metrics', path: '/developer-portal/dashboard', icon: Activity },
    { name: 'Admin Accounts', path: '/developer-portal/admins', icon: Users },
    { name: 'Database & Media Backups', path: '/developer-portal/backups', icon: DbIcon },
    { name: 'Maintenance Mode', path: '/developer-portal/maintenance', icon: Wrench },
    { name: 'Audit & Event Logs', path: '/developer-portal/logs', icon: FileText },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/developer-portal/login');
  };

  return (
    <div className="min-h-screen bg-[#1A1916] text-[#FAF9F6] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#151412] text-[#FAF9F6] flex-shrink-0 flex flex-col justify-between border-r border-[#33312C]">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-[#33312C]">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-emerald-400 font-semibold">
                Private Portal
              </span>
            </div>
            <Link to="/developer-portal/dashboard" className="block">
              <span className="font-serif text-lg tracking-wider text-white block">
                Engineering Console
              </span>
              <span className="text-[10px] text-[#77786B] font-mono block">
                Ceramics &amp; Beyond Core
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-sm text-xs font-mono transition-colors ${
                    isActive
                      ? 'bg-[#33312C] text-[#FAF9F6] border-l-2 border-[#A76F55]'
                      : 'text-[#77786B] hover:bg-[#22211D] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0 text-[#C9BDAA]" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="p-4 border-t border-[#33312C] space-y-3 bg-[#0D0C0B] font-mono text-xs">
          <div>
            <span className="text-[10px] text-[#77786B] uppercase block">Developer Identity</span>
            <p className="font-medium text-white truncate">{user.display_name}</p>
            <p className="text-[10px] text-[#77786B] truncate">{user.email}</p>
          </div>

          <div className="pt-2 border-t border-[#22211D] flex items-center justify-between">
            <span className="text-[9px] text-emerald-400 font-mono">STATUS: ACTIVE</span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center space-x-1 text-[#A76F55] hover:text-red-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Terminate Session</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main View */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-[#151412] border-b border-[#33312C] flex items-center justify-between px-6 sm:px-8">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#C9BDAA]">
            <Terminal className="w-3.5 h-3.5 text-[#A76F55]" />
            <span>developer-portal &gt; {location.pathname.replace('/developer-portal/', '')}</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[10px] font-mono bg-[#22211D] text-[#C9BDAA] px-2.5 py-1 rounded-sm border border-[#33312C]">
              Role: DEVELOPER_ADMIN
            </span>
          </div>
        </header>

        <div className="p-6 sm:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
