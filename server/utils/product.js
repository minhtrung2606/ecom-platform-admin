const processProductObjectToBeSent = (product = {}) => {
  return {
    ...product,
    price: +product.price,
    images: product.images?.split(','),
  };
};

const ProductUtil = {
  processProductObjectToBeSent,
};

export default ProductUtil;
