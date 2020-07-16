import React, { useState, useEffect, useContext } from 'react'
import Button from '@material-ui/core/Button';
import UserContext from '../context/UserContext'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';
//import 'bootstrap/dist/css/bootstrap.css';
import RemoveIcon from '@material-ui/icons/Remove';
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


const TeamMembers = () => {

    const user = useContext(UserContext)
    const [member, setMember] = useState([])
    const [deletedMember, setDeleteMember] = useState([])
    const [selectedFile, setSelectedFile] = useState('')
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleFileChange = e => {
        setSelectedFile(e.target.files[0])
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleUpload = async e => {
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
        try {
            const result = await fetch('https://lil-project-1.herokuapp.com/api/teammembers', {
                method: 'POST',
                headers: {
                    Authorization: user.user.token
                },
                body: formData
            })
            const json = await result.json()
            console.log(json)
            if (json.success) {
                setMember([json.data.teamMember, ...member])
            }


        } catch (err) {
            console.log(err)
        }


    }

    const deleteMember = async id => {

        const result = await fetch('https://lil-project-1.herokuapp.com/api/teammembers/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: user.user.token
            }
        })

        const json = await result.json()

        if (json.success) {
            console.log(json.data.teamMember)
            const newCourses = member.filter(dele => dele._id !== id)
            setMember(newCourses)
            setDeleteMember([json.data.teamMember, ...deletedMember])
        }
    }

    const restoreMember = async id => {
        const result = await fetch('https://lil-project-1.herokuapp.com/api/teammembers/' + id + '?delete=false', {
            method: 'DELETE',
            headers: {
                Authorization: user.user.token
            }
        })
        const json = await result.json()
        if (json.success) {
            console.log(json.data.teamMember)
            const newMember = deletedMember.filter(dele => dele._id !== id)
            setDeleteMember(newMember)
            setMember([json.data.teamMember, ...member])
        }
    }

    useEffect(() => {
        const getMember = async () => {
            const result = await fetch('https://lil-project-1.herokuapp.com/api/teammembers', {
                headers: {
                    Authorization: user.user.token
                }
            })
            const json = await result.json()
            setMember(json.data.teamMembers)
            const result2 = await fetch('https://lil-project-1.herokuapp.com/api/teammembers?deleted=true', {
                headers: {
                    Authorization: user.user.token
                }
            })
            const json2 = await result2.json()
            setDeleteMember(json2.data.teamMembers)

            console.log({ json, json2 })
        }
        getMember()
    }, [user.user.token])



    return (
        <>

            TODO Khushboo
            // Dialog Box
            <div align="right">
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Add Member
            </Button>
            </div>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Member</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleUpload}>
                        <input type="text" placeholder="name" name="name" required />
                        <input type="email" placeholder="email" name="email" required />
                        <input type="number" placeholder="contact" name="contactNumber" required />
                        <input type="text" placeholder="description" name="description" required />
                        <input type="url" placeholder="url" name="linkedin" required />
                        <input type="url" placeholder="url" name="twitter" required />
                        <input type="file" placeholder="img" onChange={handleFileChange} />
                        <button type="submit">Update</button>


                    </form>

                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
            <h1>All user</h1>

            {member.map(items => <div
                key={items._id}>

                <Card key={items._id} className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                R
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
                            {items.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>

                        <a href={items.linkedin}
                            data-show-count="false" target="_ ">
                            <IconButton aria-label="share">
                                <LinkedInIcon />
                            </IconButton>
                        </a>
                        <a href={items.twitter}
                            data-show-count="false" target="_ ">
                            <IconButton aria-label="share" >
                                <TwitterIcon />
                            </IconButton>
                        </a>
                        <IconButton aria-label="share"
                            onClick={deleteMember.bind(this, items._id)} type="submit">
                            <RemoveIcon />
                        </IconButton>


                    </CardActions>

                </Card>
            </div>)}
            <h1>deleted user</h1>
            {deletedMember.map(items => <div key={items._id}>


                <Card key={items._id} className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                R
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
                            {items.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>

                        <a href={items.linkedin}
                            data-show-count="false" target="_ ">
                            <IconButton aria-label="share">
                                <LinkedInIcon />
                            </IconButton>
                        </a>
                        <a href={items.twitter}
                            data-show-count="false" target="_ ">
                            <IconButton aria-label="share" >
                                <TwitterIcon />
                            </IconButton>
                        </a>
                        <IconButton aria-label="share"
                            onClick={restoreMember.bind(this, items._id)} type="submit">
                            <AddIcon />
                        </IconButton>


                    </CardActions>

                </Card>
            </div>)}




        </>
    )
}

export default TeamMembers;

