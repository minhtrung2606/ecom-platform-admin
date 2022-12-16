import { Router } from 'express';
import CategoryV1API from './api/v1/categories';
import ProductV1API from './api/v1/products';
import UserV1API from './api/v1/users';

/**
 * @param {Router} app
 */
export const registerApiRoutesToApp = (app) => {
  app.use('/api/v1/users', UserV1API);
  app.use('/api/v1/categories', CategoryV1API);
  app.use('/api/v1/products', ProductV1API);
};
