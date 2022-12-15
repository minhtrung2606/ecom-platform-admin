import { Router } from 'express';
import CategoryController from '../../../../controllers/category';

const CategoryV1API = Router();

CategoryV1API.post('/new', CategoryController.newCategory);

export default CategoryV1API;
