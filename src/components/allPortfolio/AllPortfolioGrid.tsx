import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PortfolioItem } from '../../features/portfolio/portfolio.types';
import AllPortfolioCard from './AllPortfolioCard';
import AllPortfolioViewer from './AllPortfolioViewer';
import styles from './AllPortfolioGrid.module.css';

type AppendState = 'idle' | 'loading' | 'exhausted';

const PAGE_SIZE = 3;

interface AllPortfolioGridProps {
  items: PortfolioItem[];
}

export default function AllPortfolioGrid({ items }: AllPortfolioGridProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadedIdsRef = useRef<Set<string>>(new Set());
  const [loadedItems, setLoadedItems] = useState<PortfolioItem[]>([]);
  const [appendState, setAppendState] = useState<AppendState>('idle');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const publishedItems = useMemo(
    () => items.filter((item) => item.isPublished).sort((a, b) => a.allOrder - b.allOrder),
    [items],
  );

  const appendNextPage = useCallback(() => {
    if (appendState !== 'idle') return;

    const remainingItems = publishedItems.filter((item) => !loadedIdsRef.current.has(item.id));
    if (remainingItems.length === 0) {
      setAppendState('exhausted');
      return;
    }

    setAppendState('loading');
    window.setTimeout(() => {
      const nextItems = remainingItems.slice(0, PAGE_SIZE);
      nextItems.forEach((item) => loadedIdsRef.current.add(item.id));
      setLoadedItems((currentItems) => [...currentItems, ...nextItems]);
      setAppendState(nextItems.length < PAGE_SIZE ? 'exhausted' : 'idle');
    }, 320);
  }, [appendState, publishedItems]);

  useEffect(() => {
    loadedIdsRef.current = new Set();
    setLoadedItems([]);
    setAppendState('idle');
  }, [publishedItems]);

  useEffect(() => {
    if (loadedItems.length === 0 && appendState === 'idle') {
      appendNextPage();
    }
  }, [appendNextPage, appendState, loadedItems.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) appendNextPage();
      },
      { root: null, rootMargin: '280px 0px', threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [appendNextPage]);

  return (
    <>
      <section className={styles.grid} aria-label="ALL Portfolio items">
        {loadedItems.map((item) => (
          <AllPortfolioCard key={item.id} item={item} onSelect={setSelectedItem} />
        ))}
      </section>

      <div ref={sentinelRef} className={styles.sentinel} aria-live="polite">
        {appendState === 'loading' ? 'Loading more portfolio items' : null}
        {appendState === 'exhausted' ? 'All published items loaded' : null}
      </div>

      {selectedItem ? (
        <AllPortfolioViewer
          item={selectedItem}
          loadedItems={loadedItems}
          onChangeItem={setSelectedItem}
          onClose={() => setSelectedItem(null)}
        />
      ) : null}
    </>
  );
}
