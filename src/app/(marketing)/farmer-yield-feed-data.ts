export type FarmerFeedItem = {
  id: string;
  farmer: string;
  update: string;
  country: string;
  detail: string;
  time: string;
};

type FarmerFeedTemplate = {
  farmer: string;
  update: string;
  country: string;
  detail: string;
};

export const farmerFeedRefreshMs = 5_000;
export const farmerFeedMaxItems = 4;

export const initialFarmerFeed: FarmerFeedItem[] = [
  {
    id: 'seed-1',
    farmer: 'Nguyen Van Hoa',
    update: 'updated ST25 Rice lot',
    country: 'Vietnam',
    detail: '24 tons - Soc Trang, Vietnam',
    time: '08:45:00',
  },
  {
    id: 'seed-2',
    farmer: 'Somchai Prasert',
    update: 'updated Cat Mango lot',
    country: 'Thailand',
    detail: '12 tons - Chanthaburi, Thailand',
    time: '09:10:00',
  },
  {
    id: 'seed-3',
    farmer: 'Siti Aisyah',
    update: 'updated Mustard Greens lot',
    country: 'Indonesia',
    detail: '8 tons - West Java, Indonesia',
    time: '09:35:00',
  },
];

const farmerFeedTemplates: FarmerFeedTemplate[] = [
  {
    farmer: 'Nguyen Van Hoa',
    update: 'updated ST25 Rice lot',
    country: 'Vietnam',
    detail: '20 tons - Soc Trang, Vietnam',
  },
  {
    farmer: 'Somchai Prasert',
    update: 'updated Cat Mango lot',
    country: 'Thailand',
    detail: '15 tons - Chanthaburi, Thailand',
  },
  {
    farmer: 'Siti Aisyah',
    update: 'updated Mustard Greens lot',
    country: 'Indonesia',
    detail: '10 tons - West Java, Indonesia',
  },
  {
    farmer: 'Maria Santos',
    update: 'updated Cat Mango lot',
    country: 'Philippines',
    detail: '14 tons - Guimaras, Philippines',
  },
  {
    farmer: 'Ahmad Faiz',
    update: 'updated Mustard Greens lot',
    country: 'Malaysia',
    detail: '11 tons - Cameron Highlands, Malaysia',
  },
  {
    farmer: 'Sokha Chan',
    update: 'updated Pangasius lot',
    country: 'Cambodia',
    detail: '18 tons - Kandal, Cambodia',
  },
  {
    farmer: 'Aung Min',
    update: 'updated ST25 Rice lot',
    country: 'Myanmar',
    detail: '16 tons - Ayeyarwady, Myanmar',
  },
  {
    farmer: 'Bounmy Vong',
    update: 'updated ST25 Rice lot',
    country: 'Laos',
    detail: '13 tons - Savannakhet, Laos',
  },
];

export function formatFeedTime() {
  return new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function createMockFarmerFeedItem(index: number): FarmerFeedItem {
  const template = farmerFeedTemplates[index % farmerFeedTemplates.length];

  return {
    id: `${Date.now()}-${index}`,
    farmer: template.farmer,
    update: template.update,
    country: template.country,
    detail: template.detail,
    time: formatFeedTime(),
  };
}
