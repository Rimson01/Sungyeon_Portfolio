import { NavLink } from 'react-router-dom';
import { routes } from '../../app/routes';
import styles from './Header.module.css';

export default function Header() {
  const handleBrandClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (sectionId: string) => {
    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    });
  };

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.brand} onClick={handleBrandClick}>
        Sungyeon Lee
      </NavLink>
      <nav className={styles.nav} aria-label="Main navigation">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            end
            onClick={() => handleSectionClick('work')}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {route.label}
          </NavLink>
        ))}
        <NavLink className={styles.link} to="/#contact">
          Contact
        </NavLink>
      </nav>
    </header>
  );
}
