import { Shell } from '@/components/layout/shell';
import { ProductCard, SectionHeader } from '@/components/marketplace/cards';
import { categories, products, reviews, vendors } from '@/lib/marketplace-data';
import Link from 'next/link';

export default function StorefrontPage() {
  return (
    <Shell>
      <section className="bg-muted">
        <div className="mx-auto grid min-h-[520px] max-w-7xl items-center gap-8 px-4 py-10 md:grid-cols-[1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Flash deals live now</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">Shop trusted sellers across one premium marketplace</h1>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              Discover curated products, verified vendors, secure checkout, and role-specific dashboards for customers, sellers, and admins.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/products" className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white">Shop Products</Link>
              <Link href="/signup" className="rounded-md border border-border px-5 py-3 text-sm font-semibold">Become a Seller</Link>
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80" alt="Marketplace checkout" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12">
        <section>
          <SectionHeader title="Featured Products" action="Updated hourly" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </section>
        <section>
          <SectionHeader title="Popular Categories" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="group overflow-hidden rounded-md border border-border bg-card">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={category.image} alt={category.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{category.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="grid gap-6 rounded-md bg-foreground p-6 text-background md:grid-cols-3">
          {['Flash Deals', 'Best Sellers', 'New Arrivals'].map((label, index) => (
            <div key={label} className="rounded-md border border-background/20 p-5">
              <p className="text-sm uppercase tracking-wide opacity-70">{label}</p>
              <p className="mt-2 text-2xl font-semibold">{index === 0 ? 'Up to 45% off' : index === 1 ? 'Top rated picks' : 'Fresh drops daily'}</p>
            </div>
          ))}
        </section>
        <section>
          <SectionHeader title="Top Vendors" />
          <div className="grid gap-5 md:grid-cols-3">
            {vendors.map((vendor) => (
              <Link key={vendor.id} href={`/vendors/${vendor.id}`} className="overflow-hidden rounded-md border border-border bg-card">
                <div className="aspect-[16/7] bg-muted"><img src={vendor.banner} alt={vendor.name} className="h-full w-full object-cover" /></div>
                <div className="p-4"><h3 className="font-semibold">{vendor.name}</h3><p className="mt-1 text-sm text-slate-500">{vendor.rating} rating · {vendor.products} products</p></div>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <SectionHeader title="Customer Reviews" />
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-md border border-border bg-card p-5">
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{review.text}</p>
                <p className="mt-4 font-semibold">{review.name}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="rounded-md border border-border bg-card p-6">
          <h2 className="text-2xl font-semibold">Newsletter</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input className="min-h-11 flex-1 rounded-md border border-border bg-background px-3" placeholder="Email address" />
            <button className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white">Subscribe</button>
          </div>
        </section>
      </div>
    </Shell>
  );
}
