import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap, Search, Layers, MessageSquare, RefreshCw,
  Cpu, Clock, TrendingUp, DollarSign, Scale,
  Code2, BookOpen, FileSearch, Building2, ArrowRight,
  CheckCircle2, Github
} from 'lucide-react';

const PIPELINES = [
  {
    id: 1,
    icon: <Zap size={26} />,
    title: 'Query Processing',
    description: 'User queries are cleaned, normalized, and prepared for efficient retrieval. This ensures better understanding and faster downstream processing.',
    align: 'left',
  },
  {
    id: 2,
    icon: <Search size={26} />,
    title: 'Smart Retrieval',
    description: 'Relevant documents are fetched using optimized vector search techniques designed specifically for CPU performance.',
    align: 'right',
  },
  {
    id: 3,
    icon: <Layers size={26} />,
    title: 'Context Building',
    description: 'The system selects and compresses the most useful information to fit within model limits without losing meaning.',
    align: 'left',
  },
  {
    id: 4,
    icon: <MessageSquare size={26} />,
    title: 'Response Generation',
    description: 'A lightweight language model generates accurate responses using retrieved context, minimizing hallucination.',
    align: 'right',
  },
  {
    id: 5,
    icon: <RefreshCw size={26} />,
    title: 'Feedback Loop',
    description: 'User feedback improves retrieval accuracy and ranking over time, making the system smarter with every interaction.',
    align: 'left',
    badge: '🔥 Unique',
  },
];

const EFFICIENCY = [
  { icon: <Cpu size={20} />, text: 'Runs efficiently on CPU — no expensive GPUs required' },
  { icon: <Clock size={20} />, text: 'Optimized pipelines reduce latency significantly' },
  { icon: <TrendingUp size={20} />, text: 'Smart retrieval minimizes unnecessary computation' },
  { icon: <Scale size={20} />, text: 'Scalable architecture for real-world applications' },
  { icon: <DollarSign size={20} />, text: 'Lower infrastructure cost with high performance' },
];

const USE_CASES = [
  { icon: <Code2 size={24} />, title: 'Developer Debugging', desc: 'Instantly query codebases and error logs for fast, precise answers.' },
  { icon: <BookOpen size={24} />, title: 'Knowledge Base Search', desc: 'Retrieve answers from large internal knowledge stores with ease.' },
  { icon: <FileSearch size={24} />, title: 'Document Analysis', desc: 'Analyze and extract insights from hundreds of documents at once.' },
  { icon: <Building2 size={24} />, title: 'Enterprise AI Assistant', desc: 'Deploy an intelligent assistant across your organization seamlessly.' },
];

