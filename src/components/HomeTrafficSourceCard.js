import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';


const data = [
    {
        name: 'jan', mobile: 10, desktop: 10, amt: 80,
    },
    {
        name: 'feb', mobile: 10, desktop: 10, amt: 80,
    },
    {
        name: 'mar', mobile: 10, desktop: 10, amt: 80,
    },
    {
        name: 'jun', mobile: 10, desktop: 10, amt: 80,
    },
    {
        name: 'jul', mobile: 10, desktop: 10, amt: 80,
    },
    {
        name: 'aug', mobile: 10, desktop: 10, amt: 80,
    },
    {
        name: 'sep', mobile: 10, desktop: 10, amt: 80,
    },
    {
        name: 'oct', mobile: 10, desktop: 10, amt: 80,
    },
    {
        name: 'nov', mobile: 10, desktop: 10, amt: 80,
    },
    {
        name: 'dec', mobile: 10, desktop: 10, amt: 80,
    },

];

export default function HomeTrafficSourceCard() {
    return (
        <Paper>
            <div>
                <Card style={{ padding: '10px', height: '100%' }}>
                    <Typography component="h5" variant="h5">
                        Mobile / Desktop
                        </Typography>
                    <br />
                    <BarChart
                        width={850}
                        height={300}
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="mobile" fill="#8884d8" />
                        <Bar dataKey="desktop" fill="#82ca9d" />
                    </BarChart>
                </Card>
            </div>
        </Paper>
    )
}
