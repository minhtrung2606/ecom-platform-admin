import Encryptor from '../common/encryptor';
import SessionMgr from '../common/sessionMgr';
import CommonUtils from '../common/utils';
import UserServices from '../services/user';
import BaseRouter from './BaseRouter';

const usersRouter = new BaseRouter('/api/v1/users');

usersRouter.addGetRequest('/me')(async (req, res, next) => {
  const loggedInUser = SessionMgr.getLoggedInUser(req);
  const { pk, email } = loggedInUser || {};
  res.json({
    data: {
      pk,
      email,
    },
    isSuccess: true,
  });
});

usersRouter.addGetRequest('/password/new')(async (req, res, next) => {
  const { password } = req.query;
  const encryptedPassword = await Encryptor.encrypt(password);
  res.json({
    encryptedPassword,
  });
});

usersRouter.addPostRequest('/login')(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400)
    res.json({
      isSuccess: false,
      msg: 'Email or Password is missing',
    });
    return;
  }

  const user = await UserServices.getUserByEmail(email);
  if (!user) {
    res.status(404);
    res.json({
      isSuccess: false,
      msg: 'User not found',
    });
    return;
  }

  try {
    const isMatched = await Encryptor.compare(password, user.encrypted_password);
    if (isMatched) {
      SessionMgr.storeLoggedInUser(user, req);
      res.json({
        isSuccess: true,
      });
      return;
    }

    res.status(404);
    res.json({
      isSuccess: false,
      msg: 'Email or password is not correct',
    });
  } catch(e) {
    console.log(
      CommonUtils.createLogMessage(
        'usersRouter.login',
        `Cannot log user in due to: ${e?.message}`,
      ),
    );
    console.log(e);
  }
});

export default usersRouter;
