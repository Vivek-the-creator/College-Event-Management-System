import { Shell } from '@/components/layout/shell';
import { DashboardLayout, DataPanel } from '@/components/marketplace/dashboard';
import { customerStats } from '@/lib/marketplace-data';

const nav = ['Dashboard', 'Orders', 'Wishlist', 'Cart', 'Addresses', 'Reviews', 'Notifications', 'Profile', 'Settings'].map((label) => ({
  label,
  href: (label === 'Dashboard' ? '/customer/dashboard' : label === 'Cart' ? '/cart' : `/customer/${label.toLowerCase()}`) as never
}));

export default function CustomerDashboardPage() {
  return (
    <Shell>
      <DashboardLayout title="Customer" nav={nav} stats={customerStats}>
        <DataPanel title="Recent Activity" rows={['Order #BP-1042 is out for delivery', 'Wishlist item is back in stock', 'Invoice available for last order']} />
      </DashboardLayout>
    </Shell>
  );
}
