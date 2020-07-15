import React, { useState, useEffect, useContext } from 'react'
import Button from '@material-ui/core/Button';
import UserContext from '../context/UserContext'
//import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import Player from '../components/Player'
import Player from '../components/Player'
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


const Courses = () => {

    const user = useContext(UserContext)
    const [courses, setCourses] = useState([])
    const [deletedCourses, setDeletedCourses] = useState([])
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const addCourse = async e => {
        e.preventDefault()
        const obj = {
            title: e.currentTarget.elements.title.value,
            videoUrl: e.currentTarget.elements.videoUrl.value
        }
        console.log(obj)
        //console.log(obj)

        const result = await fetch('https://lil-project-1.herokuapp.com/api/courses', {
            method: 'POST',
            headers: {
                Authorization: user.user.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        const json = await result.json()
        if (json.success) {
            setCourses([json.data.course, ...courses])
        }
    }
    const deleteCourse = async id => {

        const result = await fetch('https://lil-project-1.herokuapp.com/api/courses/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: user.user.token
            }
        })

        const json = await result.json()

        if (json.success) {
            console.log(json.data.course)
            const newCourses = courses.filter(course => course._id !== id)
            setCourses(newCourses)
            setDeletedCourses([json.data.course, ...deletedCourses])
        }
    }
    const restoreCourse = async id => {
        const result = await fetch('https://lil-project-1.herokuapp.com/api/courses/' + id + '?delete=false', {
            method: 'DELETE',
            headers: {
                Authorization: user.user.token
            }
        })
        const json = await result.json()
        if (json.success) {
            console.log(json.data.course)
            const newCourses = deletedCourses.filter(course => course._id !== id)
            setDeletedCourses(newCourses)
            setCourses([json.data.course, ...courses])
        }
    }

    useEffect(() => {
        const getCourses = async () => {
            const result = await fetch('https://lil-project-1.herokuapp.com/api/courses', {
                headers: {
                    Authorization: user.user.token
                }
            })
            const json = await result.json()
            setCourses(json.data.courses)

            const result2 = await fetch('https://lil-project-1.herokuapp.com/api/courses?deleted=true', {
                headers: {
                    Authorization: user.user.token
                }
            })
            const json2 = await result2.json()
            setDeletedCourses(json2.data.courses)

            console.log({ json, json2 })
        }
        getCourses()
    }, [user.user.token])

    return (

        <>
            <div align="right">
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Add Course
            </Button>
            </div>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <form onSubmit={addCourse}>
                        <input type="text" name="title" required />
                        <input type="url" name="videoUrl" required />
                        <button type="submit">Add Course</button>
                        <button onClick={handleClose} type="submit">Cancel</button>

                    </form>

                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>

            <p> All courses </p>
            <ol>
                {courses.map(items =>
                    <li><p key={items._id} >{items.title} :  {items.videoUrl}

                        <button key={items._id} onClick={deleteCourse.bind(this, items._id)} type="submit">
                            <div>
                                <Player src={items.videoUrl} />
                            </div>
                        delete Course</button>
                    </p>

                    </li>
                )}
            </ol>
            <p>Deleted courses</p>

            <ol>
                {deletedCourses.map(items =>
                    <li>
                        <p key={items._id} >
                            {items.title} :  {items.videoUrl}
                            <button key={items._id} onClick={restoreCourse.bind(this, items._id)} type="submit">restore Course</button>
                        </p>
                    </li>)}
            </ol>

        </>


    )

}
export default Courses;