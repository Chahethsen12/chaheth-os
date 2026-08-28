# ChahethOS

ChahethOS is an interactive portfolio presented as a browser-based desktop operating system. Open applications from the Start Menu, desktop shortcuts, or taskbar, then move, focus, minimize, maximize, and close each window like a lightweight desktop environment.

## Features

- Terminal with portfolio and window-launch commands
- Projects showcase with technology tags and repository links
- About, Settings, System Monitor, and Monaco-powered README Editor apps
- Desktop shortcuts, Start Menu, taskbar app switching, and live clock
- Draggable, minimizable, maximizable, closable, focusable windows with z-index management
- Selectable themes: Minimal Dark, Cyberdeck, and Retro Matrix
- Selectable desktop wallpapers
- Responsive React UI styled with Tailwind CSS v4

## Tech Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS v4 with `@tailwindcss/vite`
- Zustand for desktop and window state
- Framer Motion for window dragging
- Monaco Editor for the code editor app
- Lucide React for icons
- Oxlint for linting

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Installation

```bash
git clone https://github.com/Chahethsen12/chaheth-os.git
cd chaheth-os
npm install
```

### Development

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Production Build

Run the type-safe production build:

```bash
npm run build
```

Preview the generated build locally:

```bash
npm run preview
```

Run the linter:

```bash
npm run lint
```

## Project Structure

```text
src/
|-- apps/                 # Application windows
|-- components/
|   |-- desktop/          # Wallpaper and desktop shortcuts
|   |-- taskbar/          # Taskbar and Start Menu
|   `-- window/           # Reusable draggable window frame
|-- config/               # Portfolio content
|-- store/                # Zustand window and system state
|-- App.tsx               # Desktop shell and app routing
|-- App.css               # Application styles
`-- index.css             # Tailwind entry point and theme variables
```

## Terminal Commands

Open the Terminal app and try:

```text
help
about
projects
gui-about
gui-projects
clear
```

## Customization

Update portfolio content in `src/config/portfolioData.ts`. Themes, wallpapers, window metadata, and application IDs are defined around `src/store/useWindowStore.ts` and `src/index.css`.

## License

ChahethOS is released under the [MIT License](LICENSE).

## Author

Hapugala Arachchige Chaheth Janidu Senevirathne

- GitHub: [@Chahethsen12](https://github.com/Chahethsen12)
