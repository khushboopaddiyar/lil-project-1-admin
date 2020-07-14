import React, { useState, useContext } from 'react'

import UserContext from '../context/UserContext'

const TestFileUpload = () => {
    const user = useContext(UserContext)

    const [selectedFile, setSelectedFile] = useState('')
    const handleFileChange = e => {
        setSelectedFile(e.target.files[0])
    }
    const handleUpload = async e => {
        e.preventDefault()
        if (selectedFile !== '') {
            const formData = new FormData()
            formData.append('image', selectedFile, `${selectedFile.lastModified}-${selectedFile.name}`)
            formData.append('label', e.currentTarget.elements.label.value)
            try {
                const result = await fetch('https://lil-project-1.herokuapp.com/api/gallery', {
                    method: 'POST',
                    headers: {
                        Authorization: user.user.token
                    },
                    body: formData
                })
                const json = await result.json()
                console.log(json)
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <>
            <form onSubmit={handleUpload}>
                <input type="text" name="label" required />
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>
        </>
    )
}

export default TestFileUpload