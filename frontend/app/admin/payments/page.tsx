import { OperationalPage } from '@/components/marketplace/operational-page';

export default function AdminPaymentsPage() {
  return <OperationalPage title="Payments" description="Review Razorpay, Stripe, COD, refunds, and payment reconciliation." actions={['Reconcile', 'Refund', 'Export Payments']} rows={['Razorpay · Captured · ₹3,499', 'Stripe · Authorized · ₹2,299', 'COD · Pending · ₹1,899']} />;
}
