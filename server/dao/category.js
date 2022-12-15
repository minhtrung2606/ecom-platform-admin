import DBLib from '../libs/db';
import DBUtil from '../utils/db';

const getCategories = async () => {
  const query = 'select * from categories order by name';
  const [cats] = await DBLib.execute(query);
  return cats;
};

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

/**
 *
 * @param {number} pk
 * @param {{ name, description, slug }} category
 * @returns
 */
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

/**
 *
 * @param {array} pks
 */
const deleteCategoriesByPks = async (pks) => {
  const pkArr = pks.join(',');
  const query = `delete from categories where pk in (${pkArr})`;
  await DBLib.execute(query);
  return true;
};

const CategoryDao = {
  getCategories,
  getCategoryByPk,
  newCategory,
  updateCategoryByPk,
  deleteCategoriesByPks,
};

export default CategoryDao;
