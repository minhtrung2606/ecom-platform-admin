import { Router } from 'express';
import ProductController from '../../../../controllers/product';

const ProductV1API = Router();

ProductV1API.get('/', ProductController.getProducts);
ProductV1API.post('/new', ProductController.newProduct);
ProductV1API.patch('/:productPk', ProductController.updateProduct);
ProductV1API.delete('/', ProductController.deleteProducts);

export default ProductV1API;
