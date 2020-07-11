import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext'

function DemoRequest() {
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
        <div>
            {data.map(items => <p key={items._id} >{items.email}</p>)}
        </div>
    )
}


export default DemoRequest;