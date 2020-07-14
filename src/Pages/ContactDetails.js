import React, { useState, useContext, useEffect } from 'react'
import { Container, LinearProgress, TextField, Typography, Button, Tab, Tabs, Paper, Card, CardContent, Snackbar, SnackbarContent } from '@material-ui/core'
import { Edit as EditIcon, Cancel as CancelIcon, Done as DoneIcon } from '@material-ui/icons'
import moment from 'moment'

import UserContext from '../context/UserContext'

const ContactDetails = () => {
    const user = useContext(UserContext)

    const [isToastOpen, setIsToastOpen] = useState(false)
    const [snackMessage, setToastMessage] = useState('')
    const showToast = message => {
        setIsToastOpen(true)
        setToastMessage(message)
    }
    const handleToastClose = () => {
        setIsToastOpen(false)
        setToastMessage('')
    }

    const [isLoading, setIsLoading] = useState(true)

    const [tab, setTab] = useState(0)
    const handleTabChange = (event, newValue) => setTab(newValue)

    const [contactDetails, setContactDetails] = useState({
        _id: '',
        __v: '',
        address: '',
        email: '',
        contactNumber: '',
        linkedin: '',
        facebook: '',
        createdAt: '',
        updatedAt: ''
    })
    const [allContactDetails, setAllContactDetails] = useState([])
    const [editContactDetails, setEditContactDetails] = useState(false)

    const toggleEditContactDetails = () => setEditContactDetails(!editContactDetails)

    const addContactDetails = e => {
        e.preventDefault()
        const { address, email, contactNumber, linkedin, facebook } = e.currentTarget.elements
        const obj = {
            address: address.value,
            email: email.value,
            contactNumber: contactNumber.value,
            linkedin: linkedin.value,
            facebook: facebook.value
        }
        setEditContactDetails(false)
        fetch('https://lil-project-1.herokuapp.com/api/contactdetails', {
            method: 'POST',
            headers: {
                Authorization: user.user.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setAllContactDetails([json.data.contactDetails, ...allContactDetails])
                    setContactDetails(json.data.contactDetails)
                    showToast('Contact Us Details Updated Successfully!')
                }
            }).catch(err => console.log(err))
    }

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
                    if (json.data.contactDetails.length > 0) {
                        setAllContactDetails(json.data.contactDetails)
                        setContactDetails(json.data.contactDetails[0])
                    }
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
            {!isLoading &&
                <Container maxWidth="md">
                    <Tabs
                        value={tab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleTabChange}
                    >
                        <Tab label="Current Contact Details" />
                        <Tab label="Previous Contact Details" />
                    </Tabs>
                    {tab === 0 &&
                        <>
                            <Container>
                                <Paper style={{ marginTop: 16 }}>
                                    <Container>
                                        <form onSubmit={addContactDetails}>
                                            {!editContactDetails &&
                                                <Button
                                                    color="primary"
                                                    startIcon={<EditIcon />}
                                                    onClick={toggleEditContactDetails}
                                                >
                                                    Edit
                                                </Button>
                                            }
                                            {editContactDetails &&
                                                <>
                                                    <Button
                                                        color="secondary"
                                                        onClick={toggleEditContactDetails}
                                                        startIcon={<CancelIcon />}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        startIcon={<DoneIcon />}
                                                    >
                                                        Done
                                                    </Button>
                                                </>
                                            }
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                multiline
                                                id="address"
                                                name="address"
                                                label="Address"
                                                defaultValue={contactDetails.address}
                                                autoFocus
                                                disabled={!editContactDetails}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                type="email"
                                                id="email"
                                                name="email"
                                                label="Email"
                                                defaultValue={contactDetails.email}
                                                disabled={!editContactDetails}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                type="number"
                                                id="contactNumber"
                                                name="contactNumber"
                                                label="Contact Number"
                                                defaultValue={contactDetails.contactNumber}
                                                disabled={!editContactDetails}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                type="url"
                                                id="linkedin"
                                                name="linkedin"
                                                label="Linkedin"
                                                defaultValue={contactDetails.linkedin}
                                                disabled={!editContactDetails}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                type="url"
                                                id="facebook"
                                                name="facebook"
                                                label="Facebook"
                                                defaultValue={contactDetails.facebook}
                                                disabled={!editContactDetails}
                                            />
                                        </form>
                                    </Container>
                                </Paper>
                                <br />
                                <Typography>
                                    Last Changed {moment(new Date(contactDetails.createdAt)).format('MMMM Do YYYY, h:mm:ss a')}
                                </Typography>
                            </Container>
                        </>
                    }
                    {tab === 1 &&
                        <Container>
                            {
                                allContactDetails.map(contactDetails =>
                                    <Card style={{ marginTop: 12 }} key={contactDetails._id}>
                                        <CardContent>
                                            <Typography variant="body2">
                                                <strong>Address</strong> {contactDetails.address}
                                            </Typography>
                                            <br />
                                            <Typography variant="body2">
                                                <strong>Email</strong> <a href={'mailto:' + contactDetails.email}>{contactDetails.email}</a>
                                            </Typography>
                                            <br />
                                            <Typography variant="body2">
                                                <strong>Contact Number</strong> <a href={'mailto:' + contactDetails.contactNumber}>{contactDetails.contactNumber}</a>
                                            </Typography>
                                            <br />
                                            <Typography variant="body2">
                                                <strong>Linkedin</strong> <a href={contactDetails.linkedin}>{contactDetails.linkedin}</a>
                                            </Typography>
                                            <br />
                                            <Typography variant="body2">
                                                <strong>Facebook</strong> <a href={contactDetails.facebook}>{contactDetails.facebook}</a>
                                            </Typography>
                                            <br />
                                            <Typography variant="overline">
                                                {moment(new Date(contactDetails.createdAt)).format('MMMM Do YYYY, h:mm:ss a')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )
                            }
                        </Container>
                    }
                </Container>
            }
            <Snackbar open={isToastOpen} autoHideDuration={5000} onClose={handleToastClose}>
                <SnackbarContent message={snackMessage} />
            </Snackbar>
        </>
    )
}

export default ContactDetails