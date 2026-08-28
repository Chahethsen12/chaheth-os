import React from 'react';
import { useWindowStore, type Theme } from '../store/useWindowStore';
import { Palette, Image as ImageIcon } from 'lucide-react';

const availableWallpapers = [
  'https://images.unsplash.com/photo-1599672120005-728f3281e8c7?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507721999372-f711375d958b?q=80&w=2560&auto=format&fit=crop',
];

export const SettingsApp: React.FC = () => {
  const { theme, setTheme, wallpaper, setWallpaper } = useWindowStore();

  return (
    <div className="h-full grid grid-cols-[200px,1fr] gap-4 p-1 text-slate-200">
      {/* Sidebar */}
      <div className="space-y-1 bg-slate-950/60 rounded-lg p-2 border border-slate-700/50">
         <button className="flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-md bg-indigo-600/30 text-white font-medium text-xs">
            <Palette size={14}/> Appearance
         </button>
         <div className="flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-md text-slate-400 hover:bg-slate-800/40 text-xs">
            <ImageIcon size={14}/> Desktop Background
         </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Theme */}
        <div>
          <h2 className="text-sm font-semibold text-white mb-3">System Theme</h2>
          <div className="grid grid-cols-3 gap-3">
            {[ {id: 'minimal-dark', label: 'Minimal Dark'}, {id: 'cyberdeck', label: 'Cyberdeck'}, {id: 'retro-matrix', label: 'Matrix'} ].map(t => (
              <button key={t.id} onClick={() => setTheme(t.id as Theme)} className={`p-4 rounded-lg border-2 text-center transition ${theme === t.id ? 'border-indigo-500 bg-indigo-950/40' : 'border-slate-700/60 bg-slate-900'}`}>
                 <span className={`text-xs ${theme === t.id ? 'text-indigo-200' : 'text-slate-400'}`}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Wallpaper */}
        <div>
          <h2 className="text-sm font-semibold text-white mb-3">Desktop Background</h2>
          <div className="grid grid-cols-3 gap-3">
            {availableWallpapers.map(wp => (
              <button key={wp} onClick={() => setWallpaper(wp)} className={`aspect-[16/10] rounded-lg border-2 overflow-hidden transition ${wallpaper === wp ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-slate-700/60'}`}>
                <img src={wp} alt="Wallpaper" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};