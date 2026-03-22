import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import PipelineSelector from '../components/PipelineSelector';
import SearchBar from '../components/SearchBar';
import ResultsComparison from '../components/ResultsComparison';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const { currentQuery, isQuerying, messages } = useAppContext();
  const hasSearched = isQuerying || messages.length > 0;

  const words = ['QueryNest', 'Future'];
  const typingSpeed = 200;
  const deletingSpeed = 100;
  const delayBetweenWords = 2000;

  useEffect(() => {
    let ticker;
    const currentWordIndex = loopNum % words.length;
    const fullWord = words[currentWordIndex];

    if (isDeleting) {
      ticker = setTimeout(() => {
        setDisplayText(fullWord.substring(0, displayText.length - 1));
      }, deletingSpeed);
    } else {
      ticker = setTimeout(() => {
        setDisplayText(fullWord.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayText === fullWord) {
      ticker = setTimeout(() => setIsDeleting(true), delayBetweenWords);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setLoopNum((prev) => prev + 1);
    }

    return () => clearTimeout(ticker);
  }, [displayText, isDeleting, loopNum]);

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-black overflow-hidden font-sans text-slate-900 dark:text-zinc-100 selection:bg-slate-200 dark:selection:bg-zinc-800 selection:text-slate-900 dark:selection:text-zinc-100">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-50 dark:bg-none dark:bg-black">
        <Topbar />

        <main className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-6 md:p-8 w-full scroll-smooth flex flex-col">
          <div className="max-w-6xl mx-auto w-full pb-8 pt-4 flex-1 flex flex-col">
            
            {!hasSearched ? (
              <>
                <div className="mb-12 mt-10 text-center max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <h2
                    className="text-3xl tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4 leading-tight font-normal"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Welcome To {displayText}
                    <span className="inline-block w-[3px] h-[1em] bg-slate-900 dark:bg-white ml-1 align-middle animate-pulse"></span>
                  </h2>
                  <p className="text-lg text-slate-500 dark:text-zinc-400 font-medium">
                    Compare answers and trace intelligence across specialized text pipelines.
                  </p>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
                  <PipelineSelector />
                  <div className="mb-8 max-w-3xl mx-auto">
                    <SearchBar />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col w-full animate-in fade-in duration-500">
                <div className="flex-1 mb-6">
                  <ResultsComparison />
                </div>
                
                <div className="w-full max-w-3xl mx-auto sticky bottom-0 pt-4 pb-2 z-10 bg-slate-50/80 dark:bg-black/80 backdrop-blur-md">
                  <SearchBar />
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
