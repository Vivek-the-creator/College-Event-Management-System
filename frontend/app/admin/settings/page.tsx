import { OperationalPage } from '@/components/marketplace/operational-page';

export default function AdminSettingsPage() {
  return <OperationalPage title="Settings" description="Configure marketplace name, commission, tax, shipping, payment providers, email, Cloudinary, and security rules." actions={['Save Settings', 'Test Email', 'Sync Payment Keys']} rows={['Global commission · 10%', 'Razorpay ready', 'Stripe ready', 'Cloudinary pending']} />;
}
