import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
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
        <TableContainer component={Paper} >
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Email</StyledTableCell>

                        <StyledTableCell align="right">Created At&nbsp;</StyledTableCell>
                        <StyledTableCell align="right">Message&nbsp;</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row">
                                {row.email}
                            </StyledTableCell>

                            <StyledTableCell align="right">{row.createdAt}</StyledTableCell>

                            <StyledTableCell align="right">{row.message}</StyledTableCell>



                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}


export default DemoRequest;