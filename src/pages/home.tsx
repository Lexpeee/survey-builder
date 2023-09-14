import {
  Card, 
  CardContent, 
  Container,
  Grid,
  List, 
  ListItem, 
  ListItemButton,
  ListItemContent, 
  ListItemDecorator
} from '@mui/joy'
import { 
  List as ListIcon,
  LogOut as LogOutIcon
} from 'lucide-react'
import React from 'react'
import { styled } from '@/stitches.config'

const HomePage = () => {
  return (
    <>
    {/* CONVERT THIS TO A LAYOUT */}
      <Grid container>
        <Grid xs={12} sm={2}>
          <Sidebar>
            <SidebarContent>
              <div>
                <h1>Vey</h1>
                <List>
                  <ListItem>
                    <ListItemButton>
                      <ListItemDecorator>
                        <ListIcon/>
                      </ListItemDecorator>
                      <ListItemContent>Your forms</ListItemContent>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>
                      <ListItemDecorator>
                        <LogOutIcon/>
                      </ListItemDecorator>
                      <ListItemContent>Logout</ListItemContent>
                    </ListItemButton>
                  </ListItem>
                </List>
                {/* <span>asdlaksjdfklsadjf</span> */}
              </div>
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