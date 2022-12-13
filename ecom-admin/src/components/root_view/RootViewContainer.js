import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { UserSelectors } from '../../pages/user';
import { userReduxActions } from '../../pages/user/userSlice';
import RootView from './RootView';

const RootViewContainer = () => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector(UserSelectors.selectLoggedInUser);
  const [loadingLoggedInUser, setLoadingLoggedInUser] = useState(!loggedInUser);

  const tryGettingLoggedInUserFromSesssion = useCallback(
    async () => {
      try {
        const resp = await axios.get('/api/v1/users/me');
        const { data: user, isSuccess } = resp.data;
        if (isSuccess && user?.pk) {
          dispatch(
            userReduxActions.setLoggedInUser(user),
          );
        }
      } catch (e) {
      } finally {
        setLoadingLoggedInUser(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!loggedInUser) {
      tryGettingLoggedInUserFromSesssion();
    }
  }, [loggedInUser, tryGettingLoggedInUserFromSesssion]);

  if (loadingLoggedInUser) {
    return (
      <div className="error-page vh-100 vw-100 d-flex flex-column align-items-center justify-content-center">
        Loading logged-in user...
      </div>
    );
  }

  if (!loggedInUser) {
    return (<Navigate to="/login" />);
  }
  return (<RootView />);
};

export default RootViewContainer;
