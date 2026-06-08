import { OperationalPage } from '@/components/marketplace/operational-page';

export default function AdminCustomersPage() {
  return <OperationalPage title="Customers" description="View customer profiles, order history, addresses, and account status." actions={['Export Customers', 'Suspend Account']} rows={['Ananya Rao · Active · 28 orders', 'Rahul Mehta · Active · 12 orders', 'Priya Shah · Verification pending']} />;
}
