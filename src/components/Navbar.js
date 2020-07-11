import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import UserContext from '../context/UserContext'

const Navbar = () => {
    const user = useContext(UserContext)

    return (
        <div>
            {user.user.token && <NavLink to="/demo">Demo Requests</NavLink>}
            {user.user.token && <NavLink to="/contactus">Contact Us</NavLink>}
            {user.user.token && <button onClick={user.logout}>Sign Out</button>}
        </div>
    )
}

export default Navbar