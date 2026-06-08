import { Shell } from '@/components/layout/shell';

export default function StorefrontPage() {
  return (
    <Shell>
      <section className="grid gap-6">
        <div>
          <h1 className="text-3xl font-semibold">Storefront</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">Browse products, stores, and offers.</p>
        </div>
      </section>
    </Shell>
  );
}
