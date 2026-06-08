import { OperationalPage } from '@/components/marketplace/operational-page';

export default function AdminOrdersPage() {
  return <OperationalPage title="Orders" description="Monitor all customer orders, vendor packages, payment states, returns, and fulfilment exceptions." actions={['Monitor', 'Export Orders']} rows={['#BP-2081 · Pending vendor acceptance', '#BP-2074 · Shipped', '#BP-2060 · Payment failed']} />;
}
