import { google } from '@ai-sdk/google';
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
  validateUIMessages,
} from 'ai';
import { NextResponse } from 'next/server';
import { buildMockKnowledgeContext } from '@/lib/chatbot/mock-rag';

const GEMINI_MODEL = 'gemini-2.5-flash';
const MAX_MESSAGES = 12;
const MAX_OUTPUT_TOKENS = 900;

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('')
    .trim();
}

function createSystemPrompt(knowledgeContext: string): string {
  if (knowledgeContext) {
    return `You are AgriTrade Assistant. Use the context below as the primary data source when relevant.

Response rules:
- Reply in the same language as the user's latest message.
- Give a detailed answer with 4-6 bullet points when the question asks for insights or recommendations.
- Include concrete values from the provided context (commodity name, country/region, volume, trend, or price) whenever available.
- End with one short "Data note" sentence describing limits of available mock data.
- Do not end mid-sentence.

Context:
${knowledgeContext}`;
  }

  return `You are AgriTrade Assistant.

Response rules:
- Reply in the same language as the user's latest message.
- Give a detailed answer with 3-5 bullet points.
- If real-time data is missing, clearly state it and still provide practical next steps.
- Do not end mid-sentence.`;
}

function getStreamErrorMessage(error: unknown): string {
  const message =
    error instanceof Error ? error.message : 'Chat service unavailable';
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes('quota') ||
    normalizedMessage.includes('rate limit')
  ) {
    return 'Gemini API key da het quota/khong co quota cho model hien tai. Ban can bat billing hoac doi sang model co quota.';
  }

  return message;
}

export async function POST(request: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { error: 'Missing GOOGLE_GENERATIVE_AI_API_KEY in environment' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const validatedMessages = await validateUIMessages({
      messages: body?.messages,
    });
    const messages = validatedMessages.slice(-MAX_MESSAGES);
    const latestUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === 'user');

    if (!latestUserMessage) {
      return NextResponse.json(
        { error: 'A user message is required' },
        { status: 400 }
      );
    }

    const latestUserText = getMessageText(latestUserMessage);
    if (!latestUserText) {
      return NextResponse.json(
        { error: 'A user message is required' },
        { status: 400 }
      );
    }

    const knowledgeContext = await buildMockKnowledgeContext(latestUserText, 6);
    const modelMessages = await convertToModelMessages(
      messages.map(({ id: _id, ...message }) => message)
    );

    const result = streamText({
      model: google(GEMINI_MODEL),
      system: createSystemPrompt(knowledgeContext),
      messages: modelMessages,
      temperature: 0.4,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      onError: getStreamErrorMessage,
    });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
