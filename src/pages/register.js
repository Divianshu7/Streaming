import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Box, styled } from '@mui/system'
import { Checkbox } from '@mui/material'
import jwt_decode from 'jwt-decode'

import { register } from '../utils/auth'
function Register() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const history = useNavigate()
    const [showDiv, setShowDiv] = useState(false)
    const [checked, setChecked] = useState([false, false])
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: ""
    })
    function handleCallBack(response) {
        console.log("Encoded Jwt token:" + response.credential)
        var userObject = jwt_decode(response.credential)
        console.log(userObject)
        const userName = userObject.name
        values.username = userName
        setValues({ ...values, username: userName })
        setValues({ ...values, email: userObject.email })

        setShowDiv(true)
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
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            history('/')
        }
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(values)

        if (handleValidation()) {
            const { password, confirmPassword, email, username, type } = values
            console.log(values)
            try {
                const { data } = await register({ username, password, email, type })
                if (data.status === true) {
                    localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                    history('/home')
                } else {
                    toast.error(data.msg)
                }
            } catch (err) {
                console.log('Registeration error==>', err)
                toast.error('Registeration error, Try again')
            }
        }
    }
    const handleValidation = () => {
        const { password, confirmPassword, email, username, type } = values
        if (password !== confirmPassword) {
            toast.error('password and confirmPassword should be same.', {
                theme: "dark",
                autoClose: 8000

            })
            console.log('password and confirmPassword should be same')
            return false
        } else if (username.length < 3) {
            toast.error('Username should be greater than 3 characters', {
                theme: 'dark',
                autoClose: 8000
            })
            console.log('Username should be greater than 3 characters')
            return false
        } else if (password.length < 8) {
            toast.error('Password should be greater than 8 characters', {
                theme: 'dark',
                autoClose: 8000
            })
            console.log('Password should be greater than 8 characters')
            return false
        } else if (email === '') {
            toast.error('email required', {
                theme: 'dark',
                autoClose: 8000
            })
            console.log('email required')
            return false
        } else if (type == "") {
            toast.error("Choose one from creator or student", {
                theme: "dark",
                autoClose: 8000
            })
        }
        return true
    }
    const handleChnage = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
        <>
            {showDiv && <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='brand'>
                        {/* <img src={Logo} alt='Logo' /> */}
                        <h1>snappy</h1>
                    </div>
                    <input type='password' name='password' placeholder='password' onChange={(e) => handleChnage(e)} />
                    <input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={(e) => handleChnage(e)} />
                    <div className='check'>
                        <div><Checkbox {...label} onChange=
                            {
                                (e) => {
                                    if (e.target.checked) {
                                        setChecked([true, false])
                                        setValues({ ...values, type: "creator" })
                                    }
                                    else {
                                        setChecked([false, true])
                                        setValues({ ...values, type: "student" })
                                    }
                                }
                            }
                            checked={checked[0]}
                        />
                            <label>creator</label>
                        </div>
                        <div>
                            <Checkbox
                                {...label}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setChecked([false, true])
                                        setValues({ ...values, type: "student" })
                                    }
                                    else {
                                        setChecked([true, false])
                                        setValues({ ...values, type: "creator" })
                                    }
                                }
                                }
                                checked={checked[1]}
                            />
                            <label>student</label>
                        </div>
                    </div>

                    <button type='submit' >Create User</button>
                </form>
            </FormContainer>}
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='brand'>
                        {/* <img src={Logo} alt='Logo' /> */}
                        <h1>snappy</h1>
                    </div>
                    <input type='text' name='username' placeholder='user name' onChange={(e) => handleChnage(e)} />
                    <input type='email' name='email' placeholder='email' onChange={(e) => handleChnage(e)} />
                    <input type='password' name='password' placeholder='password' onChange={(e) => handleChnage(e)} />
                    <input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={(e) => handleChnage(e)} />
                    <div className='check'>
                        <div><Checkbox {...label} onChange=
                            {
                                (e) => {
                                    if (e.target.checked) {
                                        setChecked([true, false])
                                        setValues({ ...values, type: "creator" })
                                    }
                                    else {
                                        setChecked([false, true])
                                        setValues({ ...values, type: "student" })
                                    }
                                }
                            }
                            checked={checked[0]}
                        />
                            <label>creator</label>
                        </div>
                        <div>
                            <Checkbox
                                {...label}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setChecked([false, true])
                                        setValues({ ...values, type: "student" })
                                    }
                                    else {
                                        setChecked([true, false])
                                        setValues({ ...values, type: "creator" })
                                    }
                                }
                                }
                                checked={checked[1]}
                            />
                            <label>student</label>
                        </div>
                    </div>
                    <div id='signInDiv' ></div>

                    <button type='submit' >Create User</button>
                    <span>already have an account ? <Link to='/'>Login</Link> </span>
                </form>
            </FormContainer>
        </>
    )
}
const FormContainer = styled(Box)({
    height: "100vh",
    // width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "0.5rem",
    alignItems: "center",
    backgroundColor: "#131324",
    ".check": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    "label": { color: "white" },
    ".brand": {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        justifyContent: "center",
        "img": {
            height: "5rem"
        },
        "h1": {
            color: "white",
            textTransform: "uppercase"
        }
    },
    "form": {
        display: "flex",
        flexDirection: "column",
        gap: "1.3rem",
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
                outline: "none"
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
                backgroundColor: "#4e0eff"
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

export default Register