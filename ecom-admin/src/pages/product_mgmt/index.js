import React from 'react';
import productsLoader from './productsLoader';
import newProductLoader from './newProductLoader';
import editProductLoader from './editProductLoader';

const ProductsManagementPage = React.lazy(() => import('./ProductsManagementPage'));
const ProductForm = React.lazy(() => import('./ProductFormContainer'));

export const ProductPageLoaders = {
  productsLoader,
  newProductLoader,
  editProductLoader,
};

export {
  ProductsManagementPage,
  ProductForm,
};
