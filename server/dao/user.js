import DBLib from '../libs/db';

/**
 * @param {String} email
 */
const getUserByEmail = async (email) => {
  const query = 'select * from users where email = ?';
  try {
    const [users] = await DBLib.execute(query, [email]);
    return users[0];
  } catch (e) {
    console.log(e);
  }
};

const UserDao = {
  getUserByEmail,
};

export default UserDao;
