import { Request, Response } from 'express';
import CategoryDao from '../dao/category';

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns
 */
const newCategory = async (req, res) => {
  try {
    const newlyInsertedPk = await CategoryDao.newCategory();

    if (+newlyInsertedPk <= 0) {
      res.json({
        isSuccess: false,
        msg: 'Cannot create new category',
      });
      return;
    }

    const newlyCreatedCat = await CategoryDao.getCategoryByPk(newlyInsertedPk);
    res.json({
      isSuccess: true,
      data: newlyCreatedCat,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      isSuccess: false,
      msg: 'An error occur when creating a new category',
    });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns
 */
const updateCategory = async (req, res) => {
  try {
    const { catPk } = req.params;
    const updatingCat = req.body;

    if (+catPk !== +updatingCat?.pk) {
      res.status(422);
      res.json({
        isSuccess: false,
        msg: 'Cannot update given category',
      });
      return;
    }

    const isSuccess = await CategoryDao.updateCategoryByPk(+catPk, updatingCat);
    res.json({
      isSuccess,
      data: isSuccess ? updatingCat : null,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      isSuccess: false,
      msg: 'An error occur when updating given category',
    });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns
 */
const deleteCategories = async (req, res) => {
  try {
    const { pks } = req.body;

    if (!pks || pks.length === 0) {
      res.json({
        isSuccess: false,
        msg: 'Cannot delete invalid categories',
      });
      return;
    }

    await CategoryDao.deleteCategoriesByPks(pks);
    res.json({
      isSuccess: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      isSuccess: false,
      msg: 'An error occur when deleting given categories',
    });
  }
};

const CategoryController = {
  newCategory,
  updateCategory,
  deleteCategories,
};

export default CategoryController;