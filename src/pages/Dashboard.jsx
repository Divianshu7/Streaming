import { Button, styled } from '@mui/material'
import { Box } from '@mui/system'
import { Modal } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UploadForm from '../components/uploadForm'
import UploadList from '../components/UploadList'

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("chat-app-user"))
    const [medias, setMedias] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const getAllvideos = () => {
        axios.get(`${process.env.REACT_APP_API}/all/${user._id}`).then(result => {
            console.log(result)
            setMedias(result.data)
        }).catch(err => {
            // setMedias([])
            console.log(err)
        })
    }
    useEffect(() => {
        getAllvideos()
    }, [getAllvideos])
    if (user) {
        const name = user.username
        return (
            <Container>
                <div className='user'>
                    <div className='userD'>
                        <div className='Logo' >
                            <h1>{name[0]}</h1>
                        </div>
                        <p>{name} ({user.type})</p>
                    </div>
                    <div className='partition' ></div>
                </div>
                <div className='video'>
                    <h2>Your Videos</h2>
                    <hr />
                    <div className='videoSection' >
                        <div className='videos' >
                            <p>Videos</p>
                            <hr />
                            {/* <UploadForm getAllvideos={getAllvideos} /> */}

                        </div>
                        <div className='date' >
                            <p>Upload Date</p>
                            <hr />
                        </div>
                        <div className='likes' >
                            <p>Likes</p>
                            <hr />
                        </div>

                    </div>
                    <UploadList medias={medias} />
                    <Button onClick={() => setOpenModal(true)} variant='contained' >Upload Video</Button>
                    <Modal
                        footer={[]}
                        okButtonProps={{ hidden: true }} open={openModal} onCancel={() => setOpenModal(false)} >
                        <UploadForm getAllvideos={getAllvideos} />
                    </Modal>
                </div>
            </Container>
        )
    }
    else {
        return (
            <div>Dashboard</div>
        )
    }
}
const Container = styled(Box)({
    display: "grid",
    color: "white",
    "hr": {
        backgroundColor: "#3C4048",
        border: "none",
        height: "2px"
    },
    ".userD": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "40vw",
        "p": {
            color: "grey"
        }
    },
    ".videoSection": {
        display: "grid",
        textAlign: "left",
        gridTemplateColumns: "60% 20% 20%"
    },
    ".Logo": {
        marginTop: "10vh",
        backgroundColor: "green",
        width: "100px",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "30px",
        borderRadius: "100px"
    },
    ".user": {
        display: "flex",
        justifyContent: ""
    },
    ".partition": {
        height: "100vh",
        width: "5px",
        backgroundColor: "#3C4048"
    },
    height: "100vh",
    gridTemplateColumns: "20% 80%",
    backgroundColor: "#20262E"
})
export default Dashboard