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
            formData.append('name', e.currentTarget.elements.name.value)
            formData.append('email', e.currentTarget.elements.email.value)
            formData.append('contactNumber', e.currentTarget.elements.contactNumber.value)
            formData.append('description', e.currentTarget.elements.description.value)
            formData.append('linkedin', e.currentTarget.elements.linkedin.value)
            formData.append('twitter', e.currentTarget.elements.twitter.value)
            try {
                const result = await fetch('https://lil-project-1.herokuapp.com/api/teammembers', {
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
                <input type="text" name="name" required />
                <input type="email" name="email" required />
                <input type="number" name="contactNumber" required />
                <input type="text" name="description" required />
                <input type="url" name="linkedin" required />
                <input type="url" name="twitter" required />
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>
        </>
    )
}

export default TestFileUpload