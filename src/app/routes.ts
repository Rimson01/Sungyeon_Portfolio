export const routes = [
  { path: '/#work', label: 'WORK' },
] as const;

export type AppRoute = (typeof routes)[number];
