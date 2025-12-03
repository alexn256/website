[![Netlify Status](https://api.netlify.com/api/v1/badges/393bf599-4838-4435-bc89-342830002845/deploy-status)](https://app.netlify.com/projects/alexn256/deploys)

# Alexander Naumov - Personal Website

Modern, interactive personal portfolio website built with React, TypeScript, and Vite.

**[Live Demo](https://alexn256.netlify.app)**

## Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type safety and better DX
- **Vite** - Lightning fast build tool
- **CSS3** - Custom properties and animations
- **Netlify** - Continuous deployment

## Features

- ⚡ Blazing fast performance with Vite
- 🌗 Dark/Light theme toggle with localStorage persistence
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 🎯 Intersection Observer for scroll animations
- 🎨 Custom typing effect for code window
- 🎮 Easter egg (try the Konami code: ↑↑↓↓←→←→BA)
- 📊 Visit counter with animated counting
- ♿ Accessibility-friendly

## Project Structure

```
├── src/
│   ├── components/       # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── CodeWindow.tsx
│   │   └── BackgroundEffects.tsx
│   ├── context/          # React context providers
│   │   └── ThemeContext.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useIntersectionObserver.ts
│   │   └── useScrollEffect.ts
│   ├── styles/           # CSS styles
│   │   └── main.css
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── assets/               # Static assets
├── index.html            # HTML template
└── netlify.toml          # Netlify configuration
```

## Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Deployment

The site automatically deploys to Netlify when pushing to the `main` branch.

Build settings:
- Build command: `npm run build`
- Publish directory: `dist`

## Migration

This project was migrated from vanilla JavaScript to React + TypeScript while preserving all original features and animations. The vanilla JS version is preserved in the `vanilla-js-backup` branch.

## License

MIT © Alexander Naumov
