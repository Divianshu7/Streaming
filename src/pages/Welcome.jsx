import { styled } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import Logo from '../assets/giphy.gif'
function Welcome() {
    const [m, setM] = useState(".")
    const [n, setN] = useState(1)
    let n1 = true
    function changeN() {
        if (n1 === true) {
            if (n < 3) setN(p => p + 1)
            else setN(1)
            n1 = false
        }
    }
    setInterval(changeN, 2000)
    return (
        <Container>
            <img src={Logo} alt='welcome' />
            <h1>Please wait, connecting to the server{m.repeat(n)}</h1>
        </Container>
    )
}
const Container = styled(Box)({
    height: "100vh",
    backgroundColor: "black",
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "h1": {
        position: "absolute",
        color: "white",
        fontSize: "15px"
    }
})
export default Welcome