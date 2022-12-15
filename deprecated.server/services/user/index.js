import db from '../../common/db';

const getUserByEmail = async (email) => {
  const query = 'select * from users where email = ?';
  try {
    const [users] = await db.execute(query, [email]);
    return users[0];
  } catch (e) {
    console.log(e);
  }
};

const UserServices = {
  getUserByEmail,
};

export default UserServices;
