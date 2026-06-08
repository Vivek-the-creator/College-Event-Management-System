import Link from 'next/link';
import { Star, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Product = {
  name: string;
  slug: string;
  category: string;
  vendor: string;
  price: number;
  oldPrice: number;
  rating: number;
  image: string;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-md border border-border bg-card">
      <Link href={`/products/${product.slug}`} className="block aspect-[4/3] overflow-hidden bg-muted">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
      </Link>
      <div className="grid gap-3 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-primary">{product.category}</p>
          <Link href={`/products/${product.slug}`} className="mt-1 block text-base font-semibold">
            {product.name}
          </Link>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
            <Store size={14} /> {product.vendor}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="ml-2 text-sm text-slate-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium">
            <Star size={15} fill="currentColor" className="text-amber-500" /> {product.rating}
          </span>
        </div>
        <Button className="w-full">Add to Cart</Button>
      </div>
    </article>
  );
}

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

export function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {action ? <span className="text-sm font-medium text-primary">{action}</span> : null}
    </div>
  );
}
