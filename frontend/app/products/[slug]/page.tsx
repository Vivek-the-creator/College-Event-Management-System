import { Shell } from '@/components/layout/shell';
import { ProductCard } from '@/components/marketplace/cards';
import { products } from '@/lib/marketplace-data';

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug) ?? products[0]!;
  return (
    <Shell>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-4">
          <div className="aspect-square overflow-hidden rounded-md bg-muted"><img src={product.image} alt={product.name} className="h-full w-full object-cover" /></div>
          <div className="grid grid-cols-4 gap-3">{[1, 2, 3, 4].map((item) => <div key={item} className="aspect-square rounded-md border border-border bg-muted" />)}</div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{product.category}</p>
          <h1 className="mt-2 text-4xl font-semibold">{product.name}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Premium quality from {product.vendor}, shipped with marketplace buyer protection.</p>
          <div className="mt-5 flex items-center gap-3"><span className="text-3xl font-semibold">₹{product.price.toLocaleString('en-IN')}</span><span className="text-slate-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span><span>{product.rating} rating</span></div>
          <div className="mt-6 grid gap-3">
            <select className="h-11 rounded-md border border-border bg-background px-3"><option>Default variant</option><option>Large</option><option>Small</option></select>
            <p className="text-sm text-emerald-600">{product.stock} units in stock</p>
            <div className="grid gap-3 sm:grid-cols-3"><button className="rounded-md bg-primary px-5 py-3 font-semibold text-white">Add To Cart</button><button className="rounded-md bg-foreground px-5 py-3 font-semibold text-background">Buy Now</button><button className="rounded-md border border-border px-5 py-3 font-semibold">Wishlist</button></div>
          </div>
          <section className="mt-8 rounded-md border border-border p-4"><h2 className="font-semibold">Vendor Info</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{product.vendor} · verified seller · fast shipment.</p></section>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-12"><h2 className="mb-5 text-2xl font-semibold">Related Products</h2><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map((item) => <ProductCard key={item.slug} product={item} />)}</div></div>
    </Shell>
  );
}
