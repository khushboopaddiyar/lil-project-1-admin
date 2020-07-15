import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import UserContext from './context/UserContext'
import Auth from './Pages/Auth'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import ContactUs from './Protected/ContactUs'
import DemoRequest from './Protected/DemoRequest'
import Testimonials from './Pages/Testimonials'
import Courses from './Pages/Courses'
import AboutUs from './Pages/AboutUs'
import ContactDetails from './Pages/ContactDetails'
import Gallery from './Pages/Gallery'
import TeamMembers from './Pages/TeamMembers'
import Curators from './Pages/Curators'

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

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#1a73e8',
            }
        }
    })

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
                <Router>
                    <ThemeProvider theme={theme}>
                        <Navbar>
                            <Switch>
                                {/* Redirection Rules */}
                                {!user.token && <Redirect from="/" to="/auth" exact />}
                                {!user.token && <Redirect from="/home" to="/auth" exact />}
                                {!user.token && <Redirect from="/contactus" to="/auth" exact />}
                                {!user.token && <Redirect from="/demo" to="/auth" exact />}
                                {!user.token && <Redirect from="/testimonial" to="/auth" exact />}
                                {!user.token && <Redirect from="/courses" to="/auth" exact />}
                                {!user.token && <Redirect from="/aboutus" to="/auth" exact />}
                                {!user.token && <Redirect from="/contactdetails" to="/auth" exact />}
                                {!user.token && <Redirect from="/gallery" to="/auth" exact />}
                                {!user.token && <Redirect from="/teammembers" to="/auth" exact />}
                                {!user.token && <Redirect from="/curators" to="/auth" exact />}
                                {user.token && <Redirect from="/auth" to="/home" exact />}
                                {user.token && <Redirect from="/" to="/home" exact />}

                                {/* Routing */}
                                {!user.token && <Route path="/auth" component={Auth} exact />}
                                {user.token && <Route path="/home" component={Home} exact />}
                                {user.token && <Route path="/demo" component={DemoRequest} exact />}
                                {user.token && <Route path="/contactus" component={ContactUs} exact />}
                                {user.token && <Route path="/testimonials" component={Testimonials} exact />}
                                {user.token && <Route path="/courses" component={Courses} exact />}
                                {user.token && <Route path="/aboutus" component={AboutUs} exact />}
                                {user.token && <Route path="/contactdetails" component={ContactDetails} exact />}
                                {user.token && <Route path="/gallery" component={Gallery} exact />}
                                {user.token && <Route path="/teammembers" component={TeamMembers} exact />}
                                {user.token && <Route path="/curators" component={Curators} exact />}

                                {/* Handle Un-matched route */}
                                <Redirect from="*" to="/" exact />
                            </Switch>
                        </Navbar>
                    </ThemeProvider>
                </Router>
            </UserContext.Provider>
        </>
    )
}

export default App