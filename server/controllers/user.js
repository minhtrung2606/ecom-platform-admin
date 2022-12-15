import { Request, Response } from 'express';
import UserDao from '../dao/user';
import EncryptorLib from '../libs/encryptor';
import SessionLib from '../libs/sessions';

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns
 */
const getLoggedInUserFromSession = (req, res) => {
  const loggedInUser = SessionLib.getLoggedInUser(req);
  if (!loggedInUser) {
    res.json({
      isSuccess: true,
      data: null,
    });
    return;
  }
  const { pk, email } = loggedInUser || {};
  res.json({
    isSuccess: true,
    data: {
      pk,
      email,
    },
  });
};

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400)
    res.json({
      isSuccess: false,
      msg: 'Email or Password is missing',
    });
    return;
  }

  const user = await UserDao.getUserByEmail(email);
  if (!user) {
    res.status(404);
    res.json({
      isSuccess: false,
      msg: 'User not found',
    });
    return;
  }

  try {
    const isMatched = await EncryptorLib.compare(password, user.encryptedPassword);
    if (isMatched) {
      SessionLib.storeLoggedInUser(user, req);
      res.json({
        isSuccess: true,
      });
      return;
    }

    res.status(404);
    res.json({
      isSuccess: false,
      msg: 'Password is not correct',
    });
  } catch(e) {
    console.log(e);
    res.status(500);
    res.json({
      isSuccess: false,
      msg: 'Error when authenticating logged-in user',
    });
  }
};

const UserController = {
  getLoggedInUserFromSession,
  login,
};

export default UserController;
