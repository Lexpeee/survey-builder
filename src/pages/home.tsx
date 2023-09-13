import {
  Card, 
  CardContent, 
  Container,
  Grid
} from '@mui/joy'
import React from 'react'
import { styled } from '@/stitches.config'

const HomePage = () => {
  return (
    <>
      <Grid container>
        <Grid xs={12} sm={2}>
          <Sidebar>
            <SidebarContent>
              <div>
                <h1>Vey</h1>
                <span>asdlaksjdfklsadjf</span>
                <span>asdlaksjdfklsadjf</span>
              </div>
              <div>asdfasf</div>
            </SidebarContent>
          </Sidebar>
        </Grid>
        <Grid xs={12} sm={10}>asdf</Grid>
      </Grid>
    </>
  )
}

export default HomePage

const Sidebar = styled(Card, {
  height: '100vh'
})

const SidebarContent = styled(CardContent, {
  display: 'flex',
  justifyContent: 'space-between',
  overflow: 'hidden',
  overflowWrap: 'break-word'
})