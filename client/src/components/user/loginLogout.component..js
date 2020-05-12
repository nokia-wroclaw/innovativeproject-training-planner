import React from 'react';
import {useOktaAuth} from '@okta/okta-react';

// TODO rework UI -> will be done when user will be developed
const LoginLogout = () => {
  const {authState, authService} = useOktaAuth();

  const login = async () => {
    // Redirect to '/' after login
    console.log("tutaj")
    // authService.login('/CheckUser');
  };

  const logout = async () => {
    // Redirect to '/' after logout
    authService.logout('/');
  };

  // -------------------------------------------------------------
  const logInOutButton = () => {
    if (authState.isAuthenticated) {
      return (
        <ul className="right">
          <li>
            <button
              onClick={logout}
              className="btn waves-light secondary-color"
              style={{marginRight: 40, width: 100}}
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
              className="btn pulse waves-effect waves-light secondary-color"
              style={{marginRight: 40, width: 100}}
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

export default LoginLogout;
