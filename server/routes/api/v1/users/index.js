import { Router } from 'express';
import UserController from '../../../../controllers/users';

const UserV1API = Router();

UserV1API.get('/me', UserController.getLoggedInUserFromSession);

export default UserV1API;