import DBUtil from '../utils/db';
import BaseDao from './base';

const getProducts = async () => BaseDao.exec(
  async (conn) => {
    const query = 'select * from products';
    const [products] = await conn.execute(query);
    return products;
  },
);

/**
 *
 * @param {number} pk
 *
 * @returns
 */
const getProductByPk = async (pk) => BaseDao.exec(
  async (conn) => {
    const query = 'select * from products where pk = ?';
    const [products] = await conn.execute(query, [pk]);
    return products[0];
  },
);

const newProduct = async () => BaseDao.exec(
  async (conn) => {
    const query = 'insert into products(name, code, slug) values(?, ?, ?)';
    const [result] = await conn.execute(
      query,
      ['Draft Product', 'draft-product', 'draft-product'],
    );
    return result.insertId;
  },
);

/**
 *
 * @param {number} pk
 * @param {{ name, description, slug }} product
 * @returns
 */
const updateProductByPk = async (pk, product) => BaseDao.exec(
  async (conn) => {
    await conn.execute('set transaction isolation level read committed');
    await conn.beginTransaction();
    await conn.execute(`
      select pk, name, description, code,
             slug, price, unit, images
      from products
      where pk = ? for update`,
      [pk],
    );
    const {
      name,
      description,
      code,
      slug,
      price,
      unit,
      images,
    } = product || {};
    const query = `
      update products
        set name = coalesce(?, name),
        description = coalesce(?, description),
        code = coalesce(?, code),
        slug = coalesce(?, slug),
        price = coalesce(?, price),
        unit = coalesce(?, unit),
        images = coalesce(?, images)
      where pk = ?
    `;
    const [result] = await conn.execute(
      query,
      [
        DBUtil.processDbBindParamValue(name),
        DBUtil.processDbBindParamValue(description),
        DBUtil.processDbBindParamValue(code),
        DBUtil.processDbBindParamValue(slug),
        DBUtil.processDbBindParamValue(+price),
        DBUtil.processDbBindParamValue(unit),
        DBUtil.processDbBindParamValue(images),
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
const deleteProductsByPks = async (pks) => BaseDao.exec(
  async (conn) => {
    const pkArr = DBUtil.generateParamArrayPlaceholder(pks);
    const query = `delete from products where pk in (${pkArr})`;
    await conn.execute(query, pks);
    return true;
  },
);

const ProductDao = {
  getProducts,
  getProductByPk,
  newProduct,
  updateProductByPk,
  deleteProductsByPks,
};

export default ProductDao;
