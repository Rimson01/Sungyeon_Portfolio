import type { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ScrollToTop from './ScrollToTop';
import styles from './AppShell.module.css';

export default function AppShell({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const isAllPortfolio = pathname === '/' || pathname === '/all-portfolio';

  return (
    <div className={styles.shell}>
      <ScrollToTop />
      <Header />
      <main className={`${styles.main} ${isAllPortfolio ? styles.mainFlush : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
