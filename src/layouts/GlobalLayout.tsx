import {
  Card,
  CardContent, 
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator
} from '@mui/joy'
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  List as ListIcon,
  LogOut as LogOutIcon
} from 'lucide-react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { styled } from '@/stitches.config'

const GlobalLayout: FC<any> = ({children}) => {
  const router = useRouter()
  
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
                    <ListItemButton
                      onClick={() => router.push('/home')}
                    >
                      <ListItemDecorator>
                        <HomeIcon/>
                      </ListItemDecorator>
                      <ListItemContent>Home</ListItemContent>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      onClick={() => router.push('/my-forms')}
                    >
                      <ListItemDecorator>
                        <ListIcon/>
                      </ListItemDecorator>
                      <ListItemContent>Your forms</ListItemContent>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      onClick={() => router.push('/settings')}
                    >
                      <ListItemDecorator>
                        <SettingsIcon/>
                      </ListItemDecorator>
                      <ListItemContent>Settings</ListItemContent>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      onClick={() => console.log("logout user")}
                    >
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
        <Grid xs={12} sm={10}>
          {children}
        </Grid>
      </Grid>
    </>
  )
}

export default GlobalLayout

const Sidebar = styled(Card, {
  height: '100vh'
})

const SidebarContent = styled(CardContent, {
  display: 'flex',
  justifyContent: 'space-between',
  overflow: 'hidden',
  overflowWrap: 'break-word'
})