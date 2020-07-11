import React, { useState } from 'react'
import axios from 'axios'

const TestFileUpload = () => {
    const [selectedFile, setSelectedFile] = useState('')
    const handleFileChange = e => {
        setSelectedFile(e.target.files[0])
    }
    const handleUpload = async e => {
        e.preventDefault()
        if (selectedFile !== '') {
            const formData = new FormData()
            formData.append('image', selectedFile, `${selectedFile.lastModified}-${selectedFile.name}`)
			const result = await axios({
               method: 'POST',
               url: 'http://localhost:5000/api/upload',
               data: formData,
               headers: {
                   'Content-Type': 'multipart/form-data'
               }
            })
            console.log(result)
        }
    }
    return (
        <>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </>
    )
}

export default TestFileUpload