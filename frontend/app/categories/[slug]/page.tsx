import { Shell } from '@/components/layout/shell';
import { ProductCard } from '@/components/marketplace/cards';
import { categories, products } from '@/lib/marketplace-data';

export default async function CategoryDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug) ?? categories[0]!;
  const filtered = products.filter((product) => product.category === category.name);
  return <Shell><div className="mx-auto max-w-7xl px-4 py-8"><h1 className="text-3xl font-semibold">{category.name}</h1><p className="mt-2 text-slate-500">{category.count} products available</p><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{(filtered.length ? filtered : products).map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></Shell>;
}
