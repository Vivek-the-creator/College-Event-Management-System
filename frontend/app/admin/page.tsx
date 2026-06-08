import { Shell } from '@/components/layout/shell';
import { DashboardLayout, DataPanel } from '@/components/marketplace/dashboard';
import { adminStats } from '@/lib/marketplace-data';

const nav = [
  'Dashboard',
  'Customers',
  'Vendors',
  'Products',
  'Categories',
  'Orders',
  'Reviews',
  'Reports',
  'Payments',
  'Coupons',
  'Banners',
  'CMS',
  'Settings'
].map((label) => ({ label, href: (label === 'Dashboard' ? '/admin' : `/admin/${label.toLowerCase()}`) as never }));

export default function AdminPage() {
  return (
    <Shell>
      <DashboardLayout title="Admin Panel" nav={nav} stats={adminStats}>
        <div className="grid gap-5 lg:grid-cols-2">
          <DataPanel title="Vendor Approval Queue" rows={['Urban Thread Co. pending verification', 'North Craft Studio awaiting documents', 'Gadget Hub approved today']} />
          <DataPanel title="Product Moderation" rows={['12 pending products', '3 rejected listing updates', '42 active products today']} />
        </div>
      </DashboardLayout>
    </Shell>
  );
}
