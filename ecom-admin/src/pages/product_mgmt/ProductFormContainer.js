import React, { useCallback, useMemo } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import ProductFormView from './ProductFormView';
import './ProductFormContainer.css';
import Hooks from '../../hooks';

const ProductFormContainer = () => {
  const {
    isSending,
    isSuccess,
    error,
    sendApi,
  } = Hooks.useApiCallState();

  const loaderData = useLoaderData();
  const { product } = loaderData || {};
  const asEdit = useMemo(() => !!product?.pk, [product?.pk]);

  const handleSubmit = useCallback(
    product => sendApi({
      method: asEdit ? 'patch' : 'post',
      apiUrl: `/api/v1/products${asEdit ? `/${product.pk}` : ''}`,
      payload: { ...product },
    }),
    [sendApi, asEdit],
  );

  if (isSuccess) {
    return (<Navigate to="/product-mgmt" />);
  }

  return (
    <div id="product-form-container" className="product-form-container">
      <h1 className="mb-4">
        {asEdit ? 'Update Product' : 'Create New Product'}
      </h1>
      {!!error && (
        <p className="alert alert-danger">{error}</p>
      )}
      <ProductFormView
        onSubmit={handleSubmit}
        initialProduct={product}
        asEdit={asEdit}
        forciblyDisabled={isSending}
      />
    </div>
  );
};

export default React.memo(ProductFormContainer);