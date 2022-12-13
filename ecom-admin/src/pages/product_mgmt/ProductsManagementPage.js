import BaseNavLink from '../../components/BaseNavLink';
import ProductListingContainer from './ProductListingContainer';

const ProductsManagementPage = () => {
  return (
    <div className="product-management-page">
      <h1 className="mb-4">Product Management</h1>
      <div className="product-management-action-bar">
        <span className="btn btn-sm btn-primary">
          <BaseNavLink to="/product-mgmt/new">
            <span className="text-white">New Product</span>
          </BaseNavLink>
        </span>
      </div>
      <ProductListingContainer />
    </div>
  );
};

export default ProductsManagementPage;
