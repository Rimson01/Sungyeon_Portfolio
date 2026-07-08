import { useEffect, useRef, useState } from 'react';
import AllPortfolioGrid from '../components/allPortfolio/AllPortfolioGrid';
import { mockPortfolioItems } from '../data/mockPortfolio';
import type { PortfolioItem } from '../features/portfolio/portfolio.types';
import styles from './AllPortfolioPage.module.css';

const realArchiveItemIds = [
  'personal-military-radio',
  'personal-fire-place',
  'personal-sci-fi-corridor',
  'personal-old-carriage',
  'personal-battle-axe',
  'personal-zbrush-rock-environment-practice',
  'personal-zbrush-study',
  'personal-material-fabric',
  'personal-material-tile',
  'personal-material-ornament',
  'personal-head-hunter',
  'personal-babarian',
  'personal-android',
] as const;

const heroVideoWeights = [
  { itemId: 'personal-old-carriage', weight: 5 },
  { itemId: 'personal-fire-place', weight: 4 },
  { itemId: 'personal-military-radio', weight: 3 },
  { itemId: 'personal-sci-fi-corridor', weight: 2 },
] as const;

const contactEmail = 'sungyeonlee1350@gmail.com';
const profileTools = [
  '3ds Max',
  'Maya',
  'ZBrush',
  'Substance Painter',
  'Substance Designer',
  'Marvelous Designer',
  'Marmoset Toolbag',
  'Unreal Engine 5',
  'Photoshop',
  'Nuke',
];

interface HeroVideo {
  id: string;
  title: string;
  posterUrl: string;
}

interface YouTubePlayer {
  destroy: () => void;
  mute: () => void;
  playVideo: () => void;
}

interface YouTubePlayerEvent {
  target: YouTubePlayer;
}

interface YouTubePlayerStateEvent extends YouTubePlayerEvent {
  data: number;
}

interface YouTubeApi {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars: Record<string, number | string>;
      events: {
        onReady: (event: YouTubePlayerEvent) => void;
        onStateChange: (event: YouTubePlayerStateEvent) => void;
      };
    },
  ) => YouTubePlayer;
  PlayerState: {
    PLAYING: number;
  };
}

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<YouTubeApi> | null = null;

function loadYouTubeApi() {
  if (window.YT) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise<YouTubeApi>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]',
    );
    const previousReadyHandler = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousReadyHandler?.();
      if (window.YT) resolve(window.YT);
    };

    const script = existingScript ?? document.createElement('script');
    if (!existingScript) {
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener('error', () => reject(new Error('YouTube API failed to load')), {
      once: true,
    });
  });

  return youtubeApiPromise;
}

function selectWeightedHeroVideo(): HeroVideo {
  const candidates = heroVideoWeights.flatMap(({ itemId, weight }) => {
      const item = mockPortfolioItems.find((portfolioItem) => portfolioItem.id === itemId);

      return item?.youtubeId
        ? [{
            id: item.youtubeId,
            title: item.title,
            posterUrl: item.thumbnailUrl,
            weight,
          }]
        : [];
    });

  const totalWeight = candidates.reduce((sum, candidate) => sum + candidate.weight, 0);
  let draw = Math.random() * totalWeight;

  for (const candidate of candidates) {
    draw -= candidate.weight;
    if (draw < 0) {
      return {
        id: candidate.id,
        title: candidate.title,
        posterUrl: candidate.posterUrl,
      };
    }
  }

  const fallback = candidates[0];
  return fallback
    ? { id: fallback.id, title: fallback.title, posterUrl: fallback.posterUrl }
    : {
        id: 'P4280Zo8gP0',
        title: 'Military Radio',
        posterUrl: 'https://img.youtube.com/vi/P4280Zo8gP0/maxresdefault.jpg',
      };
}

