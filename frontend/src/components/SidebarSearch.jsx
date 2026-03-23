import React from 'react';
import { Search } from 'lucide-react';
import clsx from 'clsx';

const SidebarSearch = ({ isCollapsed, searchQuery, setSearchQuery }) => {
  if (isCollapsed) {
    return (
      <div 
        className="w-full flex justify-center p-2.5 text-neutral-500 dark:text-neutral-400 cursor-pointer hover:text-neutral-800 dark:hover:text-white rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
        title="Search chats..."
      >
        <Search size={20} />
      </div>
    );
  }

  return (
    <div className="relative group px-1">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={16} className="text-neutral-400 dark:text-neutral-500 group-focus-within:text-neutral-700 dark:group-focus-within:text-neutral-300 transition-colors" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search chats..."
        className="block w-full rounded-xl border-none py-2 pl-9 pr-3 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none transition-all focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600"
      />
    </div>
  );
};

export default SidebarSearch;
