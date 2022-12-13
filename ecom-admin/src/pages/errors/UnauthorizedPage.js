import React from 'react';
import './UnauthorizedPage.css';

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-page d-flex flex-column align-items-center justify-content-center">
      <h1>Unauthorized Page</h1>
      <p>You do not have permission to access this page</p>
      <p>Please contact your admin for more information</p>
    </div>
  );
};

export default React.memo(UnauthorizedPage);
