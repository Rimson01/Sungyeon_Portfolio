import { forwardRef, useEffect, useMemo, useRef, useState, type WheelEvent } from 'react';
import type { PortfolioItem, PortfolioMedia } from '../../features/portfolio/portfolio.types';
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
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const videoSectionRef = useRef<HTMLDivElement | null>(null);
  const gallerySectionRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLElement | null>(null);
  const wheelCooldownRef = useRef<number | null>(null);
  const snapCooldownRef = useRef<number | null>(null);
  const mediaItems = useMemo(
    () => activeItem?.media.filter((media) => media.lightboxEnabled) ?? [],
    [activeItem],
  );
  const videoMediaItems = useMemo(
    () => mediaItems.filter((media) => media.type === 'youtube'),
    [mediaItems],
  );
  const imageMediaItems = useMemo(
    () => mediaItems.filter((media) => media.type === 'image'),
    [mediaItems],
  );
  const selectedMedia = imageMediaItems[selectedMediaIndex];

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
    setSelectedMediaIndex(0);
    mainRef.current?.scrollTo({ top: 0 });
  }, [activeItem?.id]);

  useEffect(() => {
    setSelectedMediaIndex((currentIndex) =>
      Math.min(currentIndex, Math.max(imageMediaItems.length - 1, 0)),
    );
  }, [imageMediaItems.length]);

  useEffect(() => {
    if (activeItem) incrementMediaOpen(activeItem, selectedMedia?.id);
  }, [activeItem, incrementMediaOpen, selectedMedia?.id]);

  useEffect(() => {
    return () => {
      if (wheelCooldownRef.current !== null) {
        window.clearTimeout(wheelCooldownRef.current);
      }
      if (snapCooldownRef.current !== null) {
        window.clearTimeout(snapCooldownRef.current);
      }
    };
  }, []);

  const handleMainMediaWheel = (deltaY: number) => {
    if (imageMediaItems.length < 2 || deltaY === 0) return;

    if (wheelCooldownRef.current !== null) return;

    const direction = deltaY > 0 ? 1 : -1;
    setSelectedMediaIndex((currentIndex) =>
      Math.min(Math.max(currentIndex + direction, 0), imageMediaItems.length - 1),
    );

    wheelCooldownRef.current = window.setTimeout(() => {
      wheelCooldownRef.current = null;
    }, 220);
  };

  const handleMainSectionWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (videoMediaItems.length === 0 || event.deltaY === 0) return;
    if (!mainRef.current || !videoSectionRef.current || !gallerySectionRef.current) return;

    const target = event.target as HTMLElement;
    if (target.closest(`.${styles.mediaPreview}`)) return;
    if (snapCooldownRef.current !== null) {
      event.preventDefault();
      return;
    }

    const mainBounds = mainRef.current.getBoundingClientRect();
    const galleryBounds = gallerySectionRef.current.getBoundingClientRect();
    const galleryOffsetFromTop = galleryBounds.top - mainBounds.top;
    const isVideoView = galleryOffsetFromTop > mainBounds.height * 0.42;
    const isGalleryView = Math.abs(galleryOffsetFromTop) < mainBounds.height * 0.32;

    if (event.deltaY > 0 && isVideoView) {
      event.preventDefault();
      gallerySectionRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    if (event.deltaY < 0 && isGalleryView && mainRef.current.scrollTop <= gallerySectionRef.current.offsetTop + 16) {
      event.preventDefault();
      videoSectionRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    if (event.defaultPrevented) {
      snapCooldownRef.current = window.setTimeout(() => {
        snapCooldownRef.current = null;
      }, 520);
    }
  };

  useEffect(() => {
    if (!railRef.current || imageMediaItems.length === 0) return;

    const activeThumb = railRef.current.querySelector<HTMLButtonElement>(
      `[data-media-index="${selectedMediaIndex}"]`,
    );

    if (!activeThumb) return;

    const railBounds = railRef.current.getBoundingClientRect();
    const thumbBounds = activeThumb.getBoundingClientRect();
    const isVisible =
      thumbBounds.top >= railBounds.top &&
      thumbBounds.bottom <= railBounds.bottom &&
      thumbBounds.left >= railBounds.left &&
      thumbBounds.right <= railBounds.right;

    if (!isVisible) {
      activeThumb.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
    }
  }, [imageMediaItems.length, selectedMediaIndex]);

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
        <div ref={mainRef} className={styles.main} onWheel={handleMainSectionWheel}>
          <div className={styles.nav}>
            <button type="button" onClick={closeCategoryLightbox}>
              Close
            </button>
            <span>
              {activeIndex + 1} / {categoryItems.length}
            </span>
          </div>

          {videoMediaItems.length > 0 ? (
            <VideoSection ref={videoSectionRef} videos={videoMediaItems} item={activeItem} />
          ) : null}

          <section ref={gallerySectionRef} className={styles.gallerySection}>
            <MediaPreview
              item={activeItem}
              selectedMedia={selectedMedia}
              onWheelDelta={handleMainMediaWheel}
            />

            <div className={styles.info}>
              <span className={styles.category}>{activeItem.category}</span>
              <time dateTime={activeItem.publishedAt}>{activeItem.publishedAt}</time>
              <span className={styles.views}>
                {getViewCount(activeItem, selectedMedia?.id)} media opens
              </span>
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
          </section>
        </div>

        <aside ref={railRef} className={styles.rail} aria-label={`${activeItem.category} thumbnails`}>
          {imageMediaItems.length > 0
            ? imageMediaItems.map((media, index) => (
                <button
                  key={media.id}
                  type="button"
                  data-media-index={index}
                  className={index === selectedMediaIndex ? styles.activeThumb : styles.thumb}
                  onClick={() => setSelectedMediaIndex(index)}
                >
                  <div className={styles.thumbMedia}>
                    <MediaThumbnail media={media} item={activeItem} />
                  </div>
                  <div className={styles.thumbText}>
                    <strong>{getRailMediaLabel(activeItem, media, imageMediaItems.slice(0, index))}</strong>
                  </div>
                </button>
              ))
            : categoryItems.map((item, index) => (
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
  item: PortfolioItem;
  selectedMedia?: PortfolioItem['media'][number];
  onWheelDelta: (deltaY: number) => void;
}

interface VideoSectionProps {
  videos: PortfolioItem['media'];
  item: PortfolioItem;
}

type MediaWithOptionalSrc = PortfolioMedia & {
  displayLabel?: string;
  posterUrl?: string;
  src?: string;
};

function resolveMediaImageUrl(media: PortfolioMedia | undefined, item: PortfolioItem) {
  const mediaWithSrc = media as MediaWithOptionalSrc | undefined;
  return mediaWithSrc?.url ?? mediaWithSrc?.src ?? mediaWithSrc?.thumbnailUrl ?? item.thumbnailUrl;
}

function resolveYoutubeThumbnailUrl(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

function resolveMediaThumbnailUrl(media: PortfolioMedia | undefined, item: PortfolioItem) {
  return resolveMediaThumbnailCandidates(media, item)[0];
}

function resolveMediaThumbnailCandidates(media: PortfolioMedia | undefined, item: PortfolioItem) {
  const mediaWithSrc = media as MediaWithOptionalSrc | undefined;

  if (mediaWithSrc?.type === 'youtube') {
    return mediaWithSrc.youtubeId ? [resolveYoutubeThumbnailUrl(mediaWithSrc.youtubeId)] : [];
  }

  return [resolveMediaImageUrl(media, item)].filter((url): url is string => Boolean(url));
}

function isValidYoutubeId(youtubeId: string | undefined) {
  return Boolean(youtubeId && /^[\w-]{6,}$/.test(youtubeId));
}

function getMediaDisplayLabel(media: PortfolioMedia, previousMedia: PortfolioMedia[]) {
  const mediaWithSrc = media as MediaWithOptionalSrc;
  if (mediaWithSrc.displayLabel) return mediaWithSrc.displayLabel;
  if (media.type === 'youtube') return 'Video';

  const renderIndex = previousMedia.filter((item) => item.type !== 'youtube').length + 1;
  return `Render ${String(renderIndex).padStart(2, '0')}`;
}

function getRailMediaLabel(
  item: PortfolioItem,
  media: PortfolioMedia,
  previousMedia: PortfolioMedia[],
) {
  if (item.id === 'personal-military-radio') {
    return getMediaDisplayLabel(media, previousMedia);
  }

  return media.title;
}

interface MediaThumbnailProps {
  media: PortfolioMedia;
  item: PortfolioItem;
}

function MediaThumbnail({ media, item }: MediaThumbnailProps) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const thumbnailCandidates = resolveMediaThumbnailCandidates(media, item);
  const thumbnailUrl = thumbnailCandidates[candidateIndex];

  if (!thumbnailUrl) {
    return <div className={styles.thumbPlaceholder}>{media.type}</div>;
  }

  return (
    <img
      src={thumbnailUrl}
      alt=""
      onError={() => {
        if (candidateIndex < thumbnailCandidates.length - 1) {
          setCandidateIndex((currentIndex) => currentIndex + 1);
        } else {
          setCandidateIndex(thumbnailCandidates.length);
        }
      }}
    />
  );
}

const VideoSection = forwardRef<HTMLDivElement, VideoSectionProps>(function VideoSection(
  { videos, item },
  ref,
) {
  const playableVideos = videos.filter((media) => isValidYoutubeId(media.youtubeId));

  if (playableVideos.length === 0) return null;

  return (
    <div ref={ref} className={styles.videoSection}>
      {playableVideos.map((media) => (
        <div
          key={media.id}
          className={styles.videoFrame}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <iframe
            title={`${media.title ?? item.title} video preview`}
            src={`https://www.youtube.com/embed/${media.youtubeId}?autoplay=1&mute=1&playsinline=1&controls=1&modestbranding=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
});

function MediaPreview({ item, selectedMedia, onWheelDelta }: MediaPreviewProps) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const primaryMedia = selectedMedia ?? item.media.find((media) => media.type === 'image');
  const mediaType = primaryMedia?.type ?? item.mediaType;
  const youtubeId = primaryMedia?.youtubeId ?? item.youtubeId;
  const mediaTitle = primaryMedia?.title ?? item.title;
  const imageUrl = resolveMediaImageUrl(primaryMedia, item);

  useEffect(() => {
    const previewElement = previewRef.current;
    if (!previewElement || mediaType !== 'image') return undefined;

    const handleWheel = (event: globalThis.WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onWheelDelta(event.deltaY);
    };

    previewElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      previewElement.removeEventListener('wheel', handleWheel);
    };
  }, [mediaType, onWheelDelta]);

  if (mediaType === 'youtube' && isValidYoutubeId(youtubeId)) {
    return (
      <div
        className={styles.youtubePreview}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <iframe
          title={`${mediaTitle} video preview`}
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&controls=1&modestbranding=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  if (mediaType === 'youtube') {
    return (
      <div className={styles.mediaPreview}>
        <div className={styles.mainPlaceholder}>Video unavailable</div>
      </div>
    );
  }

  return (
    <div ref={previewRef} className={styles.mediaPreview}>
      <img src={imageUrl} alt={primaryMedia?.alt ?? item.title} />
      <div className={styles.mediaCaption}>
        <span>{primaryMedia ? getMediaDisplayLabel(primaryMedia, []) : mediaType}</span>
        <strong>{mediaTitle}</strong>
      </div>
    </div>
  );
}
