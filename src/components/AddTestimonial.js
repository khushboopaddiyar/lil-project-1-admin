import React, { useState, useContext } from 'react'
import { Fab, Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide, TextField, Container } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import UserContext from '../context/UserContext'

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

const AddTestimonial = props => {
    const user = useContext(UserContext)

    const classes = useStyles()
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const [selectedFile, setSelectedFile] = useState('')
    const handleFileChange = e => setSelectedFile(e.target.files[0])

    const handleAddTestimonial = async e => {
        e.preventDefault()
        if (selectedFile) {
            const formData = new FormData()
            formData.append('name', e.currentTarget.elements.name.value)
            formData.append('email', e.currentTarget.elements.email.value)
            formData.append('comment', e.currentTarget.elements.comment.value)
            formData.append('image', selectedFile, `${selectedFile.lastModified}-${selectedFile.name}`)
            setIsOpen(false)

            fetch('https://lil-project-1.herokuapp.com/api/testimonials', {
                method: 'POST',
                headers: {
                    Authorization: user.user.token
                },
                body: formData
            })
                .then(res => res.json())
                .then(json => {
                    props.addTestimonial(json.data.testimonial)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <Fab color="secondary" aria-label="Add Task" className={classes.fab} onClick={handleOpen}>
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
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            type="file"
                            id="image"
                            name="image"
                            label="Image"
                            onChange={handleFileChange}
                        />
                    </Container>
                </form>
            </Dialog>
        </div>
    )
}

export default AddTestimonial