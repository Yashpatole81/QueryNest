import React, { useState } from 'react';
import { MessageSquare, Trash2, Check, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import clsx from 'clsx';

const SidebarItem = ({ item, isCollapsed, isActive }) => {
  const { loadFromHistory, deleteFromHistory, isMobileSidebarOpen, setIsMobileSidebarOpen } = useAppContext();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleLoad = () => {
    loadFromHistory(item);
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsConfirming(true);
  };

  const handleConfirmDelete = (e) => {
    e.stopPropagation();
    deleteFromHistory(item.id);
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    setIsConfirming(false);
  };

  return (
    <div 
      className="relative group w-full"
      onMouseLeave={() => isConfirming && setIsConfirming(false)}
    >
      <button
        onClick={handleLoad}
        title={isCollapsed ? item.query : undefined}
        className={clsx(
          "flex items-center gap-3 w-full p-2.5 rounded-xl transition-colors duration-200 text-neutral-700 dark:text-neutral-200",
          isActive 
            ? "bg-neutral-200 dark:bg-neutral-800 font-medium" 
            : "hover:bg-neutral-100 dark:hover:bg-neutral-800/60",
          isCollapsed ? "justify-center" : "px-3 pr-16"
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

      {!isCollapsed && (
        <div
          className={clsx(
            "absolute right-2 top-1/2 -translate-y-1/2 flex items-center transition-all duration-200 z-10",
            (isActive || isConfirming) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          {isConfirming ? (
            <div className="flex items-center gap-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg p-1 animate-in fade-in zoom-in-95 duration-200 shadow-sm">
              <button 
                onClick={handleConfirmDelete} 
                className="p-1 rounded hover:bg-white dark:hover:bg-neutral-600 text-red-600 dark:text-red-400 transition-colors" 
                title="Confirm delete"
              >
                <Check size={14} strokeWidth={3} />
              </button>
              <button 
                onClick={handleCancelDelete} 
                className="p-1 rounded hover:bg-white dark:hover:bg-neutral-600 text-neutral-500 dark:text-neutral-300 transition-colors" 
                title="Cancel"
              >
                <X size={14} strokeWidth={3} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleDeleteClick}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
              title="Delete chat"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
