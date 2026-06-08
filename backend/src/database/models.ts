import mongoose, { Schema, model, type InferSchemaType, type Model, type Types } from 'mongoose';

const timestamps = { timestamps: true, versionKey: false as const };

const permissionSchema = new Schema(
  {
    module: { type: String, required: true, trim: true },
    action: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true }
  },
  timestamps
);

permissionSchema.index({ module: 1, action: 1 });

const roleSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    isSystem: { type: Boolean, default: false },
    permissionIds: [{ type: Schema.Types.ObjectId, ref: 'Permission' }]
  },
  timestamps
);

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, trim: true },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION'],
      default: 'PENDING_VERIFICATION'
    },
    emailVerifiedAt: { type: Date },
    tokenVersion: { type: Number, default: 0 },
    deletedAt: { type: Date },
    roleIds: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
  },
  timestamps
);

userSchema.index({ status: 1 });
userSchema.index({ createdAt: 1 });

const orderStatusSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    sortOrder: { type: Number, default: 0 },
    isInitial: { type: Boolean, default: false },
    isTerminal: { type: Boolean, default: false }
  },
  timestamps
);

const commissionRuleSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    rate: { type: Number, required: true },
    storeId: { type: Schema.Types.ObjectId },
    categoryId: { type: Schema.Types.ObjectId },
    isGlobal: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    priority: { type: Number, default: 0 }
  },
  timestamps
);

commissionRuleSchema.index({ storeId: 1, categoryId: 1, isGlobal: 1, isActive: 1 });

const settingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    value: { type: Schema.Types.Mixed, required: true },
    group: { type: String, required: true, trim: true },
    isPublic: { type: Boolean, default: false }
  },
  timestamps
);

settingSchema.index({ group: 1, isPublic: 1 });

const softDeleteFields = {
  deletedAt: { type: Date },
  isDeleted: { type: Boolean, default: false }
};

const vendorSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    storeName: { type: String, required: true, trim: true },
    ownerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    phone: { type: String, required: true, trim: true },
    gstNumber: { type: String, trim: true },
    address: { type: String, required: true, trim: true },
    status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'], default: 'PENDING' },
    rejectionReason: { type: String, trim: true },
    approvedAt: { type: Date },
    ...softDeleteFields
  },
  timestamps
);

vendorSchema.index({ status: 1, createdAt: -1 });

const storeSchema = new Schema(
  {
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true, unique: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    logoUrl: { type: String, trim: true },
    bannerUrl: { type: String, trim: true },
    socialLinks: { type: Map, of: String },
    ratingAverage: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    productsCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: false },
    ...softDeleteFields
  },
  timestamps
);

storeSchema.index({ slug: 1, isActive: 1 });

const categorySchema = new Schema(
  {
    parentId: { type: Schema.Types.ObjectId, ref: 'Category' },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    productCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    ...softDeleteFields
  },
  timestamps
);

categorySchema.index({ parentId: 1, sortOrder: 1 });
categorySchema.index({ isActive: 1 });

const brandSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    logoUrl: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    ...softDeleteFields
  },
  timestamps
);

const productVariantSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    stock: { type: Number, default: 0 },
    attributes: { type: Map, of: String }
  },
  { _id: true, versionKey: false as const }
);

const productSchema = new Schema(
  {
    storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: true, index: true },
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true, index: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    brandId: { type: Schema.Types.ObjectId, ref: 'Brand' },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    images: [{ url: String, altText: String }],
    sku: { type: String, trim: true, index: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    stock: { type: Number, default: 0 },
    variants: [productVariantSchema],
    ratingAverage: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    status: { type: String, enum: ['DRAFT', 'PENDING_REVIEW', 'ACTIVE', 'REJECTED', 'ARCHIVED'], default: 'DRAFT' },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    publishedAt: { type: Date },
    ...softDeleteFields
  },
  timestamps
);

productSchema.index({ name: 'text', description: 'text', sku: 'text' });
productSchema.index({ status: 1, publishedAt: -1 });
productSchema.index({ price: 1, ratingAverage: -1 });

const addressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    label: { type: String, trim: true },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    line1: { type: String, required: true, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, default: 'India', trim: true },
    isDefault: { type: Boolean, default: false },
    ...softDeleteFields
  },
  timestamps
);

const cartItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: Schema.Types.ObjectId },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
  },
  { _id: true, versionKey: false as const }
);

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    sessionId: { type: String, trim: true, index: true },
    items: [cartItemSchema],
    couponCode: { type: String, trim: true }
  },
  timestamps
);

const wishlistSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    productIds: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  },
  timestamps
);

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
    productName: { type: String, required: true },
    sku: { type: String },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    trackingCode: { type: String }
  },
  { _id: true, versionKey: false as const }
);

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true, trim: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    addressId: { type: Schema.Types.ObjectId, ref: 'Address' },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    discountTotal: { type: Number, default: 0 },
    taxTotal: { type: Number, default: 0 },
    shippingTotal: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED'], default: 'PENDING' },
    orderStatus: { type: String, default: 'pending' },
    ...softDeleteFields
  },
  timestamps
);

orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1, paymentStatus: 1 });

const reviewSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', index: true },
    storeId: { type: Schema.Types.ObjectId, ref: 'Store', index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true },
    body: { type: String, trim: true },
    status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED', 'REPORTED'], default: 'PENDING' },
    ...softDeleteFields
  },
  timestamps
);

const couponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' },
    storeId: { type: Schema.Types.ObjectId, ref: 'Store' },
    description: { type: String, trim: true },
    discountType: { type: String, enum: ['PERCENTAGE', 'FLAT'], required: true },
    discountValue: { type: Number, required: true },
    minimumAmount: { type: Number },
    usageLimit: { type: Number },
    perUserLimit: { type: Number },
    startsAt: { type: Date, required: true },
    expiresAt: { type: Date },
    isActive: { type: Boolean, default: true },
    ...softDeleteFields
  },
  timestamps
);

couponSchema.index({ code: 1, isActive: 1 });

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    data: { type: Schema.Types.Mixed },
    readAt: { type: Date }
  },
  timestamps
);

const paymentSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    provider: { type: String, enum: ['RAZORPAY', 'STRIPE', 'COD'], required: true },
    status: { type: String, enum: ['PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED'], default: 'PENDING' },
    amount: { type: Number, required: true },
    providerOrderId: { type: String, trim: true },
    providerPaymentId: { type: String, trim: true },
    rawResponse: { type: Schema.Types.Mixed }
  },
  timestamps
);

const withdrawalSchema = new Schema(
  {
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true, index: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED'], default: 'PENDING' },
    reference: { type: String, trim: true },
    notes: { type: String, trim: true },
    processedAt: { type: Date }
  },
  timestamps
);

const bannerSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    linkUrl: { type: String, trim: true },
    placement: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    startsAt: { type: Date },
    endsAt: { type: Date },
    ...softDeleteFields
  },
  timestamps
);

bannerSchema.index({ placement: 1, isActive: 1, sortOrder: 1 });

export type PermissionDocument = InferSchemaType<typeof permissionSchema> & { _id: Types.ObjectId };
export type RoleDocument = InferSchemaType<typeof roleSchema> & { _id: Types.ObjectId };
export type UserDocument = InferSchemaType<typeof userSchema> & { _id: Types.ObjectId };

export const Permission: Model<PermissionDocument> =
  (mongoose.models.Permission as Model<PermissionDocument>) ?? model<PermissionDocument>('Permission', permissionSchema);
export const Role: Model<RoleDocument> =
  (mongoose.models.Role as Model<RoleDocument>) ?? model<RoleDocument>('Role', roleSchema);
export const User: Model<UserDocument> =
  (mongoose.models.User as Model<UserDocument>) ?? model<UserDocument>('User', userSchema);
export const OrderStatus: Model<InferSchemaType<typeof orderStatusSchema>> =
  (mongoose.models.OrderStatus as Model<InferSchemaType<typeof orderStatusSchema>>) ??
  model('OrderStatus', orderStatusSchema);
export const CommissionRule: Model<InferSchemaType<typeof commissionRuleSchema>> =
  (mongoose.models.CommissionRule as Model<InferSchemaType<typeof commissionRuleSchema>>) ??
  model('CommissionRule', commissionRuleSchema);
export const Setting: Model<InferSchemaType<typeof settingSchema>> =
  (mongoose.models.Setting as Model<InferSchemaType<typeof settingSchema>>) ?? model('Setting', settingSchema);
export const Vendor: Model<any> = (mongoose.models.Vendor as Model<any>) ?? model('Vendor', vendorSchema);
export const Store: Model<any> = (mongoose.models.Store as Model<any>) ?? model('Store', storeSchema);
export const Category: Model<any> = (mongoose.models.Category as Model<any>) ?? model('Category', categorySchema);
export const Brand: Model<any> = (mongoose.models.Brand as Model<any>) ?? model('Brand', brandSchema);
export const Product: Model<any> = (mongoose.models.Product as Model<any>) ?? model('Product', productSchema);
export const Address: Model<any> = (mongoose.models.Address as Model<any>) ?? model('Address', addressSchema);
export const Cart: Model<any> = (mongoose.models.Cart as Model<any>) ?? model('Cart', cartSchema);
export const Wishlist: Model<any> = (mongoose.models.Wishlist as Model<any>) ?? model('Wishlist', wishlistSchema);
export const Order: Model<any> = (mongoose.models.Order as Model<any>) ?? model('Order', orderSchema);
export const Review: Model<any> = (mongoose.models.Review as Model<any>) ?? model('Review', reviewSchema);
export const Coupon: Model<any> = (mongoose.models.Coupon as Model<any>) ?? model('Coupon', couponSchema);
export const Notification: Model<any> = (mongoose.models.Notification as Model<any>) ?? model('Notification', notificationSchema);
export const Payment: Model<any> = (mongoose.models.Payment as Model<any>) ?? model('Payment', paymentSchema);
export const Withdrawal: Model<any> = (mongoose.models.Withdrawal as Model<any>) ?? model('Withdrawal', withdrawalSchema);
export const Banner: Model<any> = (mongoose.models.Banner as Model<any>) ?? model('Banner', bannerSchema);
