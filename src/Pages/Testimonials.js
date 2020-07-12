import React, { useState, useEffect, useContext } from 'react'
import { Container, Paper, Tabs, Tab, Divider, LinearProgress } from '@material-ui/core'
import { DeleteOutlined as DeleteIcon, CheckOutlined as CheckOutlinedIcon } from '@material-ui/icons'

import UserContext from '../context/UserContext'
import ToastContext from '../context/ToastContext'
import AddTestimonial from '../components/AddTestimonial'
import TestimonialList from '../components/TestimonialList'

const Testimonials = () => {
    const user = useContext(UserContext)
    const toast = useContext(ToastContext)

    const [isLoading, setIsLoading] = useState(true)
    const [testimonials, setTestimonials] = useState([])
    const [deletedTestimonials, setDeletedTestimonials] = useState([])

    const deleteTestimonial = id => {
        fetch(`https://lil-project-1.herokuapp.com/api/testimonials/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: user.user.token
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    toast.showToast(`Deleted Testimonial ${json.data.testimonial.name}`)
                    setTestimonials(testimonials.filter(t => t._id !== id))
                    setDeletedTestimonials([...deleteTestimonial, json.data.testimonial])
                }
            })
            .catch(err => console.log(err))
    }

    const restoreTestimonial = id => {
        fetch(`https://lil-project-1.herokuapp.com/api/testimonials/${id}?delete=false`, {
            method: 'DELETE',
            headers: {
                Authorization: user.user.token
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    toast.showToast(`Restored Testimonial ${json.data.testimonial.name}`)
                    setDeletedTestimonials(testimonials.filter(t => t._id !== id))
                    setDeletedTestimonials([...deleteTestimonial, json.data.testimonial])
                }
            })
            .catch(err => console.log(err))
    }

    const [tab, setTab] = useState(0)
    const handleTabChange = (event, newValue) => setTab(newValue)

    useEffect(() => {
        Promise.all([
            new Promise((resolve, reject) => {
                fetch('https://lil-project-1.herokuapp.com/api/testimonials', {
                    method: 'GET',
                    headers: {
                        Authorization: user.user.token
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        if (json.success)
                            resolve(json.data.testimonials)
                        else
                            reject(json)
                    })
                    .catch(err => reject(err))
            }),
            new Promise((resolve, reject) => {
                fetch('https://lil-project-1.herokuapp.com/api/testimonials?deleted=true', {
                    method: 'GET',
                    headers: {
                        Authorization: user.user.token
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        if (json.success)
                            resolve(json.data.testimonials)
                        else
                            reject(json)
                    })
                    .catch(err => reject(err))
            })
        ]).then(data => {
            setTestimonials(data[0])
            setDeletedTestimonials(data[1])
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            toast.showToast('Something Went Wrong!')
        })
    }, [user.user.token, toast])

    return (
        <Container>
            {isLoading &&
                <Container maxWidth="sm">
                    <LinearProgress />
                </Container>
            }
            {!isLoading && <>
                <AddTestimonial addTestimonial={testimonial => setTestimonials(prev => [...prev, testimonial])} />
                <Container maxWidth="md">
                    <Paper>
                        <Tabs
                            variant="fullWidth"
                            value={tab}
                            onChange={handleTabChange}
                            indicatorColor="secondary"
                            textColor="secondary"
                        >
                            <Tab icon={<CheckOutlinedIcon />} label="Active" />
                            <Tab icon={<DeleteIcon />} label="Trash" />
                        </Tabs>
                        <Divider />
                        <Container>
                            {tab === 0 && <TestimonialList deleted="false" testimonials={testimonials} remove={deleteTestimonial} />}
                            {tab === 1 && <TestimonialList deleted="true" testimonials={deletedTestimonials} remove={restoreTestimonial} />}
                        </Container>
                    </Paper>
                </Container>
            </>}
        </Container>
    )
}

export default Testimonials