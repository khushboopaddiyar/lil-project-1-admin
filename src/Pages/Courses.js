import React, { useState, useEffect, useContext } from 'react'
import { Snackbar, SnackbarContent, Container, LinearProgress, Paper, Tabs, Tab } from '@material-ui/core'

import UserContext from '../context/UserContext'
import AddCourse from '../components/AddCourse'
import CourseList from '../components/CourseList'

const Courses = () => {
    const user = useContext(UserContext)

    const [isToastOpen, setIsToastOpen] = useState(false)
    const [snackMessage, setToastMessage] = useState('')
    const showToast = message => {
        setIsToastOpen(true)
        setToastMessage(message)
    }
    const handleToastClose = () => {
        setIsToastOpen(false)
        setToastMessage('')
    }

    const [isLoading, setIsLoading] = useState(true)

    const [tab, setTab] = useState(0)
    const handleTabChange = (event, newValue) => setTab(newValue)

    const [courses, setCourses] = useState([])
    const [deletedCourses, setDeletedCourses] = useState([])

    const deleteCourse = async id => {
        try {
            const result = await fetch('https://lil-project-1.herokuapp.com/api/courses/' + id, {
                method: 'DELETE',
                headers: {
                    Authorization: user.user.token
                }
            })
            const json = await result.json()
            if (json.success) {
                setCourses(courses.filter(course => course._id !== id))
                setDeletedCourses([json.data.course, ...deletedCourses])
                showToast(`Deleted course ${json.data.course.title}`)
            } else {
                showToast(json.message || 'Something Went Wrong!')
            }
        } catch (err) {
            console.log(err)
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
            setDeletedCourses(deletedCourses.filter(course => course._id !== id))
            setCourses([json.data.course, ...courses])
            showToast(`Restored course ${json.data.course.title}`)
        } else {
            showToast(json.message || 'Something Went Wrong!')
        }
    }

    useEffect(() => {
        Promise.all([
            new Promise((resolve, reject) => {
                fetch('https://lil-project-1.herokuapp.com/api/courses', {
                    headers: {
                        Authorization: user.user.token
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        if (json.success)
                            resolve(json.data.courses)
                        else
                            reject(json)
                    })
                    .catch(err => reject(err))
            }),
            new Promise((resolve, reject) => {
                fetch('https://lil-project-1.herokuapp.com/api/courses?deleted=true', {
                    headers: {
                        Authorization: user.user.token
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        if (json.success)
                            resolve(json.data.courses)
                        else
                            reject(json)
                    })
                    .catch(err => reject(err))
            })
        ])
            .then(([courses, deletedCourses]) => {
                setCourses(courses)
                setDeletedCourses(deletedCourses)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                showToast(err.message || err.toString() || 'Something Went Wrong!')
            })
    }, [user.user.token])

    return (
        <>
            {isLoading &&
                <Container maxWidth="sm">
                    <LinearProgress />
                </Container>
            }
            {!isLoading &&
                <Container>
                    <AddCourse addCourse={course => {
                        setCourses([course, ...courses])
                        showToast('Course Added Successfully')
                    }} />
                    <Paper>
                        <Tabs
                            value={tab}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleTabChange}
                        >
                            <Tab label="Active" />
                            <Tab label="Trash" />
                        </Tabs>
                    </Paper>
                    {tab === 0 && <CourseList deleted={false} courses={courses} remove={deleteCourse} />}
                    {tab === 1 && <CourseList deleted={true} courses={deletedCourses} remove={restoreCourse} />}
                </Container>
            }
            <Snackbar open={isToastOpen} autoHideDuration={5000} onClose={handleToastClose}>
                <SnackbarContent message={snackMessage} />
            </Snackbar>
        </>
    )
}
export default Courses