import type { Company, PortfolioItem } from '../features/portfolio/portfolio.types';
import { importedWixPortfolioBatch } from './importedWixPortfolioBatch';
import { importedWixMilitaryRadio } from './importedWixMilitaryRadio';

const firePlaceImport = importedWixPortfolioBatch.find((project) => project.slug === 'fire-place');
const sciFiCorridorImport = importedWixPortfolioBatch.find(
  (project) => project.slug === 'project-title-6',
);
const headHunterImport = importedWixPortfolioBatch.find((project) => project.slug === 'head-hunter');
const barbarianImport = importedWixPortfolioBatch.find((project) => project.slug === 'babarian');
const androidImport = importedWixPortfolioBatch.find((project) => project.slug === 'android');
const zbrushRockEnvironmentImport = importedWixPortfolioBatch.find(
  (project) => project.slug === 'zbrush-rock-environment-practice',
);
const zbrushRockStudyImport = importedWixPortfolioBatch.find(
  (project) => project.slug === 'zbrush-rock-study',
);
const zbrushPillarStudyImport = importedWixPortfolioBatch.find(
  (project) => project.slug === 'project-title-3',
);
const zbrushTilingStudyImport = importedWixPortfolioBatch.find(
  (project) => project.slug === 'project-title-5',
);
const materialStudyImport = importedWixPortfolioBatch.find(
  (project) => project.slug === 'project-title-1',
);

if (!firePlaceImport) {
  throw new Error('Fire Place Wix import draft is missing.');
}

if (!sciFiCorridorImport) {
  throw new Error('Sci-fi Corridor Wix import draft is missing.');
}

if (!headHunterImport) {
  throw new Error('Head Hunter Wix import draft is missing.');
}

if (!barbarianImport) {
  throw new Error('Barbarian Wix import draft is missing.');
}

if (!androidImport) {
  throw new Error('Android Wix import draft is missing.');
}

if (!zbrushRockEnvironmentImport) {
  throw new Error('Zbrush Rock Environment Practice Wix import draft is missing.');
}

if (!zbrushRockStudyImport) {
  throw new Error('Zbrush Rock Study Wix import draft is missing.');
}

if (!zbrushPillarStudyImport) {
  throw new Error('Zbrush Stone Pillar Study Wix import draft is missing.');
}

if (!zbrushTilingStudyImport) {
  throw new Error('Zbrush Tiling Study Wix import draft is missing.');
}

if (!materialStudyImport) {
  throw new Error('Material Study Wix import draft is missing.');
}

const firePlaceImageOrder = [
  firePlaceImport.images[0],
  firePlaceImport.images[1],
  firePlaceImport.images[2],
  firePlaceImport.images[8],
  firePlaceImport.images[3],
  firePlaceImport.images[4],
  firePlaceImport.images[5],
  firePlaceImport.images[6],
  firePlaceImport.images[7],
].filter((image): image is (typeof firePlaceImport.images)[number] => Boolean(image));

const firePlaceMedia = [
  ...firePlaceImport.videos.map((video, index) => ({
    id: `fire-place-youtube-${String(index + 1).padStart(2, '0')}`,
    type: 'youtube' as const,
    youtubeId: video.id,
    thumbnailUrl: video.posterUrl,
    title: `${firePlaceImport.title} video`,
    alt: `${firePlaceImport.title} video`,
    order: index + 1,
    isCountable: true,
    lightboxEnabled: true,
  })),
  ...firePlaceImageOrder.map((image, index) => ({
    id: image.id,
    type: 'image' as const,
    url: image.highResolutionUrl,
    thumbnailUrl: image.highResolutionUrl,
    title: `${firePlaceImport.title} ${String(index + 1).padStart(2, '0')}`,
    alt: firePlaceImport.title,
    displayLabel: [
      'Day Render 01',
      'Day Render 02',
      'Day Render 03',
      'Day Render 04',
      'Day Render 05',
      'Day Render 06',
      'Props Render 01',
      'Props Render 02',
      'Work Process',
    ][index],
    order: firePlaceImport.videos.length + index + 1,
    isCountable: true,
    lightboxEnabled: true,
  })),
];

const sciFiCorridorImages = sciFiCorridorImport.images
  .map((image, sourceIndex) => ({ image, sourceIndex }))
  .filter(({ sourceIndex }) => sourceIndex !== 1 && sourceIndex !== 11);

const sciFiCorridorMedia = [
  ...sciFiCorridorImport.videos.map((video, index) => ({
    id: `sci-fi-corridor-youtube-${String(index + 1).padStart(2, '0')}`,
    type: 'youtube' as const,
    youtubeId: video.id,
    thumbnailUrl: video.posterUrl,
    title: `${sciFiCorridorImport.title} video`,
    alt: `${sciFiCorridorImport.title} video`,
    displayLabel: 'Video',
    order: index + 1,
    isCountable: true,
    lightboxEnabled: true,
  })),
  ...sciFiCorridorImages.map(({ image, sourceIndex }, index) => ({
    id: image.id,
    type: 'image' as const,
    url: image.highResolutionUrl,
    thumbnailUrl: image.highResolutionUrl,
    title: `${sciFiCorridorImport.title} ${String(sourceIndex + 1).padStart(2, '0')}`,
    alt: sciFiCorridorImport.title,
    displayLabel:
      sourceIndex < 6
        ? `Day Render ${String(sourceIndex + 1).padStart(2, '0')}`
        : `Night Render ${String(sourceIndex - 5).padStart(2, '0')}`,
    order: sciFiCorridorImport.videos.length + index + 1,
    isCountable: true,
    lightboxEnabled: true,
  })),
];

