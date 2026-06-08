import { Shell } from '@/components/layout/shell';
import { ProductCard } from '@/components/marketplace/cards';
import { products } from '@/lib/marketplace-data';

export default function SearchPage() {
  return <Shell><div className="mx-auto max-w-7xl px-4 py-8"><h1 className="text-3xl font-semibold">Advanced Search</h1><div className="mt-5 grid gap-3 rounded-md border border-border bg-card p-4 md:grid-cols-4"><input className="h-11 rounded-md border border-border bg-background px-3" placeholder="Search keyword" /><select className="h-11 rounded-md border border-border bg-background px-3"><option>All categories</option></select><select className="h-11 rounded-md border border-border bg-background px-3"><option>Any rating</option></select><button className="rounded-md bg-primary px-4 font-semibold text-white">Search</button></div><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></Shell>;
}
