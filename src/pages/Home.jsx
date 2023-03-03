import { styled } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import HomeVideos from '../components/HomeVideos'
import TopNav from '../components/TopNav'
import UploadList from '../components/UploadList'

function Home() {
    return (
        <Container>
            <TopNav />
            <HomeVideos />
        </Container>
    )
}
const Container = styled(Box)({
    backgroundColor: "#3C4048",
    minHeight: "100vh"
})
export default Home