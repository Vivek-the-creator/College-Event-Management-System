import type { RequestHandler } from 'express';
import { Types, type Model } from 'mongoose';
import { sendSuccess } from '../../shared/http/api-response.js';
import { AppError } from '../../shared/errors/app-error.js';
import { resourceModels, type ResourceName } from './resource.registry.js';

const searchableFields: Partial<Record<ResourceName, string[]>> = {
  products: ['name', 'description', 'sku'],
  categories: ['name', 'description'],
  brands: ['name'],
  vendors: ['storeName', 'ownerName', 'email'],
  stores: ['name', 'description'],
  users: ['name', 'email', 'phone'],
  orders: ['orderNumber'],
  coupons: ['code', 'description'],
  banners: ['title', 'placement']
};

function getModel(name: string): Model<any> {
  const model = resourceModels[name as ResourceName];
  if (!model) {
    throw new AppError(404, 'RESOURCE_NOT_FOUND', `Unknown resource '${name}'.`);
  }

  return model as Model<any>;
}

function buildFilter(resource: ResourceName, query: Record<string, unknown>) {
  const filter: Record<string, unknown> = {};
  const andFilters: Record<string, unknown>[] = [];

  if (query.status) filter.status = query.status;
  if (query.isActive !== undefined) filter.isActive = query.isActive === 'true';
  if (query.categoryId && Types.ObjectId.isValid(String(query.categoryId))) filter.categoryId = query.categoryId;
  if (query.vendorId && Types.ObjectId.isValid(String(query.vendorId))) filter.vendorId = query.vendorId;
  if (query.storeId && Types.ObjectId.isValid(String(query.storeId))) filter.storeId = query.storeId;
  if (query.userId && Types.ObjectId.isValid(String(query.userId))) filter.userId = query.userId;

  if (query.q && searchableFields[resource]?.length) {
    const regex = new RegExp(String(query.q), 'i');
    andFilters.push({ $or: searchableFields[resource]?.map((field) => ({ [field]: regex })) });
  }

  if ('isDeleted' in query) {
    filter.isDeleted = query.isDeleted === 'true';
  } else {
    andFilters.push({ $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }] });
  }

  if (andFilters.length) {
    filter.$and = andFilters;
  }

  return filter;
}

export function listResource(resource: ResourceName): RequestHandler {
  return async (req, res, next) => {
    try {
      const model = getModel(resource);
      const page = Math.max(Number(req.query.page ?? 1), 1);
      const limit = Math.min(Math.max(Number(req.query.limit ?? 12), 1), 100);
      const skip = (page - 1) * limit;
      const sort = String(req.query.sort ?? '-createdAt').replace(',', ' ');
      const filter = buildFilter(resource, req.query);

      const [items, total] = await Promise.all([
        model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
        model.countDocuments(filter)
      ]);

      sendSuccess(res, items, {
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      next(error);
    }
  };
}

export function getResource(resource: ResourceName): RequestHandler {
  return async (req, res, next) => {
    try {
      const model = getModel(resource);
      const idOrSlug = String(req.params.idOrSlug);
      const filter = Types.ObjectId.isValid(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };
      const item = await model.findOne(filter).lean();

      if (!item) {
        throw new AppError(404, 'ITEM_NOT_FOUND', 'Requested item was not found.');
      }

      sendSuccess(res, item);
    } catch (error) {
      next(error);
    }
  };
}

export function createResource(resource: ResourceName): RequestHandler {
  return async (req, res, next) => {
    try {
      const model = getModel(resource);
      const item = await model.create(req.body);
      sendSuccess(res, item, {}, 201);
    } catch (error) {
      next(error);
    }
  };
}

export function updateResource(resource: ResourceName): RequestHandler {
  return async (req, res, next) => {
    try {
      const model = getModel(resource);
      const item = await model.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

      if (!item) {
        throw new AppError(404, 'ITEM_NOT_FOUND', 'Requested item was not found.');
      }

      sendSuccess(res, item);
    } catch (error) {
      next(error);
    }
  };
}

export function softDeleteResource(resource: ResourceName): RequestHandler {
  return async (req, res, next) => {
    try {
      const model = getModel(resource);
      const item = await model.findByIdAndUpdate(
        req.params.id,
        { $set: { isDeleted: true, deletedAt: new Date() } },
        { new: true }
      );

      if (!item) {
        throw new AppError(404, 'ITEM_NOT_FOUND', 'Requested item was not found.');
      }

      sendSuccess(res, item);
    } catch (error) {
      next(error);
    }
  };
}
