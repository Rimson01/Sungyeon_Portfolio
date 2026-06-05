import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutPage.module.css';

const contactEmail = 'sungyeonlee1350@gmail.com';

const tools = [
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

export default function AboutPage() {
  const [toastVisible, setToastVisible] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contactEmail);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 1800);
  };

  return (
    <div className={styles.aboutPage}>
      <ProfileIntro />
      <AboutMe />
      <ToolsSection />
      <EducationSection />
      <PortfolioLinks />
      <AboutContact onCopyEmail={copyEmail} />

      <div className={`${styles.toast} ${toastVisible ? styles.toastVisible : ''}`} role="status">
        Email copied
      </div>
    </div>
  );
}

function ProfileIntro() {
  return (
    <section className={styles.profileIntro} aria-labelledby="about-title">
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>3D Environment Artist</span>
        <h1 id="about-title">
          Sungyeon
          <span>Lee</span>
        </h1>
        <p>
          I am a 3D Environment Artist with a strong foundation in modeling and a solid
          understanding of the complete real-time asset production pipeline.
        </p>
      </div>
      <aside className={styles.profileFrame} aria-label="Profile details">
        <dl>
          <div>
            <dt>Name</dt>
            <dd>Sungyeon Lee</dd>
          </div>
          <div>
            <dt>Birth</dt>
            <dd>2001.11</dd>
          </div>
          <div>
            <dt>Title</dt>
            <dd>3D Environment Artist</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{contactEmail}</dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}

function AboutMe() {
  return (
    <section className={styles.textSection} aria-labelledby="about-me-title">
      <div>
        <span className={styles.sectionIndex}>01</span>
        <h2 id="about-me-title">About Me</h2>
      </div>
      <div className={styles.copyStack}>
        <p>
          My background in Computer Animation provided experience across multiple disciplines,
          including character creation, visual development, animation, and compositing. Through
          this process, I developed a strong understanding of form, proportion, and visual
          storytelling.
        </p>
        <p>
          Today, my primary focus is environment art, where I specialize in creating detailed,
          production-ready assets and environments for real-time applications using
          industry-standard workflows and tools.
        </p>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section className={styles.toolsSection} aria-labelledby="tools-title">
      <div className={styles.sectionHeader}>
        <span className={styles.sectionIndex}>02</span>
        <h2 id="tools-title">Tools</h2>
      </div>
      <ul className={styles.toolGrid}>
        {tools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    </section>
  );
}

function EducationSection() {
  return (
    <section className={styles.textSection} aria-labelledby="education-title">
      <div>
        <span className={styles.sectionIndex}>03</span>
        <h2 id="education-title">Education</h2>
      </div>
      <div className={styles.copyStack}>
        <div className={styles.educationCard}>
          <span>2023 - 2025</span>
          <h3>Bachelor of Science in Computer Animation</h3>
          <p>Full Sail University, Florida, USA</p>
        </div>
        <p>
          Completed comprehensive training across the professional 3D production pipeline,
          including visual development, modeling, character animation, compositing, and final scene
          presentation.
        </p>
        <p>
          Developed practical experience with industry-standard tools such as Maya, ZBrush,
          Substance 3D Painter, Substance 3D Designer, and Unreal Engine.
        </p>
      </div>
    </section>
  );
}

function PortfolioLinks() {
  return (
    <section className={styles.portfolioSections} aria-labelledby="works-title">
      <div className={styles.sectionHeader}>
        <span className={styles.sectionIndex}>04</span>
        <h2 id="works-title">Portfolio</h2>
      </div>
      <div className={styles.portfolioGrid}>
        <Link to="/personal-works" className={styles.portfolioTile}>
          <span>View Works</span>
          <h3>Personal Works</h3>
        </Link>
        <Link to="/all-portfolio" className={styles.portfolioTile}>
          <span>View Archive</span>
          <h3>ALL Portfolio</h3>
        </Link>
      </div>
    </section>
  );
}

interface AboutContactProps {
  onCopyEmail: () => void;
}

function AboutContact({ onCopyEmail }: AboutContactProps) {
  return (
    <section id="contact" className={styles.aboutContact} aria-labelledby="contact-title">
      <div>
        <span className={styles.sectionIndex}>05</span>
        <h2 id="contact-title">Contact</h2>
        <p>For portfolio reviews, opportunities, and contact.</p>
      </div>
      <button type="button" className={styles.emailButton} onClick={onCopyEmail}>
        Email - {contactEmail}
      </button>
    </section>
  );
}
