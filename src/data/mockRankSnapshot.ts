import { mockPortfolioItems } from './mockPortfolio';
import { mockImageViewCounts } from './mockViewStats';

export interface MockRankSnapshotItem {
  portfolioItemId: string;
  mediaId: string;
  imageViews: number;
  rank: number;
  score: number;
  category: string;
  title: string;
  thumbnailUrl: string;
}

export interface MockDailyRankSnapshot {
  dateKey: string;
  generatedAt: string;
  items: MockRankSnapshotItem[];
}

export const mockDailyRankSnapshot: MockDailyRankSnapshot = {
  dateKey: '20260604',
  generatedAt: '2026-06-04T00:00:00.000Z',
  items: mockPortfolioItems
    .filter((item) => item.isPublished)
    .map((item) => {
      const mediaId = item.media[0]?.id ?? item.id;
      const imageViews = mockImageViewCounts[mediaId] ?? 0;

      return {
        portfolioItemId: item.id,
        mediaId,
        imageViews,
        rank: 0,
        score: imageViews,
        category: item.category,
        title: item.title,
        thumbnailUrl: item.thumbnailUrl,
      };
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .map((item, index) => ({ ...item, rank: index + 1 })),
};
