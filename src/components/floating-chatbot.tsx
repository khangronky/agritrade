'use client';

import { Headset, X } from 'lucide-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

function createMessage(
  role: ChatMessage['role'],
  content: string
): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
  };
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage(
      'assistant',
      'Xin chao, toi la AgriTrade Assistant. Hay nhan Send de bat dau.'
    ),
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();

    if (!content || isSubmitting) {
      return;
    }

    const nextUserMessage = createMessage('user', content);
    const nextMessages = [...messages, nextUserMessage];

    setMessages(nextMessages);
    setInput('');
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const payload = (await response.json()) as {
        error?: string;
        reply?: string;
      };

      if (!response.ok || typeof payload.reply !== 'string') {
        throw new Error(payload.error ?? 'Chat service unavailable');
      }

      const reply = payload.reply;
      setMessages((prev) => [...prev, createMessage('assistant', reply)]);
    } catch (error) {
      console.error('Chatbot request failed:', error);
      const errorText =
        error instanceof Error
          ? error.message
          : 'Khong the ket noi chat bot luc nay. Vui long thu lai.';
      setErrorMessage(errorText);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <div
        className={cn(
          'pointer-events-auto w-[22rem] overflow-hidden border border-lime-200 bg-card shadow-xl transition-all duration-200',
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'invisible translate-y-2 opacity-0'
        )}
      >
        <div className="flex items-center justify-between border-lime-200 border-b bg-lime-50 px-4 py-3">
          <p className="font-semibold text-primary text-sm">
            AgriTrade Assistant
          </p>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex size-7 items-center justify-center rounded-md text-lime-800 transition-colors hover:bg-lime-200"
            aria-label="Close chat panel"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="max-h-80 space-y-3 overflow-y-auto bg-background px-4 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'w-fit max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed',
                message.role === 'assistant'
                  ? 'bg-lime-100 text-lime-950'
                  : 'ml-auto bg-primary text-primary-foreground'
              )}
            >
              {message.content}
            </div>
          ))}

          {isSubmitting ? (
            <div className="w-fit rounded-xl bg-lime-100 px-3 py-2 text-lime-800 text-sm">
              Thinking...
            </div>
          ) : null}

          {errorMessage ? (
            <p className="text-destructive text-xs">{errorMessage}</p>
          ) : null}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex gap-2 border-lime-200 border-t bg-card px-3 py-3"
        >
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about market demand..."
            className="h-10 flex-1 rounded-lg border border-lime-300 bg-background px-3 text-sm outline-none ring-0 transition-colors placeholder:text-muted-foreground focus:border-primary"
            disabled={isSubmitting}
            maxLength={1000}
          />
          <button
            type="submit"
            disabled={isSubmitting || input.trim().length === 0}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-lime-300 bg-brand-yellow px-3 font-semibold text-primary text-xs transition-colors hover:bg-yellow-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
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
