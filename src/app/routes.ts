export const routes = [
  { path: '/', label: 'About' },
  { path: '/professional', label: 'Professional' },
  { path: '/personal-works', label: 'Personal Works' },
  { path: '/sketch', label: 'Sketch' },
  { path: '/designer', label: 'Designer' },
  { path: '/relighting', label: 'Re:Lighting' },
  { path: '/all-portfolio', label: 'ALL Portfolio' },
] as const;

export type AppRoute = (typeof routes)[number];
