import React from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';
import { RootView } from '../components/root_view';
import SuspendedComp from '../components/SuspendedComp';
import { DashboardPage } from '../pages/dashboard';
import { RouterErrorPage, UnauthorizedPage } from '../pages/errors';
import { LoginPage } from '../pages/login';
import {
  ProductForm,
  ProductPageLoaders,
  ProductsManagementPage,
} from '../pages/product_mgmt';
import { UserPage } from '../pages/user';

const routers = createBrowserRouter([
  {
    path: '/',
    element: (
      <SuspendedComp>
        <RootView />
      </SuspendedComp>
    ),
    errorElement: (
      <SuspendedComp>
        <RouterErrorPage />
      </SuspendedComp>
    ),
    children: [
      {
        index: true,
        element: (
          <SuspendedComp>
            <DashboardPage />
          </SuspendedComp>
        ),
      },
      {
        path: '/product-mgmt',
        loader: ProductPageLoaders.productsLoader,
        element: (
          <SuspendedComp>
            <ProductsManagementPage />
          </SuspendedComp>
        ),
      },
      {
        path: '/product-mgmt/new',
        loader: ProductPageLoaders.newProductLoader,
        element: (
          <SuspendedComp>
            <ProductForm />
          </SuspendedComp>
        ),
      },
      {
        path: '/product-mgmt/:productId/edit',
        loader: ProductPageLoaders.editProductLoader,
        element: (
          <SuspendedComp>
            <ProductForm />
          </SuspendedComp>
        ),
      },
      {
        path: '/cat-mgmt',
        element: (
          <SuspendedComp>
            <UnauthorizedPage />
          </SuspendedComp>
        ),
      },
      {
        path: '/order-mgmt',
        element: (
          <SuspendedComp>
            <UnauthorizedPage />
          </SuspendedComp>
        ),
      },
      {
        path: '/profile',
        element: (
          <SuspendedComp>
            <UserPage />
          </SuspendedComp>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <SuspendedComp>
        <LoginPage />
      </SuspendedComp>
    ),
  },
]);

export default routers;
