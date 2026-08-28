import React, { useRef, useEffect } from 'react';
import { appConfig, type AppId, useWindowStore } from '../../store/useWindowStore';
import { Search, Power, FolderKey } from 'lucide-react';

interface StartMenuProps {
  onClose: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
  const { openWindow } = useWindowStore();
  const menuRef = useRef<HTMLDivElement>(null);

  const appsList: AppId[] = ['terminal', 'projects', 'about', 'monitor', 'editor', 'settings'];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={menuRef} className="absolute bottom-12 left-3 w-[460px] h-[520px] bg-slate-950/95 backdrop-blur-xl border border-slate-700/70 rounded-xl shadow-2xl p-6 z-[9999] flex flex-col gap-6 select-none animate-slide-up">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16}/>
        <input type="text" placeholder="Search apps, files, and engineering projects..." className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-200 text-sm placeholder:text-slate-600 outline-none focus:border-indigo-500"/>
      </div>

      <div className="flex-1 space-y-4">
        <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest pl-1">All Applications</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {appsList.map(id => {
            const app = appConfig[id];
            return (
              <button key={id} onClick={() => { openWindow(id); onClose(); }} className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800/70 hover:border-slate-700 group transition">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-105 transition">{app.icon}</div>
                <div className="text-left">
                    <p className="text-xs font-semibold text-slate-100 group-hover:text-white transition">{app.title.split(' ')[0]}</p>
                    <p className="text-[10px] text-slate-500 group-hover:text-slate-400 transition">{app.title.split('(')[1]?.replace(')', '') || 'Utility App'}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
         <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-indigo-400 border border-indigo-600/30">C</div>
             <div className="text-xs">
                 <p className="text-white font-semibold">Chaheth J. S.</p>
                 <p className="text-slate-500">cs_std_chaheth@v1.0.0</p>
             </div>
         </div>
         <div className="flex gap-1.5">
            <button className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white text-slate-500 transition"><FolderKey size={16}/></button>
            <button onClick={() => window.location.reload()} className="p-2.5 rounded-lg bg-red-950/40 border border-red-800/60 hover:bg-red-900/60 text-red-400 transition"><Power size={16}/></button>
         </div>
      </div>
    </div>
  );
};