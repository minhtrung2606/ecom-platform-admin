import axios from 'axios';

const editProductLoader = async ({ params }) => {
  const resp = await axios.get(`/api/v1/products/${params.productId}`);
  const { data: product } = resp.data || {};
  const {
    id,
    code,
    name,
    price,
    status,
  } = product;
  return {
    product: {
      id,
      code,
      name,
      price,
      status,
    },
  };
};

export default editProductLoader;
