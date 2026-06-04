import { useEffect } from 'react';
import type { PortfolioItem } from '../../features/portfolio/portfolio.types';
import { useViewStats } from '../../features/viewStats/viewStats';
import styles from './AllPortfolioViewer.module.css';

interface AllPortfolioViewerProps {
  item: PortfolioItem;
  loadedItems: PortfolioItem[];
  onChangeItem: (item: PortfolioItem) => void;
  onClose: () => void;
}

export default function AllPortfolioViewer({
  item,
  loadedItems,
  onChangeItem,
  onClose,
}: AllPortfolioViewerProps) {
  const { getViewCount, incrementMediaOpen } = useViewStats();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    incrementMediaOpen(item);
  }, [incrementMediaOpen, item]);

  const jumpToRandomLoadedItem = () => {
    const candidates = loadedItems.filter((loadedItem) => loadedItem.id !== item.id);
    if (candidates.length === 0) return;

    const nextItem = candidates[Math.floor(Math.random() * candidates.length)];
    onChangeItem(nextItem);
  };

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
      <section
        className={styles.viewer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="all-viewer-title"
        onMouseDown={(event) => event.stopPropagation()}
        onWheel={(event) => {
          event.preventDefault();
          jumpToRandomLoadedItem();
        }}
      >
        <div className={styles.topbar}>
          <button type="button" onClick={onClose}>
            Close
          </button>
          <span>Wheel = Random Loaded Item</span>
        </div>

        <MediaPanel item={item} />

        <div className={styles.info}>
          <span>{item.category}</span>
          <time dateTime={item.publishedAt}>{item.publishedAt}</time>
          <span>{getViewCount(item)} media opens</span>
          <h2 id="all-viewer-title">{item.title}</h2>
          <p>{item.descriptionHtml}</p>
        </div>
      </section>
    </div>
  );
}

interface MediaPanelProps {
  item: PortfolioItem;
}

function MediaPanel({ item }: MediaPanelProps) {
  const primaryMedia = item.media.find((media) => media.type === 'image') ?? item.media[0];
  const mediaType = primaryMedia?.type ?? item.mediaType;
  const youtubeId = primaryMedia?.youtubeId ?? item.youtubeId;
  const mediaTitle = primaryMedia?.title ?? item.title;
  const imageUrl = primaryMedia?.url ?? primaryMedia?.thumbnailUrl ?? item.thumbnailUrl;
  const thumbnailUrl = primaryMedia?.thumbnailUrl ?? imageUrl;

  if (mediaType === 'youtube' && youtubeId) {
    return (
      <div className={styles.youtubePanel}>
        <iframe
          title={`${mediaTitle} video preview`}
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&controls=1&modestbranding=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={styles.mediaPanel}>
      <img src={imageUrl} alt={primaryMedia?.alt ?? item.title} />
      <div className={styles.mediaCaption}>
        <span>{mediaType}</span>
        <strong>{mediaTitle}</strong>
        <small>{thumbnailUrl}</small>
      </div>
    </div>
  );
}
