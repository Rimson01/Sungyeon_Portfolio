import PageHeader from '../components/sections/PageHeader';
import PortfolioGrid from '../components/sections/PortfolioGrid';
import { mockPortfolioItems } from '../data/mockPortfolio';

export default function RelightingPage() {
  const items = mockPortfolioItems.filter((item) => item.category === 'RELIGHT');

  return (
    <>
      <PageHeader
        eyebrow="Lighting"
        title="Re:Lighting"
        description="Re:Lighting page shell. Future movement should stay sequential and category-limited to RELIGHT."
      />
      <PortfolioGrid items={items} label="Re:Lighting portfolio items" />
    </>
  );
}
