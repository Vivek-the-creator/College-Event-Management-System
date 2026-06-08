import bcrypt from 'bcryptjs';
import { CommissionRule, OrderStatus, Permission, Role, Setting, User } from './models.js';
import { connectDatabase, disconnectDatabase } from './mongoose.js';

const permissions = [
  ['roles', 'read'],
  ['roles', 'create'],
  ['roles', 'update'],
  ['roles', 'delete'],
  ['permissions', 'read'],
  ['users', 'read'],
  ['users', 'create'],
  ['users', 'update'],
  ['users', 'delete'],
  ['vendors', 'read'],
  ['vendors', 'create'],
  ['vendors', 'update'],
  ['vendors', 'delete'],
  ['vendors', 'approve'],
  ['stores', 'read'],
  ['stores', 'create'],
  ['stores', 'update'],
  ['stores', 'delete'],
  ['categories', 'read'],
  ['categories', 'create'],
  ['categories', 'update'],
  ['categories', 'delete'],
  ['brands', 'read'],
  ['brands', 'create'],
  ['brands', 'update'],
  ['brands', 'delete'],
  ['attributes', 'read'],
  ['attributes', 'create'],
  ['products', 'read'],
  ['products', 'create'],
  ['products', 'update'],
  ['products', 'delete'],
  ['products', 'moderate'],
  ['orders', 'read'],
  ['orders', 'create'],
  ['orders', 'update'],
  ['orders', 'delete'],
  ['payments', 'read'],
  ['payments', 'create'],
  ['payments', 'update'],
  ['payments', 'delete'],
  ['payments', 'refund'],
  ['coupons', 'read'],
  ['coupons', 'create'],
  ['coupons', 'update'],
  ['coupons', 'delete'],
  ['reviews', 'read'],
  ['reviews', 'create'],
  ['reviews', 'update'],
  ['reviews', 'delete'],
  ['reviews', 'moderate'],
  ['banners', 'read'],
  ['banners', 'create'],
  ['banners', 'update'],
  ['banners', 'delete'],
  ['withdrawals', 'read'],
  ['withdrawals', 'create'],
  ['withdrawals', 'update'],
  ['withdrawals', 'delete'],
  ['cms', 'create'],
  ['homepage', 'update'],
  ['reports', 'read']
] as const;

async function main() {
  await connectDatabase();

  const permissionRecords = await Promise.all(
    permissions.map(([module, action]) =>
      Permission.findOneAndUpdate(
        { slug: `${module}.${action}` },
        {
          $set: {
            module,
            action,
            slug: `${module}.${action}`,
            description: `${action} ${module}`
          }
        },
        { new: true, upsert: true }
      )
    )
  );

  const adminRole = await Role.findOneAndUpdate(
    { slug: 'admin' },
    {
      $set: {
        name: 'Admin',
        slug: 'admin',
        isSystem: true,
        description: 'Marketplace administrator',
        permissionIds: permissionRecords.map((permission) => permission._id)
      }
    },
    { new: true, upsert: true }
  );

  await Role.findOneAndUpdate(
    { slug: 'vendor' },
    {
      $setOnInsert: {
        name: 'Vendor',
        slug: 'vendor',
        isSystem: true,
        description: 'Approved marketplace vendor',
        permissionIds: []
      }
    },
    { new: true, upsert: true }
  );

  await Role.findOneAndUpdate(
    { slug: 'customer' },
    {
      $setOnInsert: {
        name: 'Customer',
        slug: 'customer',
        isSystem: true,
        description: 'Marketplace customer',
        permissionIds: []
      }
    },
    { new: true, upsert: true }
  );

  const adminPasswordHash = await bcrypt.hash('ChangeMeNow!12345', 12);
  const adminUser = await User.findOneAndUpdate(
    { email: 'admin@example.com' },
    {
      $setOnInsert: {
        name: 'Marketplace Admin',
        email: 'admin@example.com',
        passwordHash: adminPasswordHash,
        status: 'ACTIVE',
        emailVerifiedAt: new Date(),
        roleIds: [adminRole._id]
      }
    },
    { new: true, upsert: true }
  );

  const statuses = [
    ['Pending', 'pending', 10, true, false],
    ['Confirmed', 'confirmed', 20, false, false],
    ['Packed', 'packed', 30, false, false],
    ['Shipped', 'shipped', 40, false, false],
    ['Delivered', 'delivered', 50, false, true],
    ['Cancelled', 'cancelled', 60, false, true],
    ['Returned', 'returned', 70, false, true],
    ['Refunded', 'refunded', 80, false, true]
  ] as const;

  await Promise.all(
    statuses.map(([name, slug, sortOrder, isInitial, isTerminal]) =>
      OrderStatus.findOneAndUpdate(
        { slug },
        { $set: { name, slug, sortOrder, isInitial, isTerminal } },
        { new: true, upsert: true }
      )
    )
  );

  await CommissionRule.findOneAndUpdate(
    { name: 'Global Commission' },
    {
      $set: {
        name: 'Global Commission',
        rate: 10,
        isGlobal: true,
        isActive: true,
        priority: 0
      }
    },
    { new: true, upsert: true }
  );

  await Setting.findOneAndUpdate(
    { key: 'marketplace.name' },
    {
      $set: {
        key: 'marketplace.name',
        group: 'general',
        value: 'Multi-Vendor Marketplace',
        isPublic: true
      }
    },
    { new: true, upsert: true }
  );

  console.log(`Seed complete. Admin user: ${adminUser.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
