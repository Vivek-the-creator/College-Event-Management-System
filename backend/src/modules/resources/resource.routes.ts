import { Router } from 'express';
import { requireAuth, requirePermission } from '../../middleware/auth.js';
import {
  createResource,
  getResource,
  listResource,
  softDeleteResource,
  updateResource
} from './resource.controller.js';
import type { ResourceName } from './resource.registry.js';

const publicResources: ResourceName[] = ['products', 'categories', 'brands', 'vendors', 'stores', 'reviews', 'banners'];
const protectedResources: ResourceName[] = [
  'addresses',
  'carts',
  'coupons',
  'notifications',
  'orders',
  'payments',
  'users',
  'wishlists',
  'withdrawals'
];

export const resourceRoutes = Router();

for (const resource of publicResources) {
  resourceRoutes.get(`/${resource}`, listResource(resource));
  resourceRoutes.get(`/${resource}/:idOrSlug`, getResource(resource));
}

for (const resource of protectedResources) {
  resourceRoutes.get(`/${resource}`, requireAuth, listResource(resource));
  resourceRoutes.get(`/${resource}/:idOrSlug`, requireAuth, getResource(resource));
}

for (const resource of [...publicResources, ...protectedResources]) {
  resourceRoutes.post(`/admin/${resource}`, requireAuth, requirePermission(`${resource}.create`), createResource(resource));
  resourceRoutes.patch(`/admin/${resource}/:id`, requireAuth, requirePermission(`${resource}.update`), updateResource(resource));
  resourceRoutes.delete(`/admin/${resource}/:id`, requireAuth, requirePermission(`${resource}.delete`), softDeleteResource(resource));
}

resourceRoutes.post('/vendor/products', requireAuth, requirePermission('products.create'), createResource('products'));
resourceRoutes.patch('/vendor/products/:id', requireAuth, requirePermission('products.update'), updateResource('products'));
resourceRoutes.delete('/vendor/products/:id', requireAuth, requirePermission('products.delete'), softDeleteResource('products'));
resourceRoutes.post('/vendor/coupons', requireAuth, requirePermission('coupons.create'), createResource('coupons'));
resourceRoutes.patch('/vendor/coupons/:id', requireAuth, requirePermission('coupons.update'), updateResource('coupons'));
resourceRoutes.post('/vendor/withdrawals', requireAuth, requirePermission('withdrawals.create'), createResource('withdrawals'));
