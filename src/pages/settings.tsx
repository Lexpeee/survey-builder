import ContentHeader from '@/components/global/ContentHeader'
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Typography
} from '@mui/joy'
import Head from 'next/head'
import React from 'react'

const SettingsPage = () => {
  return (
    <>
      <Head>
        <title>Settings | Proform</title>
      </Head>
      <ContentHeader
        header="Settings"
      />
      <Container>
        <List>
          <Typography level="body-xs">Theme</Typography>
          <ListItem>
            Dark Mode
          </ListItem>
          <Typography level="body-xs">Account</Typography>
          <ListItem>
            Change password
          </ListItem>
          <ListItem>
            Logout
          </ListItem>
        </List>
      </Container>
    </>
  )
}

export default SettingsPage