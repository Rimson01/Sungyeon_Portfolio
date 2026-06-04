import { Navigate, Route, Routes } from 'react-router-dom';
import CategoryLightbox from '../components/lightbox/CategoryLightbox';
import { CategoryLightboxProvider } from '../components/lightbox/CategoryLightboxProvider';
import AppShell from '../components/layout/AppShell';
import AboutPage from '../pages/AboutPage';
import AllPortfolioPage from '../pages/AllPortfolioPage';
import DesignerPage from '../pages/DesignerPage';
import PersonalWorksPage from '../pages/PersonalWorksPage';
import ProfessionalPage from '../pages/ProfessionalPage';
import RelightingPage from '../pages/RelightingPage';
import SketchPage from '../pages/SketchPage';
import { ViewStatsProvider } from '../features/viewStats/viewStats';

export default function App() {
  return (
    <ViewStatsProvider>
      <CategoryLightboxProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/professional" element={<ProfessionalPage />} />
            <Route path="/personal-works" element={<PersonalWorksPage />} />
            <Route path="/sketch" element={<SketchPage />} />
            <Route path="/designer" element={<DesignerPage />} />
            <Route path="/relighting" element={<RelightingPage />} />
            <Route path="/all-portfolio" element={<AllPortfolioPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
        <CategoryLightbox />
      </CategoryLightboxProvider>
    </ViewStatsProvider>
  );
}
