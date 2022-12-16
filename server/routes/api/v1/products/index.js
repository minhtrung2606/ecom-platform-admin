import { Router } from 'express';
import ProductController from '../../../../controllers/product';

const ProductV1API = Router();

ProductV1API.get('/', ProductController.getProducts);
ProductV1API.get('/by-slug/:productSlug', ProductController.getProductBySlug);
ProductV1API.post('/new', ProductController.newProduct);
ProductV1API.patch('/:productPk', ProductController.updateProduct);
ProductV1API.delete('/', ProductController.deleteProducts);
ProductV1API.post('/:productPk/add-to-categories', ProductController.addProductToCategories);

export default ProductV1API;
