import DaoException from '../models/DaoException';

const processDbBindParamValue = (value) => {
  if (value === undefined) {
    return null;
  }

  if (typeof value === 'string') {
    return value.trim();
  }

  return value;
};

const generateDaoException = (mysql2Exception) => new DaoException(mysql2Exception);

/**
 *
 * @param {array} arr
 */
const generateParamArrayPlaceholder = (arr) => arr?.map(() => '?').join(',');

const DBUtil = {
  processDbBindParamValue,
  generateDaoException,
  generateParamArrayPlaceholder,
};

export default DBUtil;
