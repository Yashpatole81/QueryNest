import React from 'react';
import PipelineCard from './PipelineCard';
import { useAppContext } from '../context/AppContext';

const PIPELINES = [
  { id: 'fast', title: 'Fast', description: 'BM25 retrieval. Best for quick keyword matches.' },
  { id: 'accurate', title: 'Accurate', description: 'Hybrid search. Balances semantics and speed.' },
  { id: 'explainer', title: 'Explainer', description: 'FAISS vector search. Deep semantic understanding.' },
];

const PipelineSelector = () => {
  const { selectedPipelines, togglePipeline, isQuerying } = useAppContext();

  return (
    <div className="w-full mb-8">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">Select Pipelines</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PIPELINES.map((pipeline) => (
          <PipelineCard
            key={pipeline.id}
            {...pipeline}
            isSelected={selectedPipelines.includes(pipeline.id)}
            onClick={() => !isQuerying && togglePipeline(pipeline.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PipelineSelector;
