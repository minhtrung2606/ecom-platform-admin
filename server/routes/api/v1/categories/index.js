import { Router } from 'express';
import CategoryController from '../../../../controllers/category';

const CategoryV1API = Router();

CategoryV1API.post('/new', CategoryController.newCategory);
CategoryV1API.patch('/:catPk', CategoryController.updateCategory);
CategoryV1API.delete('/', CategoryController.deleteCategories);

export default CategoryV1API;
