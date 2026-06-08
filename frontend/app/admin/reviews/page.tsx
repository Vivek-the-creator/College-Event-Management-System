import { OperationalPage } from '@/components/marketplace/operational-page';

export default function AdminReviewsPage() {
  return <OperationalPage title="Reviews" description="Moderate product and store reviews, reported content, and customer feedback." actions={['Approve Review', 'Reject Review']} rows={['5 star review · Pending', 'Reported store review · Needs decision', 'Product review · Approved']} />;
}
