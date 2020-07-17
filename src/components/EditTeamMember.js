import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, Button, DialogTitle, TextField } from '@material-ui/core'

const EditTeamMember = props => {

    const [selectedFile, setSelectedFile] = useState('')
    const handleFileChange = e => {
        setSelectedFile(e.target.files[0])
    }

    const handleEditTeamMember = e => {
        e.preventDefault()
        const formData = new FormData()
        if (selectedFile !== '')
            formData.append('image', selectedFile, `${selectedFile.lastModified}-${selectedFile.name}`)
        formData.append('name', e.currentTarget.elements.name.value)
        formData.append('email', e.currentTarget.elements.email.value)
        formData.append('contactNumber', e.currentTarget.elements.contactNumber.value)
        formData.append('description', e.currentTarget.elements.description.value)
        formData.append('linkedin', e.currentTarget.elements.linkedin.value)
        formData.append('twitter', e.currentTarget.elements.twitter.value)
        props.updateTeamMember(formData)
    }

    return (
        <>
            <div>
                <Dialog open={true} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Team Member</DialogTitle>
                    <form onSubmit={handleEditTeamMember}>
                        <DialogContent>
                            <DialogContentText>
                                Please Fill below details
                            </DialogContentText>
                            <TextField margin="normal" variant="standard" type="text" name="name" required defaultValue={props.teamMember.name} />
                            <TextField margin="normal" variant="standard" type="email" name="email" required defaultValue={props.teamMember.email} />
                            <TextField margin="normal" variant="standard" type="number" name="contactNumber" required defaultValue={props.teamMember.contactNumber} />
                            <TextField margin="normal" variant="standard" type="text" name="description" required defaultValue={props.teamMember.description} />
                            <TextField margin="normal" variant="standard" type="url" name="linkedin" required defaultValue={props.teamMember.linkedin} />
                            <TextField margin="normal" variant="standard" type="url" name="twitter" required defaultValue={props.teamMember.twitter} />
                            <TextField margin="normal" variant="standard" type="file" onChange={handleFileChange} />
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={props.close}>
                                Cancel
                            </Button>
                            <Button color="primary" type="submit">
                                Update
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        </>
    )
}

export default EditTeamMember