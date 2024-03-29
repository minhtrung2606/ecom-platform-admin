import axios from 'axios';

const newProductLoader = async ({ params }) => {
  const resp = await axios.post('/api/v1/products/new');
  const { data: product } = resp.data || {};
  const {
    pk,
    code,
    name,
    price,
    status,
    slug,
  } = product;
  return {
    product: {
      pk,
      code,
      name,
      price,
      status,
      slug,
    },
  };
};

export default newProductLoader;
