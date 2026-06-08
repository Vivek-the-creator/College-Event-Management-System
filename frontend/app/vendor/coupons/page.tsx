import { OperationalPage } from '@/components/marketplace/operational-page';

export default function VendorCouponsPage() {
  return <OperationalPage title="Vendor Coupons" description="Create percentage and flat coupons with usage limits and validity dates." actions={['Percentage Coupon', 'Flat Coupon']} rows={['FESTIVE20 · Percentage · Active', 'SHIPFREE · Flat · Scheduled']} />;
}
