import axios from 'axios';

const newProductLoader = async ({ params }) => {
  const resp = await axios.post('/api/v1/products/new');
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

export default newProductLoader;
