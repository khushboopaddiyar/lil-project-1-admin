import React, { useState, useEffect, useContext } from 'react'
import Button from '@material-ui/core/Button';
import UserContext from '../context/UserContext'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import '../assets/css/bootstrap-grid.min.css';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const Gallery = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const handleDialogOpen = () => setIsDialogOpen(true)
    const handleDialogClose = () => setIsDialogOpen(false)

    const handleFileChange = e => {
        setSelectedFile(e.target.files[0])
    }


    const classes = useStyles();
    const user = useContext(UserContext)
    const [gallery, setGallery] = useState([])
    const [selectedFile, setSelectedFile] = useState('')
    const [deletedGallery, setDeleteGallery] = useState([])
    const handleUpload = async e => {
        e.preventDefault()
        handleDialogClose()
        const formData = new FormData()
        if (selectedFile !== '')
            formData.append('image', selectedFile, `${selectedFile.lastModified}-${selectedFile.name}`)
        formData.append('label', e.currentTarget.elements.label.value)

        try {
            const result = await fetch('https://lil-project-1.herokuapp.com/api/gallery', {
                method: 'POST',
                headers: {
                    Authorization: user.user.token
                },
                body: formData
            })
            const json = await result.json()
            console.log(json)
            if (json.success) {
                setGallery([json.data.gallery, ...gallery])
            }


        } catch (err) {
            console.log(err)
        }
    }

    const deleteGallery = async id => {

        const result = await fetch('https://lil-project-1.herokuapp.com/api/gallery/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: user.user.token
            }
        })

        const json = await result.json()

        if (json.success) {
            console.log(json.data.gallery)
            const newCourses = gallery.filter(dele => dele._id !== id)
            setGallery(newCourses)
            setDeleteGallery([json.data.gallery, ...deletedGallery])
        }
    }

    const restoreGallery = async id => {
        const result = await fetch('https://lil-project-1.herokuapp.com/api/gallery/' + id + '?delete=false', {
            method: 'DELETE',
            headers: {
                Authorization: user.user.token
            }
        })
        const json = await result.json()
        if (json.success) {
            console.log(json.data.gallery)
            const newGallery = deletedGallery.filter(dele => dele._id !== id)
            setDeleteGallery(newGallery)
            setGallery([json.data.gallery, ...gallery])
        }
    }
    useEffect(() => {
        const getGallery = async () => {
            const result = await fetch('https://lil-project-1.herokuapp.com/api/gallery', {
                headers: {
                    Authorization: user.user.token
                }
            })
            const json = await result.json()
            console.log(json)
            setGallery(json.data.gallery)
            const result2 = await fetch('https://lil-project-1.herokuapp.com/api/gallery?deleted=true', {
                headers: {
                    Authorization: user.user.token
                }
            })
            const json2 = await result2.json()
            setDeleteGallery(json2.data.gallery)

            console.log({ json, json2 })
        }
        getGallery()
    }, [user.user.token])


    return (
        <>
            <Button color="primary" onClick={handleDialogOpen} startIcon={<AddIcon />}>
                Add Gallery Image
            </Button>
            <Dialog open={isDialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Gallery Image</DialogTitle>
                <form onSubmit={handleUpload}>
                    <DialogContent>
                        <DialogContentText>
                            Please fill the details below.
                        </DialogContentText>
                        <TextField
                            margin="normal"
                            id="image"
                            name="image"
                            label="Image"
                            type="file"
                            fullWidth
                            required
                            onChange={handleFileChange}
                        />
                        <TextField
                            margin="normal"
                            id="label"
                            name="label"
                            label="label"
                            type="text"
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



            <h1>All Images</h1>
            <div className="row">
                {gallery.map(items => <div key={items._id} className="col-sm-12 col-md-4 col-lg-3">
                    <Card key={items._id} className={classes.root}>

                        <CardMedia
                            className={classes.media}
                            image={items.imageUrl}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {items.label}
                            </Typography>

                        </CardContent>

                        <CardActions>
                            <IconButton aria-label="share"
                                onClick={deleteGallery.bind(this, items._id)} type="submit">
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </div>
                )}

            </div>
            <h1>Deleted Image</h1>
            <div className="row">
                {deletedGallery.map(items => <div key={items._id} className="col-sm-12 col-md-4 col-lg-3">

                    <Card key={items._id} className={classes.root}>

                        <CardMedia
                            className={classes.media}
                            image={items.imageUrl}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {items.label}
                            </Typography>

                        </CardContent>

                        <CardActions>
                            <IconButton aria-label="share"
                                onClick={restoreGallery.bind(this, items._id)} type="submit">
                                <ControlPointIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </div>

                )}
            </div>
        </>
    )



}
export default Gallery;