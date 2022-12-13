import { NavLink } from 'react-router-dom';
import './BaseNavLink.css';

const CssClassMapping = {
  standard: '',
  sidebarNav: 'sidebar-nav',
};

const BaseNavLink = ({
  to = '/',
  children,
  variant = 'standard',
}) => {
  return (
    <NavLink
      to={to}
      className={`
        non-decorated-nav-link
        ${CssClassMapping[variant]}
      `}
    >
      {children}
    </NavLink>
  );
};

export default BaseNavLink;
