import React, { useState, useContext } from 'react'
import axios from 'axios'

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
			formData.append('comment', e.currentTarget.elements.comment.value)
            try {
                const result = await axios({
                    method: 'POST',
                    url: 'https://lil-project-1.herokuapp.com/api/testimonials',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: user.user.token
                    }
                })
                console.log(result)
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
				<input type="text" name="comment" required />
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>
        </>
    )
}

export default TestFileUpload