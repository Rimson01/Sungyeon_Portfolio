export const routes = [
  { path: '/', label: 'WORK' },
] as const;

export type AppRoute = (typeof routes)[number];
