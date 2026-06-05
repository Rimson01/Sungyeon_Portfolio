export const routes = [
  { path: '/about', label: 'About' },
  { path: '/personal-works', label: 'Personal Works' },
  { path: '/', label: 'ALL Portfolio' },
] as const;

export type AppRoute = (typeof routes)[number];
