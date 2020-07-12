import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import { Snackbar, SnackbarContent } from '@material-ui/core'

import UserContext from './context/UserContext'
import ToastContext from './context/ToastContext'
import Auth from './Pages/Auth'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import ContactUs from './Protected/ContactUs'
import DemoRequest from './Protected/DemoRequest'
import Testimonials from './Pages/Testimonials'

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
        localStorage.setItem('user', JSON.stringify({ userId, token }))
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser({
            userId: '',
            token: ''
        })
    }

    const [isToastOpen, setIsToastOpen] = useState(false)
    const [snackMessage, setToastMessage] = useState('')
    const handleToastOpen = message => {
        setIsToastOpen(true)
        setToastMessage(message)
    }
    const handleToastClose = () => {
        setIsToastOpen(false)
        setToastMessage('')
    }

    useEffect(() => {
        let user = localStorage.getItem('user')
        if (user) {
            user = JSON.parse(user)
            if (user && user.userId && user.token)
                login(user.userId, user.token)
        }
    }, [])

    return (
        <>
            <UserContext.Provider value={{ user, login, logout }}>
                <ToastContext.Provider value={{ showToast: handleToastOpen }}>
                    <Router>
                        <Navbar>
                            <Switch>
                                {/* Redirection Rules */}
                                {!user.token && <Redirect from="/" to="/auth" exact />}
                                {!user.token && <Redirect from="/home" to="/auth" exact />}
                                {!user.token && <Redirect from="/contactus" to="/auth" exact />}
                                {!user.token && <Redirect from="/demo" to="/auth" exact />}
                                {!user.token && <Redirect from="/testimonial" to="/auth" exact />}
                                {user.token && <Redirect from="/auth" to="/home" exact />}

                                {/* Routing */}
                                {!user.token && <Route path="/auth" component={Auth} exact />}
                                {user.token && <Route path="/home" component={Home} exact />}
                                {user.token && <Route path="/demo" component={DemoRequest} exact />}
                                {user.token && <Route path="/contactus" component={ContactUs} exact />}
                                {user.token && <Route path="/testimonials" component={Testimonials} exact />}

                                {/* Handle Un-matched route */}
                                <Redirect from="*" to="/" exact />
                            </Switch>
                        </Navbar>
                    </Router>
                    <Snackbar open={isToastOpen} autoHideDuration={5000} onClose={handleToastClose}>
                        <SnackbarContent message={snackMessage} />
                    </Snackbar>
                </ToastContext.Provider>
            </UserContext.Provider>
        </>
    )
}

export default App