import UserServices from './user';

describe('UserServices', () => {
  it('Should only allow user to login when his status is Activated', () => {
    const user = { status: 'Activated' };
    const isAllowedToLogin = UserServices.allowUserToLogin(user);
    expect(isAllowedToLogin).toBe(true);
  });

  it('Should NOT allow user to login when his status is different from Activated', () => {
    let isAllowedToLogin;
    const user = { status: '' };

    isAllowedToLogin = UserServices.allowUserToLogin(user);
    expect(isAllowedToLogin).toBe(false);

    user.status = 'New';
    isAllowedToLogin = UserServices.allowUserToLogin(user);
    expect(isAllowedToLogin).toBe(false);

    user.status = 'Blocked';
    isAllowedToLogin = UserServices.allowUserToLogin(user);
    expect(isAllowedToLogin).toBe(false);

    user.status = 'ArbitraryStatus';
    isAllowedToLogin = UserServices.allowUserToLogin(user);
    expect(isAllowedToLogin).toBe(false);
  });
});
