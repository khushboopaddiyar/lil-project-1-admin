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
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import '../assets/css/bootstrap-grid.min.css';
import RemoveIcon from '@material-ui/icons/Remove';
import { Tooltip } from '@material-ui/core'
import { green, indigo, } from '@material-ui/core/colors';

import { Phone as PhoneIcon, Delete as DeleteIcon, CheckOutlined as CheckOutlinedIcon, Edit as EditIcon, GitHub as GithubIcon } from '@material-ui/icons'
import { Tabs, Tab, Paper, Container } from '@material-ui/core'
import EditCurators from '../components/EditCurators'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


const Curators = () => {

    const user = useContext(UserContext)
    const [member, setMember] = useState([])
    const [deletedMember, setDeleteMember] = useState([])
    const [selectedFile, setSelectedFile] = useState('')
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const handleDialogOpen = () => setIsDialogOpen(true)
    const handleDialogClose = () => setIsDialogOpen(false)
    const [isEditCurators, setIsEditCurators] = useState(false)
    const [editCurators, setEditCurators] = useState({})

    const [tab, setTab] = useState(0)
    const handleTabChange = (event, newValue) => setTab(newValue)

    const handleFileChange = e => {
        setSelectedFile(e.target.files[0])
    }


    const handleUpload = async e => {
        e.preventDefault()
        handleDialogClose()
        const formData = new FormData()
        if (selectedFile !== '')
            formData.append('image', selectedFile, `${selectedFile.lastModified}-${selectedFile.name}`)
        formData.append('name', e.currentTarget.elements.name.value)
        formData.append('email', e.currentTarget.elements.email.value)
        formData.append('contactNumber', e.currentTarget.elements.contactNumber.value)
        formData.append('title', e.currentTarget.elements.title.value)
        formData.append('description', e.currentTarget.elements.description.value)
        formData.append('github', e.currentTarget.elements.github.value)
        formData.append('linkedin', e.currentTarget.elements.linkedin.value)
        formData.append('twitter', e.currentTarget.elements.twitter.value)
        try {
            const result = await fetch('https://lil-project-1.herokuapp.com/api/curators', {
                method: 'POST',
                headers: {
                    Authorization: user.user.token
                },
                body: formData
            })
            const json = await result.json()
            if (json.success) {
                setMember([json.data.curator, ...member])
            }


        } catch (err) {
            console.log(err)
        }


    }

    const deleteMember = async id => {

        const result = await fetch('https://lil-project-1.herokuapp.com/api/curators/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: user.user.token
            }
        })

        const json = await result.json()

        if (json.success) {
            const newCourses = member.filter(dele => dele._id !== id)
            setMember(newCourses)
            setDeleteMember([json.data.curator, ...deletedMember])
        }
    }

    const restoreMember = async id => {
        const result = await fetch('https://lil-project-1.herokuapp.com/api/curators/' + id + '?delete=false', {
            method: 'DELETE',
            headers: {
                Authorization: user.user.token
            }
        })
        const json = await result.json()
        if (json.success) {
            const newMember = deletedMember.filter(dele => dele._id !== id)
            setDeleteMember(newMember)
            setMember([json.data.curator, ...member])
        }
    }
    const updateCurators = async formData => {
        setIsEditCurators(false)
        try {
            const result = await fetch(`https://lil-project-1.herokuapp.com/api/curators/${editCurators._id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: user.user.token
                },
                body: formData
            })
            const json = await result.json()
            console.log(json)
            const newMembers = member.map(m => {
                if (m._id === editCurators._id) {
                    m = {
                        ...json.data.curator
                    }
                }
                return m
            })
            setMember(newMembers)
            setEditCurators({})
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const getMember = async () => {
            const result = await fetch('https://lil-project-1.herokuapp.com/api/curators', {
                headers: {
                    Authorization: user.user.token
                }
            })
            const json = await result.json()
            setMember(json.data.curators)
            const result2 = await fetch('https://lil-project-1.herokuapp.com/api/curators?deleted=true', {
                headers: {
                    Authorization: user.user.token
                }
            })
            const json2 = await result2.json()
            setDeleteMember(json2.data.curators)

        }
        getMember()
    }, [user.user.token])



    return (
        <>


            <Container>
                <Button color="primary" onClick={handleDialogOpen} startIcon={<AddIcon />}>
                    Add Curator
            </Button>
            </Container>
            <Dialog open={isDialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Curator</DialogTitle>
                <form onSubmit={handleUpload}>
                    <DialogContent>
                        <DialogContentText>
                            Please fill the details below.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="name"
                            name="Name"
                            label="Name"
                            type="text"
                            fullWidth
                            required
                        />
                        <TextField
                            margin="normal"
                            id="email"
                            name="Email"
                            label="Email"
                            type="email"
                            fullWidth
                            required
                        />
                        <TextField
                            margin="normal"
                            id="ContactNumber"
                            name="contactNumber"
                            label="Contact Number"
                            type="number"
                            fullWidth
                            required
                        />
                        <TextField
                            margin="normal"
                            id="title"
                            name="title"
                            label="title"
                            type="text"
                            fullWidth
                            required
                        />
                        <TextField
                            margin="normal"
                            id="description"
                            name="Description"
                            label="Description"
                            type="text"
                            fullWidth
                            required
                        />
                        <TextField
                            margin="normal"
                            id="github"
                            name="github"
                            label="Github"
                            type="url"
                            fullWidth
                            required
                        />
                        <TextField
                            margin="normal"
                            id="linedin"
                            name="linkedin"
                            label="Linkedin"
                            type="url"
                            fullWidth
                            required
                        />
                        <TextField
                            margin="normal"
                            id="twitter"
                            name="twitter"
                            label="Twitter"
                            type="url"
                            fullWidth
                            required
                        />
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
            {isEditCurators && <EditCurators curators={editCurators} close={() => setIsEditCurators(false)} updateCurators={updateCurators} />}
            <Container maxWidth="md" style={{ marginBottom: '16px' }}>
                <Paper>
                    <Tabs
                        variant="fullWidth"
                        value={tab}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab icon={<CheckOutlinedIcon />} label="Active" />
                        <Tab icon={<DeleteIcon />} label="Trash" />
                    </Tabs>
                </Paper>
            </Container>
            <Container>
                {tab === 0 && <>
                    <div className="row">
                        {member.map(items => <div
                            key={items._id} className="col-sm-12 col-md-6 col-lg-4" style={{ marginBottom: '8px' }}>

                            <Card key={items._id} className={classes.root}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                            {items.name.charAt(0)}
                                        </Avatar>
                                    }

                                    title={items.name}
                                    subheader={items.email}

                                />
                                <CardMedia
                                    className={classes.media}
                                    image={items.imageUrl}

                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {items.title}
                                        <br />
                                        {items.description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <a href={items.github}
                                        data-show-count="false" target="_blank" rel="noopener noreferrer">
                                        <IconButton aria-label="share">
                                            <GithubIcon />
                                        </IconButton>
                                    </a>
                                    <a href={items.linkedin}
                                        data-show-count="false" target="_blank" rel="noopener noreferrer">
                                        <IconButton aria-label="share" style={{ color: indigo[500] }} >
                                            <LinkedInIcon />
                                        </IconButton>
                                    </a>
                                    <a href={items.twitter}
                                        data-show-count="false" target="_blank" rel="noopener noreferrer">
                                        <IconButton aria-label="share"
                                            color="primary" >
                                            <TwitterIcon />
                                        </IconButton>
                                    </a>
                                    <a href={"tel:" + items.contactNumber}>
                                        <Tooltip title={items.contactNumber} arrow>
                                            <IconButton style={{ color: green[500] }}>
                                                <PhoneIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </a>
                                    <IconButton onClick={() => {
                                        setIsEditCurators(true)
                                        setEditCurators(items)
                                    }} color="secondary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="share"
                                        onClick={deleteMember.bind(this, items._id)} type="submit" style={{ color: red[500] }}>
                                        <RemoveIcon />
                                    </IconButton>


                                </CardActions>

                            </Card>
                        </div>)}
                    </div>
                </>}


                {tab === 1 && <>

                    {deletedMember.map(items => <div key={items._id} className="col-sm-12 col-md-6 col-lg-4" style={{ marginBottom: '8px' }}>


                        <Card key={items._id} className={classes.root}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {items.name.charAt(0)}
                                    </Avatar>
                                }

                                title={items.name}
                                subheader={items.email}

                            />
                            <CardMedia
                                className={classes.media}
                                image={items.imageUrl}

                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {items.title}
                                    <br />
                                    {items.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <a href={items.github}
                                    data-show-count="false" target="_blank" rel="noopener noreferrer">
                                    <IconButton aria-label="share">
                                        <GithubIcon />
                                    </IconButton>
                                </a>
                                <a href={items.linkedin}
                                    data-show-count="false" target="_blank" rel="noopener noreferrer">
                                    <IconButton aria-label="share" style={{ color: indigo[500] }}>
                                        <LinkedInIcon />
                                    </IconButton>
                                </a>
                                <a href={items.twitter}
                                    data-show-count="false" target="_blank" rel="noopener noreferrer">
                                    <IconButton aria-label="share" color="primary" >
                                        <TwitterIcon />
                                    </IconButton>
                                </a>
                                <a href={"tel:" + items.contactNumber}>
                                    <Tooltip title={items.contactNumber} arrow>
                                        <IconButton style={{ color: green[500] }}>
                                            <PhoneIcon />
                                        </IconButton>
                                    </Tooltip>
                                </a>
                                <IconButton aria-label="share"
                                    onClick={restoreMember.bind(this, items._id)} type="submit" style={{ color: red[500] }}>
                                    <AddIcon />
                                </IconButton>

                            </CardActions>

                        </Card>
                    </div>)}




                </>}
            </Container>
        </>
    )
}


export default Curators;

