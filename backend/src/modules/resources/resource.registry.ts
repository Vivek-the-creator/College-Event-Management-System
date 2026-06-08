import {
  Address,
  Banner,
  Brand,
  Cart,
  Category,
  Coupon,
  Notification,
  Order,
  Payment,
  Product,
  Review,
  Store,
  User,
  Vendor,
  Wishlist,
  Withdrawal
} from '../../database/models.js';

export const resourceModels = {
  addresses: Address,
  banners: Banner,
  brands: Brand,
  carts: Cart,
  categories: Category,
  coupons: Coupon,
  notifications: Notification,
  orders: Order,
  payments: Payment,
  products: Product,
  reviews: Review,
  stores: Store,
  users: User,
  vendors: Vendor,
  wishlists: Wishlist,
  withdrawals: Withdrawal
} as const;

export type ResourceName = keyof typeof resourceModels;
