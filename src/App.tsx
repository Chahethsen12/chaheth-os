import { useEffect } from 'react';
import { useWindowStore, appConfig, type AppId } from './store/useWindowStore';
import { Window } from './components/window/Window';
import { Taskbar } from './components/taskbar/Taskbar';
import { Desktop } from './components/desktop/Desktop';
import { TerminalApp } from './apps/TerminalApp';
import { ProjectsApp } from './apps/ProjectsApp';
import { SettingsApp } from './apps/SettingsApp';
import { SystemMonitorApp } from './apps/SystemMonitorApp';
import { CodeEditorApp } from './apps/CodeEditorApp';

export default function App() {
  const { windows, openWindow, theme } = useWindowStore();

  useEffect(() => {
    openWindow('terminal');
  }, [openWindow]);

  return (
    <div data-theme={theme} className="relative w-screen h-screen bg-slate-950 overflow-hidden font-sans select-none">
      <Desktop />

      {Object.values(windows).map((win) => {
        const config = appConfig[win.id as AppId];
        return (
          <Window key={win.id} id={win.id} title={config.title} icon={config.icon}>
            {win.id === 'terminal' && <TerminalApp />}
            {win.id === 'projects' && <ProjectsApp />}
            {win.id === 'about' && (
              <div className="p-2 text-slate-200">
                <h2 className="text-lg font-bold mb-2">About Chaheth</h2>
                <p className="text-sm text-slate-400">Full-stack & AI Developer building structured WebOS systems.</p>
              </div>
            )}
            {win.id === 'settings' && <SettingsApp />}
            {win.id === 'monitor' && <SystemMonitorApp />}
            {win.id === 'editor' && <CodeEditorApp />}
          </Window>
        );
      })}

      <Taskbar />
    </div>
  );
}