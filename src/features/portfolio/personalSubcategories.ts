import type { PersonalPortfolioSubcategory, PortfolioCategory } from './portfolio.types';

export const PERSONAL_PORTFOLIO_SUBCATEGORIES = [
  'Environment',
  'Character',
  'Study',
] as const satisfies PersonalPortfolioSubcategory[];

export const PERSONAL_SUBCATEGORY_TITLES: Record<PersonalPortfolioSubcategory, string[]> = {
  Environment: ['Military Radio', 'Fire Place', 'Sci-fi Corridor', 'Sci-fi corridor'],
  Character: ['Head Hunter', 'Barbarian', 'Babarian', 'Android'],
  Study: [
    'Zbrush Rock Environment Practice',
    'Zbrush Rock Study',
    'Zbrush Stone Pillar Study',
    'Zbrush stone pillar study',
    'Zbrush Tiling Study',
    'Zbrush tiling study',
    'Substance Designer Study',
    'Substance Designer study',
  ],
};

type PersonalSubcategoryCandidate = {
  title: string;
  category?: PortfolioCategory;
  personalSubcategory?: PersonalPortfolioSubcategory;
};

export function getPersonalSubcategoryForTitle(title: string) {
  return PERSONAL_PORTFOLIO_SUBCATEGORIES.find((subcategory) =>
    PERSONAL_SUBCATEGORY_TITLES[subcategory].includes(title),
  );
}

export function resolvePersonalSubcategory<T extends PersonalSubcategoryCandidate>(item: T) {
  return item.personalSubcategory ?? getPersonalSubcategoryForTitle(item.title);
}

export function filterPersonalItemsBySubcategory<T extends PersonalSubcategoryCandidate>(
  items: T[],
  subcategory: PersonalPortfolioSubcategory,
) {
  return items.filter(
    (item) =>
      (item.category === undefined || item.category === 'PERSONAL') &&
      (item.personalSubcategory ?? getPersonalSubcategoryForTitle(item.title)) === subcategory,
  );
}
