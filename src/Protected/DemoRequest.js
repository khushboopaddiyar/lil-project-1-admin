import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext'
import moment from 'moment'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#1a73e8",
        color: "White",
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

function DemoRequest() {
    const classes = useStyles();
    const user = useContext(UserContext)
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            const result = await fetch(' https://lil-project-1.herokuapp.com/api/demorequests', {
                method: 'GET',
                headers: {
                    Authorization: user.user.token
                }
            })

            const jsons = await result.json()

            console.log(jsons)

            if (jsons.success === true) {
                setData(jsons.data.demoRequests)
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
                            <StyledTableCell>Created At&nbsp;</StyledTableCell>
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

                                <StyledTableCell>{moment(new Date(row.createdAt)).format('MMMM Do YYYY, h:mm:ss a')}</StyledTableCell>

                                <StyledTableCell>{row.message ? row.message : '-NA-'}</StyledTableCell>



                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}


export default DemoRequest;