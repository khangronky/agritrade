export type MarketplaceAvailability = 'Available now' | 'Pre-harvest';

export type MarketplaceListing = {
  id: string;
  crop: string;
  variety: string;
  grade: string;
  seller: string;
  location: string;
  quantity: number;
  unit: 'kg' | 'ton';
  askingPrice: number;
  currency: 'VND';
  availability: MarketplaceAvailability;
  expectedHarvest: string;
  minimumOrder: number;
  deliveryArea: string;
  qualityNotes: string;
  tags: string[];
  postedAt: string;
  imageSrc: string;
};

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: 'mk-01',
    crop: 'ST25 Rice',
    variety: 'Premium fragrant',
    grade: 'Export grade',
    seller: 'Mekong Green Cooperative',
    location: 'Soc Trang',
    quantity: 18,
    unit: 'ton',
    askingPrice: 16200,
    currency: 'VND',
    availability: 'Available now',
    expectedHarvest: 'Ready for dispatch this week',
    minimumOrder: 2,
    deliveryArea: 'Mekong Delta and Ho Chi Minh City',
    qualityNotes:
      'Low broken rate, dried to export handling standard, warehouse packed in 25kg bags.',
    tags: ['Verified seller', 'Export grade'],
    postedAt: '2h ago',
    imageSrc: '/farm.jpg',
  },
  {
    id: 'mk-02',
    crop: 'Cat Chu Mango',
    variety: 'Early season',
    grade: 'Grade A',
    seller: 'Dong Thap Fruit Hub',
    location: 'Dong Thap',
    quantity: 6400,
    unit: 'kg',
    askingPrice: 28500,
    currency: 'VND',
    availability: 'Pre-harvest',
    expectedHarvest: 'Harvest expected in 12 days',
    minimumOrder: 500,
    deliveryArea: 'Can Tho, Ho Chi Minh City, Binh Duong',
    qualityNotes:
      'Uniform sizing, sweet profile, suitable for domestic retail and processing buyers.',
    tags: ['GAP ready', 'Cold chain'],
    postedAt: '5h ago',
    imageSrc: '/farm.jpg',
  },
  {
    id: 'mk-03',
    crop: 'Robusta Coffee',
    variety: 'Screen 16',
    grade: 'Commercial',
    seller: 'Highland Beans Collective',
    location: 'Dak Lak',
    quantity: 24,
    unit: 'ton',
    askingPrice: 96400,
    currency: 'VND',
    availability: 'Available now',
    expectedHarvest: 'Stocked and ready',
    minimumOrder: 3,
    deliveryArea: 'Central Highlands and export ports',
    qualityNotes:
      'Clean sorted beans with stable moisture, suited for roasters and bulk trading desks.',
    tags: ['Bulk lot', 'Warehouse stock'],
    postedAt: 'Today',
    imageSrc: '/farm.jpg',
  },
  {
    id: 'mk-04',
    crop: 'Dragon Fruit',
    variety: 'Red flesh',
    grade: 'Grade A',
    seller: 'Binh Thuan Fresh Farm',
    location: 'Binh Thuan',
    quantity: 8200,
    unit: 'kg',
    askingPrice: 21400,
    currency: 'VND',
    availability: 'Pre-harvest',
    expectedHarvest: 'Harvest expected next week',
    minimumOrder: 700,
    deliveryArea: 'Southern wholesale markets',
    qualityNotes:
      'Night-lit fruiting batch with strong color, sorted for export and modern trade channels.',
    tags: ['Export ready', 'Fruit'],
    postedAt: '1d ago',
    imageSrc: '/farm.jpg',
  },
  {
    id: 'mk-05',
    crop: 'Mustard Greens',
    variety: 'Local leafy bundle',
    grade: 'Fresh market',
    seller: 'Da Lat Urban Farm Link',
    location: 'Lam Dong',
    quantity: 1800,
    unit: 'kg',
    askingPrice: 9800,
    currency: 'VND',
    availability: 'Available now',
    expectedHarvest: 'Daily cut harvest',
    minimumOrder: 100,
    deliveryArea: 'Da Lat and Ho Chi Minh City',
    qualityNotes:
      'Freshly cut leafy vegetables packed in reusable crates for same-day distribution.',
    tags: ['Fresh cut', 'Short lead time'],
    postedAt: '1d ago',
    imageSrc: '/farm.jpg',
  },
  {
    id: 'mk-06',
    crop: 'Cassava',
    variety: 'High starch',
    grade: 'Processing',
    seller: 'Tay Ninh Root Supply',
    location: 'Tay Ninh',
    quantity: 35,
    unit: 'ton',
    askingPrice: 3750,
    currency: 'VND',
    availability: 'Pre-harvest',
    expectedHarvest: 'Harvest expected in 18 days',
    minimumOrder: 5,
    deliveryArea: 'Tay Ninh and neighboring processing plants',
    qualityNotes:
      'Contract-ready cassava lots with farm traceability suitable for starch processors.',
    tags: ['Factory supply', 'Traceable lot'],
    postedAt: '2d ago',
    imageSrc: '/farm.jpg',
  },
];

export const marketplaceCropOptions = [
  'All crops',
  ...new Set(marketplaceListings.map((item) => item.crop)),
];
export const marketplaceLocationOptions = [
  'All locations',
  ...new Set(marketplaceListings.map((item) => item.location)),
];