function HeroVideoBackground({ video }: { video: HeroVideo }) {
  const playerMountRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsPlaying(false);

    loadYouTubeApi()
      .then((youtubeApi) => {
        if (cancelled || !playerMountRef.current) return;

        playerRef.current = new youtubeApi.Player(playerMountRef.current, {
          videoId: video.id,
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: video.id,
            playsinline: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            disablekb: 1,
            fs: 0,
          },
          events: {
            onReady: (event) => {
              event.target.mute();
              event.target.playVideo();
            },
            onStateChange: (event) => {
              if (event.data === youtubeApi.PlayerState.PLAYING) {
                setIsPlaying(true);
              }
            },
          },
        });
      })
      .catch(() => {
        setIsPlaying(false);
      });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [video.id]);

  return (
    <div
      className={`${styles.heroVideo} ${isPlaying ? styles.heroVideoPlaying : ''}`}
      aria-hidden="true"
    >
      <div ref={playerMountRef} className={styles.heroPlayerMount} />
      <img className={styles.heroPoster} src={video.posterUrl} alt="" />
    </div>
  );
}

export default function AllPortfolioPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [heroVideo] = useState(selectWeightedHeroVideo);
  const items = realArchiveItemIds
    .map((itemId) => mockPortfolioItems.find((item) => item.id === itemId))
    .filter((item): item is PortfolioItem => Boolean(item));

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contactEmail);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 1800);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="archive-hero-title">
        <HeroVideoBackground video={heroVideo} />
        <div className={styles.heroBackgroundWord} aria-hidden="true">
          Environment Artist
        </div>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>3D Environment Artist</span>
          <h1 id="archive-hero-title">
            <span>Sungyeon</span>
            <span>Lee</span>
          </h1>
          <p>
            Real-time Environment
            <span>Prop Art</span>
            <span>World Building</span>
          </p>
        </div>
        <div className={styles.heroTags} aria-label="Software">
          <span>UE5</span>
          <span>3ds Max</span>
          <span>Maya</span>
          <span>ZBrush</span>
          <span>Substance</span>
          <span>Marmoset</span>
        </div>
        <div className={styles.heroProject}>
          <span>Featured Film</span>
          <strong>{heroVideo.title}</strong>
        </div>
      </section>

      <section id="work" className={styles.worksSection} aria-labelledby="works-title">
        <div className={styles.worksIntro}>
          <div>
            <h2 id="works-title">WORKS</h2>
          </div>
          <div className={styles.worksCopy}>
            <strong>{items.length} Projects</strong>
            <p>Click a work to open details.</p>
          </div>
        </div>
        <AllPortfolioGrid items={items} />
      </section>

      <section
        id="contact"
        className={styles.statementSection}
        aria-label="Environment artist statement"
      >
        <div className={styles.aboutEditorial}>
          <span className={styles.aboutLabel}>About</span>
          <div className={styles.statementCopy}>
            <p>
              좋은 환경은 설명하지 않아도
              <br />
              그 공간의 이야기를 전달할 수 있다고 생각합니다.
            </p>
            <p>
              분위기와 구조, 디테일을 통해 플레이어가 자연스럽게 세계관에 몰입할 수
              있는 공간을 제작합니다.
            </p>
          </div>
          <div className={styles.educationBlock}>
            <span>Education</span>
            <strong>2023 - 2025 · B.S. Computer Animation</strong>
            <p>Full Sail University, Florida, USA</p>
          </div>
        </div>
        <div className={styles.profileDetails}>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>Sungyeon Lee</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>3D Environment Artist</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <button type="button" className={styles.emailCopyButton} onClick={copyEmail}>
                  {contactEmail}
                </button>
              </dd>
            </div>
            <div>
              <dt>Birth</dt>
              <dd>2001.11</dd>
            </div>
          </dl>
          <div className={styles.toolsBlock}>
            <span>Tools</span>
            <ul>
              {profileTools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <div className={styles.backToTopWrap}>
        <button type="button" className={styles.backToTop} onClick={scrollToTop}>
          Back to top
        </button>
      </div>
      <div className={`${styles.toast} ${toastVisible ? styles.toastVisible : ''}`} role="status">
        Email copied
      </div>
    </div>
  );
}
