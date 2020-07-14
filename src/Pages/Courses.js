import React, { useState, useEffect, useContext } from 'react'

import UserContext from '../context/UserContext'

const Courses = () => {
    const user = useContext(UserContext)

    const [courses, setCourses] = useState([])
    const [deletedCourses, setDeletedCourses] = useState([])


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
            <p> all courses </p>
            {courses.map(items => <p key={items._id} >{items.title} :  {items.videoUrl}</p>)}

        </>


    )

}
export default Courses;