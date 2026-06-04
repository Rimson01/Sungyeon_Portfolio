import PageHeader from '../components/sections/PageHeader';
import PortfolioGrid from '../components/sections/PortfolioGrid';
import { mockPortfolioItems } from '../data/mockPortfolio';

export default function ProfessionalPage() {
  const items = mockPortfolioItems.filter((item) => item.category === 'PROFESSIONAL');

  return (
    <>
      <PageHeader
        eyebrow="Company Work"
        title="Professional"
        description="Professional portfolio page shell. Firestore, ranking, and lightbox behavior are intentionally not implemented yet."
      />
      <PortfolioGrid items={items} label="Professional portfolio items" />
    </>
  );
}
