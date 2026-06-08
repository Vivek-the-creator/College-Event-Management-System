import { OperationalPage } from '@/components/marketplace/operational-page';

export default function AdminProductsPage() {
  return <OperationalPage title="Product Moderation" description="Approve or reject products, inspect images, and monitor marketplace catalog health." actions={['Approve Product', 'Reject Product']} rows={['AeroFit Running Shoes · Pending review', 'NovaPods Wireless Earbuds · Active', 'Glow Ritual Skincare Kit · Revisions requested']} />;
}
