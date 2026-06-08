import Link from 'next/link';
import type { Route } from 'next';
import { StatCard } from '@/components/marketplace/cards';

export function DashboardLayout({
  title,
  nav,
  stats,
  children
}: {
  title: string;
  nav: Array<{ href: Route; label: string }>;
  stats?: readonly (readonly [string, string])[];
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-md border border-border bg-card p-3">
        <p className="px-3 py-2 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</p>
        <nav className="grid gap-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm hover:bg-muted">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="grid gap-6">
        {stats ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {stats.map(([label, value]) => <StatCard key={label} label={label} value={value} />)}
          </div>
        ) : null}
        {children}
      </section>
    </div>
  );
}

export function DataPanel({ title, rows }: { title: string; rows: string[] }) {
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 grid gap-3">
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-between rounded-md bg-muted p-3 text-sm">
            <span>{row}</span>
            <button className="font-semibold text-primary">Manage</button>
          </div>
        ))}
      </div>
    </div>
  );
}
