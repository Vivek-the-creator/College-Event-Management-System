import Link from 'next/link';
import type { Route } from 'next';
import { Heart, Menu, Search, ShoppingCart, Store, UserRound } from 'lucide-react';

const navItems: Array<{ href: Route; label: string }> = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/vendors', label: 'Vendors' },
  { href: '/admin', label: 'Admin' },
  { href: '/vendor/dashboard', label: 'Seller' }
];

export function Shell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
          <Link href="/" className="flex items-center gap-2 text-base font-semibold">
            <span className="grid size-9 place-items-center rounded-md bg-primary text-white">
              <Store size={19} />
            </span>
            BazaarPro
          </Link>
          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-muted dark:text-slate-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <Link href="/search" className="grid size-10 place-items-center rounded-md hover:bg-muted" aria-label="Search">
              <Search size={19} />
            </Link>
            <Link href="/customer/wishlist" className="grid size-10 place-items-center rounded-md hover:bg-muted" aria-label="Wishlist">
              <Heart size={19} />
            </Link>
            <Link href="/cart" className="grid size-10 place-items-center rounded-md hover:bg-muted" aria-label="Cart">
              <ShoppingCart size={19} />
            </Link>
            <Link href="/login" className="hidden items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background sm:flex">
              <UserRound size={17} />
              Login
            </Link>
            <button className="grid size-10 place-items-center rounded-md hover:bg-muted md:hidden" aria-label="Menu">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
