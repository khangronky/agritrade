import { NextResponse } from 'next/server';
import { usernameAvailabilitySchema } from '@/lib/schema/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const parsed = usernameAvailabilitySchema.safeParse({
      username: searchParams.get('username') ?? '',
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid username' },
        { status: 400 }
      );
    }

    const { username } = parsed.data;

    const { data: existingUser, error } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .neq('id', authUser.id)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      available: !existingUser,
      username,
    });
  } catch (error) {
    console.error('Username availability error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
