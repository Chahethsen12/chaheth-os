import React, { useState, useEffect } from 'react';
import { LayoutGrid } from 'lucide-react';
import { useWindowStore, appConfig, type AppId } from '../../store/useWindowStore';
import { StartMenu } from './StartMenu';

export const Taskbar: React.FC = () => {
  const { windows, activeWindowId, openWindow, focusWindow, minimizeWindow } = useWindowStore();
  const [time, setTime] = useState<string>('');
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAppClick = (id: AppId) => {
    if (!windows[id]) {
      openWindow(id);
    } else if (activeWindowId === id && !windows[id].isMinimized) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const pinnedApps: AppId[] = ['terminal', 'projects', 'about'];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-11 bg-slate-950/80 backdrop-blur-lg border-t border-slate-800/80 flex items-center justify-between px-3 z-[9999] select-none">
      <div className="flex items-center gap-2">
        <button onClick={() => setIsStartMenuOpen((isOpen) => !isOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 font-medium text-xs transition">
          <LayoutGrid size={15} />
          <span>Menu</span>
        </button>

        <div className="h-4 w-[1px] bg-slate-800 mx-1" />

        {pinnedApps.map((id) => (
          <button
            key={id}
            onClick={() => handleAppClick(id)}
            className={`p-2 rounded-md hover:bg-slate-800/60 transition ${
              windows[id] && !windows[id].isMinimized ? 'bg-slate-800 border-b-2 border-indigo-400' : ''
            }`}
            title={appConfig[id].title}
          >
            {appConfig[id].icon}
          </button>
        ))}
      </div>

      {isStartMenuOpen && <StartMenu onClose={() => setIsStartMenuOpen(false)} />}

      <div className="flex items-center gap-1.5 overflow-x-auto max-w-[50%]">
        {Object.values(windows).map((win) => (
          <button
            key={win.id}
            onClick={() => handleAppClick(win.id as AppId)}
            className={`flex items-center gap-2 px-3 py-1 rounded text-xs transition max-w-[140px] truncate ${
              activeWindowId === win.id && !win.isMinimized
                ? 'bg-slate-800 text-slate-100 font-medium border border-slate-700'
                : 'bg-slate-900/40 text-slate-400 hover:bg-slate-800/40'
            }`}
          >
            <span>{win.title}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 text-xs font-mono text-slate-400 px-2">
        <span>{time}</span>
      </div>
    </div>
  );
};