const headHunterMedia = [
  ...headHunterImport.videos.map((video, index) => ({
    id: `head-hunter-youtube-${String(index + 1).padStart(2, '0')}`,
    type: 'youtube' as const,
    youtubeId: video.id,
    thumbnailUrl: video.posterUrl,
    title: `${headHunterImport.title} video`,
    alt: `${headHunterImport.title} video`,
    displayLabel: 'Video',
    order: index + 1,
    isCountable: true,
    lightboxEnabled: true,
  })),
  ...headHunterImport.images.slice(0, 7).map((image, index) => ({
    id: image.id,
    type: 'image' as const,
    url: image.highResolutionUrl,
    thumbnailUrl: image.highResolutionUrl,
    title: `${headHunterImport.title} ${String(index + 1).padStart(2, '0')}`,
    alt: headHunterImport.title,
    displayLabel: [
      'Beauty Render 01',
      'Beauty Render 02',
      'Beauty Render 03',
      'Beauty Render 04',
      'Marvelous Designer',
      'Maya',
      'Gun Modeling',
    ][index],
    order: headHunterImport.videos.length + index + 1,
    isCountable: true,
    lightboxEnabled: true,
  })),
];

const barbarianMedia = [
  ...barbarianImport.videos.map((video, index) => ({
    id: `barbarian-youtube-${String(index + 1).padStart(2, '0')}`,
    type: 'youtube' as const,
    youtubeId: video.id,
    youtubeStartSeconds: 23,
    thumbnailUrl: video.posterUrl,
    title: `${barbarianImport.title} video`,
    alt: `${barbarianImport.title} video`,
    displayLabel: 'Video',
    order: index + 1,
    isCountable: true,
    lightboxEnabled: true,
  })),
  ...barbarianImport.images.slice(0, 6).map((image, index) => ({
    id: image.id,
    type: 'image' as const,
    url: image.highResolutionUrl,
    thumbnailUrl: image.highResolutionUrl,
    title: `${barbarianImport.title} ${String(index + 1).padStart(2, '0')}`,
    alt: barbarianImport.title,
    displayLabel: [
      'Beauty Render 01',
      'Beauty Render 02',
      'Beauty Render 03',
      'Beauty Render 04',
      'ZBrush Sculpt',
      'Marvelous Designer',
    ][index],
    order: barbarianImport.videos.length + index + 1,
    isCountable: true,
    lightboxEnabled: true,
  })),
];

const androidMedia = [
  ...androidImport.videos.map((video, index) => ({
    id: `android-youtube-${String(index + 1).padStart(2, '0')}`,
    type: 'youtube' as const,
    youtubeId: video.id,
    youtubeStartSeconds: 43,
    thumbnailUrl: video.posterUrl,
    title: `${androidImport.title} video`,
    alt: `${androidImport.title} video`,
    displayLabel: 'Video',
    order: index + 1,
    isCountable: true,
    lightboxEnabled: true,
  })),
  ...androidImport.images.slice(0, 3).map((image, index) => ({
    id: image.id,
    type: 'image' as const,
    url: image.highResolutionUrl,
    thumbnailUrl: image.highResolutionUrl,
    title: `${androidImport.title} ${String(index + 1).padStart(2, '0')}`,
    alt: androidImport.title,
    displayLabel: [
      'Beauty Render 01',
      'Beauty Render 02',
      'Beauty Render 03',
    ][index],
    order: androidImport.videos.length + index + 1,
    isCountable: true,
    lightboxEnabled: true,
  })),
];

const zbrushRockEnvironmentTitle = 'Rock Scene';
const zbrushRockEnvironmentMedia = [
  {
    id: 'rock-environment-youtube-01',
    type: 'youtube' as const,
    youtubeId: 'lxlqKrS5FJg',
    thumbnailUrl: 'https://img.youtube.com/vi/lxlqKrS5FJg/maxresdefault.jpg',
    title: `${zbrushRockEnvironmentTitle} video`,
    alt: `${zbrushRockEnvironmentTitle} video`,
    displayLabel: 'Video',
    order: 1,
    isCountable: true,
    lightboxEnabled: true,
  },
  ...zbrushRockEnvironmentImport.images.map((image, index) => ({
    id: image.id,
    type: 'image' as const,
    url: image.highResolutionUrl,
    thumbnailUrl: image.highResolutionUrl,
    title: `${zbrushRockEnvironmentTitle} ${String(index + 1).padStart(2, '0')}`,
    alt: zbrushRockEnvironmentTitle,
    displayLabel:
      index < 3
        ? `Unreal Render ${String(index + 1).padStart(2, '0')}`
        : `Rock ${String.fromCharCode(62 + index)}`,
    order: index + 2,
    isCountable: true,
    lightboxEnabled: true,
  })),
];

const zbrushStudyTitle = 'ZBrush Study';
const zbrushStudyGroups = [
  {
    labelPrefix: 'Rock Study',
    images: zbrushRockStudyImport.images.slice(0, 5),
  },
  {
    labelPrefix: 'Pillar Study',
    images: zbrushPillarStudyImport.images.slice(1, 4),
  },
  {
    labelPrefix: 'Tiling Study',
    images: zbrushTilingStudyImport.images.slice(1, 4),
  },
];

