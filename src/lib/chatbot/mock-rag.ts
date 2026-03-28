import { initialFarmerFeed } from '@/app/(marketing)/farmer-yield-feed-data';
import { listings } from '@/app/(marketing)/market/data';
import { listForumPosts } from '@/lib/forum/posts-store';

type KnowledgeDocument = {
  id: string;
  body: string;
  kind: 'forum_post' | 'market_listing' | 'farmer_feed';
};

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'for',
  'from',
  'in',
  'is',
  'it',
  'of',
  'on',
  'or',
  'that',
  'the',
  'to',
  'with',
  'what',
  'how',
  'can',
  'i',
  'you',
  'we',
  'us',
  've',
  'toi',
  'la',
  'va',
  'cho',
  'voi',
  'tu',
  'ban',
  'nay',
  'do',
  'nhung',
  'trong',
  'tren',
  'duoc',
  'khong',
]);

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function tokenize(value: string): string[] {
  return normalizeText(value)
    .split(/[^a-z0-9]+/g)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function unique(tokens: string[]): string[] {
  return [...new Set(tokens)];
}

function buildKnowledgeDocuments(): KnowledgeDocument[] {
  const forumDocs = listForumPosts().map((post) => ({
    id: `forum:${post.id}`,
    kind: 'forum_post' as const,
    body: [
      `Forum listing from ${post.companyName}.`,
      `Author: ${post.author}.`,
      `Headline: ${post.headline}.`,
      `Details: ${post.body}.`,
      post.postedAt ? `Posted at: ${post.postedAt}.` : '',
    ]
      .filter(Boolean)
      .join(' '),
  }));

  const marketDocs = listings.map((listing) => ({
    id: `market:${listing.name}-${listing.country}`,
    kind: 'market_listing' as const,
    body: [
      `${listing.name} in ${listing.region}, ${listing.country}.`,
      `Category: ${listing.category}.`,
      `Price: ${listing.pricePerKgVnd} VND per kg.`,
      `Volume: ${listing.volume}.`,
      `Status: ${listing.status}.`,
      `Trend: ${listing.trend}.`,
    ]
      .filter(Boolean)
      .join(' '),
  }));

  const feedDocs = initialFarmerFeed.map((item) => ({
    id: `feed:${item.id}`,
    kind: 'farmer_feed' as const,
    body: `${item.farmer} from ${item.country} ${item.update}. ${item.detail}.`,
  }));

  return [...forumDocs, ...marketDocs, ...feedDocs];
}

function scoreDocument(queryTokens: string[], doc: KnowledgeDocument): number {
  const docTokens = unique(tokenize(doc.body));
  if (docTokens.length === 0 || queryTokens.length === 0) {
    return 0;
  }

  const matches = queryTokens.filter((token) =>
    docTokens.includes(token)
  ).length;
  const keywordDensity = matches / queryTokens.length;

  const queryText = queryTokens.join(' ');
  const exactBoost = normalizeText(doc.body).includes(queryText) ? 0.4 : 0;

  const kindBoost =
    doc.kind === 'market_listing'
      ? 0.14
      : doc.kind === 'forum_post'
        ? 0.1
        : 0.08;

  return keywordDensity + exactBoost + kindBoost;
}

export function buildMockKnowledgeContext(query: string, limit = 5): string {
  const queryTokens = unique(tokenize(query));
  const documents = buildKnowledgeDocuments();

  if (queryTokens.length === 0 || documents.length === 0) {
    return '';
  }

  const ranked = documents
    .map((doc) => ({
      doc,
      score: scoreDocument(queryTokens, doc),
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);

  if (ranked.length === 0) {
    return '';
  }

  return ranked
    .map((item, index) => `[Context ${index + 1}] ${item.doc.body}`)
    .join('\n');
}
