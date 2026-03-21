import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useQuery } from '../hooks/useQuery';
import clsx from 'clsx';

const SearchBar = () => {
  const { currentQuery, setCurrentQuery, isQuerying } = useAppContext();
  const { executeQuery } = useQuery();
  const [localQuery, setLocalQuery] = useState(currentQuery);

  // Sync prop changes
  useEffect(() => {
    setLocalQuery(currentQuery);
  }, [currentQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim() && !isQuerying) {
      setCurrentQuery(localQuery);
      executeQuery(localQuery);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative group">
      <div className={clsx(
        "flex items-center w-full bg-white dark:bg-[#111111] border border-slate-200 dark:border-zinc-800 rounded-full px-4 py-3 transition-all duration-300",
        "focus-within:bg-white dark:focus-within:bg-[#1a1a1a] focus-within:border-slate-900 dark:focus-within:border-zinc-600 focus-within:ring-4 focus-within:ring-slate-900/10 dark:focus-within:ring-zinc-100/10 shadow-sm"
      )}>
        <Search size={20} className="text-slate-400 dark:text-zinc-500 group-focus-within:text-slate-900 dark:group-focus-within:text-zinc-300 transition-colors" />
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Ask your question across all pipelines..."
          className="flex-1 bg-transparent border-none outline-none px-3 text-slate-800 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-600 text-base"
          disabled={isQuerying}
        />
        <button
          type="submit"
          disabled={!localQuery.trim() || isQuerying}
          className={clsx(
            "h-8 px-4 rounded-full text-sm font-medium transition-all",
            localQuery.trim() && !isQuerying
              ? "bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-zinc-200"
              : "bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600 cursor-not-allowed",
            isQuerying && "flex items-center justify-center pl-3 pr-3"
          )}
        >
          {isQuerying ? <Loader2 size={16} className="animate-spin" /> : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
