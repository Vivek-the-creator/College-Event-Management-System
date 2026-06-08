import { OperationalPage } from '@/components/marketplace/operational-page';

export default function VendorProductsPage() {
  return <OperationalPage title="Vendor Products" description="Add, edit, delete, draft, publish, and manage variants, inventory, images, category, brand, SKU, price, discount, and stock." actions={['Add Product', 'Upload Images', 'Publish Selected']} rows={['AeroFit Running Shoes · Active · 42 stock', 'Glow Ritual Skincare Kit · Draft · 37 stock', 'Linen Cloud Bedsheet Set · Pending Review']} />;
}
