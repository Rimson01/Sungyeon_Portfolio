import { NavLink } from 'react-router-dom';
import { routes } from '../../app/routes';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.brand}>
        Sungyeon Lee
      </NavLink>
      <nav className={styles.nav} aria-label="Main navigation">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            end={route.path === '/'}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {route.label}
          </NavLink>
        ))}
        <a className={styles.link} href="#contact">
          Contact
        </a>
      </nav>
    </header>
  );
}
