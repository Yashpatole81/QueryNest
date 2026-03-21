import React from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { useAppContext } from '../context/AppContext';

const NewChatButton = ({ isCollapsed }) => {
  const { clearResults, setCurrentQuery, isMobileSidebarOpen, setIsMobileSidebarOpen } = useAppContext();

  const handleNewChat = () => {
    clearResults();
    setCurrentQuery('');
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <button
      onClick={handleNewChat}
      title={isCollapsed ? "New Chat" : undefined}
      className={clsx(
        "flex items-center gap-3 w-full p-2.5 rounded-xl transition-all duration-200 group text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800",
        isCollapsed ? "justify-center" : "px-3"
      )}
    >
      <div className="flex-shrink-0">
        <Plus size={20} className="text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-100 transition-colors" />
      </div>
      {!isCollapsed && <span className="font-medium truncate text-sm">New Chat</span>}
    </button>
  );
};

export default NewChatButton;
