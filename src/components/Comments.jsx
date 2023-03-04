import { Button, Input, styled } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
function Comments({ postedBy, id, comment, replyId }) {
    const user = JSON.parse(localStorage.getItem("chat-app-user"))
    const [reply, setReply] = useState(false)
    const [comments, setComments] = useState([])
    const [replyc, setReplyc] = useState()
    const [repliesFromBackend, setRepliesFromBackend] = useState(false)
    const tempR = {}
    const [show, setShow] = useState(false)
    const showReply = async () => {
        if (replyId.length > 0) {
            let res = []
            if (!repliesFromBackend) res = await axios.get(`${process.env.REACT_APP_API}/getReplies/${id}`)
            if (!repliesFromBackend) setComments([...res.data, ...comments])
            setShow(true)
            setRepliesFromBackend(true)
        }
    }
    const addReply = async (e) => {
        e.preventDefault()
        setShow(true)

        tempR.postedBy = user._id
        tempR.comment = replyc
        tempR.replies = []
        tempR._id = uuidv4()
        console.log(comments)
        setComments([tempR, ...comments])
        await axios.post(`${process.env.REACT_APP_API}/reply/${id}/${user._id}`, { replyc })
    }
    return (<Container>
        <div className='container' >{comment}</div>
        <div className='replyMore'>
            <div onClick={() => {
                setReply(!reply)
                showReply()

            }} className='reply'>Reply</div>
            {replyId.length > 0 && (<>
                {!show && <div onClick={showReply} className='reply'>Show More</div>}
                {show && (<div onClick={() => setShow(false)} className='reply'>Hide Replies</div>)}
            </>
            )}

        </div>
        {reply && (
            <form onSubmit={addReply}>
                <Input value={replyc} onChange={(e) => setReplyc(e.target.value)} disableUnderline placeholder='Add A Comment' />
                <hr />
                <Button type='submit' variant='contained' >Comment</Button>
            </form>
        )}
        {show && comments.map(c => {
            return (
                <Comments postedBy={c.postedBy} replyId={c.replies} id={c._id} comment={c.comment} />
            )
        })}
    </Container>
    )
}
const Container = styled(Box)({
    color: "white",
    ".replyMore": {
        display: "flex",
    },
    ".reply": {
        color: "grey",
        margin: "1px 35px 0 0",
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
    "input": {
        width: "70vw",
        color: "white"
    },
    "p": {
        margin: "0"
    }
})
export default Comments