import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

const UserDropDownMenu = () => {

    useEffect(() => {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {alignment:"left", constrainWidth:false});
      }, [])

    return(
        <a class='dropdown-trigger btn btn-floating pink lighten-1' href='#' data-target='dropdown1'> MK
            <ul id='dropdown1' class='dropdown-content'>
                <li><Link to ="/profile"><i class="material-icons">account_circle</i>Profile</Link></li>
                <li class="divider" tabindex="-1"></li>
                <li><a href="#!"><i class="material-icons">settings_power</i>Logout</a></li>
            </ul>
        </a>
    )
}

export default UserDropDownMenu;