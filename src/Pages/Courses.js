// import React, { useEffect, useState, useContext } from 'react';
// import UserContext from '../context/UserContext'

// const courses = () =>
// {
//      const user = useContext(UserContext)
//     const [courses, setCourses] = useState([])
//     const [deletecourses, setDeletedCourses] = useState([])
// }
// useEffect(() => {
//     const getCourses = async () => {
//         const result = await fetch('https://lil-project-1.herokuapp.com/api/courses', {
//             headers: {
//                 Authorization: user.user.token
//             }
//         })
//         const json = await result.json()
//         setCourses(json.data.courses)
//     const deleteCourses = async() => {
//         const result = await fetch('https://lil-project-1.herokuapp.com/api/courses?deleted=true',
//         {
//             headers:{
//                 Authorization: application/json
//             }
//         }
//         )
//         const json2 = await result.json()
//         setDeletedCourses(json2.data.courses)

//     }
//     return(
//         {

//         }
//     )
    

// export default Courses;