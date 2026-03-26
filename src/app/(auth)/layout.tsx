import { AuthNavbar } from '@/components/auth/auth-navbar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-zinc-950 via-zinc-950 to-zinc-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(16,185,129,0.18),transparent_40%),radial-gradient(circle_at_86%_85%,rgba(161,224,16,0.2),transparent_36%)]" />
      <AuthNavbar />
      <main className="relative flex min-h-screen items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
