import CommonUtils from "../../../common/utils";

const fillMdInstancesToProducts = (products = [], productMds = []) => {
  const mdMapping = CommonUtils.createMapping(productMds, 'productId');
  return products.map(
    (product) => {
      const newProd = { ...product };
      const prodId = newProd.id;
      if (mdMapping[prodId]) {
        newProd.md = mdMapping[prodId];
      }
      return newProd;
    }
  );
};

const ProductsApiUtils = {
  fillMdInstancesToProducts,
};

export default ProductsApiUtils;
