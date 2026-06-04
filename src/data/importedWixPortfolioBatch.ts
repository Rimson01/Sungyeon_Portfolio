export interface ImportedWixBatchImage {
  id: string;
  fileName: string;
  originalWidth: number;
  originalHeight: number;
  originalWixUri: string;
  highResolutionUrl: string;
}

export interface ImportedWixBatchVideo {
  provider: 'youtube';
  id: string;
  url: string;
  posterUrl: string;
}

export interface ImportedWixProjectDraft {
  slug: string;
  sourceUrl: string;
  title: string;
  period: string;
  tools: string[];
  description: string;
  videos: ImportedWixBatchVideo[];
  images: ImportedWixBatchImage[];
}

type ImageEntry = readonly [width: number, height: number, fileName: string];

const toWixImage = (slug: string, [originalWidth, originalHeight, fileName]: ImageEntry, index: number) => ({
  id: `${slug}-${String(index + 1).padStart(2, '0')}`,
  fileName,
  originalWidth,
  originalHeight,
  originalWixUri: `wix:image://v1/${fileName}/${fileName}#originWidth=${originalWidth}&originHeight=${originalHeight}`,
  highResolutionUrl: `https://static.wixstatic.com/media/${fileName}`,
});

const images = (slug: string, entries: readonly ImageEntry[]) =>
  entries.map((entry, index) => toWixImage(slug, entry, index));

const youtube = (id: string): ImportedWixBatchVideo => ({
  provider: 'youtube',
  id,
  url: `https://youtu.be/${id}`,
  posterUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
});

