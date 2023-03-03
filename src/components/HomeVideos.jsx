import { styled } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function HomeVideos() {
    const [media, setMedias] = useState([])
    const getAllvideos = () => {
        axios.get(`${process.env.REACT_APP_API}/all/:all`).then(result => {
            setMedias(result.data)
        }).catch(err => {
            // setMedias([])
            console.log(err)
        })
    }
    useEffect(() => {
        getAllvideos()
    }, [])
    console.log(media)
    return (
        <Container>
            <div className='video'>

                {media?.map(video => {
                    return (
                        <>
                            <div className='container' >
                                <video preload='auto' height='200' >
                                    <source src={`http://localhost:5000${video.videos}`} />
                                    ;Your browser does not support video tag
                                </video>
                                <p>{video.name}</p>
                                {/* <div className='date'>{video.createdAt?.substr(0, 10)}</div> */}
                                {/* <div className='likes'>{video.likes}</div> */}
                            </div>
                        </>
                    )
                })}
            </div>

        </Container>
    )
}
const Container = styled(Box)({
    display: "grid",
    alignItems: "center",
    ".container": {
        cursor: "pointer",
        "video": {
            backgroundColor: "black",
            borderRadius: "20px",
            width: "30vw"
        },
        "p": {
            margin: '2px 0 0 10px'
        },
        padding: "1rem 0",
        margin: "10px",
        width: "300px",
        borderRadius: "20px",
        textAlign: "left",
        color: "white",
        fontWeight: "bold"
    },
    ".video": {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
        alignItems: "center",
        "div": {
            marginRight: "10px"
        }
    },
    ".date": {
        textAlign: "left"
    },
    ".likes": {
        textAlign: "left"
    }
})
export default HomeVideos