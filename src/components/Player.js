import React from 'react'
import ReactPlayer from 'react-player'

const classes = {
    playerWrapper: {
        position: 'relative',
        paddingTop: '56.25%'
    },
    reactPlayer: {
        position: 'absolute',
        top: 0,
        left: 0
    }
}

const Player = props => {
    return (
        <div style={classes.playerWrapper}>
            <ReactPlayer
                style={classes.reactPlayer}
                url={props.src}
                width='100%'
                height='100%'
            />
        </div>
    )
}

export default Player