import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import clsx from 'clsx';

const SidebarItem = ({ item, isCollapsed, isActive }) => {
  const { loadFromHistory, isMobileSidebarOpen, setIsMobileSidebarOpen } = useAppContext();

  const handleLoad = () => {
    loadFromHistory(item);
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <button
      onClick={handleLoad}
      title={isCollapsed ? item.query : undefined}
      className={clsx(
        "flex items-center gap-3 w-full p-2.5 rounded-xl transition-colors duration-200 group text-neutral-700 dark:text-neutral-200",
        isActive 
          ? "bg-neutral-200 dark:bg-neutral-800 font-medium" 
          : "hover:bg-neutral-100 dark:hover:bg-neutral-800/60",
        isCollapsed ? "justify-center" : "px-3"
      )}
    >
      <div className="flex-shrink-0">
        <MessageSquare size={18} className={clsx(
          "transition-colors",
          isActive ? "text-neutral-800 dark:text-neutral-100" : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300"
        )} />
      </div>
      {!isCollapsed && (
        <span className="truncate text-sm opacity-100 animate-in fade-in duration-300 flex-1 text-left w-full h-5 leading-5 items-center">
          {item.query}
        </span>
      )}
    </button>
  );
};

export default SidebarItem;
