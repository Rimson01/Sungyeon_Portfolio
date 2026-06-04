import { useMemo } from 'react';
import { mockDailyRankSnapshot } from '../../data/mockRankSnapshot';
import { mockPortfolioItems } from '../../data/mockPortfolio';
import type { PortfolioItem } from '../../features/portfolio/portfolio.types';
import { useCategoryLightbox } from '../lightbox/CategoryLightboxProvider';
import PortfolioCard from './PortfolioCard';
import styles from './RankSpotlight.module.css';

interface RankedPortfolioItem {
  item: PortfolioItem;
  rank: number;
  imageViews: number;
}

export default function RankSpotlight() {
  const { openCategoryLightbox } = useCategoryLightbox();

  const rankedItems = useMemo<RankedPortfolioItem[]>(() => {
    return mockDailyRankSnapshot.items
      .map((snapshotItem) => {
        const item = mockPortfolioItems.find(
          (portfolioItem) => portfolioItem.id === snapshotItem.portfolioItemId,
        );
        return item
          ? {
              item,
              rank: snapshotItem.rank,
              imageViews: snapshotItem.imageViews,
            }
          : null;
      })
      .filter((entry): entry is RankedPortfolioItem => entry !== null);
  }, []);

  return (
    <section className={styles.spotlight} aria-labelledby="rank-spotlight-title">
      <div className={styles.header}>
        <span>Daily Snapshot / {mockDailyRankSnapshot.dateKey}</span>
        <h2 id="rank-spotlight-title">Spotlight Rank</h2>
        <p>
          Mock ranking is generated from local image/media open counts. This section does not use
          Firestore, live top queries, or ranking snapshots from a backend.
        </p>
      </div>

      <div className={styles.rankGrid}>
        {rankedItems.map(({ item, rank, imageViews }) => (
          <div
            key={item.id}
            className={`${styles.rankSlot} ${rank <= 6 ? styles[`rank${rank}`] : styles.normal}`}
          >
            <div className={styles.rankMeta}>
              <span>#{rank}</span>
              <small>{imageViews} views</small>
            </div>
            <PortfolioCard
              item={item}
              onSelect={(selectedItem) => openCategoryLightbox(selectedItem, mockPortfolioItems)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
