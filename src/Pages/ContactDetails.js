import React, { useState, useEffect, useContext } from 'react'
import { Container, LinearProgress } from '@material-ui/core'

import UserContext from '../context/UserContext'

const ContactDetails = () => {
    const user = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://lil-project-1.herokuapp.com/api/contactdetails?all=true', {
            method: 'GET',
            headers: {
                Authorization: user.user.token
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log(json)
                    setIsLoading(false)
                }
            })
            .catch(err => console.log(err))
    }, [user.user.token])
    return (
        <>
            {isLoading &&
                <Container maxWidth="sm">
                    <LinearProgress />
                </Container>
            }
        </>
    )
}

export default ContactDetails