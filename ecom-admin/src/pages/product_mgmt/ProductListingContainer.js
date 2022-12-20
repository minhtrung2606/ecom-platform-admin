import { useLoaderData } from 'react-router-dom';
import ProductListingView from './ProductListingView';

const productListingHeaders = [
  { name: 'ID', prop: 'pk' },
  { name: 'Code', prop: 'code' },
  { name: 'Name', prop: 'name' },
  { name: 'Price', prop: 'price' },
  { name: 'Status', prop: 'status' },
];

const ProductListingContainer = () => {
  const { products } = useLoaderData();

  return (
    <ProductListingView
      headers={productListingHeaders}
      rows={products}
    />
  );
};

export default ProductListingContainer;
