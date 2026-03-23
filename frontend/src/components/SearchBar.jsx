import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Settings2, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useQuery } from '../hooks/useQuery';
import clsx from 'clsx';

const PIPELINES = [
  { id: 'fast', title: 'Fast' },
  { id: 'accurate', title: 'Accurate' },
  { id: 'explainer', title: 'FAISS Explainer' },
];

const SearchBar = () => {
  const { currentQuery, setCurrentQuery, isQuerying, selectedPipelines, togglePipeline } = useAppContext();
  const { executeQuery } = useQuery();
  const [localQuery, setLocalQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Still optionally load from currentQuery ONLY IF localQuery is completely empty 
  // AND it's a new load from history. But generally, chatting clears input.
  // We'll just leave it un-synced so it stays empty after submitting.

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim() && !isQuerying) {
      if (selectedPipelines.length === 0) {
         togglePipeline('fast');
      }
      setCurrentQuery(localQuery);
      executeQuery(localQuery);
      setLocalQuery(''); // Clear search box
      setShowDropdown(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative group" ref={dropdownRef}>
      
      {showDropdown && (
        <div className="absolute bottom-full mb-3 right-0 w-64 bg-white dark:bg-[#111111] border border-slate-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2">
          <div className="p-3 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Select Pipelines</h4>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{selectedPipelines.length} selected</span>
          </div>
          <div className="p-2 flex flex-col gap-1">
            {PIPELINES.map(pipeline => {
              const isActive = selectedPipelines.includes(pipeline.id);
              return (
                <button
                  key={pipeline.id}
                  type="button"
                  onClick={() => togglePipeline(pipeline.id)}
                  className={clsx(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors",
                    isActive 
                      ? "bg-slate-50 dark:bg-zinc-800/50 text-slate-900 dark:text-white font-medium" 
                      : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800/30"
                  )}
                >
                  {pipeline.title}
                  {isActive && <Check size={16} className="text-emerald-500" />}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className={clsx(
        "flex items-center w-full bg-white dark:bg-[#111111] border border-slate-200 dark:border-zinc-800 rounded-full px-2 py-2 transition-all duration-300",
        "focus-within:bg-white dark:focus-within:bg-[#1a1a1a] focus-within:border-slate-900 dark:focus-within:border-zinc-600 focus-within:ring-4 focus-within:ring-slate-900/10 dark:focus-within:ring-zinc-100/10 shadow-sm"
      )}>
        <div className="pl-3 pr-1">
          <Search size={20} className="text-slate-400 dark:text-zinc-500 group-focus-within:text-slate-900 dark:group-focus-within:text-zinc-300 transition-colors" />
        </div>
        
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Ask your question across all pipelines..."
          className="flex-1 bg-transparent border-none outline-none px-2 py-1.5 text-slate-800 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-600 text-base"
          disabled={isQuerying}
        />
        
        <div className="flex items-center gap-1.5 pr-1">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-medium text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-zinc-700"
            title="Configure Pipelines"
          >
            <Settings2 size={16} />
            <span className="hidden sm:inline-block">Pipelines</span>
          </button>
          
          <button
            type="submit"
            disabled={!localQuery.trim() || isQuerying || selectedPipelines.length === 0}
            className={clsx(
              "h-9 px-4 rounded-full text-sm font-medium transition-all flex items-center justify-center",
              localQuery.trim() && !isQuerying && selectedPipelines.length > 0
                ? "bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-zinc-200"
                : "bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600 cursor-not-allowed"
            )}
          >
            {isQuerying ? <Loader2 size={16} className="animate-spin" /> : 'Search'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
