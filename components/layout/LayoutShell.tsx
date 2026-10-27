"use client";

import React, { useState } from "react";
import { Header } from "./Header";
import { NavigationDrawer } from "./NavigationDrawer";
import { Footer } from "./Footer";

export const LayoutShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC] text-[#292824] antialiased selection:bg-[#292824] selection:text-[#FAF9F6]">
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        isMenuOpen={isMenuOpen}
      />
      
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      <Footer />
    </div>
  );
};
