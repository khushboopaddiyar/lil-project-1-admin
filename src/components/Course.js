import React from 'react'
import { Card, CardMedia, CardContent, IconButton, Typography, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Delete as DeleteIcon, RestoreFromTrash as RestoreIcon } from '@material-ui/icons'

import Player from './Player'
import '../assets/css/bootstrap-grid.min.css'

const useStyles = makeStyles({
    root: {
        maxWidth: 320
    },
    media: {
        height: 180
    }
})

const Course = props => {
    const classes = useStyles()
    return (
        <div className="col-sm-6 col-md-4 col-lg-3" style={{ marginTop: 6 }}>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    title={props.course.title}
                >
                    <Player src={props.course.videoUrl} />
                </CardMedia>
                <CardContent>
                    <Typography variant="h6">
                        {props.course.title}
                    </Typography>
                    <Tooltip title={props.deleted ? 'Restore' : 'Delete'} arrow>
                        <IconButton aria-label={props.deleted ? 'restore' : 'delete'} onClick={props.remove}>
                            {props.deleted ? <RestoreIcon color="error" /> : <DeleteIcon color="error" />}
                        </IconButton>
                    </Tooltip>
                </CardContent>
            </Card>
        </div>
    )
}

export default Course