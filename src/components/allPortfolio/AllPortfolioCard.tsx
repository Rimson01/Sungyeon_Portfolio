import type { PortfolioItem } from '../../features/portfolio/portfolio.types';
import styles from './AllPortfolioCard.module.css';

interface AllPortfolioCardProps {
  item: PortfolioItem;
  onSelect: (item: PortfolioItem) => void;
  className?: string;
}

export default function AllPortfolioCard({ item, onSelect, className }: AllPortfolioCardProps) {
  return (
    <button
      type="button"
      className={className ? `${styles.card} ${className}` : styles.card}
      onClick={() => onSelect(item)}
    >
      <div className={styles.media} aria-hidden="true">
        <img
          src={item.thumbnailUrl}
          alt=""
          className={styles[getImageClassName(item.id)]}
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
        <span>{item.category}</span>
      </div>
      <div className={styles.overlay}>
        <time dateTime={item.publishedAt}>{item.publishedAt}</time>
        <h2>{item.title}</h2>
        <p>{item.subtitle ?? item.projectType}</p>
      </div>
    </button>
  );
}

function getImageClassName(itemId: string) {
  if (itemId === 'personal-military-radio') return 'militaryRadioImage';
  if (itemId === 'personal-fire-place') return 'firePlaceImage';
  if (itemId === 'personal-sci-fi-corridor') return 'sciFiCorridorImage';
  if (itemId === 'personal-old-carriage') return 'oldCarriageImage';
  if (itemId === 'personal-zbrush-rock-environment-practice') return 'rockSceneImage';
  if (itemId === 'personal-zbrush-study') return 'zbrushStudyImage';
  if (itemId.startsWith('personal-material-')) return 'materialStudyImage';
  return 'defaultImage';
}
