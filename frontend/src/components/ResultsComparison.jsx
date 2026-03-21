import React from 'react';
import { useAppContext } from '../context/AppContext';
import ResultCard from './ResultCard';

const ResultsComparison = () => {
  const { results, isQuerying } = useAppContext();

  if (results.length === 0 && !isQuerying) {
    return null; // Empty initial state
  }

  return (
    <div className="w-full mt-8 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">Results Comparison</h2>
      
      {isQuerying ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4 animate-pulse h-80">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                <div className="h-6 w-16 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
              </div>
              <div className="space-y-3 flex-1 mt-2">
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-5/6"></div>
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-4/6"></div>
              </div>
              <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl w-full mt-auto"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:auto-rows-fr xl:grid-cols-3 gap-6 items-start">
          {results.map((result, idx) => (
            <ResultCard key={idx} result={result} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsComparison;
