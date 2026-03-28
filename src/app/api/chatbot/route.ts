import { NextResponse } from 'next/server';

type ChatRole = 'user' | 'assistant';

type IncomingMessage = {
  role: ChatRole;
  content: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash';
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1_000;

function normalizeMessages(payload: unknown): IncomingMessage[] {
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload
    .map((item) => {
      if (typeof item !== 'object' || item === null) {
        return null;
      }

      const role = 'role' in item ? item.role : null;
      const content = 'content' in item ? item.content : null;

      if (
        (role !== 'user' && role !== 'assistant') ||
        typeof content !== 'string'
      ) {
        return null;
      }

      const trimmed = content.trim();
      if (!trimmed) {
        return null;
      }

      return {
        role,
        content: trimmed.slice(0, MAX_MESSAGE_LENGTH),
      } as IncomingMessage;
    })
    .filter((item): item is IncomingMessage => item !== null)
    .slice(-MAX_MESSAGES);
}

function extractText(response: GeminiResponse): string | null {
  const parts = response.candidates?.[0]?.content?.parts ?? [];
  const text = parts
    .map((part) => (typeof part.text === 'string' ? part.text : ''))
    .join('')
    .trim();

  return text.length > 0 ? text : null;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing GOOGLE_API_KEY in environment' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const messages = normalizeMessages(body?.messages);

    if (
      messages.length === 0 ||
      messages[messages.length - 1]?.role !== 'user'
    ) {
      return NextResponse.json(
        { error: 'A user message is required' },
        { status: 400 }
      );
    }

    const providerResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: messages.map((message) => ({
            role: message.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: message.content }],
          })),
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 400,
          },
        }),
      }
    );

    if (!providerResponse.ok) {
      const providerError = await providerResponse.text();
      console.error('Chatbot provider error:', providerError);

      let providerMessage = 'Chat service is unavailable';
      try {
        const parsed = JSON.parse(providerError) as {
          error?: { message?: string };
        };
        if (parsed.error?.message) {
          providerMessage = parsed.error.message;
        }
      } catch {
        if (providerError.trim().length > 0) {
          providerMessage = providerError;
        }
      }

      const isQuotaError =
        providerMessage.toLowerCase().includes('quota') ||
        providerMessage.toLowerCase().includes('rate limit');

      if (isQuotaError) {
        return NextResponse.json(
          {
            error:
              'Gemini API key da het quota/khong co quota cho model hien tai. Ban can bat billing hoac doi sang model co quota.',
            details: providerMessage,
          },
          { status: 429 }
        );
      }

      return NextResponse.json({ error: providerMessage }, { status: 502 });
    }

    const json = (await providerResponse.json()) as GeminiResponse;
    const reply = extractText(json);

    if (!reply) {
      return NextResponse.json(
        { error: 'Chat service returned an empty reply' },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
