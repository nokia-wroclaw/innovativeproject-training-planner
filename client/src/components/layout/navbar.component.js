import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    <nav className="nav-wrapper blue darken-3">
      <div className="container">
        <Link to='/' className="brand-logo"> Trainning Planner</Link>
        <ul className="right">
            <li><Link to ='/useres'>Create User</Link></li>
            <li><Link to ='/inviteTemplate'>Create Template</Link></li>
            <li><Link to ='/' className='btn btn-floating pink lighten-1'>MK</Link></li>
        </ul>
      </div>
    </nav>
  )
}