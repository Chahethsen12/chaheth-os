import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Square, Copy, X } from 'lucide-react';
import { useWindowStore } from '../../store/useWindowStore';

interface WindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ id, title, icon, children }) => {
  const { windows, closeWindow, minimizeWindow, toggleMaximizeWindow, focusWindow } = useWindowStore();
  const win = windows[id];

  const [position, setPosition] = useState(() => ({ x: 100 + Math.random() * 40, y: 50 + Math.random() * 40 }));

  if (!win || !win.isOpen || win.isMinimized) return null;

  return (
    <motion.div
      drag={!win.isMaximized}
      dragMomentum={false}
      onDragEnd={(_, info) => setPosition((prev) => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}
      onClick={() => focusWindow(id)}
      style={{
        zIndex: win.zIndex,
        top: win.isMaximized ? 0 : position.y,
        left: win.isMaximized ? 0 : position.x,
      }}
      className={`absolute flex flex-col bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-lg shadow-2xl overflow-hidden transition-all duration-150 ${
        win.isMaximized ? 'w-full h-[calc(100vh-2.75rem)] rounded-none' : 'w-[680px] h-[460px]'
      }`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-800/80 border-b border-slate-700/50 select-none cursor-move">
        <div className="flex items-center gap-2 text-slate-200 text-sm font-medium">
          {icon}
          <span>{title}</span>
        </div>
        
        {/* Window Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            className="p-1 hover:bg-slate-700/60 rounded text-slate-400 hover:text-slate-100 transition"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggleMaximizeWindow(id); }}
            className="p-1 hover:bg-slate-700/60 rounded text-slate-400 hover:text-slate-100 transition"
          >
            {win.isMaximized ? <Copy size={13} /> : <Square size={13} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="p-1 hover:bg-red-500/80 rounded text-slate-400 hover:text-white transition"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto p-4 text-slate-200">
        {children}
      </div>
    </motion.div>
  );
};