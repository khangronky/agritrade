import { NextResponse } from 'next/server';
import { onboardingCompleteSchema } from '@/lib/schema/onboarding';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parsed = onboardingCompleteSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request payload' },
        { status: 400 }
      );
    }

    const { full_name, role } = parsed.data;

    const { error: profileError } = await supabase
      .from('user_profile')
      .update({
        full_name: full_name,
      })
      .eq('user_id', authUser.id);

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    const { error } = await supabase
      .from('users')
      .update({
        role,
        onboarding_status: 'completed',
        onboarding_step: 3,
        onboarding_completed_at: new Date().toISOString(),
      })
      .eq('id', authUser.id)
      .select('id')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*, user_profile(full_name)')
      .eq('id', authUser.id)
      .single();

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Onboarding completed successfully',
      user,
    });
  } catch (error) {
    console.error('Complete onboarding error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
