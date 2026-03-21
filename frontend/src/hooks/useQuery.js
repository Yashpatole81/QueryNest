import { useCallback } from 'react';
import { runQuery } from '../services/api';
import { useAppContext } from '../context/AppContext';

export const useQuery = () => {
  const { 
    currentQuery, 
    selectedPipelines, 
    setResults, 
    setIsQuerying,
    clearResults,
    addToHistory
  } = useAppContext();

  const executeQuery = useCallback(async (customQuery = null, customPipelines = null) => {
    const activeQuery = customQuery || currentQuery;
    const activePipelines = customPipelines || selectedPipelines;

    if (!activeQuery.trim() || activePipelines.length === 0) return;

    setIsQuerying(true);
    clearResults();

    try {
      // Execute queries in parallel for all selected pipelines
      const promises = activePipelines.map(async (pipeline) => {
        const startTime = performance.now();
        try {
          const data = await runQuery(activeQuery, pipeline);
          const latency = Math.round(performance.now() - startTime);
          return {
            pipeline,
            success: true,
            data,
            latency,
          };
        } catch (error) {
          const latency = Math.round(performance.now() - startTime);
          return {
            pipeline,
            success: false,
            error: error.response?.data?.detail || error.message || 'An error occurred',
            latency,
          };
        }
      });

      const pipelineResults = await Promise.all(promises);
      setResults(pipelineResults);
      
      // Save to history
      addToHistory({
        id: Date.now().toString(),
        query: activeQuery,
        pipelines: activePipelines,
        results: pipelineResults,
        timestamp: new Date().toISOString(),
      });
      
    } finally {
      setIsQuerying(false);
    }
  }, [currentQuery, selectedPipelines, setResults, setIsQuerying, clearResults, addToHistory]);

  return { executeQuery };
};
