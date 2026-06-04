import { useEffect } from 'react';
import { useViewStats } from '../../features/viewStats/viewStats';
import { useCategoryLightbox } from './CategoryLightboxProvider';
import styles from './CategoryLightbox.module.css';

export default function CategoryLightbox() {
  const {
    activeItem,
    categoryItems,
    activeIndex,
    closeCategoryLightbox,
    selectCategoryItem,
    showPreviousItem,
    showNextItem,
  } = useCategoryLightbox();
  const { getViewCount, incrementMediaOpen } = useViewStats();

  useEffect(() => {
    if (!activeItem) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCategoryLightbox();
      if (event.key === 'ArrowLeft') showPreviousItem();
      if (event.key === 'ArrowRight') showNextItem();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem, closeCategoryLightbox, showNextItem, showPreviousItem]);

  useEffect(() => {
    if (activeItem) incrementMediaOpen(activeItem);
  }, [activeItem, incrementMediaOpen]);

  if (!activeItem) return null;

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={closeCategoryLightbox}>
      <section
        className={styles.lightbox}
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-lightbox-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.main}>
          <div className={styles.nav}>
            <button type="button" onClick={closeCategoryLightbox}>
              Close
            </button>
            <span>
              {activeIndex + 1} / {categoryItems.length}
            </span>
          </div>

          <MediaPreview item={activeItem} />

          <div className={styles.info}>
            <span className={styles.category}>{activeItem.category}</span>
            <time dateTime={activeItem.publishedAt}>{activeItem.publishedAt}</time>
            <span className={styles.views}>{getViewCount(activeItem)} media opens</span>
            <h2 id="category-lightbox-title">{activeItem.title}</h2>
            <p>{activeItem.descriptionHtml}</p>
          </div>

          <div className={styles.controls} aria-label="Sequential category navigation">
            <button type="button" onClick={showPreviousItem}>
              Previous
            </button>
            <button type="button" onClick={showNextItem}>
              Next
            </button>
          </div>
        </div>

        <aside className={styles.rail} aria-label={`${activeItem.category} thumbnails`}>
          {categoryItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === activeIndex ? styles.activeThumb : styles.thumb}
              onClick={() => selectCategoryItem(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.title}</strong>
              <small>{item.mediaType}</small>
            </button>
          ))}
        </aside>
      </section>
    </div>
  );
}

interface MediaPreviewProps {
  item: {
    mediaType: string;
    youtubeId?: string;
    title: string;
    thumbnailUrl: string;
  };
}

function MediaPreview({ item }: MediaPreviewProps) {
  if (item.mediaType === 'youtube' && item.youtubeId) {
    return (
      <div className={styles.youtubePreview}>
        <iframe
          title={`${item.title} video preview`}
          src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=0&controls=1&modestbranding=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={styles.mediaPreview}>
      <span>{item.mediaType}</span>
      <strong>{item.title}</strong>
      <small>{item.thumbnailUrl}</small>
    </div>
  );
}
