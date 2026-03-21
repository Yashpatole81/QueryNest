import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedPipelines, setSelectedPipelines] = useState(['fast']);
  const [results, setResults] = useState([]);
  const [isQuerying, setIsQuerying] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen((prev) => !prev);
  }, []);

  const togglePipeline = useCallback((pipelineId) => {
    setSelectedPipelines((prev) => 
      prev.includes(pipelineId) 
        ? prev.filter((p) => p !== pipelineId)
        : [...prev, pipelineId]
    );
  }, []);
  
  const clearResults = useCallback(() => {
    setResults([]);
  }, []);

  const addToHistory = useCallback((queryData) => {
    setHistory((prev) => [queryData, ...prev]);
  }, []);

  const loadFromHistory = useCallback((historyItem) => {
    setCurrentQuery(historyItem.query);
    setSelectedPipelines(historyItem.pipelines);
    setResults(historyItem.results);
  }, []);

  const deleteFromHistory = useCallback((id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        history,
        currentQuery,
        setCurrentQuery,
        selectedPipelines,
        togglePipeline,
        results,
        setResults,
        isQuerying,
        setIsQuerying,
        clearResults,
        addToHistory,
        loadFromHistory,
        deleteFromHistory,
        theme,
        toggleTheme,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        toggleMobileSidebar
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
