import type { PrismaClient } from '@prisma/client';

export class RbacRepository {
  constructor(private readonly db: PrismaClient) {}

  listRoles() {
    return this.db.role.findMany({
      orderBy: { name: 'asc' },
      include: {
        rolePermissions: {
          include: { permission: true }
        }
      }
    });
  }

  listPermissions() {
    return this.db.permission.findMany({
      orderBy: [{ module: 'asc' }, { action: 'asc' }]
    });
  }

  createRole(data: { name: string; slug: string; description?: string }) {
    return this.db.role.create({ data });
  }
}
