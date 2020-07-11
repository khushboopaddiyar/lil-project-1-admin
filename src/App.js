import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import UserContext from './context/UserContext'
import Auth from './Pages/Auth'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import ContactUs from './Protected/ContactUs'
import DemoRequest from './Protected/DemoRequest'

const App = () => {
    const [user, setUser] = useState({
        userId: '',
        token: ''
    })

    const login = (userId, token) => {
        setUser({
            userId,
            token
        })
    }

    const logout = () => {
        setUser({
            userId: '',
            token: ''
        })
    }

    return (
        <>
            <UserContext.Provider value={{ user, login, logout }}>
                <Router>
                    <Navbar />
                    <main>
                        <Switch>
                            {/* Redirection Rules */}
                            {!user.token && <Redirect from="/" to="/auth" exact />}
                            {!user.token && <Redirect from="/home" to="/auth" exact />}
                            {!user.token && <Redirect from="/contactus" to="/auth" exact />}
                            {!user.token && <Redirect from="/demo" to="/auth" exact />}
                            {user.token && <Redirect from="/auth" to="/home" exact />}

                            {/* Routing */}
                            {!user.token && <Route path="/auth" component={Auth} exact />}
                            {user.token && <Route path="/home" component={Home} exact />}
                            {user.token && <Route path="/demo" component={DemoRequest} exact />}
                            {user.token && <Route path="/contactus" component={ContactUs} exact />}

                            {/* Handle Un-matched route */}
                            <Redirect from="*" to="/" exact />
                        </Switch>
                    </main>
                </Router>
            </UserContext.Provider>
        </>
    )
}

export default App