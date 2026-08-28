import React, { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '../store/useWindowStore';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export const TerminalApp: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="text-emerald-400">
          <p>ChahethOS [Version 1.0.0]</p>
          <p>Type <span className="text-yellow-300 font-bold">'help'</span> for a list of available commands.</p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindowStore();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <p><span className="text-emerald-400 font-bold">help</span> - Display available commands</p>
            <p><span className="text-emerald-400 font-bold">about</span> - Display bio & background</p>
            <p><span className="text-emerald-400 font-bold">projects</span> - List core engineering projects</p>
            <p><span className="text-emerald-400 font-bold">gui-projects</span> - Launch GUI Projects window</p>
            <p><span className="text-emerald-400 font-bold">gui-about</span> - Launch GUI About window</p>
            <p><span className="text-emerald-400 font-bold">clear</span> - Clear terminal history</p>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="text-slate-300 space-y-1">
            <p className="font-bold text-indigo-400">Hapugala Arachchige Chaheth Janidu Senevirathne</p>
            <p>Computer Science Undergraduate | Full-Stack & AI Developer</p>
            <p className="text-xs text-slate-400">Specializing in NLP, RAG systems, and structured React architecture.</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-slate-300">
            <div>
              <p className="font-bold text-yellow-400">1. SafeText AI</p>
              <p className="text-xs text-slate-400">Dual-model framework using DistilBERT & TinyLlama for adversarial text normalization.</p>
            </div>
            <div>
              <p className="font-bold text-yellow-400">2. MERN E-Commerce Platform</p>
              <p className="text-xs text-slate-400">Full-stack e-commerce system with JWT authentication and Gemini API integration.</p>
            </div>
            <div>
              <p className="font-bold text-yellow-400">3. ChahethOS</p>
              <p className="text-xs text-slate-400">Web-based portfolio operating system built with React, Vite, Tailwind & Zustand.</p>
            </div>
          </div>
        );
        break;

      case 'gui-projects':
        openWindow('projects');
        output = <p className="text-indigo-400">Launching Projects Showcase Window...</p>;
        break;

      case 'gui-about':
        openWindow('about');
        output = <p className="text-indigo-400">Launching About Me Window...</p>;
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case '':
        output = null;
        break;

      default:
        output = <p className="text-red-400">Command not recognized: '{cmd}'. Type 'help' for options.</p>;
        break;
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput('');
  };

  return (
    <div className="font-mono text-xs text-slate-200 h-full flex flex-col p-1">
      <div className="flex-1 overflow-y-auto space-y-2">
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400">guest@chaheth-os:~$</span>
              <span className="text-slate-100">{item.command}</span>
            </div>
            {item.output && <div className="pl-4">{item.output}</div>}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800">
        <span className="text-emerald-400">guest@chaheth-os:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-slate-100 font-mono"
          autoFocus
        />
      </form>
    </div>
  );
};