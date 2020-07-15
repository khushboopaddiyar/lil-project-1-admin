import React, { useState, useContext } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

import UserContext from '../context/UserContext'

const AddCourse = props => {
    const user = useContext(UserContext)

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const handleDialogOpen = () => setIsDialogOpen(true)
    const handleDialogClose = () => setIsDialogOpen(false)

    const addCourse = e => {
        e.preventDefault()
        handleDialogClose()
        fetch('https://lil-project-1.herokuapp.com/api/courses', {
            method: 'POST',
            headers: {
                Authorization: user.user.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: e.currentTarget.elements.title.value,
                videoUrl: e.currentTarget.elements.videoUrl.value,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    props.addCourse(json.data.course)
                } else {
                    console.log(json)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Button color="primary" onClick={handleDialogOpen} startIcon={<AddIcon />}>
                Add Course
            </Button>
            <Dialog open={isDialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Course</DialogTitle>
                <form onSubmit={addCourse}>
                    <DialogContent>
                        <DialogContentText>
                            Please select a file and add a label for the image to be uploaded.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            required
                        />
                        <TextField
                            margin="normal"
                            id="videoUrl"
                            name="videoUrl"
                            label="Video Link"
                            type="url"
                            fullWidth
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default AddCourse