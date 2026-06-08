import { OperationalPage } from '@/components/marketplace/operational-page';

export default function CartPage() {
  return <OperationalPage title="Cart" description="Update quantities, remove items, apply coupons, and calculate shipping." actions={['Apply Coupon', 'Calculate Shipping', 'Checkout']} rows={['AeroFit Running Shoes · Qty 1 · ₹3,499', 'NovaPods Wireless Earbuds · Qty 2 · ₹4,598']} />;
}
