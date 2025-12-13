# LiftMate - Ride-Sharing Platform for South Africa

A modern landing page for LiftMate, a ride-sharing and package delivery platform connecting drivers and riders across South Africa.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Built with Tailwind CSS and React
- **Component-Based**: Modular components for easy maintenance
- **Brand Colors**: Emerald green theme representing trust, safety, and reliability

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Vite (build tool)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
  components/
    Header.tsx          # Navigation header
    Hero.tsx            # Hero section with stats
    Features.tsx         # 6 key features
    HowItWorks.tsx      # Driver and rider flows
    Safety.tsx          # Safety features
    Pricing.tsx         # 3 pricing tiers
    CTA.tsx             # Call-to-action section
    Footer.tsx          # Footer with links
    LiftMateLogo.tsx    # Logo version 1 (circular)
    LiftMateLogoV2.tsx  # Logo version 2 (rounded square)
    ImageWithFallback.tsx # Image component with fallback
  App.tsx               # Main app component
  main.tsx              # Entry point
  index.css             # Global styles
```

## Components

### Logo Options

- **LiftMateLogo.tsx**: Circular design with connecting path between two people
- **LiftMateLogoV2.tsx**: Rounded square with "L" road path and "M" people connection

Currently using **LiftMateLogo** (Version 1) throughout the site.

## Brand Colors

- Primary: `emerald-500` (#10B981)
- Secondary: `emerald-600` (#059669)

## License

MIT

