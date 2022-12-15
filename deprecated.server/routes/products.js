import ProductsController from '../api/v1/products';
import BaseRouter from './BaseRouter';

const productsRouter = new BaseRouter('/api/v1/products');

productsRouter.addGetRequest('/')((req, res, next) => {
  const products = ProductsController.getProducts();
  res.json({ data: products, isSuccess: true });
});

productsRouter.addGetRequest('/:productId')((req, res, next) => {
  const { productId } = req.params;
  const product = ProductsController.getProductById(productId);
  res.json({ data: product, isSuccess: true });
});

productsRouter.addPostRequest('/new')((req, res, next) => {
  const product = ProductsController.newProduct();
  res.json({ data: product, isSuccess: !!product });
});

productsRouter.addPatchRequest('/:productId')((req, res, next) => {
  const { productId } = req.params;
  const updatedProduct = ProductsController.updateProduct(productId, req.body);
  res.json({ data: updatedProduct, isSuccess: !!updatedProduct });
});

export default productsRouter;
