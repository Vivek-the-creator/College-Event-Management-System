import { Router } from 'express';
import { authRoutes } from './modules/auth/auth.routes.js';
import { healthRoutes } from './modules/health/health.routes.js';
import { rbacRoutes } from './modules/rbac/rbac.routes.js';
import { resourceRoutes } from './modules/resources/resource.routes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/', resourceRoutes);
apiRouter.use('/admin/rbac', rbacRoutes);
