import React from 'react';
import SidebarItem from './SidebarItem';
import { useAppContext } from '../context/AppContext';

const HistoryList = ({ isCollapsed, searchQuery }) => {
  const { history, currentSessionId } = useAppContext();

  const filteredHistory = history.filter(item => 
    (item.title || item.query).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-1 w-full space-y-1 mt-2 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {filteredHistory.length === 0 ? (
        <div className="text-sm text-neutral-400 dark:text-neutral-600 text-center mt-6 italic px-2">
          {!isCollapsed && (searchQuery ? "No chats found" : "No history yet")}
        </div>
      ) : (
        filteredHistory.map((item) => (
          <SidebarItem 
            key={item.id} 
            item={item} 
            isCollapsed={isCollapsed} 
            isActive={currentSessionId === item.id}
          />
        ))
      )}
    </div>
  );
};

export default HistoryList;