const zbrushStudyMedia = (() => {
  let order = 0;

  return zbrushStudyGroups.flatMap(({ labelPrefix, images }) =>
    images.map((image, index) => {
      order += 1;

      return {
        id: `zbrush-study-${image.id}`,
        type: 'image' as const,
        url: image.highResolutionUrl,
        thumbnailUrl: image.highResolutionUrl,
        title: `${zbrushStudyTitle} ${String(order).padStart(2, '0')}`,
        alt: `${zbrushStudyTitle} ${labelPrefix}`,
        displayLabel: `${labelPrefix} ${String(index + 1).padStart(2, '0')}`,
        order,
        isCountable: true,
        lightboxEnabled: true,
      };
    }),
  );
})();

const publicAssetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const substanceDesignerAssets = {
  fabric01: publicAssetUrl('portfolio/substance-designer/fabric-01.jpg'),
  fabric02: publicAssetUrl('portfolio/substance-designer/fabric-02.jpg'),
  fabric03: publicAssetUrl('portfolio/substance-designer/fabric-03.jpg'),
  tile01: publicAssetUrl('portfolio/substance-designer/tile-01.jpg'),
  tile02: publicAssetUrl('portfolio/substance-designer/tile-02.jpg'),
  tile03: publicAssetUrl('portfolio/substance-designer/tile-03.jpg'),
  tile04: publicAssetUrl('portfolio/substance-designer/tile-04.jpg'),
  ornament01: publicAssetUrl('portfolio/substance-designer/ornament-01.jpg'),
  leatherTufted: publicAssetUrl('portfolio/substance-designer/leather-tufted.jpg'),
  woodenPlanks: publicAssetUrl('portfolio/substance-designer/wooden-planks.jpg'),
  spikedMetal: publicAssetUrl('portfolio/substance-designer/spiked-metal.jpg'),
  rockStudy01: publicAssetUrl('portfolio/substance-designer/rock-study-01.jpg'),
  rockStudy02: publicAssetUrl('portfolio/substance-designer/rock-study-02.jpg'),
  rockStudy03: publicAssetUrl('portfolio/substance-designer/rock-study-03.jpg'),
};

function createSubstanceMedia(projectId: string, labels: string[], urls: string[]) {
  return urls.map((url, index) => {
    const label = labels[index];

    return {
      id: `${projectId}-${String(index + 1).padStart(2, '0')}`,
      type: 'image' as const,
      url,
      thumbnailUrl: url,
      title: label,
      alt: label,
      displayLabel: label,
      order: index + 1,
      isCountable: true,
      lightboxEnabled: true,
    };
  });
}

const importedMaterialStudyMedia = createSubstanceMedia(
  'imported-material-study',
  [
    'Fabric 01',
    'Fabric 02',
    'Fabric 03',
    'Tile 01',
    'Tile 02',
    'Tile 03',
    'Tile 04',
    'Ornament 01',
  ],
  [
    substanceDesignerAssets.fabric01,
    substanceDesignerAssets.fabric02,
    substanceDesignerAssets.fabric03,
    substanceDesignerAssets.tile01,
    substanceDesignerAssets.tile02,
    substanceDesignerAssets.tile03,
    substanceDesignerAssets.tile04,
    substanceDesignerAssets.ornament01,
  ],
);

const leatherTuftedMedia = createSubstanceMedia(
  'leather-tufted',
  ['Leather Tufted', 'Wooden Planks', 'Spiked Metal'],
  [
    substanceDesignerAssets.leatherTufted,
    substanceDesignerAssets.woodenPlanks,
    substanceDesignerAssets.spikedMetal,
  ],
);

const rockStudyMaterialMedia = createSubstanceMedia(
  'rock-study-material',
  ['Rock 01', 'Rock 02', 'Rock 03'],
  [
    substanceDesignerAssets.rockStudy01,
    substanceDesignerAssets.rockStudy02,
    substanceDesignerAssets.rockStudy03,
  ],
);

const fabricStudyMedia = [
  ...importedMaterialStudyMedia,
  ...leatherTuftedMedia,
  ...rockStudyMaterialMedia,
].map((media, index) => ({
  ...media,
  order: index + 1,
}));
const tileStudyMedia: typeof leatherTuftedMedia = [];
const ornamentStudyMedia: typeof leatherTuftedMedia = [];

const militaryRadioMedia = [
  ...(importedWixMilitaryRadio.video
    ? [
        {
          id: 'military-radio-youtube',
          type: 'youtube' as const,
          youtubeId: importedWixMilitaryRadio.video.id,
          thumbnailUrl:
            importedWixMilitaryRadio.video.posterUrl ??
            `https://img.youtube.com/vi/${importedWixMilitaryRadio.video.id}/hqdefault.jpg`,
          title: `${importedWixMilitaryRadio.title} video`,
          alt: `${importedWixMilitaryRadio.title} video`,
          order: 1,
          isCountable: true,
          lightboxEnabled: true,
        },
      ]
    : []),
  ...importedWixMilitaryRadio.images.slice(1).map((image, index) => ({
    id: image.id,
    type: 'image' as const,
    url: image.highResolutionUrl,
    thumbnailUrl: image.highResolutionUrl,
    title: `${importedWixMilitaryRadio.title} ${String(index + 1).padStart(2, '0')}`,
    alt: importedWixMilitaryRadio.title,
    displayLabel: [
      'Day Render',
      'Night Render',
      'Detail Render 01',
      'Detail Render 02',
      'Detail Render 03',
      'Detail Render 04',
      'Detail Render 05',
      'Detail Render 06',
      'Detail Render 07',
      'Detail Render 08',
      'Extra Props 01',
      'Extra Props 02',
      'Extra Props 03',
      'Texture',
      'Work Process',
    ][index],
    order: index + 2,
    isCountable: true,
    lightboxEnabled: true,
  })),
];

