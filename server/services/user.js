const allowUserToLogin = (user) => user?.status === 'Activated';

const UserServices = {
  allowUserToLogin,
};

export default UserServices;
