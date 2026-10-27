import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { NavigationDrawer } from './NavigationDrawer';
import { Footer } from './Footer';
import { api } from '../../api/client';
import { Wrench } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [maintenance, setMaintenance] = useState<{ is_maintenance: boolean; message: string }>({
    is_maintenance: false,
    message: '',
  });
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const data = await api.get('/api/public/maintenance');
        setMaintenance(data);
      } catch {
        // Fallback: continue normally
      } finally {
        setChecking(false);
      }
    };
    checkMaintenance();
  }, []);

  if (!checking && maintenance.is_maintenance) {
    return (
      <div className="min-h-screen bg-[#1A1916] text-[#FAF9F6] flex items-center justify-center p-6">
        <div className="max-w-xl text-center p-8 sm:p-12 bg-[#22211D] border border-[#C9BDAA]/20 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#A76F55]/20 text-[#A76F55] flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-8 h-8 animate-pulse" />
          </div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A76F55] block mb-2 font-mono">
            Scheduled Atelier Refinement
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-white mb-4">
            Ceramics &amp; Beyond
          </h1>
          <p className="text-sm sm:text-base text-[#C9BDAA] font-light leading-relaxed mb-6">
            {maintenance.message || 'We are currently performing planned system maintenance. Our team will return shortly.'}
          </p>
          <div className="text-xs text-[#77786B] font-mono pt-4 border-t border-[#33312C]">
            Direct urgent communications: <a href="mailto:hello@example.com" className="text-[#FAF9F6] underline">hello@example.com</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC] text-[#292824] antialiased">
      <Header onOpenMenu={() => setIsMenuOpen(true)} isMenuOpen={isMenuOpen} />
      <NavigationDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
