import { styled } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
function UploadList({ medias }) {
    console.log(medias)
    return (
        <div>
            {medias && medias.map(media => {
                return (<>
                    <Container>
                        <div className='video'>

                            <div>
                                {media.videos.map(video => {
                                    return (
                                        <video preload='auto' width='60' height='60' controls>
                                            <source src={`https://streaming-api.onrender.com${video}`} />
                                            ;Your browser does not support video tag
                                        </video>
                                    )
                                })}
                            </div>
                            <div>{media.name}</div>
                        </div>
                        <div className='date'>{media.createdAt.substr(0, 10)}</div>
                        <div className='likes'>{media.likes}</div>
                    </Container>
                    <hr />
                </>
                )
            })}
        </div>
    )
}
const Container = styled(Box)({
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "60% 20% 20%",
    ".video": {
        display: "flex",
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

export default UploadList