import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext'

function ContactUs() {
    const user = useContext(UserContext)
  const [data , setData]=  useState([])
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
                    setData(json.data.ContactUs)
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


export default ContactUs;



