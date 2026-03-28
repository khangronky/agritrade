'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { DEV_MODE } from '@/constants/common';
import {
  useRegisterMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
} from '@/lib/api/auth';
import { type RegisterSchema, registerSchema } from '@/lib/schema/auth';

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const registerMutation = useRegisterMutation();
  const verifyOtpMutation = useVerifyOtpMutation();
  const resendOtpMutation = useResendOtpMutation();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  async function onSubmit(data: RegisterSchema) {
    try {
      const response = await registerMutation.mutateAsync(data);
      setEmail(data.email);

      if (response.requiresVerification) {
        setOtpSent(true);
        setCooldown(60);
        toast.success('Verification code sent to your email');
        if (DEV_MODE) {
          window.open('http://localhost:8004', '_blank');
        }
      } else {
        toast.success('Registration successful!');
        router.push('/login');
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to register'
      );
    }
  }

  async function handleVerifyOtp() {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    try {
      await verifyOtpMutation.mutateAsync({ email, otp });
      toast.success('Email verified successfully!');
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Invalid verification code'
      );
    }
  }

  async function handleResendOtp() {
    try {
      await resendOtpMutation.mutateAsync({ email });
      setCooldown(60);
      toast.success('Verification code resent');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to resend code'
      );
    }
  }

  if (otpSent) {
    return (
      <Card className="border-lime-200 bg-white shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-lime-950">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            We sent a verification code to{' '}
            <span className="font-medium text-lime-950">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              className="gap-2"
            >
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className="h-11 w-11 border-lime-200 bg-lime-50 text-lime-950 data-[active=true]:border-primary data-[active=true]:ring-ring/30"
                />
                <InputOTPSlot
                  index={1}
                  className="h-11 w-11 border-lime-200 bg-lime-50 text-lime-950 data-[active=true]:border-primary data-[active=true]:ring-ring/30"
                />
                <InputOTPSlot
                  index={2}
                  className="h-11 w-11 border-lime-200 bg-lime-50 text-lime-950 data-[active=true]:border-primary data-[active=true]:ring-ring/30"
                />
                <InputOTPSlot
                  index={3}
                  className="h-11 w-11 border-lime-200 bg-lime-50 text-lime-950 data-[active=true]:border-primary data-[active=true]:ring-ring/30"
                />
                <InputOTPSlot
                  index={4}
                  className="h-11 w-11 border-lime-200 bg-lime-50 text-lime-950 data-[active=true]:border-primary data-[active=true]:ring-ring/30"
                />
                <InputOTPSlot
                  index={5}
                  className="h-11 w-11 border-lime-200 bg-lime-50 text-lime-950 data-[active=true]:border-primary data-[active=true]:ring-ring/30"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {DEV_MODE && otpSent && (
            <Link href="http://localhost:8004" target="_blank">
              <Button variant="outline" className="mb-4 w-full">
                <Mail size={18} className="mr-1" />
                Open Inbucket
              </Button>
            </Link>
          )}
          <Button
            className="w-full bg-brand-lime font-semibold text-lime-950 transition-colors hover:bg-brand-lime/90"
            onClick={handleVerifyOtp}
            disabled={verifyOtpMutation.isPending || otp.length !== 6}
          >
            {verifyOtpMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </Button>
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Didn&apos;t receive the code?{' '}
              {cooldown > 0 ? (
                <span className="text-muted-foreground">
                  Resend in {cooldown}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendOtpMutation.isPending}
                  className="font-medium text-lime-700 hover:underline disabled:opacity-50"
                >
                  {resendOtpMutation.isPending ? 'Sending...' : 'Resend'}
                </button>
              )}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-lime-200 border-t pt-6">
          <button
            type="button"
            onClick={() => setOtpSent(false)}
            className="text-muted-foreground text-sm hover:text-primary hover:underline"
          >
            Use a different email
          </button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-lime-200 bg-white shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-lime-950">Create Account</CardTitle>
        <CardDescription className="text-muted-foreground">
          Get started with AgriTrade
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
                  <FormLabel className="text-lime-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="border-lime-200 bg-lime-50 text-lime-950 focus-visible:border-primary focus-visible:ring-ring/30"
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
                  <FormLabel className="text-lime-700">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        className="border-lime-200 bg-lime-50 pr-10 text-lime-950 focus-visible:border-primary focus-visible:ring-ring/30"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0 h-full px-3 text-muted-foreground hover:bg-transparent hover:text-primary"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lime-700">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        className="border-lime-200 bg-lime-50 pr-10 text-lime-950 focus-visible:border-primary focus-visible:ring-ring/30"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0 h-full px-3 text-muted-foreground hover:bg-transparent hover:text-primary"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
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
            <p className="text-muted-foreground text-xs">
              Password must be at least 8 characters with uppercase, lowercase,
              number, and special character.
            </p>
            <Button
              type="submit"
              className="w-full bg-brand-lime font-semibold text-lime-950 transition-colors hover:bg-brand-lime/90"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-lime-200 border-t pt-6">
        <p className="text-muted-foreground text-sm">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-lime-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
