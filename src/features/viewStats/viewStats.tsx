import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { mockImageViewCounts } from '../../data/mockViewStats';
import type { PortfolioItem } from '../portfolio/portfolio.types';

type BadgeValue = 'NEW' | number | null;

interface ViewStatsContextValue {
  counts: Record<string, number>;
  getViewCount: (item: PortfolioItem) => number;
  getBadgeValue: (item: PortfolioItem) => BadgeValue;
  incrementMediaOpen: (item: PortfolioItem) => void;
}

const ViewStatsContext = createContext<ViewStatsContextValue | null>(null);
const SESSION_STORAGE_KEY = 'portfolio-v2-viewed-media';
const NEW_BADGE_DAYS = 30;

function getPrimaryMediaId(item: PortfolioItem) {
  return item.media[0]?.id ?? item.id;
}

function getViewedMediaIds() {
  try {
    const rawValue = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    const parsedValue = rawValue ? (JSON.parse(rawValue) as unknown) : [];
    return Array.isArray(parsedValue)
      ? new Set(parsedValue.filter((value): value is string => typeof value === 'string'))
      : new Set<string>();
  } catch {
    return new Set<string>();
  }
}

function saveViewedMediaIds(ids: Set<string>) {
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify([...ids]));
}

function isWithinRecentWindow(dateValue: string) {
  const timestamp = new Date(dateValue).getTime();
  if (Number.isNaN(timestamp)) return false;

  const ageMs = Date.now() - timestamp;
  return ageMs >= 0 && ageMs <= NEW_BADGE_DAYS * 24 * 60 * 60 * 1000;
}

export function ViewStatsProvider({ children }: PropsWithChildren) {
  const [counts, setCounts] = useState<Record<string, number>>(mockImageViewCounts);

  const getViewCount = useCallback(
    (item: PortfolioItem) => counts[getPrimaryMediaId(item)] ?? 0,
    [counts],
  );

  const getBadgeValue = useCallback(
    (item: PortfolioItem): BadgeValue => {
      const views = counts[getPrimaryMediaId(item)] ?? 0;
      if (views >= 10) return views;
      if (isWithinRecentWindow(item.publishedAt) && views < 10) return 'NEW';
      return null;
    },
    [counts],
  );

  const incrementMediaOpen = useCallback((item: PortfolioItem) => {
    const mediaId = getPrimaryMediaId(item);
    const viewedIds = getViewedMediaIds();

    if (viewedIds.has(mediaId)) return;

    viewedIds.add(mediaId);
    saveViewedMediaIds(viewedIds);
    setCounts((currentCounts) => ({
      ...currentCounts,
      [mediaId]: (currentCounts[mediaId] ?? 0) + 1,
    }));
  }, []);

  const value = useMemo<ViewStatsContextValue>(
    () => ({
      counts,
      getViewCount,
      getBadgeValue,
      incrementMediaOpen,
    }),
    [counts, getBadgeValue, getViewCount, incrementMediaOpen],
  );

  return <ViewStatsContext.Provider value={value}>{children}</ViewStatsContext.Provider>;
}

export function useViewStats() {
  const context = useContext(ViewStatsContext);
  if (!context) {
    throw new Error('useViewStats must be used inside ViewStatsProvider');
  }
  return context;
}
