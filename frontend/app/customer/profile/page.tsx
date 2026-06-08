import { OperationalPage } from '@/components/marketplace/operational-page';

export default function CustomerProfilePage() {
  return <OperationalPage title="Profile" description="Manage name, phone, email verification, password, addresses, and notification settings." actions={['Update Profile', 'Change Password']} rows={['Email verification active', '2 saved addresses', 'Marketing notifications enabled']} />;
}
