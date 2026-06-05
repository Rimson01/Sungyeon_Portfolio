import { useMemo } from 'react';
import type { PortfolioItem } from '../../features/portfolio/portfolio.types';
import { useCategoryLightbox } from '../lightbox/CategoryLightboxProvider';
import AllPortfolioCard from './AllPortfolioCard';
import styles from './AllPortfolioGrid.module.css';

interface AllPortfolioGridProps {
  items: PortfolioItem[];
}

interface ArchiveSection {
  key: 'environmentStudy' | 'character';
  title: string;
  items: PortfolioItem[];
}

export default function AllPortfolioGrid({ items }: AllPortfolioGridProps) {
  const { openCategoryLightbox } = useCategoryLightbox();

  const publishedItems = useMemo(
    () => items.filter((item) => item.isPublished).sort((a, b) => a.allOrder - b.allOrder),
    [items],
  );

  const sections = useMemo<ArchiveSection[]>(
    () => [
      {
        key: 'environmentStudy',
        title: 'Environment / Study',
        items: publishedItems.filter((item) =>
          item.personalSubcategory === 'Environment' || item.personalSubcategory === 'Study',
        ),
      },
      {
        key: 'character',
        title: 'School Works',
        items: publishedItems.filter((item) => item.personalSubcategory === 'Character'),
      },
    ],
    [publishedItems],
  );

  const openItem = (item: PortfolioItem) => openCategoryLightbox(item, publishedItems);

  return (
    <div className={styles.archive} aria-label="ALL Portfolio items">
      {sections.map((section) => (
        <section
          key={section.key}
          className={`${styles.section} ${section.key === 'character' ? styles.schoolSection : ''}`}
          aria-labelledby={`${section.key}-title`}
        >
          {section.key === 'character' ? (
            <SchoolWorksHeader count={section.items.length} />
          ) : (
            <div className={styles.sectionHeader}>
              <h2 id={`${section.key}-title`}>{section.title}</h2>
              <small>{section.items.length} Projects</small>
            </div>
          )}
          {section.key === 'environmentStudy' ? (
            <EnvironmentStudyRows items={section.items} onSelect={openItem} />
          ) : (
            <div className={styles.character}>
              {section.items.map((item, index) => (
                <AllPortfolioCard
                  key={item.id}
                  item={item}
                  onSelect={openItem}
                  className={index === 0 ? styles.schoolFeatureCard : styles.schoolSupportCard}
                />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function SchoolWorksHeader({ count }: { count: number }) {
  return (
    <div className={styles.schoolHeader}>
      <div className={styles.schoolTitleBlock}>
        <span>Character Modeling Projects</span>
        <h2 id="character-title">
          School <strong>Works</strong>
        </h2>
      </div>
      <div className={styles.schoolRule} aria-hidden="true" />
      <div className={styles.schoolMeta}>
        <strong>{count} Projects</strong>
        <p>Character modeling projects created during school coursework.</p>
      </div>
    </div>
  );
}

interface EnvironmentStudyRowsProps {
  items: PortfolioItem[];
  onSelect: (item: PortfolioItem) => void;
}

function EnvironmentStudyRows({ items, onSelect }: EnvironmentStudyRowsProps) {
  const rows = [
    {
      className: styles.environmentRow,
      items: items.slice(0, 3),
    },
    {
      className: styles.studyFeatureRow,
      items: items.slice(3, 5),
    },
    {
      className: styles.materialRow,
      items: items.slice(5, 6),
    },
  ];

  return (
    <div className={styles.environmentStudy}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`${styles.archiveRow} ${row.className}`}>
          {row.items.map((item) => (
            <AllPortfolioCard key={item.id} item={item} onSelect={onSelect} />
          ))}
        </div>
      ))}
    </div>
  );
}
