export const categories = [
  { name: 'Fashion', slug: 'fashion', count: 248, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=80' },
  { name: 'Electronics', slug: 'electronics', count: 184, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900&auto=format&fit=crop&q=80' },
  { name: 'Home Decor', slug: 'home-decor', count: 126, image: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=900&auto=format&fit=crop&q=80' },
  { name: 'Beauty', slug: 'beauty', count: 94, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&auto=format&fit=crop&q=80' }
];

export const vendors = [
  { id: 'urban-thread', name: 'Urban Thread Co.', rating: 4.8, products: 86, banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80' },
  { id: 'gadget-hub', name: 'Gadget Hub', rating: 4.7, products: 112, banner: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80' },
  { id: 'crafted-home', name: 'Crafted Home', rating: 4.9, products: 64, banner: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=80' }
];

export const products = [
  {
    name: 'AeroFit Running Shoes',
    slug: 'aerofit-running-shoes',
    category: 'Fashion',
    vendor: 'Urban Thread Co.',
    price: 3499,
    oldPrice: 4999,
    rating: 4.8,
    stock: 42,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80'
  },
  {
    name: 'NovaPods Wireless Earbuds',
    slug: 'novapods-wireless-earbuds',
    category: 'Electronics',
    vendor: 'Gadget Hub',
    price: 2299,
    oldPrice: 3499,
    rating: 4.7,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=900&auto=format&fit=crop&q=80'
  },
  {
    name: 'Linen Cloud Bedsheet Set',
    slug: 'linen-cloud-bedsheet-set',
    category: 'Home Decor',
    vendor: 'Crafted Home',
    price: 1899,
    oldPrice: 2599,
    rating: 4.6,
    stock: 61,
    image: 'https://images.unsplash.com/photo-1585493113014-06c71972dd2d?w=900&auto=format&fit=crop&q=80'
  },
  {
    name: 'Glow Ritual Skincare Kit',
    slug: 'glow-ritual-skincare-kit',
    category: 'Beauty',
    vendor: 'Urban Thread Co.',
    price: 1499,
    oldPrice: 2199,
    rating: 4.9,
    stock: 37,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=900&auto=format&fit=crop&q=80'
  }
];

export const reviews = [
  { name: 'Ananya Rao', text: 'Fast delivery, clean packaging, and the seller updates were excellent.', rating: 5 },
  { name: 'Rahul Mehta', text: 'The checkout flow feels smooth and product quality matched the listing.', rating: 5 },
  { name: 'Priya Shah', text: 'Loved discovering smaller sellers without losing marketplace reliability.', rating: 4 }
];

export const adminStats = [
  ['Total Revenue', '₹18.4L'],
  ['Total Orders', '12,840'],
  ['Total Products', '4,286'],
  ['Customers', '8,920'],
  ['Vendors', '214']
] as const;

export const vendorStats = [
  ['Revenue', '₹2.8L'],
  ['Sales', '1,248'],
  ['Orders', '386'],
  ['Products', '86'],
  ['Visitors', '18.2K']
] as const;

export const customerStats = [
  ['Total Orders', '28'],
  ['Pending Orders', '3'],
  ['Delivered', '23'],
  ['Wishlist', '14']
] as const;
