import axios from 'axios';

const productsLoader = async () => {
  const resp = await axios.get('/api/v1/products');
  const { data: products } = resp.data || {};
  return { products };
};

export default productsLoader;
