import axios from 'axios'
import React, { useState } from 'react'

function UploadForm({ getAllvideos }) {
    const [name, setName] = useState('')
    const [videos, setVideos] = useState([])
    const user = JSON.parse(localStorage.getItem('chat-app-user'))
    const handleSubmit = (e) => {
        e.preventDefault()
        if (user) {
            let formData = new FormData()
            for (let key in videos) {
                formData.append('videos', videos[key])
            }
            formData.append("name", name)
            formData.append("postedBy", user._id)
            axios.post(`${process.env.REACT_APP_API}/create`, formData).then(success => {
                getAllvideos()
                alert('Submitted')
            }).catch(error => {
                console.log(error)
                alert("Error happened!")
            })
        }
    }
    return (
        <form onSubmit={handleSubmit} >
            <div>
                <label>Name</label>
                <input onChange={(e) => setName(e.target.value)} type='text' name='name' id='name' className=''>
                </input>

            </div>
            <div>
                <label >Upload videos</label>
                <input onChange={(e) => {
                    setVideos(e.target.files)
                }} type='file' name='videos' id='videos' accept='.mp4,.mkv' />
            </div>
            <button type='submit' >Submit</button>
        </form>
    )
}

export default UploadForm