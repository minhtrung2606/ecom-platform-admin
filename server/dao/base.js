import DBLib from '../libs/db';
import DBUtil from '../utils/db';

/**
 * @param {AsyncFuntion} doYourBusiness
 * @param {AsyncFuntion} handleException
 * @returns
 */
const exec = (doYourBusiness, handleException) => {
  return new Promise(async (resolve, reject) => {
    let conn;
    try {
      conn = await DBLib.getConnection();
      const result = await doYourBusiness(conn);
      resolve(result);
    } catch (e) {
      const daoExecption = DBUtil.generateDaoException(e);
      if (typeof handleException === 'function') {
        await handleException(conn, daoExecption);
      }
      reject(daoExecption);
    } finally {
      if (conn) {
        conn.release();
      }
    }
  });
};

const BaseDao = {
  exec,
};

export default BaseDao;
