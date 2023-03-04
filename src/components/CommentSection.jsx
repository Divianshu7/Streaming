import { Button, Input, styled } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Comments from './Comments'
import { v4 as uuidv4 } from 'uuid';
function CommentSection({ videoId }) {
    const [user, setUser] = useState(undefined)
    const [comment, setComment] = useState()
    let temp = {}
    const [comments, setComments] = useState()
    const addComment = async (e) => {
        e.preventDefault()
        temp.comment = comment
        temp.postedBy = user._id
        temp.replies = []
        temp._id = uuidv4()
        setComments([...comments, temp])
        await axios.post(`${process.env.REACT_APP_API}/comment/${videoId}/${user._id}`, { comment })
    }
    const allComments = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API}/getcomment/${videoId}`)
        setComments(res.data)
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("chat-app-user")))
        allComments()
    }, [])

    return (
        <Container>
            <form onSubmit={addComment}>
                <Input value={comment} onChange={(e) => setComment(e.target.value)} disableUnderline placeholder='Add A Comment' />
                <hr />
                <Button type='submit' variant='contained' >Comment</Button>
            </form>
            <div className='comments' >
                {comments?.map(c => {
                    return (<>
                        <Comments postedBy={c.postedBy} replyId={c.replies} id={c._id} comment={c.comment} />
                        <hr className='hr' />
                    </>
                    )
                })}
            </div>
        </Container>
    )
}
const Container = styled(Box)({
    color: "white",
    ".reply": {
        color: "grey",
        marginTop: "1px",
        textAlign: "left",
        cursor: "pointer"
    },
    padding: "1rem 6%",
    ".container": {
        textAlign: "left",
        backgroundColor: "black",
        padding: "1rem 6%",
        margin: "10px 0 0 0"
    },
    "hr": {
        border: "none",
        height: "1px",
        width: "70vw",
        backgroundColor: "white",
        marginTop: "0"
    },
    ".hr": {
        backgroundColor: 'grey',
        width: "100%"
    },
    "input": {
        width: "70vw",
        color: "white"
    },
    "p": {
        margin: "0"
    }
})
export default CommentSection