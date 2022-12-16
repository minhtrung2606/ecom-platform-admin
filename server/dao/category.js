import DBUtil from '../utils/db';
import BaseDao from './base';

const getCategories = async () => BaseDao.exec(
  async (conn) => {
    const query = 'select * from categories order by name';
    const [cats] = await conn.execute(query);
    return cats;
  },
);

/**
 *
 * @param {number} pk
 *
 * @returns
 */
const getCategoryByPk = async (pk) => BaseDao.exec(
  async (conn) => {
    const query = 'select * from categories where pk = ?';
    const [cats] = await conn.execute(query, [pk]);
    return cats[0];
  },
);

/**
 *
 * @param {array} pks
 *
 * @returns
 */
const getCategoriesByProductPks = async (pks) => BaseDao.exec(
  async (conn) => {
    const pkArr = DBUtil.generateParamArrayPlaceholder(pks);
    const query = `
      select cp.productPk, c.*
      from categories_products as cp
        left join categories as c on c.pk = cp.categoryPk
      where cp.productPk in (${pkArr})
      order by cp.productPk, c.name`;
    const [assocCats] = await conn.execute(query, pks);
    return assocCats.reduce(
      (catMapping, assocCat) => {
        if (!catMapping[assocCat.productPk]) {
          return {
            ...catMapping,
            [assocCat.productPk]: [{
              ...assocCat,
              productPk: undefined,
            }],
          };
        }
        return {
          ...catMapping,
          [assocCat.productPk]: catMapping[assocCat.productPk].concat({
            ...assocCat,
            productPk: undefined,
          }),
        };
      },
      {},
    );
  },
);

const newCategory = async () => BaseDao.exec(
  async (conn) => {
    const query = 'insert into categories(name, description, slug) values(?, ?, ?)';
    const [result] = await conn.execute(
      query,
      ['Draft Category', null, 'draft-category'],
    );
    return result.insertId;
  },
);

/**
 *
 * @param {number} pk
 * @param {{ name, description, slug }} category
 * @returns
 */
const updateCategoryByPk = async (pk, category) => BaseDao.exec(
  async (conn) => {
    await conn.execute('set transaction isolation level read committed');
    await conn.beginTransaction();
    await conn.execute('select pk, name, description, slug from categories where pk = ? for update', [pk]);
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
    const [result] = await conn.execute(
      query,
      [
        DBUtil.processDbBindParamValue(name),
        DBUtil.processDbBindParamValue(description),
        DBUtil.processDbBindParamValue(slug),
        pk,
      ],
    );
    await conn.commit();
    return result.affectedRows === 1;
  },
  async (conn) => {
    await conn.rollback();
  },
);

/**
 *
 * @param {array} pks
 */
const deleteCategoriesByPks = async (pks) => BaseDao.exec(
  async (conn) => {
    const pkArr = DBUtil.generateParamArrayPlaceholder(pks);
    const query = `delete from categories where pk in (${pkArr})`;
    await conn.execute(query, pks);
    return true;
  },
);

const CategoryDao = {
  getCategories,
  getCategoryByPk,
  getCategoriesByProductPks,
  newCategory,
  updateCategoryByPk,
  deleteCategoriesByPks,
};

export default CategoryDao;
