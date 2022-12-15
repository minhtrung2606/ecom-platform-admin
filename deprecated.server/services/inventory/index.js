import productMds from './mock/productMds';
import products from './mock/products';
import Product from './models/Product';

const getProducts = () => {
  return products;
};

const getProductById = (id) => {
  return products.find(({ id: prodId }) => prodId === id);
};

const getProductMdsByProdIds = (ids = []) => {
  return productMds
    .filter(({ productId }) => ids.includes(productId))
    .map(md => ({ ...md }));
};

const newProduct = () => {
  const product = new Product();
  product.id = products.length + 1;
  product.code = products.length + 1;
  product.name = 'Unknown name';
  product.price = 0;
  products.push(product);
  return product;
};

const updateProduct = (id, changedProduct) => {
  const product = getProductById(id);
  product.code = changedProduct.code;
  product.name = changedProduct.name;
  product.price = changedProduct.price;
  product.status = changedProduct.status;
  return true;
};

const InventoryService = {
  getProducts,
  getProductById,
  getProductMdsByProdIds,
  newProduct,
  updateProduct,
};

export default InventoryService;
