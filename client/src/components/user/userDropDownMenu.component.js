import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { GoogleLogout } from 'react-google-login';

const UserDropDownMenu = () => {

    function responseGoogle(response) {
      console.log(response);
      M.toast({ html:"Good Bye From Google!!" });
    }
    useEffect(() => {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {alignment:"left", constrainWidth:false});
      }, [])

    return(
        <a className='dropdown-trigger btn btn-floating pink lighten-1' href='#!' data-target='dropdown1'> MK
            <ul id='dropdown1' className='dropdown-content'>
                <li><Link to ="/profile"><i className="material-icons">account_circle</i>Profile</Link></li>
                <li className="divider" tabIndex="-1"></li>
                <GoogleLogout
                  clientId="629147303109-b417pdhfab177nnf8jen6ta3qi59pf8k.apps.googleusercontent.com"
                  buttonText="Logout"
                  onLogoutSuccess={responseGoogle}
                >
                </GoogleLogout>
            </ul>
        </a>
    )
}

export default UserDropDownMenu;
