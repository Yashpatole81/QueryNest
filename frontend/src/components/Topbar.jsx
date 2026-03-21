import React from 'react';
import FileUpload from './FileUpload';
import { useAppContext } from '../context/AppContext';
import { Moon, Sun, Menu } from 'lucide-react';

const Topbar = () => {
  const { theme, toggleTheme, toggleMobileSidebar } = useAppContext();

  return (
    <header className="h-15 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-neutral-800 sticky top-0 z-20 flex items-center justify-between px-6 shadow-sm">
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMobileSidebar}
          className="p-2 -ml-2 rounded-xl text-slate-500 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-900 transition-colors"
          aria-label="Open Sidebar"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-neutral-800 text-slate-500 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-900 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <FileUpload />
      </div>
    </header>
  );
};

export default Topbar;
