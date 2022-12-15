import DBLib from '../libs/db';

/**
 *
 * @param {number} pk
 *
 * @returns
 */
const getCategoryByPk = async (pk) => {
  const query = 'select * from categories where pk = ?';
  const [cats] = await DBLib.execute(query, [pk]);
  return cats[0];
};

const newCategory = async () => {
  const query = 'insert into categories(`name`, `desc`, `slug`) values(?, ?, ?)';
  const [result] = await DBLib.execute(
    query,
    ['Draft Category', null, 'draft-category'],
  );
  return result.insertId;
};

const CategoryDao = {
  getCategoryByPk,
  newCategory,
};

export default CategoryDao;
