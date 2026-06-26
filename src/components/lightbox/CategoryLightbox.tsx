import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent,
} from 'react';
import type { PortfolioItem, PortfolioMedia } from '../../features/portfolio/portfolio.types';
import { useViewStats } from '../../features/viewStats/viewStats';
import { useCategoryLightbox } from './CategoryLightboxProvider';
import styles from './CategoryLightbox.module.css';

export default function CategoryLightbox() {
  const {
    activeItem,
    categoryItems,
    activeIndex,
    initialMediaId,
    closeCategoryLightbox,
    selectCategoryItem,
    showPreviousItem,
    showNextItem,
  } = useCategoryLightbox();
  const { getViewCount, incrementMediaOpen } = useViewStats();
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const wheelCooldownRef = useRef<number | null>(null);
  const railWheelCooldownRef = useRef<number | null>(null);
  const mediaItems = useMemo(() => {
    if (!activeItem) return [];

    return activeItem.media.filter((media) => media.lightboxEnabled);
  }, [activeItem]);
  const selectedMedia = mediaItems[selectedMediaIndex];

  useEffect(() => {
    if (!activeItem) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (zoomedImageUrl) {
          setZoomedImageUrl(null);
        } else {
          closeCategoryLightbox();
        }
      }
      if (event.key === 'ArrowLeft') showPreviousItem();
      if (event.key === 'ArrowRight') showNextItem();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem, closeCategoryLightbox, showNextItem, showPreviousItem, zoomedImageUrl]);

  useEffect(() => {
    const requestedMediaId =
      initialMediaId ??
      (activeItem?.archiveGroup === 'substanceDesigner' ? activeItem.media[0]?.id : undefined);
    const initialMediaIndex = requestedMediaId
      ? Math.max(0, mediaItems.findIndex((media) => media.id === requestedMediaId))
      : 0;

    setSelectedMediaIndex(initialMediaIndex);
    setZoomedImageUrl(null);
    mainRef.current?.scrollTo({ top: 0 });
  }, [activeItem?.id, initialMediaId, mediaItems]);

  useEffect(() => {
    setSelectedMediaIndex((currentIndex) =>
      Math.min(currentIndex, Math.max(mediaItems.length - 1, 0)),
    );
  }, [mediaItems.length]);

  useEffect(() => {
    if (activeItem) incrementMediaOpen(activeItem, selectedMedia?.id);
  }, [activeItem, incrementMediaOpen, selectedMedia?.id]);

  useEffect(() => {
    return () => {
      if (wheelCooldownRef.current !== null) {
        window.clearTimeout(wheelCooldownRef.current);
      }
      if (railWheelCooldownRef.current !== null) {
        window.clearTimeout(railWheelCooldownRef.current);
      }
    };
  }, []);

  const handleMainMediaWheel = (deltaY: number) => {
    if (mediaItems.length < 2 || deltaY === 0) return;

    if (wheelCooldownRef.current !== null) return;

    const direction = deltaY > 0 ? 1 : -1;
    setSelectedMediaIndex((currentIndex) =>
      Math.min(Math.max(currentIndex + direction, 0), mediaItems.length - 1),
    );

    wheelCooldownRef.current = window.setTimeout(() => {
      wheelCooldownRef.current = null;
    }, 220);
  };

  const handleRailWheel = (event: WheelEvent<HTMLElement>) => {
    if (mediaItems.length < 2 || event.deltaY === 0) return;

    event.preventDefault();
    event.stopPropagation();
    if (railWheelCooldownRef.current !== null) return;

    const direction = event.deltaY > 0 ? 1 : -1;
    setSelectedMediaIndex((currentIndex) =>
      Math.min(Math.max(currentIndex + direction, 0), mediaItems.length - 1),
    );

    railWheelCooldownRef.current = window.setTimeout(() => {
      railWheelCooldownRef.current = null;
    }, 180);
  };

  useEffect(() => {
    if (!railRef.current || mediaItems.length === 0) return;

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
  }, [mediaItems.length, selectedMediaIndex]);

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
        <div ref={mainRef} className={styles.main}>
          <div className={styles.nav}>
            <button type="button" onClick={closeCategoryLightbox}>
              Close
            </button>
            <span>
              {mediaItems.length > 0 ? selectedMediaIndex + 1 : 0} / {mediaItems.length}
            </span>
          </div>

          <div className={styles.mediaStage}>
            <MediaPreview
              item={activeItem}
              selectedMedia={selectedMedia}
              onWheelDelta={handleMainMediaWheel}
              onZoom={setZoomedImageUrl}
            />
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

        <aside className={styles.sidePanel}>
          <div className={styles.info}>
            <div className={styles.meta}>
              <span className={styles.category}>{activeItem.category}</span>
              <time dateTime={activeItem.publishedAt}>{activeItem.publishedAt}</time>
              <span className={styles.views}>
                {getViewCount(activeItem, selectedMedia?.id)} media opens
              </span>
            </div>
            <h2 id="category-lightbox-title">{activeItem.title}</h2>
            <p>{activeItem.descriptionHtml}</p>
            <ProjectFacts item={activeItem} />
          </div>
          <div
            ref={railRef}
            className={styles.rail}
            aria-label={`${activeItem.category} thumbnails`}
            onWheel={handleRailWheel}
          >
            {mediaItems.length > 0
              ? mediaItems.map((media, index) => (
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
                    <strong>{getRailMediaLabel(activeItem, media, mediaItems.slice(0, index))}</strong>
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
          </div>
        </aside>
      </section>
      {zoomedImageUrl ? (
        <ImageZoomOverlay imageUrl={zoomedImageUrl} onClose={() => setZoomedImageUrl(null)} />
      ) : null}
    </div>
  );
}

interface MediaPreviewProps {
  item: PortfolioItem;
  selectedMedia?: PortfolioItem['media'][number];
  onWheelDelta: (deltaY: number) => void;
  onZoom: (imageUrl: string) => void;
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

function isValidYoutubeId(youtubeId: string | undefined): youtubeId is string {
  return Boolean(youtubeId && /^[\w-]{6,}$/.test(youtubeId));
}

function buildYoutubeEmbedUrl(youtubeId: string, startSeconds?: number) {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    playsinline: '1',
    controls: '1',
    modestbranding: '1',
    rel: '0',
  });

  if (startSeconds) {
    params.set('start', String(startSeconds));
  }

  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
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
  if (media.displayLabel) return media.displayLabel;

  if (
    item.id === 'personal-military-radio' ||
    item.id === 'personal-fire-place' ||
    item.id === 'personal-sci-fi-corridor' ||
    item.id === 'personal-head-hunter' ||
    item.id === 'personal-babarian' ||
    item.id === 'personal-android' ||
    item.id === 'personal-zbrush-rock-environment-practice' ||
    item.id === 'personal-zbrush-study'
  ) {
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

function MediaPreview({
  item,
  selectedMedia,
  onWheelDelta,
  onZoom,
}: MediaPreviewProps) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [videoInteractionEnabled, setVideoInteractionEnabled] = useState(false);
  const [useFullHdPlayer, setUseFullHdPlayer] = useState(false);
  const [youtubeScale, setYoutubeScale] = useState(1);
  const primaryMedia = selectedMedia ?? item.media.find((media) => media.type === 'image');
  const mediaType = primaryMedia?.type ?? item.mediaType;
  const youtubeId = primaryMedia?.youtubeId ?? item.youtubeId;
  const mediaTitle = primaryMedia?.title ?? item.title;
  const imageUrl = resolveMediaImageUrl(primaryMedia, item);

  useEffect(() => {
    setVideoInteractionEnabled(false);
  }, [primaryMedia?.id]);

  useLayoutEffect(() => {
    const previewElement = previewRef.current;
    if (!previewElement || mediaType !== 'youtube') return undefined;

    const updatePlayerSize = () => {
      const width = previewElement.clientWidth;
      const shouldUseFullHdPlayer = width >= 960;

      setUseFullHdPlayer(shouldUseFullHdPlayer);
      setYoutubeScale(shouldUseFullHdPlayer ? width / 1920 : 1);
    };

    updatePlayerSize();
    const resizeObserver = new ResizeObserver(updatePlayerSize);
    resizeObserver.observe(previewElement);

    return () => resizeObserver.disconnect();
  }, [mediaType, primaryMedia?.id]);

  useEffect(() => {
    const previewElement = previewRef.current;
    const canCaptureWheel =
      mediaType === 'image' || (mediaType === 'youtube' && !videoInteractionEnabled);
    if (!previewElement || !canCaptureWheel) return undefined;

    const handleWheel = (event: globalThis.WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onWheelDelta(event.deltaY);
    };

    previewElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      previewElement.removeEventListener('wheel', handleWheel);
    };
  }, [mediaType, onWheelDelta, videoInteractionEnabled]);

    if (mediaType === 'youtube' && isValidYoutubeId(youtubeId)) {
      return (
        <div
          ref={previewRef}
          className={styles.youtubePreview}
          onMouseDown={(event) => event.stopPropagation()}
          onMouseLeave={() => setVideoInteractionEnabled(false)}
        >
          <iframe
            title={`${mediaTitle} video preview`}
            className={useFullHdPlayer ? styles.youtubeFullHdFrame : undefined}
            style={
              useFullHdPlayer
                ? ({ '--youtube-scale': youtubeScale } as CSSProperties)
                : undefined
            }
            width={useFullHdPlayer ? 1920 : undefined}
            height={useFullHdPlayer ? 1080 : undefined}
            src={buildYoutubeEmbedUrl(youtubeId, primaryMedia?.youtubeStartSeconds)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          {!videoInteractionEnabled ? (
            <div
              className={styles.videoWheelCapture}
              role="button"
              tabIndex={0}
              aria-label="Scroll to navigate media or click to control the video"
              onClick={() => setVideoInteractionEnabled(true)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setVideoInteractionEnabled(true);
                }
              }}
            >
              <span>Scroll media · Click for video controls</span>
            </div>
          ) : null}
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
      <button
        type="button"
        className={styles.zoomTrigger}
        onClick={() => onZoom(imageUrl)}
        aria-label="Zoom in on image"
      />
    </div>
  );
}

