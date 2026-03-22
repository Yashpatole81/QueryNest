import React from 'react';
import { useAppContext } from '../context/AppContext';
import ResultCard from './ResultCard';
import clsx from 'clsx';

const ResultsComparison = () => {
  const { messages, isQuerying, selectedPipelines } = useAppContext();

  if (messages.length === 0 && !isQuerying) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-10 animate-in fade-in duration-500">
      
      {messages.map((msg, msgIdx) => {
        const isSingle = msg.results.length === 1;
        return (
          <div key={msgIdx} className="flex flex-col gap-4">
            {/* User bubble */}
            <div className="flex justify-end w-full px-2 lg:px-6">
              <div className="bg-slate-100 dark:bg-zinc-800 px-5 py-3 rounded-2xl max-w-[85%] text-slate-800 dark:text-zinc-200 shadow-sm border border-slate-200 dark:border-zinc-700">
                {msg.query}
              </div>
            </div>

            {/* Results */}
            <div className={isSingle ? "w-full px-2 lg:px-6" : "grid grid-cols-1 lg:grid-cols-2 lg:auto-rows-fr xl:grid-cols-3 gap-6 items-start"}>
              {msg.results.map((result, idx) => (
                <ResultCard key={idx} result={result} isSingle={isSingle} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Skeleton while querying */}
      {isQuerying && (() => {
        const isSingle = selectedPipelines.length === 1;
        return (
          <div className="flex flex-col gap-4">
            <div className="flex justify-end w-full px-2 lg:px-6">
              <div className="bg-slate-100 dark:bg-zinc-800 px-5 py-3 rounded-2xl text-slate-400 dark:text-zinc-600 border border-slate-200 dark:border-zinc-700 italic text-sm">
                Searching...
              </div>
            </div>
            <div className={isSingle ? "w-full px-2 lg:px-6" : "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"}>
              {(isSingle ? [1] : selectedPipelines.map((_, i) => i + 1)).map(i => (
                <div key={i} className={clsx("flex flex-col gap-4 animate-pulse", !isSingle && "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm h-60")}>
                  {!isSingle && (
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                      <div className="h-6 w-16 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                    </div>
                  )}
                  <div className="space-y-3 flex-1">
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

    </div>
  );
};

export default ResultsComparison;
