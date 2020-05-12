import React from 'react';
import {Link} from 'react-router-dom';
import LoginLogout from '../user/loginLogout.component.';

const Navbar = (props) => {
  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper primary-color">
        <Link
          to="/"
          className="brand-logo center"
          style={{fontFamily: 'Denk one'}}
        >
          MiTraining Planner
          <i className="material-icons right">
            <img
              src={process.env.PUBLIC_URL + '/logo-white.png'}
              alt="LOGO"
              width="60"
            />
          </i>
        </Link>
        <ul className="left">
          <li>
            <Link to="/templateDashboard">Templates</Link>
          </li>
          <li>
            <Link to="/statistics">Statistics</Link>
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
