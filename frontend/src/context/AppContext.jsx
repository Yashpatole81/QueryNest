import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedPipelines, setSelectedPipelines] = useState(['fast']);
  const [messages, setMessages] = useState([]);
  const [isQuerying, setIsQuerying] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  
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
  
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const addToHistory = useCallback((queryData) => {
    setHistory((prev) => [queryData, ...prev]);
  }, []);

  const updateHistory = useCallback((id, updatedData) => {
    setHistory((prev) => prev.map((item) => item.id === id ? { ...item, ...updatedData } : item));
  }, []);

  const loadFromHistory = useCallback((historyItem) => {
    setCurrentQuery('');
    if (historyItem.messages?.length > 0) {
      setSelectedPipelines(historyItem.messages[historyItem.messages.length - 1].pipelines);
    }
    setMessages(historyItem.messages || []);
    setCurrentSessionId(historyItem.id);
  }, []);

  const deleteFromHistory = useCallback((id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    setCurrentSessionId((prev) => prev === id ? null : prev);
  }, []);

  return (
    <AppContext.Provider
      value={{
        history,
        currentQuery,
        setCurrentQuery,
        selectedPipelines,
        togglePipeline,
        messages,
        setMessages,
        isQuerying,
        setIsQuerying,
        clearMessages,
        addToHistory,
        updateHistory,
        loadFromHistory,
        deleteFromHistory,
        theme,
        toggleTheme,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        toggleMobileSidebar,
        currentSessionId,
        setCurrentSessionId
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
