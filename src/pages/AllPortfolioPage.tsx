import { Link } from 'react-router-dom';
import AllPortfolioGrid from '../components/allPortfolio/AllPortfolioGrid';
import { mockPortfolioItems } from '../data/mockPortfolio';
import type { PortfolioItem } from '../features/portfolio/portfolio.types';
import styles from './AllPortfolioPage.module.css';

const realArchiveItemIds = [
  'personal-military-radio',
  'personal-fire-place',
  'personal-sci-fi-corridor',
  'personal-zbrush-rock-environment-practice',
  'personal-zbrush-study',
  'personal-material-study',
  'personal-head-hunter',
  'personal-babarian',
  'personal-android',
] as const;

const heroVideoId = 'P4280Zo8gP0';

export default function AllPortfolioPage() {
  const items = realArchiveItemIds
    .map((itemId) => mockPortfolioItems.find((item) => item.id === itemId))
    .filter((item): item is PortfolioItem => Boolean(item));

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="archive-hero-title">
        <div className={styles.heroVideo} aria-hidden="true">
          <iframe
            title="Military Radio background video"
            src={`https://www.youtube.com/embed/${heroVideoId}?autoplay=1&mute=1&loop=1&playlist=${heroVideoId}&playsinline=1&controls=0&modestbranding=1&rel=0&disablekb=1&fs=0`}
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
          />
        </div>
        <div className={styles.heroBackgroundWord} aria-hidden="true">
          Environment
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
      </section>

      <section className={styles.worksSection} aria-labelledby="works-title">
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

      <section className={styles.statementSection} aria-label="Environment artist statement">
        <span>About</span>
        <div className={styles.statementCopy}>
          <p>
            좋은 환경은 설명하지 않아도
            <br />
            그 공간의 이야기를 전달할 수 있다고 생각합니다.
          </p>
          <p>
            분위기와 구조, 디테일을 통해
            <br />
            플레이어가 자연스럽게 세계관에 몰입할 수 있는 공간을 제작합니다.
          </p>
          <Link to="/" className={styles.aboutButton}>
            Profile
          </Link>
        </div>
        <div className={styles.statementBranding}>
          <h2>
            Space Builds
            <br />
            The Story.
          </h2>
          <a href="mailto:sungyeonlee1350@gmail.com">sungyeonlee1350@gmail.com</a>
          <small>3D Environment Artist &middot; World Building</small>
        </div>
      </section>
    </div>
  );
}
