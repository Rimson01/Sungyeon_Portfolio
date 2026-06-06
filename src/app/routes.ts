export const routes = [
  { path: '/', label: 'ALL Portfolio' },
] as const;

export type AppRoute = (typeof routes)[number];
