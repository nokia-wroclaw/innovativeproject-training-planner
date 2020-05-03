import React from "react";
import { Link } from "react-router-dom";
import LoginLogout from "../user/loginLogout.component.";

const Navbar = () => {
  return (
    <div>
      <nav
        className="nav-wrapper blue darken-3 pinned"
        style={{ position: "fixed", zIndex: 9999 }}
        data-targe="app"
      >
        <Link to="/" className="brand-logo center">
          Training Planner<i className="material-icons right">watch</i>
        </Link>
        <ul className="left">
          <li> <Link to="/templateDashboard">Templates</Link> </li>
          <li> <Link to="/calendar">Calendar</Link> </li>
        </ul>
        <ul className="right">
          <li> <LoginLogout /> </li>
        </ul>
      </nav>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Navbar;
