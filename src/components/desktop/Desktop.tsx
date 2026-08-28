import React from 'react';
import { appConfig, type AppId, useWindowStore } from '../../store/useWindowStore';

export const Desktop: React.FC = () => {
  const { openWindow, focusWindow, windows, wallpaper, theme } = useWindowStore();

  const desktopApps: AppId[] = ['terminal', 'projects', 'about'];

  const handleLaunch = (id: AppId) => {
    if (windows[id]) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <>
      <div data-theme={theme} className="absolute inset-0 z-[-1]">
        <img src={wallpaper} alt="Desktop Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs" />
      </div>

      <div className="absolute inset-0 p-6 grid grid-cols-1 gap-4 w-28 auto-rows-max select-none z-0">
        {desktopApps.map((id) => {
          const config = appConfig[id];
          return (
            <button
              key={id}
              onDoubleClick={() => handleLaunch(id)}
              onClick={() => handleLaunch(id)}
              className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-slate-800/40 border border-transparent hover:border-slate-700/50 group transition duration-150 cursor-pointer"
            >
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 shadow-md group-hover:scale-105 transition">
                {config.icon}
              </div>
              <span className="mt-2 text-xs font-medium text-slate-300 drop-shadow group-hover:text-white">
                {config.title.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};