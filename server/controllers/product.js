import { Request, Response } from 'express';
import ProductDao from '../dao/product';
import ProductUtil from '../utils/product';

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns
 */
const getProducts = async (req, res) => {
  try {
    const products = await ProductDao.getProducts();
    res.json({
      isSuccess: true,
      data: products?.map(
        product => ProductUtil.processProductObjectToBeSent(product),
      ),
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
    await ProductDao.deleteProductsByPks(deletingPks);
    res.json({
      isSuccess: true,
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

const ProductController = {
  getProducts,
  newProduct,
  updateProduct,
  deleteProducts,
};

export default ProductController;
