import React from 'react';

const UserPage = React.lazy(() => import('./UserPageContainer'));

export { default as UserSelectors } from './selectors';
export { default as userReducer } from './userSlice';
export {
  UserPage,
};
