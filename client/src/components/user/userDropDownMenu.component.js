import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

const UserDropDownMenu = () => {
  useEffect(() => {
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, { alignment: "left", constrainWidth: false });
  }, []);

  return (
    <a
      className="dropdown-trigger btn btn-floating pink lighten-1"
      href="#!"
      data-target="dropdown1"
    >
      {" "}
      MK
      <ul id="dropdown1" className="dropdown-content">
        <li>
          <Link to="/profile">
            <i className="material-icons">account_circle</i>Profile
          </Link>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <Link to="#!">
            <i className="material-icons">settings_power</i>Logout
          </Link>
        </li>
      </ul>
    </a>
  );
};

export default UserDropDownMenu;