function ProjectFacts({ item }: { item: PortfolioItem }) {
  const period = item.stats.find((stat) => stat.key === 'Period')?.value;
  const tools =
    item.tools.length > 0 ? item.tools.map(formatToolName).join(' · ') : undefined;

  if (!period && !tools) return null;

  return (
    <dl className={styles.projectFacts}>
      {period ? (
        <div>
          <dt>Period</dt>
          <dd>{period}</dd>
        </div>
      ) : null}
      {tools ? (
        <div>
          <dt>Tools</dt>
          <dd>{tools}</dd>
        </div>
      ) : null}
    </dl>
  );
}

function formatToolName(tool: string) {
  const normalizedNames: Record<string, string> = {
    '3DS MAX': '3ds Max',
    MARMOSET: 'Marmoset Toolbag',
    MAYA: 'Maya',
    'RIZOM UV': 'RizomUV',
    'SUBSTANCE DESIGNER': 'Substance Designer',
    'SUBSTANCE PAINTER': 'Substance Painter',
    UE5: 'Unreal Engine 5',
    ZBRUSH: 'ZBrush',
  };

  return normalizedNames[tool.toUpperCase()] ?? tool;
}

function ImageZoomOverlay({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false,
  });

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
      moved: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragState.current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragState.current.startX;
    const deltaY = event.clientY - dragState.current.startY;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 6) {
      dragState.current.moved = true;
    }
    setOffset({
      x: dragState.current.originX + deltaX,
      y: dragState.current.originY + deltaY,
    });
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState.current.pointerId !== event.pointerId) return;

    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDragging(false);
    if (!dragState.current.moved) onClose();
  };

  return (
    <div
      className={styles.zoomOverlay}
      role="dialog"
      aria-modal="true"
      onMouseDown={(event) => {
        event.stopPropagation();
        onClose();
      }}
    >
      <button type="button" className={styles.zoomClose} onClick={onClose}>
        Close
      </button>
      <div className={styles.zoomViewport} onMouseDown={(event) => event.stopPropagation()}>
        <div
          className={`${styles.zoomPanSurface} ${isDragging ? styles.zoomPanDragging : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Drag the enlarged image, or click to zoom out"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setIsDragging(false)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onClose();
            }
          }}
        >
          <img
            src={imageUrl}
            alt="Enlarged portfolio render"
            draggable={false}
            style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(2.8)` }}
          />
        </div>
      </div>
    </div>
  );
}
