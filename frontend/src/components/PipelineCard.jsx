import React from 'react';
import { Zap, Target, Brain, Check } from 'lucide-react';
import clsx from 'clsx';

const ICONS = {
  fast: Zap,
  accurate: Target,
  explainer: Brain
};

const PipelineCard = ({ id, title, description, isSelected, onClick }) => {
  const Icon = ICONS[id] || Target;

  return (
    <div
      onClick={onClick}
      className={clsx(
        "relative cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 flex flex-col gap-3 group bg-white dark:bg-[#111111]",
        isSelected 
          ? "border-slate-900 dark:border-neutral-300 shadow-md transform scale-[1.02]" 
          : "border-slate-100 dark:border-neutral-800 shadow-sm hover:border-slate-300 dark:hover:border-neutral-600 hover:shadow"
      )}
    >
      <div className="flex justify-between items-start">
        <div className={clsx(
          "p-2.5 rounded-xl transition-colors",
          isSelected ? "bg-slate-900 dark:bg-neutral-200 text-white dark:text-black" : "bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400 group-hover:bg-slate-200 dark:group-hover:bg-neutral-700"
        )}>
          <Icon size={24} />
        </div>
        
        <div className={clsx(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
          isSelected ? "border-slate-900 dark:border-neutral-200 bg-slate-900 dark:bg-neutral-200 text-white dark:text-black" : "border-slate-200 dark:border-neutral-700 bg-transparent"
        )}>
          {isSelected && <Check size={14} strokeWidth={3} />}
        </div>
      </div>
      
      <div>
        <h3 className="font-bold text-slate-800 dark:text-neutral-100 text-lg">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default PipelineCard;
