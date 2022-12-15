import DBLib from '../libs/db';
import DBUtil from '../utils/db';

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
  const query = 'insert into categories(name, description, slug) values(?, ?, ?)';
  const [result] = await DBLib.execute(
    query,
    ['Draft Category', null, 'draft-category'],
  );
  return result.insertId;
};

const updateCategoryByPk = async (pk, category) => {
  const {
    name,
    description,
    slug,
  } = category || {};
  const query = `
    update categories
      set name = coalesce(?, name),
      description = coalesce(?, description),
      slug = coalesce(?, slug)
    where pk = ?
  `;
  const [result] = await DBLib.execute(
    query,
    [
      DBUtil.processDbBindParamValue(name),
      DBUtil.processDbBindParamValue(description),
      DBUtil.processDbBindParamValue(slug),
      pk,
    ],
  );
  return result.affectedRows === 1;
};

const CategoryDao = {
  getCategoryByPk,
  newCategory,
  updateCategoryByPk,
};

export default CategoryDao;
