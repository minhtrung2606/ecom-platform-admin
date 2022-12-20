import React, { useCallback, useMemo, useState } from 'react';
import ProductStatusForm from './ProductStatusForm';
import ProductValuesMapping from './ProductValuesMapping';

const ProductFormView = ({
  onSubmit = () => {},
  initialProduct = {},
  asEdit = false,
  forciblyDisabled = false,
}) => {
  const [unsavedProduct, setUnsavedProduct] = useState({ ...initialProduct } || {});
  const [alreadyChangedAProp, setAlreadyChangedAProp] = useState(false);

  const handleProductPropChange = useCallback((e) => {
    const { name, value } = e.target || {};
    setAlreadyChangedAProp(true);
    setUnsavedProduct((staleUnsavedProduct) => ({
      ...staleUnsavedProduct,
      [name]: value,
    }));
  }, []);

  const canSubmitChanges = useMemo(() => {
    return (!asEdit || alreadyChangedAProp) && (
      !!unsavedProduct.code &&
      !!unsavedProduct.name &&
      !!unsavedProduct.price &&
      !!unsavedProduct.status
    );
  }, [
    asEdit,
    alreadyChangedAProp,
    unsavedProduct.code,
    unsavedProduct.name,
    unsavedProduct.price,
    unsavedProduct.status,
  ]);

  const handleSubmitProductForm = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit({ ...unsavedProduct });
  }, [unsavedProduct, onSubmit]);

  return (
    <form
      id="product-form"
      className="product-form"
      onSubmit={handleSubmitProductForm}
    >
      {asEdit && (
        <div className="mb-3">
          <label htmlFor="product-id" className="form-label">Id</label>
          <input
            id="product-id"
            name="id"
            className="form-control"
            type="text"
            readOnly
            value={unsavedProduct.pk}
            onChange={handleProductPropChange}
          />
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="product-code" className="form-label">Code</label>
        <input
          id="product-code"
          name="code"
          className="form-control"
          type="text"
          value={unsavedProduct.code}
          onChange={handleProductPropChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="product-name" className="form-label">Name</label>
        <input
          id="product-name"
          name="name"
          className="form-control"
          type="text"
          value={unsavedProduct.name}
          onChange={handleProductPropChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="product-price" className="form-label">Price</label>
        <input
          id="product-price"
          name="price"
          className="form-control"
          type="number"
          value={unsavedProduct.price}
          onChange={handleProductPropChange}
        />
      </div>
      <div className="mb-3">
        <ProductStatusForm
          initialStatus={unsavedProduct.status}
          onChange={handleProductPropChange}
        />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-primary form-control"
          disabled={forciblyDisabled || !canSubmitChanges}
        >
          {asEdit ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default React.memo(ProductFormView);