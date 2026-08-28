import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const readmeContent = `# ChahethOS

> Welcome to your web-based engineering playground.

## 🚀 Overview
ChahethOS is a functional WebOS built with React 18, Vite, Tailwind CSS (v4), and Zustand for lightweight state management.

## 🛠️ Stack
- **Framework:** React + TypeScript + Vite
- **State:** Zustand (Window & System Management)
- **Styling:** Tailwind CSS + \`framer-motion\`
- **Icons:** Lucide React

## 🎯 Architecture
Organized by distinct system layers:
1. \`store/\`: Global Zustand store for window state, themes, and stats.
2. \`components/window/\`: Reusable Window Frame component with dragging/resizing.
3. \`components/taskbar/\`: System taskbar, start menu, and process monitoring.
4. \`apps/\`: Distinct \`*.tsx\` views for each simulated application.
5. \`config/\`: Central portfolio data and system item definitions.
`;

export const CodeEditorApp: React.FC = () => {
  const [content, setContent] = useState(readmeContent);

  return (
    <div className="h-full border border-slate-700/60 rounded-md overflow-hidden bg-slate-950">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border-b border-slate-700/60 text-xs text-slate-500 font-mono">
        <span className="text-sky-400">README.md</span> - Monaco Editor Preview
      </div>
      <Editor
        height="calc(100% - 28px)"
        defaultLanguage="markdown"
        defaultValue={content}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 12,
          lineNumbers: 'on',
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          padding: { top: 10, bottom: 10 }
        }}
        onChange={(value) => setContent(value || '')}
      />
    </div>
  );
};