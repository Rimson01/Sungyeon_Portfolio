import { useRef, useState, type RefObject } from 'react';
import { mockCompanies } from '../data/mockPortfolio';
import type { Company } from '../features/portfolio/portfolio.types';
import styles from './AboutPage.module.css';

const contactEmail = 'dukgoo.env@gmail.com';

export default function AboutPage() {
  const professionalRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const scrollToSection = (section: 'professional' | 'works') => {
    const target = section === 'professional' ? professionalRef.current : worksRef.current;
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contactEmail);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 1800);
  };

  return (
    <div className={styles.aboutPage}>
      <ProfileIntro onWorksClick={() => scrollToSection('works')} />
      <CareerSummary />
      <WorksLinkGroup
        onWorksClick={() => scrollToSection('works')}
        onProfessionalClick={() => scrollToSection('professional')}
      />
      <ProfessionalCompanyList
        sectionRef={professionalRef}
        onCompanySelect={setSelectedCompany}
      />
      <PortfolioSections sectionRef={worksRef} />
      <AboutContact onCopyEmail={copyEmail} />

      {selectedCompany ? (
        <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />
      ) : null}

      <div className={`${styles.toast} ${toastVisible ? styles.toastVisible : ''}`} role="status">
        Email copied
      </div>
    </div>
  );
}

interface ProfileIntroProps {
  onWorksClick: () => void;
}

function ProfileIntro({ onWorksClick }: ProfileIntroProps) {
  return (
    <section className={styles.profileIntro} aria-labelledby="about-title">
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>About First Experience</span>
        <h1 id="about-title">
          Background
          <span>Artist</span>
        </h1>
        <p>
          Cinematic environment portfolio hub connecting professional projects, personal studies,
          sketch notes, design work, and Re:Lighting explorations.
        </p>
        <button type="button" className={styles.primaryAction} onClick={onWorksClick}>
          Explore Works
        </button>
      </div>
      <div className={styles.profileFrame} aria-label="Profile visual placeholder">
        <span>HOJOON</span>
      </div>
    </section>
  );
}

function CareerSummary() {
  return (
    <section className={styles.careerSummary} aria-labelledby="career-title">
      <div>
        <span className={styles.sectionIndex}>01</span>
        <h2 id="career-title">Career Summary</h2>
      </div>
      <p>
        Work spans environment art, spatial design, stage design, personal asset production,
        sketch documentation, designer studies, and lighting reinterpretation. Architecture v2
        treats this page as the navigation hub, with each career thread branching into a dedicated
        portfolio flow.
      </p>
      <dl className={styles.summaryStats}>
        <div>
          <dt>Focus</dt>
          <dd>Environment / Space / Lighting</dd>
        </div>
        <div>
          <dt>Pipeline</dt>
          <dd>3DS Max / ZBrush / UE5 / SketchUp</dd>
        </div>
        <div>
          <dt>Mode</dt>
          <dd>Professional + Personal Archive</dd>
        </div>
      </dl>
    </section>
  );
}

interface WorksLinkGroupProps {
  onWorksClick: () => void;
  onProfessionalClick: () => void;
}

function WorksLinkGroup({ onWorksClick, onProfessionalClick }: WorksLinkGroupProps) {
  return (
    <section className={styles.worksLinkGroup} aria-labelledby="links-title">
      <span className={styles.sectionIndex}>02</span>
      <h2 id="links-title">Works Link Group</h2>
      <div className={styles.linkButtons}>
        <button type="button" onClick={onWorksClick}>
          Works
        </button>
        <button type="button" onClick={onProfessionalClick}>
          Professional
        </button>
      </div>
    </section>
  );
}

interface ProfessionalCompanyListProps {
  sectionRef: RefObject<HTMLElement | null>;
  onCompanySelect: (company: Company) => void;
}

function ProfessionalCompanyList({ sectionRef, onCompanySelect }: ProfessionalCompanyListProps) {
  return (
    <section ref={sectionRef} className={styles.companySection} aria-labelledby="professional-title">
      <div className={styles.sectionHeader}>
        <span className={styles.sectionIndex}>03</span>
        <h2 id="professional-title">Professional Company List</h2>
        <p>Company cards open a placeholder modal state now. Full lightbox behavior comes later.</p>
      </div>
      <div className={styles.companyList}>
        {mockCompanies.map((company) => (
          <button
            key={company.id}
            type="button"
            className={styles.companyCard}
            onClick={() => onCompanySelect(company)}
          >
            <span>{company.period}</span>
            <h3>{company.displayName}</h3>
            <p>{company.role}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

interface PortfolioSectionsProps {
  sectionRef: RefObject<HTMLElement | null>;
}

function PortfolioSections({ sectionRef }: PortfolioSectionsProps) {
  const sections = ['Personal Works', 'Sketch', 'Designer', 'Re:Lighting', 'ALL Portfolio'];

  return (
    <section ref={sectionRef} className={styles.portfolioSections} aria-labelledby="works-title">
      <div className={styles.sectionHeader}>
        <span className={styles.sectionIndex}>04</span>
        <h2 id="works-title">Portfolio Sections</h2>
        <p>These are page-entry shells for the portfolio flows defined in Architecture v2.</p>
      </div>
      <div className={styles.portfolioGrid}>
        {sections.map((section) => (
          <article key={section} className={styles.portfolioTile}>
            <span>Open Route</span>
            <h3>{section}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

interface AboutContactProps {
  onCopyEmail: () => void;
}

function AboutContact({ onCopyEmail }: AboutContactProps) {
  return (
    <section className={styles.aboutContact} aria-labelledby="contact-title">
      <div>
        <span className={styles.sectionIndex}>05</span>
        <h2 id="contact-title">About Contact</h2>
        <p>For portfolio reviews, collaborations, and production conversations.</p>
      </div>
      <button type="button" className={styles.emailButton} onClick={onCopyEmail}>
        Email - {contactEmail}
      </button>
    </section>
  );
}

interface CompanyModalProps {
  company: Company;
  onClose: () => void;
}

function CompanyModal({ company, onClose }: CompanyModalProps) {
  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="company-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <span className={styles.eyebrow}>Placeholder Modal</span>
        <h2 id="company-modal-title">{company.displayName}</h2>
        <p>{company.description}</p>
        <dl>
          <div>
            <dt>Role</dt>
            <dd>{company.role}</dd>
          </div>
          <div>
            <dt>Period</dt>
            <dd>{company.period}</dd>
          </div>
        </dl>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </section>
    </div>
  );
}
