import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
      return;
    }

    window.scrollTo({ top: 0 });
  }, [hash, pathname]);

  return null;
}
