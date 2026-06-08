import { OperationalPage } from '@/components/marketplace/operational-page';

export default function VendorWithdrawalsPage() {
  return <OperationalPage title="Withdrawals" description="Request seller payouts and review withdrawal history." actions={['Request Withdrawal']} rows={['₹45,000 · Pending', '₹28,500 · Completed', '₹18,000 · Processing']} />;
}
