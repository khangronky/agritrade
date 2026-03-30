'use client';

import { Loader2, PenSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { toast } from 'sonner';
import type { ForumPostCreatedResponse } from './types';

type PostComposerForm = {
  companyName: string;
  author: string;
  headline: string;
  body: string;
  imageSrc: string;
  imageCaption: string;
};

const initialForm: PostComposerForm = {
  companyName: '',
  author: '',
  headline: '',
  body: '',
  imageSrc: '',
  imageCaption: '',
};

export function ForumPostComposer() {
  const router = useRouter();
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<PostComposerForm>(initialForm);

  const updateField = (field: keyof PostComposerForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const companyName = form.companyName.trim();
    const author = form.author.trim();
    const headline = form.headline.trim();
    const body = form.body.trim();

    if (!companyName || !author || !headline || !body) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const imageSrc = form.imageSrc.trim();
    const imageCaption = form.imageCaption.trim();

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          author,
          headline,
          body,
          media: imageSrc
            ? [
                {
                  src: imageSrc,
                  alt: imageCaption || headline,
                  caption: imageCaption || 'Attached image',
                },
              ]
            : [],
        }),
      });

      const data = (await response.json()) as
        | ForumPostCreatedResponse
        | { error?: string; message?: string };

      if (!response.ok) {
        const responseError = 'error' in data ? data.error : undefined;
        throw new Error(
          responseError || data.message || 'Failed to create post'
        );
      }

      toast.success('Post created successfully.');
      setForm(initialForm);
      setIsComposerOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create post'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setIsComposerOpen((current) => !current)}
        className="flex w-full items-center gap-2 rounded-lg border border-lime-200 bg-lime-50 px-3 py-2 text-left text-muted-foreground text-sm hover:border-lime-300"
      >
        <PenSquare className="size-4" />
        {isComposerOpen ? 'Close composer' : 'Share an update'}
      </button>

      {isComposerOpen ? (
        <form
          onSubmit={handleSubmit}
          className="mt-3 space-y-3 rounded-xl border border-lime-200 bg-lime-50 p-3"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-muted-foreground text-xs">
                Company Name *
              </span>
              <input
                value={form.companyName}
                onChange={(event) =>
                  updateField('companyName', event.target.value)
                }
                className="w-full rounded-md border border-lime-200 bg-white px-3 py-2 text-lime-950 text-sm outline-none focus:border-primary"
                placeholder="Example: Mekong Green Cooperative"
                maxLength={120}
                required
              />
            </label>

            <label className="space-y-1">
              <span className="text-muted-foreground text-xs">Author *</span>
              <input
                value={form.author}
                onChange={(event) => updateField('author', event.target.value)}
                className="w-full rounded-md border border-lime-200 bg-white px-3 py-2 text-lime-950 text-sm outline-none focus:border-primary"
                placeholder="Example: Nguyen Van A"
                maxLength={120}
                required
              />
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-muted-foreground text-xs">Headline *</span>
            <input
              value={form.headline}
              onChange={(event) => updateField('headline', event.target.value)}
              className="w-full rounded-md border border-lime-200 bg-white px-3 py-2 text-lime-950 text-sm outline-none focus:border-primary"
              placeholder="What are you selling?"
              maxLength={180}
              required
            />
          </label>

          <label className="block space-y-1">
            <span className="text-muted-foreground text-xs">
              Post Content *
            </span>
            <textarea
              value={form.body}
              onChange={(event) => updateField('body', event.target.value)}
              className="min-h-24 w-full rounded-md border border-lime-200 bg-white px-3 py-2 text-lime-950 text-sm outline-none focus:border-primary"
              placeholder="Quantity, quality, delivery terms, contact details..."
              maxLength={1200}
              required
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-muted-foreground text-xs">Image URL</span>
              <input
                value={form.imageSrc}
                onChange={(event) =>
                  updateField('imageSrc', event.target.value)
                }
                className="w-full rounded-md border border-lime-200 bg-white px-3 py-2 text-lime-950 text-sm outline-none focus:border-primary"
                placeholder="/farm.jpg or https://..."
              />
            </label>

            <label className="space-y-1">
              <span className="text-muted-foreground text-xs">
                Image Caption
              </span>
              <input
                value={form.imageCaption}
                onChange={(event) =>
                  updateField('imageCaption', event.target.value)
                }
                className="w-full rounded-md border border-lime-200 bg-white px-3 py-2 text-lime-950 text-sm outline-none focus:border-primary"
                placeholder="Optional caption"
                maxLength={120}
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsComposerOpen(false)}
              className="rounded-md border border-lime-200 px-3 py-2 text-muted-foreground text-xs hover:bg-lime-100"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 font-semibold text-lime-950 text-xs hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="size-3 animate-spin" />
              ) : null}
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
