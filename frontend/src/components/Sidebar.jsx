import React, { useState, useEffect } from 'react';
import { PanelLeftClose, PanelLeft, MessageSquare, X } from 'lucide-react';
import clsx from 'clsx';
import NewChatButton from './NewChatButton';
import SidebarSearch from './SidebarSearch';
import HistoryList from './HistoryList';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const { isMobileSidebarOpen, setIsMobileSidebarOpen } = useAppContext();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebarCollapsed') === 'true';
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + B or Cmd + B
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setIsCollapsed(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <aside className={clsx(
        "bg-[#f9f9f9] dark:bg-neutral-900 border-r border-slate-200 dark:border-neutral-800 flex flex-col h-full overflow-hidden shadow-sm z-50 transition-all duration-300 fixed md:relative rounded-r-2xl",
        // Desktop widths
        isCollapsed ? "md:w-[70px]" : "md:w-[260px]",
        // Mobile visibility
        isMobileSidebarOpen ? "translate-x-0 w-[260px]" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Top Toggle & Logo area */}
        <div className="flex flex-col gap-2 p-3 mt-1">
          <div className="flex items-center mb-1 h-10 px-1">
            {!isCollapsed ? (
              <div className="flex items-center justify-between w-full">
                <div className="bg-slate-900 dark:bg-neutral-800 text-white p-1.5 rounded-lg shrink-0 flex items-center justify-center">
                  <MessageSquare size={18} />
                </div>
                
                {/* Desktop Close */}
                <button 
                  onClick={() => setIsCollapsed(true)}
                  className="p-1.5 rounded-xl text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors hidden md:block"
                  title="Collapse sidebar (Ctrl+B)"
                >
                  <PanelLeftClose size={20} />
                </button>

                {/* Mobile Close */}
                <button 
                  className="md:hidden p-2 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <button 
                  onClick={() => setIsCollapsed(false)}
                  className="group relative w-10 h-10 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center text-neutral-500 dark:text-neutral-400 hidden md:flex"
                  title="Expand sidebar (Ctrl+B)"
                >
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0 group-hover:scale-95">
                    <div className="bg-slate-900 dark:bg-neutral-800 text-white p-1.5 rounded-lg flex items-center justify-center">
                      <MessageSquare size={18} />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 dark:group-hover:text-neutral-100">
                    <PanelLeft size={20} />
                  </div>
                </button>
              </div>
            )}
          </div>
          <NewChatButton isCollapsed={isCollapsed} />
        </div>
        
        {/* Search */}
        <div className="px-3 mb-2">
          <SidebarSearch isCollapsed={isCollapsed} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* List */}
        <HistoryList isCollapsed={isCollapsed} searchQuery={searchQuery} />

      </aside>
    </>
  );
};

export default Sidebar;
