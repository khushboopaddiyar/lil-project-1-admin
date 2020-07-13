import React, { useContext, useState } from 'react'
import { Avatar, Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import UserContext from '../context/UserContext'
import ToastContext from '../context/ToastContext'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

const Auth = () => {
    const [isLoginDisabled, setIsLoginDisabled] = useState(false)

    const user = useContext(UserContext)
    const toast = useContext(ToastContext)

    const classes = useStyles()

    const handleLogin = async e => {
        e.preventDefault()
        setIsLoginDisabled(true)

        const email = e.currentTarget.elements.email.value
        const password = e.currentTarget.elements.password.value

        if (!email || !password)
            return alert('Email and Password is required!')

        const obj = {
            email,
            password
        }

        const result = await fetch('https://lil-project-1.herokuapp.com/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        const json = await result.json()

        if (json.success === true) {
            user.login(json.data.user._id, json.data.token)
        } else {
            toast.showToast(json.message)
            setIsLoginDisabled(false)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isLoginDisabled}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default Auth