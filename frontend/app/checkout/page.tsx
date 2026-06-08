import { OperationalPage } from '@/components/marketplace/operational-page';

export default function CheckoutPage() {
  return <OperationalPage title="Checkout" description="Step 1 address, step 2 shipping, step 3 payment, step 4 review." actions={['Address', 'Shipping', 'Payment', 'Review']} rows={['Razorpay ready', 'Stripe ready', 'Cash on Delivery available']} />;
}
