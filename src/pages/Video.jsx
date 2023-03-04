import { styled } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopNav from '../components/TopNav'
import { Send, ThumbUp, ThumbUpAlt, ThumbUpOffAltOutlined, Visibility } from '@mui/icons-material'
import CommentSection from '../components/CommentSection'
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, InstapaperIcon, InstapaperShareButton, LineIcon, LinkedinIcon, LinkedinShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
import { Modal } from 'antd'
function Video() {
    const currentPageUrl = window.location.href;
    const [video, setVideo] = useState()
    const [views, setViews] = useState()
    const [pageVisited, setPageVisited] = useState(false)
    const { videoId } = useParams()
    const getAllvideos = async () => {
        await axios.get(`${process.env.REACT_APP_API}/all/o${videoId}`).then(result => {
            setVideo(result.data)
            setLikes(result.data.likes)
            setViews(result.data.views + 1)
            setPageVisited(true)
        }).catch(err => {
            // setMedias([])
            console.log(err)
        })

    }
    const user = JSON.parse(localStorage.getItem("chat-app-user"))
    const navigate = useNavigate()
    const [likes, setLikes] = useState()
    const [showModal, setShowModal] = useState(false)
    const updateViews = async () => {
        if (views !== undefined) {
            console.log(views)
            await axios.post(`${process.env.REACT_APP_API}/updateViews/${views}/${videoId}`)
        }
    }
    const updateLikes = async () => {
        await axios.post(`${process.env.REACT_APP_API}/updateLike/${likes}/${videoId}`)
    }
    useEffect(() => {
        updateViews()
    }, [pageVisited])
    useEffect(() => {
        getAllvideos()
    }, [])
    useEffect(() => {
        updateLikes()
    }, [likes])
    const share = () => {
        setShowModal(true)
    }
    return (
        <Container>
            <TopNav />
            {video != null && (
                <div className='container' >
                    <video controls preload='auto'  >
                        <source src={`https://streaming-api.onrender.com${video?.videos}`} />
                        ;Your browser does not support video tag
                    </video>
                    <p className='name'>{video?.name}</p>
                    <div className='descr'>
                        <div className='desc'>

                            <div className='postedBy'>{video?.postedBy.username[0]}</div>
                            <div className='' >

                                <p className='user'>{video?.postedBy.username}</p>
                                <p className='user' >{moment(new Date(video?.createdAt)).fromNow()}</p>
                            </div>
                        </div>
                        <div className='iconC'>
                            <Visibility className='icon' />
                            <p>{views}</p>
                        </div>
                        <div onClick={share} className='iconC'>
                            <Send className='icon' />
                        </div>
                        <Modal width="350px" onCancel={() => setShowModal(false)} open={showModal} footer={[]} >
                            <FacebookShareButton url={currentPageUrl} >
                                <FacebookIcon round={true} className='modal' />
                            </FacebookShareButton>
                            <EmailShareButton url={currentPageUrl} >
                                <EmailIcon round={true} className='modal' />
                            </EmailShareButton>
                            <WhatsappShareButton url={currentPageUrl} >
                                <WhatsappIcon round={true} className='modal' />
                            </WhatsappShareButton>
                            <LinkedinShareButton url={currentPageUrl}>
                                <LinkedinIcon round={true} />
                            </LinkedinShareButton>
                        </Modal>
                        <div onClick={() => setLikes(prev => prev + 1)} className='iconC'>
                            <ThumbUpOffAltOutlined className='icon' />
                            <p>{likes}</p>
                        </div>
                    </div>
                </div>)}
            <hr />
            {user ? (<CommentSection videoId={videoId} />) : (<p onClick={() => navigate("/")} className='login' style={{ cursor: "pointer", color: "white" }}>Login to View or Add Comments</p>)}
        </Container>
    )
}
const Container = styled(Box)({
    backgroundColor: "#3C4048",
    minHeight: "100vh",
    ".login": {
        "&:hover": { color: "blue!important" },
    },
    ".modal": {
        borderRadius: "10px!important",
        marginRight: "10px"
    },
    ".name": {
        fontWeight: "bold",
        margin: "30px 0 0 30px!important",
        fontSize: "30px"
    },
    "hr": {
        backgroundColor: "grey",
        border: "none",
        height: "2px",
        width: "80vw"
    },
    ".iconC": {
        color: "white",
        backgroundColor: '#73777B',
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 20px",
        borderRadius: "20px",
        cursor: "pointer"
        ,
        "p": {
            marginBottom: "2px!important",
        }
    },
    ".descr": {
        display: "flex",
        padding: "0 40px 0 0",
        justifyContent: "space-between"
    },
    ".desc": {
        margin: "10px 0 0 30px",
        display: "flex",
        ".postedBy": {
            backgroundColor: "red",
            width: "25px",
            height: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px"
        }
    },
    ".user": {
        color: "grey",
        fontSize: "13px"
    },
    ".container": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        "video": {
            backgroundColor: "black",
            borderRadius: "20px",
            width: "95vw",
            height: '50vh'
        },
        "p": {
            margin: '2px 0 0 10px',

        },
        padding: "1rem 0",
        margin: "0 20px",
        // width: "99vw",
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
export default Video