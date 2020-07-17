import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext'

import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableContainer from '@material-ui/core/TableContainer';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#1a73e8",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});



function ContactUs() {
    const classes = useStyles();
    const user = useContext(UserContext)
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            const result = await fetch(' https://lil-project-1.herokuapp.com/api/contactus', {
                method: 'GET',
                headers: {
                    Authorization: user.user.token
                }
            })

            const json = await result.json()

            console.log(json)

            if (json.success === true) {
                setData(json.data.contactUs)
            }

        }
        getData()
    }, [user.user.token])


    return (

        <Container>
            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Sr. No.</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Created At&nbsp;</StyledTableCell>
                            <StyledTableCell>Subject&nbsp;</StyledTableCell>
                            <StyledTableCell>Message&nbsp;</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell>
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.email}
                                </StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{moment(new Date(row.createdAt)).format('MMMM Do YYYY, h:mm:ss a')}</StyledTableCell>
                                <StyledTableCell>{row.subject}</StyledTableCell>
                                <StyledTableCell>{row.message}</StyledTableCell>



                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    )
}


export default ContactUs;



