import React from 'react';
import { useSelector } from 'react-redux';
import { UserSelectors } from '../../pages/user';
import OrganizationInfoView from './OrganizationInfoView';

const OrganizationInfo = () => {
  const loggedInUser = useSelector(UserSelectors.selectLoggedInUser);

  const { email, organizationName } = loggedInUser || {};

  return (
    <OrganizationInfoView
      organizationName={organizationName}
      loggedInUserEmail={email}
    />
  );
};

export default React.memo(OrganizationInfo);
