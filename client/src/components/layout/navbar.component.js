import React from "react";
import { Link } from "react-router-dom";
import UserDropDownMenu from "../user/userDropDownMenu.component";

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
          <li>
            <Link to="/templateDashboard">Templates</Link>
          </li>
        </ul>
        <ul className="right">
          <li>
            <UserDropDownMenu />
          </li>
        </ul>
      </nav>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Navbar;
