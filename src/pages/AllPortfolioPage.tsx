import { useState } from 'react';
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
  'personal-material-fabric',
  'personal-material-tile',
  'personal-material-ornament',
  'personal-head-hunter',
  'personal-babarian',
  'personal-android',
] as const;

const heroVideoId = 'P4280Zo8gP0';
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

export default function AllPortfolioPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const items = realArchiveItemIds
    .map((itemId) => mockPortfolioItems.find((item) => item.id === itemId))
    .filter((item): item is PortfolioItem => Boolean(item));

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contactEmail);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 1800);
  };

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
      <div className={`${styles.toast} ${toastVisible ? styles.toastVisible : ''}`} role="status">
        Email copied
      </div>
    </div>
  );
}
