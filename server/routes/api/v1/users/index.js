import { Router } from 'express';
import UserController from '../../../../controllers/user';

const UserV1API = Router();

UserV1API.get('/me', UserController.getLoggedInUserFromSession);
UserV1API.post('/login', UserController.login);

export default UserV1API;