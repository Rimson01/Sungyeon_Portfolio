# Architecture v2 Summary

Architecture v2 treats the portfolio as an About-first portfolio hub with multiple connected exploration flows.

## Core Principles

- About is the first experience and navigation hub.
- Portfolio content is modeled as data-driven catalog items.
- Category lightboxes are category-aware and sequential.
- ALL Portfolio has a separate viewer and exploration behavior.
- View counts represent media opens, not impressions.
- Ranking uses snapshot-style data, not live top queries.
- Firestore and ranking backend work are intentionally deferred.

## Page Structure

- About
- Professional
- Personal Works
- Sketch
- Designer
- Re:Lighting
- ALL Portfolio

## Implemented Client Architecture

- `AppShell` provides the shared layout.
- React Router defines page routes.
- `PortfolioGrid` and `PortfolioCard` render category pages.
- `CategoryLightboxProvider` manages shared category lightbox state.
- `CategoryLightbox` renders selected item details and same-category thumbnail rail.
- `AllPortfolioGrid` handles mock pagination with one `IntersectionObserver` sentinel.
- `AllPortfolioViewer` handles ALL Portfolio viewing and random wheel movement across loaded items.
- `ViewStatsProvider` handles local mock view counts and session-deduped media-open increments.
- `RankSpotlight` renders a mock daily rank snapshot.

## Data Model Direction

Future Firestore collections from Architecture v2:

- `portfolioItems/{itemId}`
- `portfolioItems/{itemId}/media/{mediaId}`
- `companies/{companyId}`
- `imageStats/{mediaId}`
- `sessions/{sessionId}/viewedImages/{mediaId}`
- `rankSnapshots/{yyyyMMdd}`
- `adminOperations/{operationId}`

## Current Mock Data

- Portfolio items: `src/data/mockPortfolio.ts`
- Mock view counts: `src/data/mockViewStats.ts`
- Mock rank snapshot: `src/data/mockRankSnapshot.ts`

## View Count / NEW Rules

- Count increments only when media opens in a viewer/lightbox.
- Same session and same media item counts once using `sessionStorage`.
- Recent within 30 days and views below 10 displays `NEW`.
- Views of 10 or more display the number.
- Older items below 10 views display no badge.

## Deferred

- Firestore reads/writes
- Firebase Storage media
- Real rank snapshot generation
- GitHub Actions admin reset workflow
- Deployment
