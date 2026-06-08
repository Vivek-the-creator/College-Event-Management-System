import { Shell } from '@/components/layout/shell';
import { ProductCard } from '@/components/marketplace/cards';
import { categories, products, vendors } from '@/lib/marketplace-data';

export default function ProductsPage() {
  return (
    <Shell>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-md border border-border bg-card p-4">
          <h1 className="text-xl font-semibold">Products</h1>
          <div className="mt-5 grid gap-4">
            <input className="h-10 rounded-md border border-border bg-background px-3 text-sm" placeholder="Search products" />
            <select className="h-10 rounded-md border border-border bg-background px-3 text-sm"><option>Sort by latest</option><option>Price low to high</option><option>Top rated</option></select>
            <div><p className="mb-2 text-sm font-medium">Category</p>{categories.map((item) => <label key={item.slug} className="flex gap-2 py-1 text-sm"><input type="checkbox" /> {item.name}</label>)}</div>
            <div><p className="mb-2 text-sm font-medium">Vendor</p>{vendors.map((item) => <label key={item.id} className="flex gap-2 py-1 text-sm"><input type="checkbox" /> {item.name}</label>)}</div>
            <input type="range" min="500" max="10000" />
          </div>
        </aside>
        <section>
          <div className="mb-4 flex items-center justify-between"><p className="text-sm text-slate-500">Showing {products.length} products</p><p className="text-sm font-medium">Page 1 of 1</p></div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div>
        </section>
      </div>
    </Shell>
  );
}
