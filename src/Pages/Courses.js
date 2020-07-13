import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext'
function Courses() {
    //all courses
    const user = useContext(UserContext)
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            const result = await fetch(' https://lil-project-1.herokuapp.com/api/courses', {
                method: 'GET',
                headers: {
                    Authorization: user.user.token
                }

            })

            const jsons = await result.json()

            console.log(jsons)

            if (jsons.success === true) {
                setData(jsons.data.courses)
            }

        }
        getData()
    }, [user.user.token])
    return (
        <>
            <p> all courses </p>
            {data.map(items => <p key={items._id} >{items.title} :  {items.videoUrl}</p>)}
        </>
    )
}

export default Courses;