function PipelineCard({ pipeline }) {
  const isLeft = pipeline.align === 'left';
  return (
    <div className={`flex w-full ${isLeft ? 'justify-start md:pr-[52%]' : 'justify-end md:pl-[52%]'}`}>
      <div className={`
        relative w-full bg-white dark:bg-[#111]
        border border-slate-200 dark:border-zinc-800
        rounded-2xl p-6 shadow-sm hover:shadow-lg
        transition-all duration-300 group
      `}>
        {/* Step badge */}
        <div className={`
          absolute -top-3.5 ${isLeft ? 'left-5' : 'right-5'}
          w-7 h-7 rounded-full flex items-center justify-center
          bg-slate-900 dark:bg-white text-white dark:text-black
          text-xs font-bold shadow
        `}>
          {pipeline.id}
        </div>

        <div className="flex items-start gap-4 mt-1">
          <div className="shrink-0 w-11 h-11 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black group-hover:scale-110 transition-transform duration-300">
            {pipeline.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{pipeline.title}</h3>
              {pipeline.badge && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-medium border border-orange-200 dark:border-orange-800">
                  {pipeline.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{pipeline.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const LandingPage = () => {
  const navigate = useNavigate();

  // Override global overflow:hidden and hide scrollbar on landing page
  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyMaxH = document.body.style.maxHeight;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevHtmlMaxH = document.documentElement.style.maxHeight;

    document.body.style.overflow = 'auto';
    document.body.style.maxHeight = 'none';
    document.body.style.scrollbarWidth = 'none';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.maxHeight = 'none';
    document.documentElement.style.scrollbarWidth = 'none';

    // Inject webkit scrollbar style
    const style = document.createElement('style');
    style.id = 'landing-no-scrollbar';
    style.textContent = 'html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; }';
    document.head.appendChild(style);

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.maxHeight = prevBodyMaxH;
      document.body.style.scrollbarWidth = '';
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.documentElement.style.maxHeight = prevHtmlMaxH;
      document.documentElement.style.scrollbarWidth = '';
      document.head.removeChild(style);
    };
  }, []);

  const handleGetStarted = () => {
    localStorage.setItem('qn_visited', 'true');
    navigate('/app');
  };

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="w-full bg-white dark:bg-black text-slate-900 dark:text-zinc-100"
    >
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center">
              <MessageSquare size={16} className="text-white dark:text-black" />
            </div>
            <span className="font-bold text-lg tracking-tight">QueryNest</span>
          </div>
          <button
            onClick={handleGetStarted}
            className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            Get Started <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-16 pb-20"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(148,163,184,0.15) 0%, transparent 70%)' }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-medium text-slate-500 dark:text-zinc-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Intel × Wipro Hackathon 2026
        </div>

        <h1
          className="text-5xl sm:text-7xl font-bold leading-tight mb-6 max-w-4xl"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            background: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Welcome to QueryNest
        </h1>

        <p className="text-lg sm:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          A CPU-optimized RAG system designed for fast, efficient, and scalable AI retrieval —
          without heavy GPU dependency.
        </p>

        <button
          onClick={handleGetStarted}
          className="group flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-base font-semibold hover:opacity-80 transition-all duration-300 shadow-lg"
        >
          Get Started
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex flex-wrap justify-center gap-10 mt-16">
          {[
            { label: 'CPU Optimized', value: '100%' },
            { label: 'Pipelines', value: '3' },
            { label: 'GPU Required', value: 'None' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-slate-400 dark:text-zinc-500 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-zinc-950">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-3">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            What is QueryNest?
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-lg leading-relaxed">
            QueryNest is a{' '}
            <strong className="text-slate-900 dark:text-white">Retrieval-Augmented Generation (RAG)</strong> system built
            to run efficiently on CPU-based environments. Unlike traditional AI systems that depend heavily on GPUs,
            QueryNest focuses on{' '}
            <strong className="text-slate-900 dark:text-white">optimized pipelines</strong>, lightweight embeddings,
            and intelligent retrieval to deliver fast and accurate responses — making enterprise-grade AI accessible to everyone.
          </p>
        </div>
      </section>

      {/* PIPELINE ZIG-ZAG */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-3">Architecture</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              5-Stage Intelligent Pipeline
            </h2>
            <p className="text-slate-500 dark:text-zinc-400 mt-3 max-w-xl mx-auto text-sm">
              Every query flows through a carefully designed pipeline that maximizes accuracy while minimizing compute cost.
            </p>
          </div>

          <div className="relative flex flex-col gap-8">
            {/* Center vertical line (desktop only) */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-200 dark:via-zinc-800 to-transparent" />
            {PIPELINES.map((p) => (
              <PipelineCard key={p.id} pipeline={p} />
            ))}
          </div>
        </div>
      </section>

      {/* EFFICIENCY */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-3">Performance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Why QueryNest is Efficient
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EFFICIENCY.map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white dark:bg-[#111] border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-600 dark:text-zinc-300">
                  {item.icon}
                </div>
                <div className="flex items-start gap-2 pt-1">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-3">Applications</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Built for Real-World Use
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {USE_CASES.map((uc, i) => (
              <div key={i} className="group bg-white dark:bg-[#111] border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-11 h-11 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black mb-4">
                  {uc.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1.5">{uc.title}</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-slate-900 dark:bg-zinc-900 text-white text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Start exploring smarter AI retrieval today.
        </h2>
        <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
          Experience the power of CPU-optimized RAG with zero GPU overhead.
        </p>
        <button
          onClick={handleGetStarted}
          className="group inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full text-base font-semibold hover:bg-zinc-100 transition-all shadow-lg"
        >
          Start Chat
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-zinc-800 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400 dark:text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-slate-900 dark:bg-white flex items-center justify-center">
              <MessageSquare size={12} className="text-white dark:text-black" />
            </div>
            <span className="font-semibold text-slate-700 dark:text-zinc-300">QueryNest</span>
          </div>
          <span>
            Built for <strong className="text-slate-600 dark:text-zinc-300">Intel × Wipro Hackathon</strong> · Team QueryNest
          </span>
          <div className="flex items-center gap-1">
            <Github size={14} />
            <span>Open Source</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
