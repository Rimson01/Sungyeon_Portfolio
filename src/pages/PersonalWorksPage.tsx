import { useMemo, useState } from 'react';
import PageHeader from '../components/sections/PageHeader';
import PortfolioGrid from '../components/sections/PortfolioGrid';
import { mockPortfolioItems } from '../data/mockPortfolio';
import type { PersonalPortfolioSubcategory } from '../features/portfolio/portfolio.types';
import styles from './PersonalWorksPage.module.css';

type PersonalFilter = 'ALL' | PersonalPortfolioSubcategory;

const filters: PersonalFilter[] = ['ALL', 'Environment', 'Character', 'Study'];

export default function PersonalWorksPage() {
  const [activeFilter, setActiveFilter] = useState<PersonalFilter>('ALL');

  const personalItems = useMemo(
    () =>
      mockPortfolioItems
        .filter((item) => item.category === 'PERSONAL')
        .sort((current, next) => current.order - next.order),
    [],
  );

  const items = useMemo(
    () =>
      activeFilter === 'ALL'
        ? personalItems
        : personalItems.filter((item) => item.personalSubcategory === activeFilter),
    [activeFilter, personalItems],
  );

  return (
    <>
      <PageHeader
        eyebrow="Personal"
        title="Personal Works"
        description="Personal projects grouped by environment, character, and study work."
      />
      <section className={styles.toolbar} aria-label="Personal Works category filters">
        <div className={styles.filters}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={filter === activeFilter ? styles.activeFilter : styles.filter}
              aria-pressed={filter === activeFilter}
              onClick={() => setActiveFilter(filter)}
            >
              <span>{filter}</span>
              <strong>
                {
                  personalItems.filter((item) =>
                    filter === 'ALL' ? true : item.personalSubcategory === filter,
                  ).length
                }
              </strong>
            </button>
          ))}
        </div>
      </section>
      <div key={activeFilter} className={styles.gridWrap}>
        <PortfolioGrid items={items} label={`${activeFilter} Personal Works portfolio items`} />
      </div>
    </>
  );
}
