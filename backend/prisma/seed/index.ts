import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const permissions = [
  ['roles', 'read'],
  ['roles', 'create'],
  ['roles', 'update'],
  ['permissions', 'read'],
  ['users', 'read'],
  ['users', 'update'],
  ['vendors', 'read'],
  ['vendors', 'approve'],
  ['categories', 'create'],
  ['categories', 'update'],
  ['brands', 'create'],
  ['attributes', 'read'],
  ['attributes', 'create'],
  ['products', 'moderate'],
  ['orders', 'read'],
  ['payments', 'refund'],
  ['coupons', 'create'],
  ['reviews', 'moderate'],
  ['cms', 'create'],
  ['homepage', 'update'],
  ['reports', 'read']
] as const;

async function main() {
  const permissionRecords = await Promise.all(
    permissions.map(([module, action]) =>
      prisma.permission.upsert({
        where: { slug: `${module}.${action}` },
        update: {},
        create: {
          module,
          action,
          slug: `${module}.${action}`,
          description: `${action} ${module}`
        }
      })
    )
  );

  const adminRole = await prisma.role.upsert({
    where: { slug: 'admin' },
    update: {},
    create: {
      name: 'Admin',
      slug: 'admin',
      isSystem: true,
      description: 'Marketplace administrator'
    }
  });

  await prisma.role.upsert({
    where: { slug: 'vendor' },
    update: {},
    create: {
      name: 'Vendor',
      slug: 'vendor',
      isSystem: true,
      description: 'Approved marketplace vendor'
    }
  });

  await prisma.role.upsert({
    where: { slug: 'customer' },
    update: {},
    create: {
      name: 'Customer',
      slug: 'customer',
      isSystem: true,
      description: 'Marketplace customer'
    }
  });

  await Promise.all(
    permissionRecords.map((permission) =>
      prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: adminRole.id,
            permissionId: permission.id
          }
        },
        update: {},
        create: {
          roleId: adminRole.id,
          permissionId: permission.id
        }
      })
    )
  );

  const adminPasswordHash = await bcrypt.hash('ChangeMeNow!12345', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Marketplace Admin',
      email: 'admin@example.com',
      passwordHash: adminPasswordHash,
      status: 'ACTIVE',
      emailVerifiedAt: new Date(),
      userRoles: {
        create: {
          roleId: adminRole.id
        }
      }
    }
  });

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
      prisma.orderStatus.upsert({
        where: { slug },
        update: {},
        create: { name, slug, sortOrder, isInitial, isTerminal }
      })
    )
  );

  await prisma.commissionRule.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Global Commission',
      rate: 10,
      isGlobal: true,
      isActive: true,
      priority: 0
    }
  });

  await prisma.setting.upsert({
    where: { key: 'marketplace.name' },
    update: {},
    create: {
      key: 'marketplace.name',
      group: 'general',
      value: 'Multi-Vendor Marketplace',
      isPublic: true
    }
  });

  console.log(`Seed complete. Admin user: ${adminUser.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
