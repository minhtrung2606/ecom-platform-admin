import axios from 'axios';

const editProductLoader = async ({ params }) => {
  const resp = await axios.get(`/api/v1/products/${params.productPk}`);
  const { data: product } = resp.data || {};
  const {
    pk,
    code,
    name,
    price,
    status,
  } = product;
  return {
    product: {
      pk,
      code,
      name,
      price,
      status,
    },
  };
};

export default editProductLoader;
