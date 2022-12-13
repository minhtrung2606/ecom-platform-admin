import { Outlet } from 'react-router-dom';
import { LeftSideBar } from '../sidebar';
import './styles.css';

const RootView = () => {
  return (
    <div id="root-view" className="root-view">
      <LeftSideBar />
      <div id="detail" className="app-content p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default RootView;
