'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLoginMutation } from '@/lib/api/auth';
import { type LoginSchema, loginSchema } from '@/lib/schema/auth';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/dashboard';
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLoginMutation();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginSchema) {
    try {
      await loginMutation.mutateAsync(data);
      toast.success('Login successful!');
      router.push(returnUrl);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
    }
  }

  return (
    <Card className="border-[#d0e6af] bg-white shadow-[0_12px_24px_rgba(127,181,44,0.12)]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-[#1f3800]">Welcome Back</CardTitle>
        <CardDescription className="text-[#546a39]">
          Sign in to your AgriTrade account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#365608]">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="border-[#d3e9b4] bg-[#f9fef0] text-[#1f3800] focus-visible:border-[#9dcb4a] focus-visible:ring-[#9dcb4a]/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-[#365608]">Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-[#4e820f] text-sm transition-colors hover:text-[#3d670d] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="border-[#d3e9b4] bg-[#f9fef0] pr-10 text-[#1f3800] focus-visible:border-[#9dcb4a] focus-visible:ring-[#9dcb4a]/30"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0 h-full px-3 text-[#6e7f5a] hover:bg-transparent hover:text-[#365608]"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-brand-lime font-semibold text-[#1d3706] transition-colors hover:bg-brand-lime/90"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-[#d7e7c2] border-t pt-6">
        <p className="text-[#546a39] text-sm">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-medium text-[#3d670d] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
