import React from 'react';

const RouterErrorPage = React.lazy(() => import('./RouterErrorPage'));
const UnauthorizedPage = React.lazy(() => import('./UnauthorizedPage'));

export {
  RouterErrorPage,
  UnauthorizedPage,
};
