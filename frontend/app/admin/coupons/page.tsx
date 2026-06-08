import { OperationalPage } from '@/components/marketplace/operational-page';

export default function AdminCouponsPage() {
  return <OperationalPage title="Coupons" description="Manage global and vendor coupons, discount rules, limits, and active campaign windows." actions={['Create Global Coupon', 'Disable Coupon']} rows={['FESTIVE20 · Global', 'SELLER10 · Vendor', 'WELCOME100 · Active']} />;
}
