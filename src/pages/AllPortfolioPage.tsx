import AllPortfolioGrid from '../components/allPortfolio/AllPortfolioGrid';
import PageHeader from '../components/sections/PageHeader';
import RankSpotlight from '../components/sections/RankSpotlight';
import { mockPortfolioItems } from '../data/mockPortfolio';
import styles from './AllPortfolioPage.module.css';

export default function AllPortfolioPage() {
  const items = [...mockPortfolioItems].sort((a, b) => a.allOrder - b.allOrder);

  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Catalog"
        title="ALL Portfolio"
        description="All published portfolio items across categories. The grid uses mock pagination now, with random wheel movement inside the dedicated viewer."
      />
      <RankSpotlight />
      <section className={styles.regularSection} aria-labelledby="all-regular-title">
        <div className={styles.regularHeader}>
          <h2 id="all-regular-title">All Works</h2>
          <p>
            Regular catalog grid remains separate from the Spotlight layout and keeps the simulated
            infinite scroll behavior.
          </p>
        </div>
        <AllPortfolioGrid items={items} />
      </section>
    </div>
  );
}