const oldCarriageImageFiles = [
  'carriage-render-05.png',
  'carriage-render-03.png',
  'carriage-render-04.png',
  'carriage-render-01.png',
  'carriage-render-06.png',
  'carriage-render-07.png',
  'carriage-render-09.png',
  'carriage-render-08.png',
  'carriage-render-10.png',
  'carriage-render-11.png',
];

const oldCarriageImageMedia = oldCarriageImageFiles.map((fileName, index) => {
  const order = index + 1;
  const paddedOrder = String(order).padStart(2, '0');
  const label = `Carriage Render ${paddedOrder}`;
  const url = publicAssetUrl(`portfolio/old-carriage/${fileName}`);

  return {
    id: `old-carriage-render-${paddedOrder}`,
    type: 'image' as const,
    url,
    thumbnailUrl: url,
    title: label,
    alt: label,
    displayLabel: label,
    order,
    isCountable: true,
    lightboxEnabled: true,
  };
});

const oldCarriageYoutubeId = 'p1OT3rYb4hs';
const oldCarriageTextureMapsUrl = publicAssetUrl('portfolio/old-carriage/carriage-texture-maps.jpg');
const oldCarriageMedia = [
  {
    id: 'old-carriage-youtube-01',
    type: 'youtube' as const,
    youtubeId: oldCarriageYoutubeId,
    thumbnailUrl: `https://img.youtube.com/vi/${oldCarriageYoutubeId}/hqdefault.jpg`,
    title: 'Old Carriage Video',
    alt: 'Old Carriage Video',
    displayLabel: 'Old Carriage Video',
    order: 1,
    isCountable: true,
    lightboxEnabled: true,
  },
  ...oldCarriageImageMedia.map((media, index) => ({
    ...media,
    order: index + 2,
  })),
  {
    id: 'old-carriage-texture-maps',
    type: 'image' as const,
    url: oldCarriageTextureMapsUrl,
    thumbnailUrl: oldCarriageTextureMapsUrl,
    title: 'Texture Maps',
    alt: 'Old Carriage Texture Maps',
    displayLabel: 'Texture Maps',
    order: oldCarriageImageMedia.length + 2,
    isCountable: true,
    lightboxEnabled: true,
  },
];

export const mockCompanies: Company[] = [
  {
    id: 'studio-a',
    name: 'Studio A',
    displayName: 'Studio A',
    period: '2023 - 2024',
    role: 'Environment Artist',
    description: 'Professional environment and spatial portfolio group.',
    order: 1,
    relatedPortfolioItemIds: ['professional-medieval-pavilion'],
  },
  {
    id: 'stage-lab',
    name: 'Stage Lab',
    displayName: 'Stage Lab',
    period: '2022 - 2023',
    role: 'Stage Designer',
    description: 'Stage design projects connected from the About page.',
    order: 2,
    relatedPortfolioItemIds: ['professional-stage-look-look'],
  },
];

