import { useCallback, useRef } from 'react';
import { runQuery } from '../services/api';
import { useAppContext } from '../context/AppContext';

export const useQuery = () => {
  const { 
    currentQuery, 
    selectedPipelines, 
    messages,
    setMessages, 
    setIsQuerying,
    addToHistory,
    updateHistory,
    currentSessionId,
    setCurrentSessionId
  } = useAppContext();

  // Ref to hold the up-to-date sessionId synchronously during execution
  const sessionIdRef = useRef(currentSessionId);
  sessionIdRef.current = currentSessionId;

  const executeQuery = useCallback(async (customQuery = null, customPipelines = null) => {
    const activeQuery = customQuery || currentQuery;
    const activePipelines = customPipelines || selectedPipelines;

    if (!activeQuery.trim() || activePipelines.length === 0) return;

    setIsQuerying(true);

    try {
      const promises = activePipelines.map(async (pipeline) => {
        const startTime = performance.now();
        try {
          const data = await runQuery(activeQuery, pipeline);
          const latency = Math.round(performance.now() - startTime);
          return { pipeline, success: true, data, latency };
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

      const newMessage = {
        query: activeQuery,
        pipelines: activePipelines,
        results: pipelineResults,
        timestamp: new Date().toISOString(),
      };

      // Compute new messages array from the current messages state (passed as dep)
      const newMessages = [...messages, newMessage];

      // Update messages state directly (no side effects inside the updater)
      setMessages(newMessages);

      // Update or create the history entry — called once, outside any updater
      const activeSessionId = sessionIdRef.current;
      if (activeSessionId) {
        updateHistory(activeSessionId, { messages: newMessages });
      } else {
        const newId = Date.now().toString();
        setCurrentSessionId(newId);
        sessionIdRef.current = newId;
        addToHistory({
          id: newId,
          title: activeQuery,
          messages: newMessages,
        });
      }

    } finally {
      setIsQuerying(false);
    }
  }, [currentQuery, selectedPipelines, messages, setMessages, setIsQuerying, addToHistory, updateHistory, currentSessionId, setCurrentSessionId]);

  return { executeQuery };
};

