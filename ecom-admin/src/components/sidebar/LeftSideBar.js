import NavBar from './NavBar';
import OrganizationInfoContainer from './OrganizationInfoContainer';

const LeftSideBar = () => {
  return (
    <div className="left-sidebar">
      <OrganizationInfoContainer />
      <NavBar />
    </div>
  );
};

export default LeftSideBar;
