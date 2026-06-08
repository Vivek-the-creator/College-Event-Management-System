import Link from 'next/link';
import { ShieldCheck, Store, UserRound } from 'lucide-react';

const roles = [
  { label: 'Customer', icon: UserRound, copy: 'Shop, track orders, manage wishlist.' },
  { label: 'Vendor', icon: Store, copy: 'Sell products, manage store, view analytics.' },
  { label: 'Admin', icon: ShieldCheck, copy: 'Moderate vendors, products, orders, CMS.' }
];

export function RoleCards() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {roles.map((role) => {
        const Icon = role.icon;
        return (
          <label key={role.label} className="cursor-pointer rounded-md border border-border bg-card p-4 hover:border-primary">
            <input name="role" type="radio" className="sr-only" />
            <Icon size={22} className="text-primary" />
            <p className="mt-3 font-semibold">{role.label}</p>
            <p className="mt-1 text-sm text-slate-500">{role.copy}</p>
          </label>
        );
      })}
    </div>
  );
}

export function AuthShell({ mode, children }: { mode: 'login' | 'signup'; children: React.ReactNode }) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{mode === 'login' ? 'Welcome back' : 'Create account'}</p>
        <h1 className="mt-3 text-4xl font-semibold">{mode === 'login' ? 'Login to your marketplace workspace' : 'Choose your role and start selling or shopping'}</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">JWT auth, refresh sessions, remember me, email verification, and role protected routes are wired into the backend foundation.</p>
        <p className="mt-6 text-sm">{mode === 'login' ? 'New here?' : 'Already have an account?'} <Link href={mode === 'login' ? '/signup' : '/login'} className="font-semibold text-primary">{mode === 'login' ? 'Create an account' : 'Login'}</Link></p>
      </div>
      <div className="rounded-md border border-border bg-card p-5">{children}</div>
    </div>
  );
}
