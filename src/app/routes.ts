export const routes = [
  { path: '/', label: 'About' },
  { path: '/personal-works', label: 'Personal Works' },
  { path: '/all-portfolio', label: 'ALL Portfolio' },
] as const;

export type AppRoute = (typeof routes)[number];
