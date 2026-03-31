import type {
  CreateForumPostInput,
  ForumPost,
  ForumPostMedia,
} from '@/app/(marketing)/forum/types';

const seedForumPosts: ForumPost[] = [
  {
    id: 'post-rice-001',
    companyName: 'HTX Lua Gao Co Do',
    isVerified: true,
    author: 'Le Van Hung',
    postedAt: '28m',
    headline: 'Ban 120 tan gao ST25 vu moi, giao theo lo tu 5 tan',
    body: 'Hang da say va tach tap chat, co CO/CQ theo yeu cau. Uu tien doi tac lay deu hang tuan tai kho Can Tho.',
    media: [
      {
        src: '/about-us/slide-1.jpg',
        alt: 'Mau gao ST25 da dong bao 50kg',
        caption: 'Kho gao ST25 san sang xuat hang',
      },
    ],
  },
  {
    id: 'post-mango-002',
    companyName: 'Vuon Trai Cay Dong Thap',
    isVerified: true,
    author: 'Nguyen Thi Minh',
    postedAt: '1h',
    headline: 'Ban xoai cat chu loai 1, san luong 18 tan trong 10 ngay toi',
    body: 'Xoai canh tac theo quy trinh VietGAP, co the dong thung 5kg hoac 10kg. Nhan dat coc de giu lich thu hoach.',
    media: [
      {
        src: '/about-us/slide-3.jpg',
        alt: 'Xoai cat chu tuyen chon truoc khi dong goi',
        caption: 'Xoai cat chu loai 1 cho thi truong ban le',
      },
    ],
  },
  {
    id: 'post-coconut-003',
    companyName: 'Ben Tre Coconut Farm',
    isVerified: true,
    author: 'Tran Quoc Bao',
    postedAt: '2h',
    headline: 'Can ban dua xiem xanh 25000 trai, gia theo tuan',
    body: 'Dua da phan loai size 0.9kg-1.2kg trai, phu hop kenh quan nuoc va sieu thi mini. Co xe lanh giao noi mien Nam.',
    media: [
      {
        src: '/about-us/slide-7.jpg',
        alt: 'Dua xiem xanh tap ket tai diem thu mua',
        caption: 'Lo dua xiem xanh giao trong 48 gio',
      },
    ],
  },
  {
    id: 'post-vegetable-004',
    companyName: 'Trang Trai Rau Da Lat',
    isVerified: false,
    author: 'Pham Tuan Kiet',
    postedAt: '5h',
    headline: 'Ban cai thao va xa lach thuy canh, hop dong thang 4 con 6 tan',
    body: 'Rau thu hoach sang som moi ngay, dong thung carton co tem truy xuat. Nhan don OEM cho chuoi cua hang thuc pham sach.',
    media: [
      {
        src: '/about-us/slide-2.jpg',
        alt: 'Rau la tuoi sau khi thu hoach',
        caption: 'Rau la giao hang ngay theo hop dong',
      },
    ],
  },
];

let forumPostsStore: ForumPost[] = [...seedForumPosts];

function normalizeMedia(media: ForumPostMedia[] | undefined): ForumPostMedia[] {
  if (!Array.isArray(media)) {
    return [];
  }

  return media.filter((item) => {
    return (
      typeof item.src === 'string' &&
      item.src.trim().length > 0 &&
      typeof item.alt === 'string' &&
      typeof item.caption === 'string'
    );
  });
}

export function listForumPosts(): ForumPost[] {
  return [...forumPostsStore];
}

export function createForumPost(input: CreateForumPostInput): ForumPost {
  const post: ForumPost = {
    id: crypto.randomUUID(),
    companyName: input.companyName.trim(),
    author: input.author.trim(),
    headline: input.headline.trim(),
    body: input.body.trim(),
    isVerified: Boolean(input.isVerified),
    postedAt: input.postedAt?.trim() || 'Now',
    media: normalizeMedia(input.media),
  };

  forumPostsStore = [post, ...forumPostsStore];
  return post;
}
