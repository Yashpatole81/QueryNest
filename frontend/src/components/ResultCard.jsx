import React, { useState } from 'react';
import { Activity, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import ExplainPanel from './ExplainPanel';
import clsx from 'clsx';

const ResultCard = ({ result }) => {
  const [showExplain, setShowExplain] = useState(false);
  
  const { pipeline, success, data, error, latency } = result;

  if (!success) {
    return (
      <div className="bg-white dark:bg-[#111111] border border-red-200 dark:border-red-900/50 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-center pb-4 border-b border-red-100 dark:border-red-900/30">
          <h3 className="font-bold text-lg capitalize text-slate-800 dark:text-zinc-100">{pipeline}</h3>
          <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 dark:bg-black text-red-600 dark:text-red-400 border dark:border-red-900/50">
            <AlertTriangle size={14} /> Error
          </span>
        </div>
        <p className="text-red-500 dark:text-red-400 font-mono text-sm">{error}</p>
      </div>
    );
  }

  const answer = data?.answer || "No answer provided";
  const chunks = data?.chunks || data?.retrieved_chunks || [];

  return (
    <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col transition-shadow hover:shadow-md">
      <div className="flex justify-between items-start pb-4 border-b border-slate-100 dark:border-zinc-800 mb-4 flex-wrap gap-2">
        <h3 className="font-bold text-lg capitalize text-slate-900 dark:text-zinc-100">{pipeline}</h3>
        <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-slate-50 dark:bg-black text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <Activity size={14} className="text-slate-400 dark:text-zinc-500" /> {latency}ms
        </span>
      </div>
      
      <div className="flex-1 mb-6">
        <div className="text-slate-800 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
          {answer}
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-zinc-800">
        <button
          onClick={() => setShowExplain(!showExplain)}
          className={clsx(
            "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border",
            showExplain 
              ? "bg-slate-900 dark:bg-zinc-200 text-white dark:text-black border-slate-900 dark:border-zinc-200 hover:bg-slate-800 dark:hover:bg-zinc-300" 
              : "bg-white dark:bg-[#1a1a1a] text-slate-700 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-[#222] shadow-sm"
          )}
        >
          Why this answer?
          {showExplain ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {showExplain && <ExplainPanel chunks={chunks} />}
      </div>
    </div>
  );
};

export default ResultCard;
