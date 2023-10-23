import { styled } from '@/stitches.config'
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Stack
} from '@mui/joy'
import {
  Home as HomeIcon,
  List as ListIcon,
  LogOut as LogOutIcon,
  Settings as SettingsIcon
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

const GlobalLayout: FC<any> = ({children}) => {
  const router = useRouter()

  return (
    <>
    {/* CONVERT THIS TO A LAYOUT */}
      <Grid container>
        <Grid xs={12} sm={2}>
          <Sidebar>
            <Stack
              direction="column"
              justifyContent={'space-evenly'}
            >
              <div>
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Image
                    src={'https://ik.imagekit.io/ychxbfg73/proform/logos/Logo-only_bPkY5tfdj.png?updatedAt=1695609550413'}
                    alt="proform-icon"
                    height={50}
                    width={150}
                  />
                </Stack>
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
                </List>
              </div>
              <List>
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      router.push('/login')
                      console.log("logout user")
                    }}
                  >
                    <ListItemDecorator>
                      <LogOutIcon/>
                    </ListItemDecorator>
                    <ListItemContent>Logout</ListItemContent>
                  </ListItemButton>
                </ListItem>
              </List>
            </Stack>
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

const Sidebar = styled('div', {
  height: '100vh',
  padding: 10,
  display: 'block',
  borderRight: '1px solid #ddd'
})