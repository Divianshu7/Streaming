import { styled } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()
    return (
        <Container>
            <div className='video'>

                {media?.map(video => {
                    console.log(video.videos)
                    return (
                        <>
                            <div onClick={() => navigate(`/video/${video._id}`)} className='container' >
                                <video preload='auto' height='200' >
                                    <source src={`http://localhost:5000${video.videos}`} />
                                    ;Your browser does not support video tag
                                </video>
                                <div className='desc'>
                                    <div className='postedBy'>{video.postedBy.username[0]}</div>
                                    <div className='vd' >
                                        <p className='name'>{video.name}</p>
                                        <p className='user'>{video.postedBy.username}</p>
                                        <p className='user' >{moment(new Date(media[0]?.createdAt)).fromNow()}</p>
                                    </div>
                                </div>
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
    ".name": {
        fontWeight: "bold"
    },
    ".vd": {
        width: "25vw"
    },
    ".desc": {
        marginLeft: "8px",
        display: "flex",
        width: "30vw",
        ".postedBy": {
            backgroundColor: "red",
            width: "45px",
            height: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "30px"
        }
    },
    ".user": {
        color: "grey",
        fontSize: "13px"
    },
    ".container": {
        cursor: "pointer",
        "video": {
            backgroundColor: "black",
            borderRadius: "20px",
            width: "30vw"
        },
        "p": {
            margin: '2px 0 0 10px',

        },
        padding: "1rem 0",
        margin: "10px",
        width: "300px",
        borderRadius: "20px",
        textAlign: "left",
        color: "white",
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