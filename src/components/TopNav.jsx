import { styled } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import LiveTv from '@mui/icons-material/LiveTv';
function TopNav() {
    const user = JSON.parse(localStorage.getItem("chat-app-user"))
    const { username } = user
    return (
        <Container>
            <div className='logo1'>
                <LiveTv className='icon' />
                <label>Streaming</label>
            </div>
            <div className='user'>
                <div className='userD'>
                    <div className='Logo' >
                        <h1>{username[0]}</h1>
                    </div>
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
    ".icon": {
        color: "white"
    },
    ".logo1": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "12vw"
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
        borderRadius: "100px"
    },
    ".user": {
        display: "flex",
        justifyContent: ""
    },
})
export default TopNav