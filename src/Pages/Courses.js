import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext'
import { Fab, Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide, TextField, Container } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    form: {
        '& > *': {
            margin: theme.spacing(1)
        }
    }
}))

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />
})



function Courses() {
    //all courses
    const user = useContext(UserContext)
    const [data, setData] = useState([])

    const classes = useStyles()
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    useEffect(() => {
        const getData = async () => {
            const result = await fetch(' https://lil-project-1.herokuapp.com/api/courses', {
                method: 'GET',
                headers: {
                    Authorization: user.user.token
                }

            })

            const jsons = await result.json()

            console.log(jsons)

            if (jsons.success === true) {
                setData(jsons.data.courses)
            }

        }
        getData()
    }, [user.user.token])
    const deluser = useContext(UserContext)
    const [deldata, dsetData] = useState([])
    useEffect(() => {
        const delgetData = async () => {
            const result = await fetch(' https://lil-project-1.herokuapp.com/api/courses?deleted=true', {
                method: 'GET',
                headers: {
                    Authorization: deluser.user.token
                }
            })

            const djsons = await result.json()

            console.log(djsons)

            if (djsons.success === true) {
                dsetData(djsons.data.courses)
            }

        }
        delgetData()
    }, [deluser.user.token])

    // add courses
    const adduser = useContext(UserContext)
    const [adddata, addsetData] = useState([])
    useEffect(() => {
        const addgetData = async () => {
            const result = await fetch(' https://lil-project-1.herokuapp.com/api/courses', {
                method: 'POST',
                headers: {
                    Authorization: adduser.user.token,
                    'Content-Type': 'application/json'
                },

                body:
                    JSON.stringify({
                        "title": "Marhmello Come & Go",
                        "videoUrl": "https://www.youtube.com/watch?v=Dxm3cHrKcbA"
                    })


            })


            const ajsons = await result.json()

            console.log(ajsons)

            if (ajsons.success === true) {
                dsetData(ajsons.data.courses)
            }
        }


    })
    return (
        <>
            <p> all courses </p>
            {data.map(items => <p key={items._id} >{items.title} :  {items.videoUrl}</p>)}
            <p> deleted courses </p>
            <Fab color="secondary" aria-label="Add Task"  >
                <Add />
            </Fab>

            <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
                <form onSubmit={handleAddTestimonial}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <Close />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Add Testimonial
                            </Typography>
                            <Button color="inherit" type="submit">
                                Done
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Container maxWidth="sm">
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            type="text"
                            id="name"
                            name="name"
                            label="Name"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="email"
                            type="email"
                            name="email"
                            label="Email"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            type="text"
                            id="comment"
                            name="comment"
                            label="Comment"
                        />

                    </Container>
                </form>
            </Dialog>

        </>
    )
}

export default Courses;