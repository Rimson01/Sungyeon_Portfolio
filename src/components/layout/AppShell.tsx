import type { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';
import styles from './AppShell.module.css';

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
