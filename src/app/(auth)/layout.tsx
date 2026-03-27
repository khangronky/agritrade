import { AuthNavbar } from '@/components/auth/auth-navbar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-lime-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(184,221,134,0.22),transparent_40%),radial-gradient(circle_at_86%_82%,rgba(155,203,74,0.18),transparent_36%)]" />
      <AuthNavbar />
      <main className="relative flex min-h-screen items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
