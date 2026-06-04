import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import type { PortfolioItem } from '../../features/portfolio/portfolio.types';

interface CategoryLightboxState {
  items: PortfolioItem[];
  activeIndex: number;
}

interface CategoryLightboxContextValue {
  activeItem: PortfolioItem | null;
  categoryItems: PortfolioItem[];
  activeIndex: number;
  openCategoryLightbox: (item: PortfolioItem, sourceItems: PortfolioItem[]) => void;
  closeCategoryLightbox: () => void;
  selectCategoryItem: (index: number) => void;
  showPreviousItem: () => void;
  showNextItem: () => void;
}

const CategoryLightboxContext = createContext<CategoryLightboxContextValue | null>(null);

export function CategoryLightboxProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<CategoryLightboxState | null>(null);

  const openCategoryLightbox = useCallback((item: PortfolioItem, sourceItems: PortfolioItem[]) => {
    const categoryItems = sourceItems
      .filter((sourceItem) => sourceItem.category === item.category)
      .sort((a, b) => a.categoryOrder - b.categoryOrder);
    const activeIndex = Math.max(
      0,
      categoryItems.findIndex((categoryItem) => categoryItem.id === item.id),
    );

    setState({ items: categoryItems, activeIndex });
  }, []);

  const closeCategoryLightbox = useCallback(() => setState(null), []);

  const selectCategoryItem = useCallback((index: number) => {
    setState((current) => {
      if (!current) return current;
      return {
        ...current,
        activeIndex: Math.min(Math.max(index, 0), current.items.length - 1),
      };
    });
  }, []);

  const showPreviousItem = useCallback(() => {
    setState((current) => {
      if (!current || current.items.length === 0) return current;
      const activeIndex = (current.activeIndex - 1 + current.items.length) % current.items.length;
      return { ...current, activeIndex };
    });
  }, []);

  const showNextItem = useCallback(() => {
    setState((current) => {
      if (!current || current.items.length === 0) return current;
      const activeIndex = (current.activeIndex + 1) % current.items.length;
      return { ...current, activeIndex };
    });
  }, []);

  const value = useMemo<CategoryLightboxContextValue>(() => {
    const categoryItems = state?.items ?? [];
    const activeItem = state ? categoryItems[state.activeIndex] ?? null : null;

    return {
      activeItem,
      categoryItems,
      activeIndex: state?.activeIndex ?? 0,
      openCategoryLightbox,
      closeCategoryLightbox,
      selectCategoryItem,
      showPreviousItem,
      showNextItem,
    };
  }, [
    closeCategoryLightbox,
    openCategoryLightbox,
    selectCategoryItem,
    showNextItem,
    showPreviousItem,
    state,
  ]);

  return (
    <CategoryLightboxContext.Provider value={value}>
      {children}
    </CategoryLightboxContext.Provider>
  );
}

export function useCategoryLightbox() {
  const context = useContext(CategoryLightboxContext);
  if (!context) {
    throw new Error('useCategoryLightbox must be used inside CategoryLightboxProvider');
  }
  return context;
}
