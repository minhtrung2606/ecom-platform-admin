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
      msg: 'Cannot create new category',
    });
  }
};

const CategoryController = {
  newCategory,
};

export default CategoryController;
