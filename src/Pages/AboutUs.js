import React, { useState, useContext, useEffect } from 'react'
import { Container, LinearProgress, TextField, Typography, Button, Tab, Tabs, Paper, Card, CardContent, Snackbar, SnackbarContent } from '@material-ui/core'
import { Edit as EditIcon, Cancel as CancelIcon, Done as DoneIcon } from '@material-ui/icons'
import moment from 'moment'

import UserContext from '../context/UserContext'

const About = () => {
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

    const [aboutUs, setAboutUs] = useState({
        _id: '',
        __v: '',
        whatAreWe: '',
        whatWereWe: '',
        whatWeDo: '',
        createdAt: '',
        updatedAt: ''
    })
    const [allAboutUs, setAllAboutUs] = useState([])
    const [editAboutUs, setEditAboutUs] = useState(false)

    const toggleEditAboutUs = () => setEditAboutUs(!editAboutUs)

    const addAboutUs = e => {
        e.preventDefault()
        const { whatAreWe, whatWereWe, whatWeDo } = e.currentTarget.elements
        const obj = {
            whatAreWe: whatAreWe.value,
            whatWereWe: whatWereWe.value,
            whatWeDo: whatWeDo.value
        }
        setEditAboutUs(false)
        fetch('https://lil-project-1.herokuapp.com/api/about', {
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
                    setAllAboutUs([json.data.about, ...allAboutUs])
                    setAboutUs(json.data.about)
                    showToast('About Us Details Updated Successfully!')
                }
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        fetch('https://lil-project-1.herokuapp.com/api/about?all=true', {
            method: 'GET',
            headers: {
                Authorization: user.user.token
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    if (json.data.about.length > 0) {
                        setAllAboutUs(json.data.about)
                        setAboutUs(json.data.about[0])
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
                        <Tab label="Current About Us" />
                        <Tab label="Previous About Us" />
                    </Tabs>
                    {tab === 0 &&
                        <>
                            {!editAboutUs &&
                                <Button
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    onClick={toggleEditAboutUs}
                                >
                                    Edit
                                </Button>
                            }
                            <Container>
                                {editAboutUs &&
                                    <Paper style={{ marginTop: 16 }}>
                                        <Container>
                                            <form onSubmit={addAboutUs}>
                                                <Button
                                                    color="secondary"
                                                    onClick={toggleEditAboutUs}
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
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    multiline
                                                    id="whatAreWe"
                                                    name="whatAreWe"
                                                    label="What Are We?"
                                                    defaultValue={aboutUs.whatAreWe}
                                                    autoFocus
                                                />
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    multiline
                                                    id="whatWereWe"
                                                    name="whatWereWe"
                                                    label="What Were We?"
                                                    defaultValue={aboutUs.whatWereWe}
                                                />
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    multiline
                                                    id="whatWeDo"
                                                    name="whatWeDo"
                                                    label="What We Do?"
                                                    defaultValue={aboutUs.whatWeDo}
                                                />
                                            </form>
                                        </Container>
                                    </Paper>
                                }
                                {!editAboutUs &&
                                    <>
                                        <Container style={{ marginBottom: 12 }}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6">
                                                        What Are We?
                                                    </Typography>
                                                    <br />
                                                    <Typography variant="subtitle2">
                                                        {aboutUs.whatAreWe}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Container>
                                        <Container style={{ marginBottom: 8 }}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6">
                                                        What Were We?
                                                    </Typography>
                                                    <br />
                                                    <Typography variant="subtitle2">
                                                        {aboutUs.whatWereWe}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Container>
                                        <Container>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6">
                                                        What We Do?
                                                    </Typography>
                                                    <br />
                                                    <Typography variant="subtitle2">
                                                        {aboutUs.whatWeDo}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Container>
                                    </>
                                }
                            </Container>
                            <br />
                            <Container>
                                <Typography>
                                    Last Changed {moment(new Date(aboutUs.createdAt)).format('MMMM Do YYYY, h:mm:ss a')}
                                </Typography>
                            </Container>
                        </>
                    }
                    {tab === 1 &&
                        <Container>
                            {
                                allAboutUs.map((about, index) =>
                                    <Card style={{ marginTop: 12 }}>
                                        <CardContent>
                                            <Typography variant="subtitle2">
                                                What Are We?
                                            </Typography>
                                            <Typography variant="caption">
                                                {about.whatAreWe}
                                            </Typography>
                                            <br />
                                            <Typography variant="subtitle2">
                                                What Were We?
                                            </Typography>
                                            <Typography variant="caption">
                                                {about.whatWereWe}
                                            </Typography>
                                            <br />
                                            <Typography variant="subtitle2">
                                                What We Do?
                                            </Typography>
                                            <Typography variant="caption">
                                                {about.whatWeDo}
                                            </Typography>
                                            <br />
                                            <Typography variant="overline">
                                                {moment(new Date(about.createdAt)).format('MMMM Do YYYY, h:mm:ss a')}
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

export default About