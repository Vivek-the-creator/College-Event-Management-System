import { Shell } from '@/components/layout/shell';
import { DashboardLayout, DataPanel } from '@/components/marketplace/dashboard';
import { vendorStats } from '@/lib/marketplace-data';

const nav = ['Dashboard', 'Products', 'Orders', 'Customers', 'Coupons', 'Analytics', 'Reviews', 'Withdrawals', 'Store Settings', 'Profile'].map((label) => ({
  label,
  href: (label === 'Dashboard' ? '/vendor/dashboard' : label === 'Store Settings' ? '/vendor/store' : `/vendor/${label.toLowerCase()}`) as never
}));

export default function VendorDashboardPage() {
  return (
    <Shell>
      <DashboardLayout title="Vendor" nav={nav} stats={vendorStats}>
        <div className="grid gap-5 lg:grid-cols-2">
          <DataPanel title="Orders Management" rows={['Accept order #BP-2081', 'Update shipment for #BP-2074', 'Review rejected payment #BP-2060']} />
          <DataPanel title="Product Tasks" rows={['Publish 4 draft products', 'Restock 9 low inventory SKUs', 'Respond to 3 product reviews']} />
        </div>
      </DashboardLayout>
    </Shell>
  );
}
