import { OperationalPage } from '@/components/marketplace/operational-page';

export default function WishlistPage() {
  return <OperationalPage title="Wishlist" description="Saved products and back-in-stock reminders." actions={['Move to Cart', 'Remove Selected']} rows={['AeroFit Running Shoes', 'Glow Ritual Skincare Kit', 'Linen Cloud Bedsheet Set']} />;
}
