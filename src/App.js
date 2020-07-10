import React, { useState } from 'react';
import Auth from './Pages/Auth'
import Nav from './Pages/Nav'
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
          <Switch>
            {!user.token && <Redirect from="/auth" to="/auth" exact />}
            {!user.token && <Redirect from="/nav" to="/nav" exact />}
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;