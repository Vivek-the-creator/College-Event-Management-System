import Link from 'next/link';
import { Shell } from '@/components/layout/shell';
import { vendors } from '@/lib/marketplace-data';

export default function VendorsPage() {
  return <Shell><div className="mx-auto max-w-7xl px-4 py-8"><h1 className="text-3xl font-semibold">Vendors</h1><div className="mt-6 grid gap-5 md:grid-cols-3">{vendors.map((vendor) => <Link key={vendor.id} href={`/vendors/${vendor.id}`} className="overflow-hidden rounded-md border border-border bg-card"><div className="aspect-[16/7]"><img src={vendor.banner} alt={vendor.name} className="h-full w-full object-cover" /></div><div className="p-4"><h2 className="font-semibold">{vendor.name}</h2><p className="text-sm text-slate-500">{vendor.rating} rating · {vendor.products} products</p></div></Link>)}</div></div></Shell>;
}
