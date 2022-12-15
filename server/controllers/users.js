import { Request, Response } from 'express';
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

const UserController = {
  getLoggedInUserFromSession,
};

export default UserController;
