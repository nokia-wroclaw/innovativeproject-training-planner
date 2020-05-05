import React from 'react';
import {Link} from 'react-router-dom';
import LoginLogout from '../user/loginLogout.component.';

const Navbar = (props) => {
  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper blue darken-3">
        <Link to="/" className="brand-logo center">
          Training Planner LOGO
        </Link>
        <ul className="left">
          <li>
            <Link to="/templateDashboard">Templates</Link>
          </li>
          <li>
            <Link to="/userCalendar">User Calendar</Link>
          </li>
        </ul>
        <ul className="right">
          <li>
            <LoginLogout />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
