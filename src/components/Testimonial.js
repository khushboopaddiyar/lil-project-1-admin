import React from 'react'
import { Card, CardContent, CardMedia, Typography, IconButton, Tooltip } from '@material-ui/core'
import { DeleteForeverRounded as DeleteIcon, RestoreFromTrashRounded as RestoreIcon, MailRounded as MailIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginBottom: 12,
        height: 180
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: '1 0 auto'
    },
    cover: {
        width: 150
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    }
}))

const Testimonial = props => {
    const classes = useStyles()
    console.log(props)
    return (
        <>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.cover}
                    image={props.testimonial.imageUrl}
                    title={props.testimonial.name}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h6" variant="h6">
                            {props.testimonial.name}
                            <Tooltip title={props.testimonial.email} placement="right" arrow>
                                <IconButton aria-label={props.testimonial.email} onClick={() => { window.location = 'mailto:' + props.testimonial.email }}>
                                    <MailIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </Typography>
                        <Typography variant="subtitle1" color="textPrimary">
                            {props.testimonial.comment}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <Typography variant="body2">
                            {
                                props.deleted ?
                                    'Deleted On ' + moment(new Date(props.testimonial.updatedAt)).format('MMMM Do YYYY, h:mm:ss a') :
                                    'Created On ' + moment(new Date(props.testimonial.createdAt)).format('MMMM Do YYYY, h:mm:ss a')
                            }
                        </Typography>
                        <Tooltip title={props.deleted ? 'Restore' : 'Delete'} arrow>
                            <IconButton aria-label={props.deleted ? 'restore' : 'delete'} onClick={props.remove}>
                                {props.deleted ? <RestoreIcon color="error" /> : <DeleteIcon color="error" />}
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default Testimonial