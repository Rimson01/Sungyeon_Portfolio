import PageHeader from '../components/sections/PageHeader';
import PortfolioGrid from '../components/sections/PortfolioGrid';
import { mockPortfolioItems } from '../data/mockPortfolio';

export default function PersonalWorksPage() {
  const items = mockPortfolioItems.filter((item) => item.category === 'PERSONAL');

  return (
    <>
      <PageHeader
        eyebrow="Personal"
        title="Personal Works"
        description="Personal Works page shell. Future navigation should remain sequential within PERSONAL."
      />
      <PortfolioGrid items={items} label="Personal Works portfolio items" />
    </>
  );
}
