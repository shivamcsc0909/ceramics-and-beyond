import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useClientAuth } from '../../context/ClientAuthContext';
import {
  LayoutDashboard,
  Home,
  Layers,
  Package,
  Image as ImageIcon,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, loading, logout } = useClientAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F2EC] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#292824] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    navigate('/admin/login');
    return null;
  }

  const menu = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Ceramic Products', path: '/admin/products', icon: Package },
    { name: 'Product Categories', path: '/admin/categories', icon: Layers },
    { name: 'Homepage Editor', path: '/admin/homepage', icon: Home },
    { name: 'Trade Enquiries', path: '/admin/enquiries', icon: Mail },
    { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { name: 'Atelier Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#292824] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#292824] text-[#FAF9F6] flex-shrink-0 flex flex-col justify-between border-r border-[#33312C]">
        <div>
          {/* Brand Wordmark & Role Badge */}
          <div className="p-6 border-b border-[#33312C]">
            <Link to="/admin/dashboard" className="block">
              <span className="font-serif text-lg tracking-widest uppercase block text-white">
                Ceramics &amp; Beyond
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A76F55] font-semibold block mt-1">
                Manufacturer CMS · New Delhi
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
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-sm text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#A76F55] text-white'
                      : 'text-[#FAF9F6]/80 hover:bg-[#33312C] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Status & Footer */}
        <div className="p-4 border-t border-[#33312C]">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="truncate">
              <p className="text-xs font-medium text-white truncate">{user.name}</p>
              <p className="text-[10px] text-[#A76F55] font-mono tracking-wider">CLIENT_ADMIN</p>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              title="Open Public Site"
              className="p-1.5 text-[#C9BDAA] hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-[#33312C] text-xs font-medium text-[#FAF9F6] hover:bg-[#A76F55] transition-colors rounded-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};
