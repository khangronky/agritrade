import { google } from '@ai-sdk/google';
import { cosineSimilarity, embed, embedMany } from 'ai';
import { initialFarmerFeed } from '@/app/(marketing)/farmer-yield-feed-data';
import { listings } from '@/app/(marketing)/market/data';
import { listForumPosts } from '@/lib/forum/posts-store';

type KnowledgeDocument = {
  id: string;
  body: string;
  kind: 'forum_post' | 'market_listing' | 'farmer_feed';
};

type EmbeddedKnowledgeCorpus = {
  fingerprint: string;
  documents: KnowledgeDocument[];
  embeddings: number[][];
};

const GEMINI_EMBEDDING_MODEL = 'gemini-embedding-001';

function createCorpusFingerprint(documents: KnowledgeDocument[]): string {
  return documents.map((doc) => `${doc.id}:${doc.body}`).join('\n');
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

let cachedEmbeddedCorpus: EmbeddedKnowledgeCorpus | null = null;
let embeddedCorpusPromise: Promise<EmbeddedKnowledgeCorpus> | null = null;
let embeddedCorpusFingerprint: string | null = null;

async function getEmbeddedKnowledgeCorpus(): Promise<EmbeddedKnowledgeCorpus> {
  const documents = buildKnowledgeDocuments();
  const fingerprint = createCorpusFingerprint(documents);

  if (cachedEmbeddedCorpus?.fingerprint === fingerprint) {
    return cachedEmbeddedCorpus;
  }

  if (
    embeddedCorpusPromise !== null &&
    embeddedCorpusFingerprint === fingerprint
  ) {
    return embeddedCorpusPromise;
  }

  embeddedCorpusFingerprint = fingerprint;
  embeddedCorpusPromise = (async () => {
    const result = await embedMany({
      model: google.embedding(GEMINI_EMBEDDING_MODEL),
      values: documents.map((doc) => doc.body),
      maxParallelCalls: 4,
    });

    const corpus = {
      fingerprint,
      documents,
      embeddings: result.embeddings,
    } satisfies EmbeddedKnowledgeCorpus;

    cachedEmbeddedCorpus = corpus;
    return corpus;
  })();

  try {
    return await embeddedCorpusPromise;
  } catch (error) {
    embeddedCorpusPromise = null;
    embeddedCorpusFingerprint = null;
    throw error;
  }
}

export async function buildMockKnowledgeContext(
  query: string,
  limit = 5
): Promise<string> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return '';
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return '';
  }

  try {
    const [{ embedding: queryEmbedding }, corpus] = await Promise.all([
      embed({
        model: google.embedding(GEMINI_EMBEDDING_MODEL),
        value: trimmedQuery,
      }),
      getEmbeddedKnowledgeCorpus(),
    ]);

    const ranked = corpus.documents
      .map((doc, index) => ({
        doc,
        score: cosineSimilarity(queryEmbedding, corpus.embeddings[index] ?? []),
      }))
      .filter((item) => Number.isFinite(item.score) && item.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, limit);

    if (ranked.length === 0) {
      return '';
    }

    return ranked
      .map((item, index) => `[Context ${index + 1}] ${item.doc.body}`)
      .join('\n');
  } catch (error) {
    console.error('Embedding-based knowledge retrieval failed:', error);
    return '';
  }
}
