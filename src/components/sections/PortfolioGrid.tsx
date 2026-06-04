import type { PortfolioItem } from '../../features/portfolio/portfolio.types';
import { useCategoryLightbox } from '../lightbox/CategoryLightboxProvider';
import PortfolioCard from './PortfolioCard';
import styles from './PortfolioGrid.module.css';

interface PortfolioGridProps {
  items: PortfolioItem[];
  label?: string;
}

export default function PortfolioGrid({ items, label = 'Portfolio items' }: PortfolioGridProps) {
  const { openCategoryLightbox } = useCategoryLightbox();

  return (
    <section className={styles.grid} aria-label={label}>
      {items.map((item) => (
        <PortfolioCard
          key={item.id}
          item={item}
          onSelect={(selectedItem) => openCategoryLightbox(selectedItem, items)}
        />
      ))}
    </section>
  );
}
