import React from 'react';
import { Link } from 'react-router-dom';
import UserDropDownMenu from "../user/userDropDownMenu.component"

const Navbar = () => {

  return (
    <nav className="nav-wrapper blue darken-3" style={{padding: "0 50px"}}>
        <Link to='/' className="brand-logo center">Trainning Planner<i class="material-icons right">watch</i></Link>
        <ul className="left">
            <li><Link to ='/templateDashboard'>Templates</Link></li>
        </ul>
        <ul className="right">
            <li> <UserDropDownMenu/> </li>
        </ul>
    </nav>
  )
}

export default Navbar;