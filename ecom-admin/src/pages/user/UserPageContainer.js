import { useSelector } from 'react-redux';
import UserSelectors from './selectors';
import UserPageView from './UserPageView';

const UserPageContainer = () => {
  const loggedInUser = useSelector(UserSelectors.selectLoggedInUser);

  if (!loggedInUser) {
    return (
      <h1>User is not logged in</h1>
    );
  }

  return (
    <UserPageView user={loggedInUser} />
  );
};

export default UserPageContainer;
