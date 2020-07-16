import React, { useState, useEffect, useContext } from 'react'
import Button from '@material-ui/core/Button';
import UserContext from '../context/UserContext'

const Gallery = () => {

    const user = useContext(UserContext)
    const [gallery, setGallery] = useState([])
    const [deletedGallery, setDeleteGallery] = useState([])

    useEffect(() => {
        const getGallery = async () => {
            const result = await fetch('https://lil-project-1.herokuapp.com/api/gallery', {
                headers: {
                    Authorization: user.user.token
                }
            })
            const json = await result.json()
            console.log(json)
            setGallery(json.data.gallery)
            const result2 = await fetch('https://lil-project-1.herokuapp.com/api/gallery?deleted=true', {
                headers: {
                    Authorization: user.user.token
                }
            })
            const json2 = await result2.json()
            setDeleteGallery(json2.data.gallery)

            console.log({ json, json2 })
        }
        getGallery()
    }, [user.user.token])


    return (
        <>


        </>
    )



}
export default Gallery;