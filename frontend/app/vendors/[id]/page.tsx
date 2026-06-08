import { Shell } from '@/components/layout/shell';
import { ProductCard } from '@/components/marketplace/cards';
import { products, vendors } from '@/lib/marketplace-data';

export default async function VendorStorePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vendor = vendors.find((item) => item.id === id) ?? vendors[0]!;
  return <Shell><div><div className="h-72 bg-muted"><img src={vendor.banner} alt={vendor.name} className="h-full w-full object-cover" /></div><div className="mx-auto max-w-7xl px-4 py-8"><h1 className="text-3xl font-semibold">{vendor.name}</h1><p className="mt-2 text-slate-500">{vendor.rating} rating · {vendor.products} products · verified seller</p><h2 className="mt-8 text-2xl font-semibold">Store Products</h2><div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></div></Shell>;
}
