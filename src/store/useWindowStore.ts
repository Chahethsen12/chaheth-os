import React from 'react';
import { create } from 'zustand';
import { Terminal, FolderGit2, User, Settings, Cpu, CodeXml } from 'lucide-react';

export type AppId = 'terminal' | 'projects' | 'about' | 'settings' | 'monitor' | 'editor';
export type Theme = 'cyberdeck' | 'minimal-dark' | 'retro-matrix';

export interface WindowState {
  id: AppId;
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export const appConfig: Record<AppId, { title: string; icon: React.ReactNode }> = {
  terminal: { title: 'Terminal (/bin/sh)', icon: React.createElement(Terminal, { size: 16, className: 'text-emerald-400' }) },
  projects: { title: 'Projects Showcase', icon: React.createElement(FolderGit2, { size: 16, className: 'text-indigo-400' }) },
  about: { title: 'About Chaheth', icon: React.createElement(User, { size: 16, className: 'text-amber-400' }) },
  settings: { title: 'System Settings', icon: React.createElement(Settings, { size: 16, className: 'text-slate-400' }) },
  monitor: { title: 'System Monitor', icon: React.createElement(Cpu, { size: 16, className: 'text-red-400' }) },
  editor: { title: 'Code Editor - README.md', icon: React.createElement(CodeXml, { size: 16, className: 'text-sky-400' }) },
};

interface WindowStore {
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  highestZIndex: number;
  theme: Theme;
  wallpaper: string;
  systemStats: { cpu: number; ram: number };

  openWindow: (id: AppId) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  setTheme: (theme: Theme) => void;
  setWallpaper: (wallpaper: string) => void;
  updateSystemStats: (stats: { cpu: number; ram: number }) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: {},
  activeWindowId: null,
  highestZIndex: 10,
  theme: 'minimal-dark',
  wallpaper: 'https://images.unsplash.com/photo-1599672120005-728f3281e8c7?q=80&w=2560&auto=format&fit=crop',
  systemStats: { cpu: 12, ram: 3.1 },

  openWindow: (id) =>
    set((state) => {
      if (state.windows[id]) {
        const nextZIndex = state.highestZIndex + 1;
        return {
          windows: {
            ...state.windows,
            [id]: { ...state.windows[id], isMinimized: false, zIndex: nextZIndex },
          },
          activeWindowId: id,
          highestZIndex: nextZIndex,
        };
      }

      const nextZIndex = state.highestZIndex + 1;
      const config = appConfig[id];

      return {
        windows: {
          ...state.windows,
          [id]: {
            id,
            title: config.title,
            icon: config.icon,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: nextZIndex,
          },
        },
        activeWindowId: id,
        highestZIndex: nextZIndex,
      };
    }),

  closeWindow: (id) =>
    set((state) => {
      const updatedWindows = { ...state.windows };
      delete updatedWindows[id];
      return {
        windows: updatedWindows,
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
      };
    }),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true },
      },
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

  toggleMaximizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMaximized: !state.windows[id]?.isMaximized },
      },
    })),

  focusWindow: (id) =>
    set((state) => {
      if (!state.windows[id]) return state;
      const nextZIndex = state.highestZIndex + 1;
      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMinimized: false, zIndex: nextZIndex },
        },
        activeWindowId: id,
        highestZIndex: nextZIndex,
      };
    }),

  setTheme: (theme) => set({ theme }),
  setWallpaper: (wallpaper) => set({ wallpaper }),
  updateSystemStats: (systemStats) => set({ systemStats }),
}));