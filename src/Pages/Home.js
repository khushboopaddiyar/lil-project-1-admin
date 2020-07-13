import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import '../assets/css/HomeCard.css';
import HomeStatsCard from '../components/HomeStatsCard';
import '../assets/css/HomeTrafficCard.css';
import HomeTrafficSourceCard from '../components/HomeTrafficSourceCard';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));



export default function Home() {
    const classes = useStyles();
    const array = [
        { v1: "hi0", v2: "hi1", v3: "hi2", v4: "hi3", v5: "hi4", },
        { v1: "hi0", v2: "hi1", v3: "hi2", v4: "hi3", v5: "hi4", },
        { v1: "hi0", v2: "hi1", v3: "hi2", v4: "hi3", v5: "hi4", },
        { v1: "hi0", v2: "hi1", v3: "hi2", v4: "hi3", v5: "hi4", },
        { v1: "hi0", v2: "hi1", v3: "hi2", v4: "hi3", v5: "hi4", },
        { v1: "hi0", v2: "hi1", v3: "hi2", v4: "hi3", v5: "hi4", },
        { v1: "hi0", v2: "hi1", v3: "hi2", v4: "hi3", v5: "hi4", }
    ];

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} lg={5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} lg={6}>
                            <HomeStatsCard title="Visitors" value="27" percentage="24%" date="Today" color="#4caf50">
                            </HomeStatsCard>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <HomeStatsCard title="Visitors" value="27" percentage="24%" date="Today" color="#4caf50">
                            </HomeStatsCard>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <HomeStatsCard title="Visitors" value="27" percentage="24%" date="Today" color="#4caf50">
                            </HomeStatsCard>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <HomeStatsCard title="Visitors" value="27" percentage="24%" date="Today" color="#4caf50">
                            </HomeStatsCard>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} lg={7}>
                    <HomeTrafficSourceCard dataToSend={array} />

                </Grid>
            </Grid>
        </div>
    );
}