import { useMemo } from 'react';
import type { PortfolioItem } from '../../features/portfolio/portfolio.types';
import { useCategoryLightbox } from '../lightbox/CategoryLightboxProvider';
import AllPortfolioCard from './AllPortfolioCard';
import styles from './AllPortfolioGrid.module.css';

interface AllPortfolioGridProps {
  items: PortfolioItem[];
}

interface ArchiveSection {
  key: 'environmentStudy' | 'substanceDesigner' | 'schoolWorks';
  title: string;
  label?: string;
  description?: string;
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
          item.archiveGroup !== 'substanceDesigner' &&
          (item.personalSubcategory === 'Environment' || item.personalSubcategory === 'Study'),
        ),
      },
      {
        key: 'substanceDesigner',
        title: 'Substance Designer',
        label: 'Procedural Material Studies',
        description: 'Fabric, tile, and ornament materials created with procedural workflows.',
        items: publishedItems.filter((item) => item.archiveGroup === 'substanceDesigner'),
      },
      {
        key: 'schoolWorks',
        title: 'School Works',
        label: 'Character Modeling Projects',
        description: 'Character modeling projects created during school coursework.',
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
          className={`${styles.section} ${
            section.key === 'environmentStudy' ? '' : styles.editorialSection
          }`}
          aria-labelledby={`${section.key}-title`}
        >
          {section.key !== 'environmentStudy' ? (
            <EditorialHeader section={section} />
          ) : (
            <div className={styles.sectionHeader}>
              <h2 id={`${section.key}-title`}>{section.title}</h2>
              <small>{section.items.length} Projects</small>
            </div>
          )}
          {section.key === 'environmentStudy' ? (
            <EnvironmentStudyRows items={section.items} onSelect={openItem} />
          ) : section.key === 'substanceDesigner' ? (
            <SubstanceImageGrid
              items={section.items}
              onSelect={(item, mediaId) =>
                openCategoryLightbox(item, publishedItems, mediaId)
              }
            />
          ) : (
            <div className={`${styles.curatedGrid} ${styles.schoolGrid}`}>
              {section.items.map((item) => (
                <AllPortfolioCard
                  key={item.id}
                  item={item}
                  onSelect={openItem}
                  className={styles.curatedCard}
                />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function SubstanceImageGrid({
  items,
  onSelect,
}: {
  items: PortfolioItem[];
  onSelect: (item: PortfolioItem, mediaId: string) => void;
}) {
  const entries = items.flatMap((item) =>
    item.media
      .filter((media) => media.type === 'image' && media.lightboxEnabled)
      .map((media) => ({ item, media })),
  );

  return (
    <div className={`${styles.curatedGrid} ${styles.substanceGrid}`}>
      {entries.map(({ item, media }) => {
        const displayItem: PortfolioItem = {
          ...item,
          id: `${item.id}-${media.id}`,
          title: media.displayLabel ?? media.title,
          thumbnailUrl: media.thumbnailUrl ?? media.url ?? item.thumbnailUrl,
        };

        return (
          <AllPortfolioCard
            key={media.id}
            item={displayItem}
            onSelect={() => onSelect(item, media.id)}
            className={`${styles.curatedCard} ${styles.substanceCard}`}
          />
        );
      })}
    </div>
  );
}

function EditorialHeader({ section }: { section: ArchiveSection }) {
  const titleWords = section.title.split(' ');
  const accentWord = titleWords.pop();
  const itemCount =
    section.key === 'substanceDesigner'
      ? section.items.reduce(
          (count, item) =>
            count +
            item.media.filter((media) => media.type === 'image' && media.lightboxEnabled).length,
          0,
        )
      : section.items.length;

  return (
    <div className={styles.schoolHeader}>
      <div className={styles.schoolTitleBlock}>
        <span>{section.label}</span>
        <h2 id={`${section.key}-title`}>
          {titleWords.join(' ')} {accentWord ? <strong>{accentWord}</strong> : null}
        </h2>
      </div>
      <div className={styles.schoolRule} aria-hidden="true" />
      <div className={styles.schoolMeta}>
        <strong>{itemCount} Projects</strong>
        <p>{section.description}</p>
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
  ].filter((row) => row.items.length > 0);

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
