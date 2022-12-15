import { Request } from 'express';

/**
 * @param {Request} req
 * @returns
 */
const storeLoggedInUser = (user, req) => req.session.loggedInUser = user;

/**
 * @param {Request} req
 * @returns
 */
const getLoggedInUser = req => req.session.loggedInUser;

/**
 * @param {Request} req
 * @returns
 */
const removeLoggedInUser = req => req.session.loggedInUser = null;

const SessionLib = {
  getLoggedInUser,
  storeLoggedInUser,
  removeLoggedInUser,
};

export default SessionLib;
