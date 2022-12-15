import SessionLib from './sessions';

describe('SessionLib', () => {
  let req;

  beforeEach(() => {
    req = {
      session: {
        loggedInUser: null,
      },
    };
  });

  it('Should correctly get logged-in user stored in request session', () => {
    req.session.loggedInUser = { email: 'loggedInUser@domain.com' };
    const loggedInUser = SessionLib.getLoggedInUser(req);
    expect(loggedInUser).toEqual(req.session.loggedInUser);
    expect(loggedInUser.email).toEqual('loggedInUser@domain.com');
  });

  it('Should correctly store logged-in user to the request session', () => {
    const user = { email: 'loggedInUser@domain.com' };
    SessionLib.storeLoggedInUser(user, req);
    const loggedInUser = SessionLib.getLoggedInUser(req);
    expect(loggedInUser).toEqual(user);
    expect(loggedInUser.email).toEqual(user.email);
  });

  it('Should correctly remove logged-in user from the request session', () => {
    req.session.loggedInUser = { email: 'loggedInUser@domain.com' };
    SessionLib.removeLoggedInUser(req);
    expect(req.session.loggedInUser).toEqual(null);
  });
});
