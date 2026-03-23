import React from 'react';
import { FileText } from 'lucide-react';

const ExplainPanel = ({ chunks }) => {
  if (!chunks || chunks.length === 0) {
    return (
      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 italic text-center">
        No context chunks retrieved for this pipeline.
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-1">Retrieved Sources</h4>
      
      {chunks.map((chunk, idx) => (
        <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 text-sm hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <FileText size={16} className="flex-shrink-0 text-slate-400 dark:text-slate-500" />
              <span className="truncate text-slate-700 dark:text-slate-300">{chunk.source || chunk.metadata?.source || 'Unknown source'}</span>
            </div>
            
            <div className="flex gap-2 flex-shrink-0 ml-4 font-mono">
              {(chunk.page || chunk.metadata?.page) && (
                <span className="bg-white dark:bg-slate-700 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-600 shadow-sm text-slate-700 dark:text-slate-300">
                  Pg {chunk.page || chunk.metadata?.page}
                </span>
              )}
              {(chunk.score || chunk.metadata?.score) && (
                <span className="bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 px-2 py-1 rounded-md border border-slate-800 dark:border-slate-300 shadow-sm font-semibold">
                  {((chunk.score || chunk.metadata?.score) * 100).toFixed(1)}%
                </span>
              )}
            </div>
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-2 border-slate-300 dark:border-slate-600 pl-3 line-clamp-4 hover:line-clamp-none transition-all break-words overflow-wrap-anywhere">
            "{chunk.text || chunk.page_content}"
          </p>
        </div>
      ))}
    </div>
  );
};

export default ExplainPanel;
