import { Shell } from '@/components/layout/shell';

const modules = [
  'Users',
  'Vendors',
  'Stores',
  'Categories',
  'Attributes',
  'Products',
  'Orders',
  'Commissions',
  'CMS',
  'Homepage',
  'Roles',
  'Reports'
];

export default function AdminPage() {
  return (
    <Shell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
        <p className="mt-2 text-sm text-slate-600">Marketplace operations and configuration.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((module) => (
          <div key={module} className="rounded-md border border-border bg-card p-4">
            <h2 className="text-sm font-medium">{module}</h2>
          </div>
        ))}
      </div>
    </Shell>
  );
}
