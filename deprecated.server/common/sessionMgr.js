const storeLoggedInUser = (user, req) => req.session.loggedInUser = user;

const getLoggedInUser = req => req.session.loggedInUser;

const removeLoggedInUser = req => req.session.loggedInUser = null;

const SessionMgr = {
  storeLoggedInUser,
  getLoggedInUser,
  removeLoggedInUser,
};

export default SessionMgr;
