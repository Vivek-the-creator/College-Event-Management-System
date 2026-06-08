import { OperationalPage } from '@/components/marketplace/operational-page';

export default function VendorAnalyticsPage() {
  return <OperationalPage title="Vendor Analytics" description="Revenue, orders, customers, and product performance charts." actions={['Revenue', 'Orders', 'Customers', 'Products']} rows={['Revenue trend · ₹2.8L', 'Orders trend · 386', 'Top product · AeroFit Running Shoes']} />;
}
