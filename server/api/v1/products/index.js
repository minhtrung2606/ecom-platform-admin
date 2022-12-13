import CategoryService from '../../../services/category';
import InventoryService from '../../../services/inventory';
import ProductsApiUtils from './utils';

const fillCategoriesToProducts = (products = []) => {
  return products.map(
    (product) => ({
      ...product,
      categories: CategoryService.getCategoriesByIds(product.categories),
    }),
  );
};

const getProducts = () => {
  let products = InventoryService.getProducts();
  const prodIds = products.map(({ id }) => id);
  const prodMds = InventoryService.getProductMdsByProdIds(prodIds);

  products = ProductsApiUtils.fillMdInstancesToProducts(products, prodMds);
  products = fillCategoriesToProducts(products);

  return products;
};

const getProductById = (id) => {
  const product= InventoryService.getProductById(+id);

  if (!product) {
    return null;
  }

  let products = [product];
  const prodIds = products.map(({ id }) => id);
  const prodMds = InventoryService.getProductMdsByProdIds(prodIds);

  products = ProductsApiUtils.fillMdInstancesToProducts(products, prodMds);
  products = fillCategoriesToProducts(products);

  return products[0];
};

const newProduct = () => {
  const { id } = InventoryService.newProduct() || {};
  return getProductById(id);
};

const updateProduct = (id, changedProduct) => {
  const isSuccess = InventoryService.updateProduct(+id, changedProduct);
  if (isSuccess) {
    return getProductById(+id);
  }
  return null;
};

const ProductsController = {
  getProducts,
  getProductById,
  newProduct,
  updateProduct,
};

export default ProductsController;
