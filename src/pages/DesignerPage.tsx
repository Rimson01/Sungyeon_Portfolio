import PageHeader from '../components/sections/PageHeader';
import PortfolioGrid from '../components/sections/PortfolioGrid';
import { mockPortfolioItems } from '../data/mockPortfolio';

export default function DesignerPage() {
  const items = mockPortfolioItems.filter((item) => item.category === 'DESIGNER');

  return (
    <>
      <PageHeader
        eyebrow="Design"
        title="Designer"
        description="Designer page shell. Future clicks should open the whole DESIGNER category bundle with a thumbnail panel."
      />
      <PortfolioGrid items={items} label="Designer portfolio items" />
    </>
  );
}
