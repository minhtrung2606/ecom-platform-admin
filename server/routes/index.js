import { Router } from 'express';
import UserV1API from './api/v1/users';

/**
 * @param {Router} app
 */
export const registerApiRoutesToApp = (app) => {
  app.use('/api/v1/users', UserV1API);
};
