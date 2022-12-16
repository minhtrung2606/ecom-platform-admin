import { Request, Response } from 'express';
import ProductDao from '../dao/product';
import ProductUtil from '../utils/product';
import CategoryController from './category';

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns
 */
const getProducts = async (req, res) => {
  try {
    const { inclCats } = req.query;
    const products = await ProductDao.getProducts();

    let catMapping = {};
    if (+inclCats === 1) {
      const productPks = products.map(({ pk }) => pk);
      catMapping = await CategoryController.getCategoriesByProductPks(productPks);
    }

    const productsToBeSent = products?.map(
      product => ({
        ...ProductUtil.processProductObjectToBeSent(product),
        rel: {
          cats: catMapping[product.pk],
        },
      }),
    )

    res.json({
      isSuccess: true,
      data: productsToBeSent,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      isSuccess: false,
      msg: 'An error occur when getting products',
    });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns
 */
const getProductBySlug = async (req, res) => {
  try {
    const { productSlug } = req.params;
    const product = await ProductDao.getProductBySlug(productSlug);
    const catMapping = await CategoryController.getCategoriesByProductPks([product.pk]);
    const cats = catMapping[product.pk];
    res.json({
      isSuccess: true,
      data: {
        ...ProductUtil.processProductObjectToBeSent(product),
        rel: { cats },
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      isSuccess: false,
      msg: 'An error occur when getting given product by its slug',
    });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns
 */
const newProduct = async (req, res) => {
  try {
    const newlyInsertedPk = await ProductDao.newProduct();

    if (+newlyInsertedPk <= 0) {
      res.json({
        isSuccess: false,
        msg: 'Cannot create new product',
      });
      return;
    }

    const newlyCreatedProduct = await ProductDao.getProductByPk(newlyInsertedPk);
    res.json({
      isSuccess: true,
      data: ProductUtil.processProductObjectToBeSent(newlyCreatedProduct),
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      isSuccess: false,
      msg: 'An error occur when creating a new product',
    });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns
 */
const updateProduct = async (req, res) => {
  try {
    const { productPk } = req.params;
    const updatingProduct = req.body;

    if (+productPk !== +updatingProduct?.pk) {
      res.status(422);
      res.json({
        isSuccess: false,
        msg: 'Cannot update given product',
      });
      return;
    }

    const isSuccess = await ProductDao.updateProductByPk(
      +productPk,
      {
        ...updatingProduct,
        images: updatingProduct.images?.join(',') || null,
      },
    );
    res.json({
      isSuccess,
      data: isSuccess ? updatingProduct : null,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      isSuccess: false,
      msg: 'An error occur when updating given product',
    });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns
 */
const deleteProducts = async (req, res) => {
  try {
    const { pks } = req.body;

    if (!pks || pks.length === 0) {
      res.json({
        isSuccess: false,
        msg: 'Cannot delete given products',
      });
      return;
    }

    const deletingPks = pks.filter(pk => +pk > 0);
    const isSuccess = await ProductDao.deleteProductsByPks(deletingPks);
    res.json({
      isSuccess,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      isSuccess: false,
      msg: 'An error occur when deleting given products',
    });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns
 */
const addProductToCategories = async (req, res) => {
  try {
    const { productPk } = req.params;
    const { pk, catPks } = req.body;

    if (!catPks) {
      res.json({
        isSuccess: false,
        msg: 'Cannot add given product to given categories',
      });
      return;
    }

    if (+productPk !== +pk) {
      res.status(422);
      res.json({
        isSuccess: false,
        msg: 'Cannot update given product',
      });
      return;
    }

    const assocCatePks = catPks.filter(pk => +pk > 0);
    const isSuccess = await ProductDao.addProductToCategories(productPk, assocCatePks);
    res.json({
      isSuccess,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      isSuccess: false,
      msg: 'An error occur when adding given product to given categories',
    });
  }
};

const ProductController = {
  getProducts,
  getProductBySlug,
  newProduct,
  updateProduct,
  deleteProducts,
  addProductToCategories,
};

export default ProductController;
