import Link from 'next/link';
import { Shell } from '@/components/layout/shell';
import { categories } from '@/lib/marketplace-data';

export default function CategoriesPage() {
  return <Shell><div className="mx-auto max-w-7xl px-4 py-8"><h1 className="text-3xl font-semibold">Categories</h1><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{categories.map((category) => <Link key={category.slug} href={`/categories/${category.slug}`} className="overflow-hidden rounded-md border border-border bg-card"><div className="aspect-[4/3]"><img src={category.image} alt={category.name} className="h-full w-full object-cover" /></div><div className="p-4"><h2 className="font-semibold">{category.name}</h2><p className="text-sm text-slate-500">{category.count} products</p></div></Link>)}</div></div></Shell>;
}
