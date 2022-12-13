import React from 'react';
import './OrganizationInfoView.css';

const orgBsClsNames = `
  organization-info
  d-flex flex-column
  align-items-start justify-content-center
  p-3 pb-0 border-bottom
`;

const OrganizationInfoView = ({
  loggedInUserEmail,
  organizationName = 'Organization',
}) => {
  return (
    <div className={orgBsClsNames}>
      <h5>{organizationName}</h5>
      <p>{loggedInUserEmail}</p>
    </div>
  );
};

export default React.memo(OrganizationInfoView);
