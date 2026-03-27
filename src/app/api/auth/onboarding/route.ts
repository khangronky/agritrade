import { NextResponse } from 'next/server';
import { onboardingDraftSchema } from '@/lib/schema/onboarding';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*, user_profile(full_name)')
      .eq('id', authUser.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Get onboarding status error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parsed = onboardingDraftSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request payload' },
        { status: 400 }
      );
    }

    const { full_name, role, onboarding_step } = parsed.data;
    const userUpdates = Object.fromEntries(
      Object.entries({ role, onboarding_step }).filter(
        ([, value]) => value !== undefined
      )
    );

    if (full_name === undefined && Object.keys(userUpdates).length === 0) {
      return NextResponse.json(
        { error: 'No onboarding fields provided' },
        { status: 400 }
      );
    }

    if (full_name !== undefined) {
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
    }

    if (Object.keys(userUpdates).length > 0) {
      const { error: updateError } = await supabase
        .from('users')
        .update(userUpdates)
        .eq('id', authUser.id)
        .select('id')
        .single();

      if (updateError) {
        return NextResponse.json(
          { error: updateError.message },
          { status: 500 }
        );
      }
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*, user_profile(full_name)')
      .eq('id', authUser.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Update onboarding progress error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
