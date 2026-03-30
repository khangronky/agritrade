export type ProductStatus = 'Draft' | 'Active' | 'Sold' | 'Archived';

export type ProductRecord = {
  id: string;
  crop: string;
  variety: string;
  grade: string;
  location: string;
  quantity: number;
  unit: 'kg' | 'ton';
  expectedHarvest: string;
  askingPrice?: number;
  status: ProductStatus;
  isPublished: boolean;
  updatedAt: string;
  notes: string;
  imageSrc: string;
};

export const productRecords: ProductRecord[] = [
  {
    id: 'prd-01',
    crop: 'ST25 Rice',
    variety: 'Premium fragrant',
    grade: 'Export grade',
    location: 'Soc Trang',
    quantity: 18,
    unit: 'ton',
    expectedHarvest: '2026-04-10',
    askingPrice: 16200,
    status: 'Active',
    isPublished: true,
    updatedAt: '2h ago',
    notes:
      'Main lot reserved for wholesale buyers, still open for two more contracts.',
    imageSrc: '/farm.jpg',
  },
  {
    id: 'prd-02',
    crop: 'Cat Chu Mango',
    variety: 'Early season',
    grade: 'Grade A',
    location: 'Dong Thap',
    quantity: 6400,
    unit: 'kg',
    expectedHarvest: '2026-04-18',
    askingPrice: 28500,
    status: 'Draft',
    isPublished: false,
    updatedAt: 'Today',
    notes: 'Need final packing spec before publishing.',
    imageSrc: '/farm.jpg',
  },
  {
    id: 'prd-03',
    crop: 'Dragon Fruit',
    variety: 'Red flesh',
    grade: 'Grade A',
    location: 'Binh Thuan',
    quantity: 8200,
    unit: 'kg',
    expectedHarvest: '2026-04-15',
    askingPrice: 21400,
    status: 'Sold',
    isPublished: false,
    updatedAt: '1d ago',
    notes: 'Committed to an existing buyer contract.',
    imageSrc: '/farm.jpg',
  },
  {
    id: 'prd-04',
    crop: 'Mustard Greens',
    variety: 'Local leafy bundle',
    grade: 'Fresh market',
    location: 'Lam Dong',
    quantity: 1800,
    unit: 'kg',
    expectedHarvest: '2026-04-06',
    askingPrice: 9800,
    status: 'Archived',
    isPublished: false,
    updatedAt: '4d ago',
    notes: 'Previous season batch archived for reference.',
    imageSrc: '/farm.jpg',
  },
];

export const productStatusTabs: Array<'All' | ProductStatus> = [
  'All',
  'Draft',
  'Active',
  'Sold',
  'Archived',
];

export const productGradeOptions = [
  'Export grade',
  'Grade A',
  'Commercial',
  'Fresh market',
  'Processing',
];
