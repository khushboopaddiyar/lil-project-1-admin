import React ,{useContext} from 'react';
import Button from './Button'
import * as ReactBootStrap from "react-bootstrap";
import {NavLink} from 'react-router-dom'
import UserContext from '../context/UserContext'

function Nav() {
  const user = useContext(UserContext)
  return (
    <div className="Nav">
     <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="primary" variant="dark">
  <ReactBootStrap.Navbar.Brand href="#home">LIL</ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="mr-auto">
  {user.user.token &&  <Button />    }
   {user.user.token && <NavLink to= "/demo">DemoRequest</NavLink>}
    {user.user.token &&  <NavLink to= "/contactus">ContactUs </NavLink>}        
           
       
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
    </div>
  );
}

export default Nav;

	
