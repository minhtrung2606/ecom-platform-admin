import { Router } from 'express';

const UserV1API = Router();

UserV1API.get('/me', (req, res) => res.json({
  isSuccess: true,
  data: {
    email: 'admin@domain.com',
  },
}));

export default UserV1API;