'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { Headset, SendHorizonal, Sparkles, X } from 'lucide-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

const quickPrompts = [
  'What crop has strong demand this week?',
  'How can I price coffee beans better?',
  'Give me 3 export-readiness tips for farmers.',
];
const assistantGreeting =
  'Hi, I am AgriTrade Assistant. Ask me anything about market demand, pricing, and trade decisions.';

const initialAssistantMessage: UIMessage = {
  id: 'agritrade-assistant-intro',
  role: 'assistant',
  parts: [
    {
      type: 'text',
      text: assistantGreeting,
    },
  ],
};

const chatbotTransport = new DefaultChatTransport<UIMessage>({
  api: '/api/chatbot',
});

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('')
    .trim();
}

export function FloatingChatbot() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, error, clearError } = useChat({
    transport: chatbotTransport,
    messages: [initialAssistantMessage],
  });

  const isSubmitting = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    const supabase = createClient();

    async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsAuthenticated(Boolean(user));
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const latestMessage = messages[messages.length - 1];
    if (!latestMessage && !isSubmitting) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSubmitting, isOpen]);

  async function submitMessage(content: string) {
    if (!content || isSubmitting) {
      return;
    }

    clearError();
    setInput('');
    await sendMessage({ text: content });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitMessage(input.trim());
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <div
        className={cn(
          'pointer-events-auto w-[24rem] overflow-hidden rounded-2xl border border-lime-200 bg-card shadow-[0_24px_80px_-40px_oklch(0.35_0.08_130)] transition-all duration-200',
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'invisible translate-y-2 opacity-0'
        )}
      >
        <div className="border-lime-200 border-b bg-linear-to-r from-lime-100 via-lime-50 to-brand-yellow/40 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="inline-flex size-7 items-center justify-center rounded-lg bg-lime-200 text-lime-900">
                <Sparkles className="size-4" />
              </div>
              <div>
                <p className="font-semibold text-primary text-sm">
                  AgriTrade Assistant
                </p>
                <p className="text-lime-800 text-xs">Public market helper</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex size-7 items-center justify-center rounded-md text-lime-800 transition-colors hover:bg-lime-200"
              aria-label="Close chat panel"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div className="max-h-96 space-y-3 overflow-y-auto bg-background px-4 py-4">
          {messages.map((message) => {
            const text = getMessageText(message);

            if (!text) {
              return null;
            }

            return (
              <div
                key={message.id}
                className={cn(
                  'w-fit max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed',
                  message.role === 'assistant'
                    ? 'border border-lime-200 bg-lime-50 text-lime-950'
                    : 'ml-auto bg-primary text-primary-foreground'
                )}
              >
                {text}
              </div>
            );
          })}

          {messages.length <= 1 && !isSubmitting ? (
            <div className="space-y-2 pt-1">
              <p className="text-muted-foreground text-xs">Quick prompts</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void submitMessage(prompt)}
                    className="rounded-full border border-lime-300 bg-lime-100 px-2.5 py-1 text-lime-900 text-xs transition-colors hover:bg-lime-200"
                    disabled={isSubmitting}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {isSubmitting ? (
            <div className="inline-flex items-center gap-2 rounded-2xl border border-lime-200 bg-lime-50 px-3 py-2 text-lime-900 text-sm">
              <span className="size-1.5 animate-pulse rounded-full bg-lime-700" />
              Thinking...
            </div>
          ) : null}

          {error ? (
            <p className="text-destructive text-xs leading-relaxed">
              {error.message ||
                'Could not connect to the chatbot right now. Please try again.'}
            </p>
          ) : null}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-lime-200 border-t bg-card px-3 py-3"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask market questions..."
              className="h-10 flex-1 rounded-xl border border-lime-300 bg-background px-3 text-sm outline-none ring-0 transition-colors placeholder:text-muted-foreground focus:border-primary"
              disabled={isSubmitting}
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={isSubmitting || input.trim().length === 0}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-lime-300 bg-brand-yellow text-primary transition-colors hover:bg-yellow-200 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              <SendHorizonal className="size-4" />
            </button>
          </div>
        </form>
      </div>

      <button
        type="button"
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
        onClick={() => setIsOpen((prev) => !prev)}
        className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-lime-300 bg-brand-yellow text-primary shadow-[0_10px_24px_-14px_oklch(0.4_0.1_120)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-14px_oklch(0.35_0.09_120)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {isOpen ? <X className="size-6" /> : <Headset className="size-6" />}
      </button>
    </div>
  );
}
