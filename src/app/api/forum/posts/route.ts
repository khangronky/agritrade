import { NextResponse } from 'next/server';
import type { CreateForumPostInput } from '@/app/(marketing)/forum/types';
import { createForumPost, listForumPosts } from '@/lib/forum/posts-store';

export const dynamic = 'force-dynamic';

type CreatePostPayload = Partial<CreateForumPostInput>;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidCreatePayload(
  payload: CreatePostPayload
): payload is CreateForumPostInput {
  return (
    isNonEmptyString(payload.companyName) &&
    isNonEmptyString(payload.author) &&
    isNonEmptyString(payload.headline) &&
    isNonEmptyString(payload.body)
  );
}

export async function GET() {
  try {
    return NextResponse.json(
      { posts: listForumPosts() },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('List forum posts error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload: CreatePostPayload = await request.json();

    if (!isValidCreatePayload(payload)) {
      return NextResponse.json(
        { error: 'companyName, author, headline, and body are required' },
        { status: 400 }
      );
    }

    const post = createForumPost(payload);

    return NextResponse.json(
      {
        message: 'Forum post created successfully',
        post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create forum post error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
