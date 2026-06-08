import { Router } from 'express';
import { requireAuth, requirePermission } from '../../middleware/auth.js';
import { validateRequest } from '../../middleware/validate-request.js';
import { createRole, listPermissions, listRoles } from './rbac.controller.js';
import { createRoleSchema } from './rbac.validators.js';

export const rbacRoutes = Router();

rbacRoutes.use(requireAuth);
rbacRoutes.get('/roles', requirePermission('roles.read'), listRoles);
rbacRoutes.post('/roles', requirePermission('roles.create'), validateRequest({ body: createRoleSchema }), createRole);
rbacRoutes.get('/permissions', requirePermission('permissions.read'), listPermissions);
