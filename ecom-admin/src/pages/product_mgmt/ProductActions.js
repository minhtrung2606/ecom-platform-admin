import React, { useCallback } from 'react';
import BaseNavLink from '../../components/BaseNavLink';

const ProductActions = ({ product, onDeleteProduct }) => {
  const deleteProduct = useCallback(
    () => onDeleteProduct(product?.pk),
    [product?.pk, onDeleteProduct],
  );
  return (
    <>
      <span className="me-3">
        <BaseNavLink to={`/product-mgmt/${product?.pk}/edit`}>
          <i class="bi bi-pencil-square text-warning" />
        </BaseNavLink>
      </span>
      <span>
        <i
          class="bi bi-trash as-pointer text-danger"
          onClick={deleteProduct}
        />
      </span>
    </>
  );
};

export default React.memo(ProductActions);