export const mockPortfolioItems: PortfolioItem[] = [
  {
    id: 'professional-medieval-pavilion',
    title: 'Medieval War Pavilion',
    subtitle: 'Environment Art',
    slug: 'medieval-war-pavilion',
    category: 'PROFESSIONAL',
    section: 'professional',
    companyId: 'studio-a',
    projectType: 'Environment',
    descriptionHtml: 'A professional project shell for the main cinematic portfolio flow.',
    tools: ['3DS Max', 'ZBrush', 'Substance Painter', 'Unreal Engine 5'],
    role: 'Full Pipeline',
    year: 2024,
    publishedAt: '2026-05-20',
    uploadedAt: '2026-05-20',
    isPublished: true,
    isFeatured: true,
    thumbnailUrl: '/mock/medieval-war-pavilion-thumb.webp',
    hoverUrl: '/mock/medieval-war-pavilion-hover.webp',
    youtubeId: 'CQ0DzSbh4ks',
    mediaType: 'youtube',
    order: 1,
    allOrder: 1,
    categoryOrder: 1,
    lightboxGroupId: 'PROFESSIONAL',
    chips: [{ label: 'UE5', highlighted: true }],
    stats: [{ key: 'Role', value: 'Full Pipeline' }],
    media: [],
  },
  {
    id: 'professional-stage-look-look',
    title: 'LDP Look Look',
    subtitle: 'Stage Design',
    slug: 'ldp-look-look',
    category: 'PROFESSIONAL',
    section: 'professional',
    companyId: 'stage-lab',
    projectType: 'Stage',
    descriptionHtml: 'A professional stage design page shell.',
    tools: ['SketchUp', 'On-site Supervision'],
    role: 'Stage Designer',
    year: 2023,
    publishedAt: '2026-04-12',
    uploadedAt: '2026-04-12',
    isPublished: true,
    isFeatured: false,
    thumbnailUrl: '/mock/ldp-look-look-thumb.webp',
    mediaType: 'image',
    order: 2,
    allOrder: 2,
    categoryOrder: 2,
    lightboxGroupId: 'PROFESSIONAL',
    chips: [],
    stats: [{ key: 'Pipeline', value: 'SketchUp -> On-site Supervision' }],
    media: [],
  },
  {
    id: 'personal-fire-place',
    title: firePlaceImport.title,
    subtitle: 'Personal Work',
    slug: 'fire-place',
    category: 'PERSONAL',
    personalSubcategory: 'Environment',
    section: 'personalWorks',
    projectType: 'Environment',
    descriptionHtml: `벽난로를 중심으로 제작한 실내 환경 개인 작업입니다.
모델링, 텍스처링, 라이팅을 통해 따뜻한 분위기의 공간을 구성했습니다.

제작 기간 : ${firePlaceImport.period}`,
    tools: ['3ds Max', 'ZBrush', 'Substance Painter', 'Unreal Engine 5'],
    role: 'Full Pipeline',
    year: 2026,
    publishedAt: '2026-03-31',
    uploadedAt: '2026-03-31',
    isPublished: true,
    isFeatured: true,
    thumbnailUrl: firePlaceImport.images[0].highResolutionUrl,
    hoverUrl: firePlaceImport.images[1]?.highResolutionUrl,
    youtubeId: firePlaceImport.videos[0]?.id,
    mediaType: 'image',
    order: 2,
    allOrder: 4,
    categoryOrder: 2,
    lightboxGroupId: 'PERSONAL',
    chips: [{ label: 'Environment', highlighted: true }],
    stats: [
      { key: 'Period', value: firePlaceImport.period },
      { key: 'Source', value: 'Wix import draft' },
    ],
    media: firePlaceMedia,
  },
  {
    id: 'personal-military-radio',
    title: importedWixMilitaryRadio.title,
    subtitle: 'Personal Work',
    slug: 'military-radio',
    category: 'PERSONAL',
    personalSubcategory: 'Environment',
    section: 'personalWorks',
    projectType: 'Props',
    descriptionHtml: `실제 군용 무전기를 기반으로 제작한 개인 작업입니다.
모델링부터 텍스처링, 라이팅까지 전 과정을 직접 진행했습니다.

제작 기간 : ${importedWixMilitaryRadio.period}`,
    tools: [...importedWixMilitaryRadio.tools],
    role: 'Full Pipeline',
    year: 2026,
    publishedAt: '2026-01-31',
    uploadedAt: '2026-01-31',
    isPublished: true,
    isFeatured: true,
    thumbnailUrl: importedWixMilitaryRadio.images[0].highResolutionUrl,
    hoverUrl: importedWixMilitaryRadio.images[1]?.highResolutionUrl,
    youtubeId: importedWixMilitaryRadio.video?.id,
    mediaType: 'image',
    order: 1,
    allOrder: 3,
    categoryOrder: 1,
    lightboxGroupId: 'PERSONAL',
    chips: [
      { label: 'Props', highlighted: true },
      { label: 'UE5', highlighted: true },
      { label: 'Substance Painter', highlighted: false },
    ],
    stats: [
      { key: 'Period', value: importedWixMilitaryRadio.period },
      { key: 'Tools', value: importedWixMilitaryRadio.tools.join(' / ') },
      { key: 'Source', value: 'Wix import draft' },
    ],
    media: militaryRadioMedia,
  },
  {
    id: 'personal-sci-fi-corridor',
    title: sciFiCorridorImport.title,
    subtitle: 'Personal Work',
    slug: 'sci-fi-corridor',
    category: 'PERSONAL',
    personalSubcategory: 'Environment',
    section: 'personalWorks',
    projectType: 'Environment',
    descriptionHtml: `SF 복도를 주제로 제작한 개인 환경 작업입니다.
하드서피스 구조와 조명 분위기를 중심으로 공간의 깊이감과 재질감을 구성했습니다.

제작 기간 : ${sciFiCorridorImport.period}`,
    tools: ['3ds Max', 'Substance Painter', 'Unreal Engine 5'],
    role: 'Full Pipeline',
    year: 2025,
    publishedAt: '2025-09-30',
    uploadedAt: '2025-09-30',
    isPublished: true,
    isFeatured: true,
    thumbnailUrl: sciFiCorridorImages[0].image.highResolutionUrl,
    hoverUrl: sciFiCorridorImages[1]?.image.highResolutionUrl,
    youtubeId: sciFiCorridorImport.videos[0]?.id,
    mediaType: 'image',
    order: 3,
    allOrder: 5,
    categoryOrder: 3,
    lightboxGroupId: 'PERSONAL',
    chips: [{ label: 'Environment', highlighted: true }],
    stats: [
      { key: 'Period', value: sciFiCorridorImport.period },
      { key: 'Source', value: 'Wix import draft' },
    ],
    media: sciFiCorridorMedia,
  },
  {
    id: 'personal-old-carriage',
    title: 'Old Carriage',
    subtitle: 'Personal Work',
    slug: 'old-carriage',
    category: 'PERSONAL',
    personalSubcategory: 'Environment',
    section: 'personalWorks',
    projectType: 'Environment',
    descriptionHtml: `서부 협곡 분위기를 기반으로 제작한 올드 캐리지 환경 작업입니다.
마차 에셋과 주변 배경을 구성하고, 실시간 렌더 기반으로 재질과 라이팅을 정리했습니다.

제작 기간 : 2026.04 ~ 2026.06`,
    tools: ['3ds Max', 'ZBrush', 'Substance Painter', 'Unreal Engine 5'],
    role: 'Full Pipeline',
    year: 2026,
    publishedAt: '2026-06-16',
    uploadedAt: '2026-06-16',
    isPublished: true,
    isFeatured: true,
    thumbnailUrl: oldCarriageImageMedia[0].url,
    hoverUrl: oldCarriageImageMedia[2]?.url,
    youtubeId: oldCarriageYoutubeId,
    mediaType: 'image',
    order: 4,
    allOrder: 5.5,
    categoryOrder: 4,
    lightboxGroupId: 'PERSONAL',
    chips: [
      { label: 'Environment', highlighted: true },
      { label: 'UE5', highlighted: true },
    ],
    stats: [
      { key: 'Period', value: '2026.04 ~ 2026.06' },
      { key: 'Renders', value: '10 Images' },
      { key: 'Source', value: 'Local render import' },
    ],
    media: oldCarriageMedia,
  },
  {
    id: 'personal-head-hunter',
    title: headHunterImport.title,
    subtitle: 'Personal Work',
    slug: 'head-hunter',
    category: 'PERSONAL',
    personalSubcategory: 'Character',
    archiveGroup: 'schoolWorks',
    section: 'personalWorks',
    projectType: 'Character',
    descriptionHtml: `Full Sail University 학생 프로젝트.
캐릭터 모델링 및 프레젠테이션 작업.
하이폴리 스컬프팅부터 텍스처링, 렌더링까지 전체 제작 과정을 진행.
원작 컨셉 아트를 기반으로 실시간 게임 아트 스타일로 구현.

제작 기간 : ${headHunterImport.period}`,
    tools: ['Maya', 'ZBrush', 'Marvelous Designer', 'Substance Painter', 'Marmoset Toolbag'],
    role: 'Full Pipeline',
    year: 2025,
    publishedAt: '2025-02-28',
    uploadedAt: '2025-02-28',
    isPublished: true,
    isFeatured: true,
    thumbnailUrl: headHunterImport.images[0].highResolutionUrl,
    hoverUrl: headHunterImport.images[1]?.highResolutionUrl,
    youtubeId: headHunterImport.videos[0]?.id,
    mediaType: 'image',
    order: 9,
    allOrder: 11,
    categoryOrder: 9,
    lightboxGroupId: 'PERSONAL',
    chips: [{ label: 'Character', highlighted: true }],
    stats: [
      { key: 'Period', value: headHunterImport.period },
      { key: 'Source', value: 'Wix import draft' },
    ],
    media: headHunterMedia,
  },
  {
    id: 'personal-babarian',
    title: barbarianImport.title,
    subtitle: 'Personal Work',
    slug: 'babarian',
    category: 'PERSONAL',
    personalSubcategory: 'Character',
    archiveGroup: 'schoolWorks',
    section: 'personalWorks',
    projectType: 'Character',
    descriptionHtml: `Full Sail University 학생 프로젝트.
캐릭터 모델링 및 프레젠테이션 작업.
원작 컨셉 아트를 기반으로 캐릭터의 실루엣, 의상 구조, 재질 표현을 중심으로 제작했습니다.

제작 기간 : ${barbarianImport.period}`,
    tools: ['Maya', 'ZBrush', 'Marvelous Designer', 'Substance Painter', 'Marmoset Toolbag'],
    role: 'Full Pipeline',
    year: 2025,
    publishedAt: '2025-01-31',
    uploadedAt: '2025-01-31',
    isPublished: true,
    isFeatured: true,
    thumbnailUrl: barbarianImport.images[0].highResolutionUrl,
    hoverUrl: barbarianImport.images[1]?.highResolutionUrl,
    youtubeId: barbarianImport.videos[0]?.id,
    mediaType: 'image',
    order: 10,
    allOrder: 12,
    categoryOrder: 10,
    lightboxGroupId: 'PERSONAL',
    chips: [{ label: 'Character', highlighted: true }],
    stats: [
      { key: 'Period', value: barbarianImport.period },
      { key: 'Source', value: 'Wix import draft' },
    ],
    media: barbarianMedia,
  },
  {
    id: 'personal-android',
    title: androidImport.title,
    subtitle: 'Personal Work',
    slug: 'android',
    category: 'PERSONAL',
    personalSubcategory: 'Character',
    archiveGroup: 'schoolWorks',
    section: 'personalWorks',
    projectType: 'Character',
    descriptionHtml: `Full Sail University 학생 프로젝트.
Maya를 활용한 캐릭터 모델링 프로젝트.
실루엣과 기계적 디테일 표현에 집중하여 제작했습니다.

제작 기간 : ${androidImport.period}`,
    tools: ['Maya', 'Substance Painter', 'Marmoset Toolbag'],
    role: 'Full Pipeline',
    year: 2024,
    publishedAt: '2024-10-31',
    uploadedAt: '2024-10-31',
    isPublished: true,
    isFeatured: true,
    thumbnailUrl: androidImport.images[0].highResolutionUrl,
    hoverUrl: androidImport.images[1]?.highResolutionUrl,
    youtubeId: androidImport.videos[0]?.id,
    mediaType: 'image',
    order: 11,
    allOrder: 13,
    categoryOrder: 11,
    lightboxGroupId: 'PERSONAL',
    chips: [
      { label: 'Character', highlighted: true },
      { label: 'Maya', highlighted: false },
    ],
    stats: [
      { key: 'Period', value: androidImport.period },
      { key: 'Tools', value: androidImport.tools.join(' / ') },
      { key: 'Source', value: 'Wix import draft' },
    ],
    media: androidMedia,
  },
  {
    id: 'personal-zbrush-rock-environment-practice',
    title: zbrushRockEnvironmentTitle,
    subtitle: 'Personal Work',
    slug: 'zbrush-rock-environment-practice',
    category: 'PERSONAL',
    personalSubcategory: 'Study',
    section: 'personalWorks',
    projectType: 'Study',
    descriptionHtml: `ZBrush를 활용한 암석 환경 에셋 스터디입니다.
바위 형태의 실루엣, 면 흐름, 표면 디테일 표현을 중심으로 제작했습니다.

제작 기간 : ${zbrushRockEnvironmentImport.period}`,
    tools: ['ZBrush', 'Substance Painter', 'Unreal Engine 5'],
    role: 'Asset Study',
    year: 2026,
    publishedAt: '2026-04-30',
    uploadedAt: '2026-04-30',
    isPublished: true,
    isFeatured: false,
    thumbnailUrl: zbrushRockEnvironmentImport.images[0].highResolutionUrl,
    hoverUrl: zbrushRockEnvironmentImport.images[1]?.highResolutionUrl,
    youtubeId: 'lxlqKrS5FJg',
    mediaType: 'image',
    order: 4,
    allOrder: 6,
    categoryOrder: 4,
    lightboxGroupId: 'PERSONAL',
    chips: [
      { label: 'Study', highlighted: true },
      { label: 'ZBrush', highlighted: false },
    ],
    stats: [
      { key: 'Period', value: zbrushRockEnvironmentImport.period },
      { key: 'Tools', value: zbrushRockEnvironmentImport.tools.join(' / ') },
      { key: 'Source', value: 'Wix import draft' },
    ],
    media: zbrushRockEnvironmentMedia,
  },
  {
    id: 'personal-zbrush-study',
    title: zbrushStudyTitle,
    subtitle: 'Personal Work',
    slug: 'zbrush-study',
    category: 'PERSONAL',
    personalSubcategory: 'Study',
    section: 'personalWorks',
    projectType: 'Study',
    descriptionHtml: `ZBrush를 활용한 환경 제작 스터디 모음입니다.
암석, 석조 구조물, 타일링 패턴 제작을 통해 형태 분석과 디테일 표현을 연구했습니다.`,
    tools: ['ZBRUSH'],
    role: 'Asset Study',
    year: 2026,
    publishedAt: '2026-02-28',
    uploadedAt: '2026-02-28',
    isPublished: true,
    isFeatured: false,
    thumbnailUrl: zbrushRockStudyImport.images[0].highResolutionUrl,
    hoverUrl: zbrushRockStudyImport.images[1]?.highResolutionUrl,
    mediaType: 'image',
    order: 5,
    allOrder: 7,
    categoryOrder: 5,
    lightboxGroupId: 'PERSONAL',
    chips: [
      { label: 'Study', highlighted: true },
      { label: 'ZBrush', highlighted: false },
    ],
    stats: [
      { key: 'Projects', value: 'Rock Study / Pillar Study / Tiling Study' },
      { key: 'Tools', value: 'ZBRUSH' },
      { key: 'Source', value: 'Wix import draft' },
    ],
    media: zbrushStudyMedia,
  },
  {
    id: 'personal-material-fabric',
    title: 'Substance Designer',
    subtitle: 'Substance Designer',
    slug: 'substance-designer-study',
    category: 'PERSONAL',
    personalSubcategory: 'Study',
    archiveGroup: 'substanceDesigner',
    section: 'personalWorks',
    projectType: 'Material Study',
    descriptionHtml: `Substance Designer를 활용한 패브릭 재질 스터디입니다.
직조 구조와 표면의 볼륨, 섬유 질감을 절차적으로 구성했습니다.

제작 기간 : ${materialStudyImport.period}`,
    tools: [...materialStudyImport.tools],
    role: 'Material Study',
    year: 2025,
    publishedAt: '2025-10-31',
    uploadedAt: '2025-10-31',
    isPublished: true,
    isFeatured: false,
    thumbnailUrl: substanceDesignerAssets.fabric01,
    hoverUrl: substanceDesignerAssets.leatherTufted,
    mediaType: 'image',
    order: 6,
    allOrder: 8,
    categoryOrder: 6,
    lightboxGroupId: 'PERSONAL',
    chips: [
      { label: 'Study', highlighted: true },
      { label: 'Substance Designer', highlighted: false },
    ],
    stats: [
      { key: 'Period', value: materialStudyImport.period },
      { key: 'Tools', value: materialStudyImport.tools.join(' / ') },
    ],
    media: fabricStudyMedia,
  },
  {
    id: 'personal-material-tile',
    title: 'Rock Study',
    subtitle: 'Substance Designer',
    slug: 'material-rock-study',
    category: 'PERSONAL',
    personalSubcategory: 'Study',
    archiveGroup: 'substanceDesigner',
    section: 'personalWorks',
    projectType: 'Material Study',
    descriptionHtml: `Substance Designer를 활용한 타일 재질 스터디입니다.
패턴 반복, 경계 마모와 표면 디테일을 절차적으로 제작했습니다.

제작 기간 : ${materialStudyImport.period}`,
    tools: [...materialStudyImport.tools],
    role: 'Material Study',
    year: 2025,
    publishedAt: '2025-10-31',
    uploadedAt: '2025-10-31',
    isPublished: false,
    isFeatured: false,
    thumbnailUrl: substanceDesignerAssets.rockStudy01,
    hoverUrl: substanceDesignerAssets.rockStudy02,
    mediaType: 'image',
    order: 7,
    allOrder: 9,
    categoryOrder: 7,
    lightboxGroupId: 'PERSONAL',
    chips: [
      { label: 'Study', highlighted: true },
      { label: 'Substance Designer', highlighted: false },
    ],
    stats: [
      { key: 'Period', value: materialStudyImport.period },
      { key: 'Tools', value: materialStudyImport.tools.join(' / ') },
    ],
    media: tileStudyMedia,
  },
  {
    id: 'personal-material-ornament',
    title: 'Ornament',
    subtitle: 'Substance Designer',
    slug: 'material-ornament',
    category: 'PERSONAL',
    personalSubcategory: 'Study',
    archiveGroup: 'substanceDesigner',
    section: 'personalWorks',
    projectType: 'Material Study',
    descriptionHtml: `Substance Designer를 활용한 장식 패턴 재질 스터디입니다.
형태의 반복과 높이 정보를 중심으로 절차적 패턴을 구성했습니다.

제작 기간 : ${materialStudyImport.period}`,
    tools: [...materialStudyImport.tools],
    role: 'Material Study',
    year: 2025,
    publishedAt: '2025-10-31',
    uploadedAt: '2025-10-31',
    isPublished: false,
    isFeatured: false,
    thumbnailUrl: substanceDesignerAssets.ornament01,
    mediaType: 'image',
    order: 8,
    allOrder: 10,
    categoryOrder: 8,
    lightboxGroupId: 'PERSONAL',
    chips: [
      { label: 'Study', highlighted: true },
      { label: 'Substance Designer', highlighted: false },
    ],
    stats: [
      { key: 'Period', value: materialStudyImport.period },
      { key: 'Tools', value: materialStudyImport.tools.join(' / ') },
    ],
    media: ornamentStudyMedia,
  },
  {
    id: 'sketch-note-youtube',
    title: 'Sketch Note Film',
    subtitle: 'Sketch Note',
    slug: 'sketch-note-film',
    category: 'SKETCH',
    section: 'sketch',
    projectType: 'Sketch Note',
    descriptionHtml: 'A YouTube-backed Sketch Note item shell.',
    tools: ['YouTube'],
    role: 'Creator',
    year: 2024,
    publishedAt: '2026-05-28',
    uploadedAt: '2026-05-28',
    isPublished: true,
    isFeatured: false,
    thumbnailUrl: '/mock/sketch-note-thumb.webp',
    youtubeId: 'example',
    mediaType: 'youtube',
    order: 1,
    allOrder: 12,
    categoryOrder: 1,
    lightboxGroupId: 'SKETCH',
    chips: [],
    stats: [],
    media: [],
  },
  {
    id: 'designer-layout-study',
    title: 'Designer Layout Study',
    subtitle: 'Designer',
    slug: 'designer-layout-study',
    category: 'DESIGNER',
    section: 'designer',
    projectType: 'Designer',
    descriptionHtml: 'A Designer category shell grouped for future category lightbox behavior.',
    tools: ['Photoshop', 'Illustrator'],
    role: 'Designer',
    year: 2024,
    publishedAt: '2026-02-05',
    uploadedAt: '2026-02-05',
    isPublished: true,
    isFeatured: false,
    thumbnailUrl: '/mock/designer-layout-thumb.webp',
    mediaType: 'image',
    order: 1,
    allOrder: 13,
    categoryOrder: 1,
    lightboxGroupId: 'DESIGNER',
    chips: [],
    stats: [],
    media: [],
  },
  {
    id: 'relight-corridor',
    title: 'Re:Lighting Corridor',
    subtitle: 'Lighting Study',
    slug: 'relight-corridor',
    category: 'RELIGHT',
    section: 'relighting',
    projectType: 'Re:Lighting',
    descriptionHtml: 'A Re:Lighting shell for category-limited sequential movement.',
    tools: ['Unreal Engine 5'],
    role: 'Lighting Artist',
    year: 2024,
    publishedAt: '2026-01-14',
    uploadedAt: '2026-01-14',
    isPublished: true,
    isFeatured: false,
    thumbnailUrl: '/mock/relight-corridor-thumb.webp',
    mediaType: 'image',
    order: 1,
    allOrder: 14,
    categoryOrder: 1,
    lightboxGroupId: 'RELIGHT',
    chips: [],
    stats: [],
    media: [],
  },
];
