import React, {useEffect} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import {Link} from 'react-router-dom';
import M from 'materialize-css';

const UserDropDownMenu = () => {
  useEffect(() => {
    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {alignment: 'left', constrainWidth: false});
  }, []);

  // -------------------------------------------------------------

  const {authState, authService} = useOktaAuth();

  const login = async () => {
    // Redirect to '/' after login
    console.log('----------------------');
    authService.login('/');
  };

  const logout = async () => {
    // Redirect to '/' after logout
    console.log('----------------------');
    authService.logout('/');
  };

  // -------------------------------------------------------------

  return (
    <a
      className="dropdown-trigger btn btn-floating pink lighten-1"
      href="#!"
      data-target="dropdown1"
    >
      {' '}
      MK
      <ul id="dropdown1" className="dropdown-content">
        <li>
          <Link to="/profile">
            <i className="material-icons">account_circle</i>Profile
          </Link>
        </li>
        <li className="divider" tabIndex="-1"></li>
        {(function() {
          if (authState.isAuthenticated) {
            return (
              <li>
                <a onClick={logout} href="!#">
                  {' '}
                  <i className="material-icons">settings_power</i>Logout
                </a>
              </li>
            );
          } else {
            return (
              <li>
                <a onClick={login} href="!#">
                  {' '}
                  <i className="material-icons">settings_power</i>Login
                </a>
              </li>
            );
          }
        })()}
      </ul>
    </a>
  );
};

export default UserDropDownMenu;
