import React from "react";
import { useOktaAuth } from "@okta/okta-react";

// TODO rework UI and change name to resemble it's puprose better
const UserDropDownMenu = () => {
  const { authState, authService } = useOktaAuth();

  const login = async () => {
    // Redirect to '/' after login
    authService.login("/");
  };

  const logout = async () => {
    // Redirect to '/' after logout
    authService.logout("/");
  };

  //-------------------------------------------------------------
  const logInOutButton = () => {
    if (authState.isAuthenticated) {
      return (
        <ul className="right">
          <li>
            <button
              onClick={logout}
              className="btn waves-light pink lighten-1"
              style={{ margin: 10 }}
            >
              Logout
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="right">
          <li>
            <button
              onClick={login}
              className="btn pulse waves-effect waves-light pink lighten-1"
              style={{ margin: 10 }}
            >
              Login
            </button>
          </li>
        </ul>
      );
    }
  };

  return <div>{logInOutButton()}</div>;
};

export default UserDropDownMenu;