export const importedWixPortfolioBatch = [
  {
    slug: 'fire-place',
    sourceUrl:
      'https://sungyeonlee1350.wixsite.com/sungyeon-lee-portfol/portfolio-collections/my-portfolio/fire-place',
    title: 'Fire Place',
    period: '2026.02 ~ 2026.03',
    tools: [],
    description: '2026.02 ~ 2026.03',
    videos: [youtube('qGRKlraMQwc')],
    images: images('fire-place', [
      [1920, 1080, 'c9b5fa_e51c319164074937aea751fa6e6404fc~mv2.jpg'],
      [2000, 2400, 'c9b5fa_73de3ec0ff26443c91de5c8fa90c841a~mv2.jpg'],
      [2000, 2400, 'c9b5fa_43187e91a93448eda62dcd3648681652~mv2.jpg'],
      [1920, 1080, 'c9b5fa_db645a79e14741c2a89b7e1da78fdab0~mv2.jpg'],
      [1920, 1080, 'c9b5fa_769a82305eb44fef9986a3ec16050201~mv2.jpg'],
      [1920, 1080, 'c9b5fa_e65b4d51fc794778b70e1e25b62747ea~mv2.jpg'],
      [1920, 1080, 'c9b5fa_3b6a0afd7840414f925f5e832f96374b~mv2.jpg'],
      [1920, 1080, 'c9b5fa_d07fa6cc48c44108b998616a6f32641c~mv2.gif'],
      [1280, 720, 'c9b5fa_789e520d50994e95b0fa05ef6e2c6a2e~mv2.jpg'],
    ]),
  },
  {
    slug: 'project-title-6',
    sourceUrl:
      'https://sungyeonlee1350.wixsite.com/sungyeon-lee-portfol/portfolio-collections/my-portfolio/project-title-6',
    title: 'Sci-fi corridor',
    period: '2025.05 ~ 2025.09',
    tools: [],
    description: '2025.05 ~ 2025.09',
    videos: [youtube('w77OL9aj7Pk')],
    images: images('project-title-6', [
      [1920, 1080, 'c9b5fa_8a042406b10f450c945a61766743aa05~mv2.jpg'],
      [1920, 1080, 'c9b5fa_fc55e40bfddd48d3b6affec98822bae3~mv2.jpg'],
      [1920, 1080, 'c9b5fa_faf4b73b3b0448128da71ba36ce167e8~mv2.jpg'],
      [1920, 1080, 'c9b5fa_4068d0e2ed794e2c82ac25b56d5ecf30~mv2.jpg'],
      [1920, 1080, 'c9b5fa_15342b6936644aa8aa9007eb4ae8aa32~mv2.jpg'],
      [1920, 1080, 'c9b5fa_eb4b8fc2b81b4f75a45bf9c88ca1d4f7~mv2.jpg'],
      [1920, 1080, 'c9b5fa_09d3ad167f2449199facbc51aa916a56~mv2.jpg'],
      [1920, 1080, 'c9b5fa_9fdcddeba8ff4faeae7af0d56078cd02~mv2.jpg'],
      [1920, 1080, 'c9b5fa_a1d25626d7cb406698f3e3da0787db38~mv2.jpg'],
      [1920, 1080, 'c9b5fa_262f3fef32024427b72335c2d2ff6238~mv2.jpg'],
      [1920, 1080, 'c9b5fa_c69849700b9b4f4bb244963daca53ad3~mv2.jpg'],
      [1280, 720, 'c9b5fa_ab64f03a202f40aa88cab0dffb5a4778~mv2.jpg'],
    ]),
  },
  {
    slug: 'zbrush-rock-environment-practice',
    sourceUrl:
      'https://sungyeonlee1350.wixsite.com/sungyeon-lee-portfol/portfolio-collections/my-portfolio/zbrush-rock-environment-practice',
    title: 'Zbrush Rock Environment Practice',
    period: '2026.03 ~ 2026.04',
    tools: ['ZBRUSH'],
    description: '2026.03 ~ 2026.04',
    videos: [],
    images: images('zbrush-rock-environment-practice', [
      [1920, 1080, 'c9b5fa_f6c95dc2270849aea4a03da6c491e1d6~mv2.jpg'],
      [1920, 1080, 'c9b5fa_30a7e95c36074cf08c1870f78ed08c37~mv2.jpg'],
      [1920, 1080, 'c9b5fa_6ea095d35c8443169fbaa8d0efdf1694~mv2.jpg'],
      [1920, 1080, 'c9b5fa_5c2faf0a504043e29dfea3940ecfb593~mv2.jpg'],
      [1920, 1080, 'c9b5fa_ca6b43586dae401086040039a37af6b7~mv2.jpg'],
      [1920, 1080, 'c9b5fa_b6ed569109594a95a6a7156faaa34e77~mv2.jpg'],
    ]),
  },
  {
    slug: 'zbrush-rock-study',
    sourceUrl:
      'https://sungyeonlee1350.wixsite.com/sungyeon-lee-portfol/portfolio-collections/my-portfolio/zbrush-rock-study',
    title: 'Zbrush Rock Study',
    period: '2026.01 ~ 2026.02',
    tools: ['ZBRUSH'],
    description: '2026.01 ~ 2026.02',
    videos: [],
    images: images('zbrush-rock-study', [
      [1920, 1080, 'c9b5fa_5ebd590ac1324a1a99b8d5ce2c807e8f~mv2.jpg'],
      [1920, 1080, 'c9b5fa_564dfb178fdb48139cfaf233c26aed76~mv2.jpg'],
      [1920, 1080, 'c9b5fa_b796002c57a24c42ba5e615e1ffc5869~mv2.jpg'],
      [1920, 1080, 'c9b5fa_6176b19bcba342a688c44187c0d27c0a~mv2.jpg'],
      [1920, 1080, 'c9b5fa_564ba0717e8b412d93bc947062879bb9~mv2.jpg'],
      [1920, 1080, 'c9b5fa_67576069bd284306be6f441400aa32f3~mv2.jpg'],
      [1920, 1080, 'c9b5fa_89ce26bd75fb4ac784662355c0055498~mv2.jpg'],
    ]),
  },
  {
    slug: 'project-title-1',
    sourceUrl:
      'https://sungyeonlee1350.wixsite.com/sungyeon-lee-portfol/portfolio-collections/my-portfolio/project-title-1',
    title: 'Substance Designer study',
    period: '2025.09 ~ 2025.10',
    tools: ['SUBSTANCE DESIGNER'],
    description: '2025.09 ~ 2025.10',
    videos: [],
    images: images('project-title-1', [
      [1600, 1600, 'c9b5fa_a2568cee7d7c456c8b9b1e95a0e84c38~mv2.png'],
      [1600, 1600, 'c9b5fa_258ea711ac634ac8b52240155d1f2539~mv2.png'],
      [1600, 1600, 'c9b5fa_02319914721b4364b78b8e505ec0935b~mv2.png'],
      [1600, 1600, 'c9b5fa_ff3e955f6e484c70b159acc4dff779cc~mv2.png'],
      [1600, 1600, 'c9b5fa_f21fa27830a0421eaf797decadfeec76~mv2.png'],
      [1600, 1600, 'c9b5fa_5c5fa6d446f64f2f9eaf11ae82cd0ffd~mv2.png'],
      [1600, 1600, 'c9b5fa_d5aee6b2a34a46848f78566bda5489d0~mv2.jpg'],
      [1600, 1600, 'c9b5fa_e120655b48474a87ab62298646e4abb7~mv2.png'],
    ]),
  },
  {
    slug: 'project-title-3',
    sourceUrl:
      'https://sungyeonlee1350.wixsite.com/sungyeon-lee-portfol/portfolio-collections/my-portfolio/project-title-3',
    title: 'Zbrush stone pillar study',
    period: '2025.12',
    tools: ['ZBRUSH'],
    description: '2025.12',
    videos: [],
    images: images('project-title-3', [
      [3840, 2048, 'c9b5fa_fee31ac00772495d8c890ae46f196343~mv2.jpg'],
      [1920, 1080, 'c9b5fa_3eaaf98bcf1846cb90653f855e447ece~mv2.jpg'],
      [2560, 2048, 'c9b5fa_6159e4cd897041efa9259220cffdc18d~mv2.png'],
      [2560, 2048, 'c9b5fa_71f5a34dba9a4a61947a65cf916352f6~mv2.png'],
      [2560, 2048, 'c9b5fa_73c2e9fe8a8042f39a408bef23aaceae~mv2.png'],
      [2560, 2048, 'c9b5fa_4e36607ebd80442393f633a02228df4c~mv2.png'],
    ]),
  },
  {
    slug: 'project-title-5',
    sourceUrl:
      'https://sungyeonlee1350.wixsite.com/sungyeon-lee-portfol/portfolio-collections/my-portfolio/project-title-5',
    title: 'Zbrush tiling study',
    period: '2025.10',
    tools: ['ZBRUSH'],
    description: '2025.10',
    videos: [],
    images: images('project-title-5', [
      [1920, 1080, 'c9b5fa_82b5f18d7e16452296ac25095e0d542a~mv2.png'],
      [1920, 1080, 'c9b5fa_9dfe4c14ece34d2a9c344b93b954dcb3~mv2.jpg'],
      [1920, 1080, 'c9b5fa_920e7cf7203a42a397f4c16798a7a2af~mv2.png'],
      [1920, 1080, 'c9b5fa_4649d66a57f84ceaaae8f628fb010383~mv2.jpg'],
      [883, 875, 'c9b5fa_d156d9e8b7aa4506a758fc9d2c21fbba~mv2.png'],
    ]),
  },
  {
    slug: 'head-hunter',
    sourceUrl:
      'https://sungyeonlee1350.wixsite.com/sungyeon-lee-portfol/portfolio-collections/my-portfolio/head-hunter',
    title: 'Head Hunter',
    period: '2025.01 ~ 2025.02',
    tools: [],
    description:
      'Fullsail University student project\n2025.01 ~ 2025.02\n\nReference concept art :Jin kwang Park\nhttps://www.artstation.com/artwork/EVEEr2',
    videos: [youtube('bDGIFR_axJs')],
    images: images('head-hunter', [
      [605, 682, 'c9b5fa_144cbabce1d144f29997833b5345fca4~mv2.jpg'],
      [846, 1080, 'c9b5fa_b2e876ae0bc341efbff8c064eace7442~mv2.jpg'],
      [986, 1080, 'c9b5fa_a14ae03ba98641c8b345e2bd1456940c~mv2.jpg'],
      [668, 1080, 'c9b5fa_123f6ae312ba487182462cd8921540c5~mv2.jpg'],
      [888, 993, 'c9b5fa_8bf6727b9f76483ebebc95b32ae9f432~mv2.png'],
      [1065, 993, 'c9b5fa_805f90b76f9243c08b2d54dc6de4b3be~mv2.png'],
      [1590, 998, 'c9b5fa_8338a371005b4437a30ac3a9dc5e1762~mv2.png'],
      [1280, 720, 'c9b5fa_b1d72125b3e44e349c98f9f497dd5536~mv2.jpg'],
    ]),
  },
  {
    slug: 'babarian',
    sourceUrl:
      'https://sungyeonlee1350.wixsite.com/sungyeon-lee-portfol/portfolio-collections/my-portfolio/babarian',
    title: 'Babarian',
    period: '2024.11 ~ 2025.01',
    tools: [],
    description:
      'Fullsail University student project\n2024.11 ~ 2025.01\n\nReference concept art :seok young choi\nhttps://www.artstation.com/artwork/zA0NaZ',
    videos: [youtube('bDGIFR_axJs')],
    images: images('babarian', [
      [398, 398, 'c9b5fa_fdaf06f6082f48f0a2b6bad5d9640eae~mv2.jpg'],
      [636, 1080, 'c9b5fa_83297f41ed1f4ce7879582b16a7024e3~mv2.jpg'],
      [636, 1080, 'c9b5fa_c1cf9924de754fb4b5d669fd18adc6b2~mv2.jpg'],
      [636, 1080, 'c9b5fa_ca8b18d5047d4da3b106e6717bf16a10~mv2.jpg'],
      [967, 992, 'c9b5fa_1819af7c38b74dc588cfc73c880ebcfb~mv2.png'],
      [946, 1153, 'c9b5fa_c921ed2b3cad42169f3e81321e3edd78~mv2.png'],
      [1920, 1080, 'c9b5fa_1e0c39e3cb8f4256986381e6a3720867~mv2.jpg'],
    ]),
  },
  {
    slug: 'android',
    sourceUrl:
      'https://sungyeonlee1350.wixsite.com/sungyeon-lee-portfol/portfolio-collections/my-portfolio/android',
    title: 'Android',
    period: '2024.09 ~ 2024.10',
    tools: ['MAYA'],
    description:
      'Fullsail University student project\n2024.09 ~ 2024.10\n\nModeled in Maya.\nConcept from Pinterest https://pin.it/1V6Mkggvq',
    videos: [youtube('bDGIFR_axJs')],
    images: images('android', [
      [1600, 1600, 'c9b5fa_9afc73aa6f92434c9b0990721f023e3f~mv2.jpg'],
      [1600, 1600, 'c9b5fa_9e956d8fd53441ca81887ad9486b0ea6~mv2.jpg'],
      [1600, 1600, 'c9b5fa_e6854055bfab4c53ab8d0a9f31b35ece~mv2.jpg'],
      [1280, 720, 'c9b5fa_196b148dbbf74f2b9502708eb20e0bba~mv2.jpg'],
    ]),
  },
] satisfies ImportedWixProjectDraft[];
