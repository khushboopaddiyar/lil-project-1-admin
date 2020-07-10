import React, { useState } from 'react';
import Auth from './Pages/Auth'
import Nav from './Pages/Nav'
import ContactUs from './Protected/ContactUs'
import DemoRequest from './Protected/DemoRequest'
import UserContext from './context/UserContext'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState({
    userId: '',
    token: ''
  })

  const login = (userId, token) => {
    console.log('Login Called')
    setUser({
      userId,
      token
    })
  }

  const logout = () => {
    console.log('Logout Called')
    setUser({
      userId: '',
      token: ''
    })
  }

  return (
    <>
      <UserContext.Provider value={{ user, login, logout }}>
        <Router>
        <Nav />
          <Switch>
          {!user.token && <Route path="/auth" component={Auth} exact />}
          {user.token && <Route path="/demo" component={DemoRequest} exact />}
          {user.token && <Route path="/contactus" component={ContactUs} exact />}
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;