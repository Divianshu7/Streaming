import { Button, Input, styled } from '@mui/material'
import { Box } from '@mui/system'
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
        <Container>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>Name </label>
                    <Input placeholder='name for video' onChange={(e) => setName(e.target.value)} type='text' name='name' id='name' className=''>
                    </Input>

                </div>
                <div>
                    <label >Upload videos   </label>
                    <input className='video' onChange={(e) => {
                        setVideos(e.target.files)
                    }} type='file' name='videos' id='videos' accept='.mp4,.mkv' />
                </div>
                <Button variant='contained' type='submit' >Submit</Button>
            </form>
        </Container>
    )
}
const Container = styled(Box)({
    display: 'flex',
    flexDirection: "column"
    , height: "200px",
    "form": {
        height: "100%",
        gap: "2rem",
        display: "flex",
        "input": {
            marginLeft: "1rem"
        },

        flexDirection: "column"
    }
})
export default UploadForm