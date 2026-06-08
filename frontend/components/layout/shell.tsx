import Link from 'next/link';
import type { Route } from 'next';

const navItems: Array<{ href: Route; label: string }> = [
  { href: '/', label: 'Storefront' },
  { href: '/admin', label: 'Admin' },
  { href: '/vendor', label: 'Vendor' },
  { href: '/account', label: 'Account' }
];

export function Shell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="text-base font-semibold">
            Marketplace
          </Link>
          <nav className="flex gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
