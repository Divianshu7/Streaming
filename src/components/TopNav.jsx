import { styled } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import LiveTv from '@mui/icons-material/LiveTv';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
function TopNav() {
    const user = JSON.parse(localStorage.getItem("chat-app-user"))
    const [showdrop, setShowDrop] = useState(false)
    const navigate = useNavigate()
    const loginout = () => {
        localStorage.clear()
        navigate('/')
    }
    return (
        <Container>
            <div onClick={() => navigate('/home')} className='logo1'>
                <LiveTv className='icon' />
                <label>Streaming</label>
            </div>
            {user && user.type === "creator" && <div onClick={() => navigate('/dashboard')} className='logo1'>
                <label>Dashboard</label>
            </div>}
            <div className='user1'>
                <div className='userD'>
                    <div onClick={() => setShowDrop(!showdrop)} className='Logo' >
                        {user ? (<h1>{user.username[0]}</h1>) : (<AccountCircle />)}
                    </div>
                    {showdrop && <div onClick={loginout} className='drop' >
                        <div>{user ? "Logout" : "Login"}</div>
                    </div>}
                </div>
            </div>
        </Container>
    )
}
const Container = styled(Box)({
    backgroundColor: "black",
    display: "flex",
    color: "white",
    height: "10vh",
    padding: "1rem 6%",
    alignItems: "center",
    justifyContent: "space-between",
    ".drop": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "80px",
        backgroundColor: "green",
        height: "70px",
        width: "50px",
        borderRadius: "30px"
    },
    ".icon": {
        color: "white"
    },
    ".logo1": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100px",
        cursor: "pointer"
    },
    ".userD": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "p": {
            color: "grey"
        }
    },
    ".Logo": {
        marginTop: "",
        backgroundColor: "green",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "10px",
        borderRadius: "100px",
        cursor: "pointer"
    },
    ".user1": {
        display: "flex",
        justifyContent: ""
    },
})
export default TopNav