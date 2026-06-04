# Portfolio v2

React/Vite portfolio scaffold based on Architecture v2. The app is currently using local mock data while the product structure, category flows, ALL Portfolio viewer, mock view counts, and mock rank snapshot are being shaped before Firebase integration.

## Tech Stack

- React
- Vite
- TypeScript
- Firebase SDK installed, not connected yet
- CSS Modules
- React Router
- pnpm

## Local Setup

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Current Feature Status

- About-first homepage implemented
- Portfolio pages implemented: Professional, Personal Works, Sketch, Designer, Re:Lighting, ALL Portfolio
- Shared category lightbox implemented with category-limited sequential navigation
- ALL Portfolio mock infinite scroll implemented
- ALL Portfolio dedicated viewer implemented with random wheel movement across loaded items
- Mock session-deduped view counts implemented with `sessionStorage`
- Mock NEW / count badge display implemented
- Mock daily rank snapshot and Spotlight Rank section implemented

Not implemented yet:

- Firestore data loading
- Firebase Storage images
- Real ranking snapshot generation
- Deployment pipeline
- Production portfolio content and imagery
