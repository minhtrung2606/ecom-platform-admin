import React, { useCallback, useMemo } from 'react';
import { Table } from '../../components/table';
import ProductActions from './ProductActions';
import ProductValuesMapping from './ProductValuesMapping';

const ProductListingView = ({
  headers,
  rows,
}) => {
  const onDeleteProduct = useCallback((prodPk) => {
    console.log('onDeleteProduct', prodPk);
  }, []);

  const CellComp = useCallback(({ row }) => (
    <ProductActions
      product={row}
      onDeleteProduct={onDeleteProduct}
    />
  ), [onDeleteProduct]);

  const headersWithActions = useMemo(() => {
    return [
      ...headers,
      { name: 'Actions', CellComp },
    ];
  }, [headers, CellComp]);



  return (
    <Table
      headers={headersWithActions}
      rows={rows}
      valueMappings={ProductValuesMapping}
    />
  );
};

export default React.memo(ProductListingView);
