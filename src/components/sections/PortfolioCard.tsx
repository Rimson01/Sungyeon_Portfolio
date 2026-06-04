import type { PortfolioItem } from '../../features/portfolio/portfolio.types';
import { useViewStats } from '../../features/viewStats/viewStats';
import styles from './PortfolioCard.module.css';

interface PortfolioCardProps {
  item: PortfolioItem;
  onSelect: (item: PortfolioItem) => void;
}

export default function PortfolioCard({ item, onSelect }: PortfolioCardProps) {
  const { getBadgeValue } = useViewStats();
  const badgeValue = getBadgeValue(item);

  return (
    <button type="button" className={styles.card} onClick={() => onSelect(item)}>
      {badgeValue ? <span className={styles.badge}>{badgeValue}</span> : null}
      <div className={styles.media} aria-hidden="true">
        <span>{item.mediaType}</span>
      </div>
      <div className={styles.overlay}>
        <time dateTime={item.publishedAt}>{item.publishedAt}</time>
        <h2>{item.title}</h2>
        <p>{item.subtitle ?? item.projectType}</p>
      </div>
    </button>
  );
}
