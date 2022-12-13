import BaseNavLink from '../BaseNavLink';
import './navbar.styles.css';

const NavBar = () => {
  return (
    <nav className="left-sidebar-nav">
      <ul>
        <li>
          <BaseNavLink to="/" variant="sidebarNav">
            Dashboard
          </BaseNavLink>
        </li>
        <li>
          <BaseNavLink to="/product-mgmt" variant="sidebarNav">
            Product Management
          </BaseNavLink>
        </li>
        <li>
          <BaseNavLink to="/cat-mgmt" variant="sidebarNav">
            Category Management
          </BaseNavLink>
        </li>
        <li>
          <BaseNavLink to="/order-mgmt" variant="sidebarNav">
            Order Management
          </BaseNavLink>
        </li>
        <li>
          <BaseNavLink to="/profile" variant="sidebarNav">
            Profile
          </BaseNavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
