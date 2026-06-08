import { OperationalPage } from '@/components/marketplace/operational-page';

export default function AdminCategoriesPage() {
  return <OperationalPage title="Categories" description="Manage category hierarchy, attributes, sort order, images, and SEO metadata." actions={['Add Category', 'Sort Categories']} rows={['Fashion · 248 products', 'Electronics · 184 products', 'Home Decor · 126 products']} />;
}
