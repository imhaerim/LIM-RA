import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Menu, X } from 'lucide-react';
import { usePortfolio } from '../PortfolioContext';
import { AdminPanel } from './AdminPanel';
import { Toaster } from 'sonner';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data } = usePortfolio();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'HOME', path: '#home' },
    { name: 'ABOUT', path: '#about' },
    { name: 'PROCESS', path: '#process' },
    { name: 'PROJECTS', path: '#projects' },
    { name: 'DESIGN', path: '#design' },
    { name: 'INSIGHTS', path: '#insights' },
    { name: 'CONTACT', path: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-white text-ink font-sans selection:bg-ink selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-ink/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold tracking-tighter uppercase">LIMÉRA</a>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <a 
                key={item.path} 
                href={item.path}
                className="text-[11px] font-bold tracking-[0.3em] transition-colors hover:text-pink text-ink/40"
              >
                {item.name}
              </a>
            ))}
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="text-[11px] font-bold tracking-[0.3em] transition-colors hover:text-pink text-ink/40"
            >
              ADMIN
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-2 hover:bg-beige rounded-full transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-24 left-0 w-full bg-white border-b border-ink/5 p-8 space-y-6 overflow-hidden"
            >
              {navItems.map((item) => (
                <a 
                  key={item.path} 
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-2xl font-bold tracking-tight"
                >
                  {item.name}
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="block text-2xl font-bold tracking-tight text-left w-full"
              >
                ADMIN
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-2xl font-bold tracking-tighter uppercase">LIMÉRA</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-ink/30">
            © 2026 {data.name}. All Rights Reserved.
          </div>
          <div className="flex gap-8">
            {navItems.slice(0, 4).map((item) => (
              <a key={item.path} href={item.path} className="text-[10px] font-bold tracking-widest text-ink/40 hover:text-ink">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <Toaster position="top-center" richColors />
    </div>
  );
};
