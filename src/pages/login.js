import { Box, styled } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import Logo from '../assets/logo.svg'
import jwt_decode from 'jwt-decode'
import { login } from '../utils/auth'
import axios from 'axios'
function Login() {
    function handleCallBack(response) {
        console.log("Encoded Jwt token:" + response.credential)
        var userObject = jwt_decode(response.credential)
        console.log(userObject)
        const email = userObject.email
        console.log(email)
        const { data } = axios.post(`${process.env.REACT_APP_API}/loginWithGoogle`, { email }).then((r) => { return r })
        if (data.status === true) {
            localStorage.setItem('chat-app-user', JSON.stringify(data.user))
            history('/home')
            console.log(data)
        } else {
            toast.error(data.msg)
        }
    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "95563530583-cu6jr5acjohjpetfeeivvu6hq2n55q8i.apps.googleusercontent.com",
            callback: handleCallBack
        })
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        )
    }, [])
    const history = useNavigate()
    const [values, setValues] = useState({
        username: '',
        password: '',
    })
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            history('/home')
        }
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (handleValidation()) {
            const { password, username } = values
            try {
                const { data } = await login({ username, password })
                if (data.status === true) {
                    localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                    history('/home')
                    console.log(data)
                } else {
                    toast.error(data.msg)
                }
            } catch (err) {
                console.log('Login error==>', err)
                toast.error('Login error, Try again')
            }
        }
    }
    const handleValidation = () => {
        const { password, username } = values
        if (password === '') {
            toast.error('password is required.', {
                theme: "dark",
                autoClose: 8000

            })
            console.log('password and confirmPassword should be same')
            return false
        } else if (username === '') {
            toast.error('Username is required', {
                theme: 'dark',
                autoClose: 8000
            })
            console.log('Username should be greater than 3 characters')
            return false
        }
        return true
    }
    const handleChnage = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
        <>

            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='brand'>
                        {/* <img src={Logo} alt='Logo' /> */}
                        <h1>snappy</h1>
                    </div>
                    <input type='text' name='username' placeholder='user name' min='3' onChange={(e) => handleChnage(e)} />
                    <input type='password' name='password' placeholder='password' onChange={(e) => handleChnage(e)} />
                    <div id='signInDiv' ></div>
                    <button type='submit' >Login</button>
                    <span>Don't have an account ? <Link to='/register'>Register</Link> </span>
                </form>
            </FormContainer>
        </>
    )
}
const FormContainer = styled(Box)({
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
    alignItems: "center",
    backgroundColor: "#131324",
    ".brand": {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        justifyContent: "center",
        "img": {
            height: "5rem",
        },
        "h1": {
            color: "white",
            textTransform: "uppercase",
        }
    },
    "form": {
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        backgroundColor: "#00000076",
        borderRadius: "2rem",
        padding: "3rem 5rem",
        "input": {
            backgroundColor: "transparent",
            padding: "1rem",
            border: "0.1rem solid #4e0eff",
            borderRadius: "0.4rem",
            color: "white",
            width: "100%",
            fontSize: "1rem",
            "&:focus": {
                border: "0.1rem solid #997af0",
                outline: "none",
            }
        },
        "button": {
            backgroundColor: "#997af0",
            color: "white",
            padding: "1rem 2rem",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: "0.4rem",
            fontSize: "1rem",
            textTransform: "uppercase",
            transition: "0.5s ease-in-out",
            "&:hover": {
                backgroundColor: "#4e0eff",
            }
        },
        "span": {
            color: "white",
            textTransform: "uppercase",
            "a": {
                color: "#4e0eff",
                textTransform: "none",
                textDecoration: "none",
                fontWeight: "bold",
            }
        }
    }
})

export default Login