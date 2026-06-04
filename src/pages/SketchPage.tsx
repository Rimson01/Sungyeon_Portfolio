import PageHeader from '../components/sections/PageHeader';
import PortfolioGrid from '../components/sections/PortfolioGrid';
import { mockPortfolioItems } from '../data/mockPortfolio';

export default function SketchPage() {
  const items = mockPortfolioItems.filter((item) => item.category === 'SKETCH');

  return (
    <>
      <PageHeader
        eyebrow="Notes"
        title="Sketch"
        description="Sketch page shell. Future clicks should open the whole SKETCH category bundle, including YouTube items in-place."
      />
      <PortfolioGrid items={items} label="Sketch portfolio items" />
    </>
  );
}
