import { styled } from '@/stitches.config'
import {
  FormControl, 
  FormLabel,
  Button,
  Card,
  CardContent,
  Grid,
  Input,
  Stack,
  Typography
} from '@mui/joy'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const LoginPage = () => {


  return (
    <Grid container>
      <Grid xs={12} md={6}>
        <CoverImage>
          <img src="/assets/cartoon-landscape.jpg" alt="busy-city"/>
        </CoverImage>
      </Grid>
      <Grid xs={12} md={6}>
        <Wrapper>
          <LoginCard>
            <CardContent>
              <Grid container gap={3}>
                <Grid xs={12}>
                  <Stack 
                    direction="row"
                    gap={1}
                    justifyContent={'center'}
                    padding={2}
                  >
                    <Image
                      src="https://ik.imagekit.io/ychxbfg73/proform/logos/Logo-icon_Ee_Nu4Qla.png?updatedAt=1695609550276"
                      alt="proform-icon"
                      height={50}
                      width={50}
                    />
                    <Image
                      src="https://ik.imagekit.io/ychxbfg73/proform/logos/Logo_qGU_FWdGA.png?updatedAt=1695609550413"
                      alt="proform-logo"
                      height={50}
                      width={175}
                    />
                  </Stack>
                </Grid>
                <Grid xs={12}>
                  <Stack 
                    justifyContent="center"
                    direction="row"
                  >
                    <Typography level="title-lg">Login</Typography>
                  </Stack>
                </Grid>
                <Grid xs={12}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    name="username"
                  />
                </Grid>
                <Grid xs={12}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="password"
                    type="password"
                  />
                </Grid>
                <Grid xs={12} container gap={1}>
                  <Button fullWidth variant="solid">Login</Button>
                  <Button fullWidth variant="plain">Don't have an account? Click here</Button>
                </Grid>
              </Grid>
            </CardContent>
          </LoginCard>
          <Typography level="body-xs">Created by @lexpeee</Typography>
        </Wrapper>
      </Grid>
    </Grid>
  )
}

export default LoginPage

const LoginCard = styled(Card, {
  maxWidth: '500px', 
  padding: 25
})

const Wrapper = styled('div', {
  background: '#eeeeee',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
})

const CoverImage = styled('div', {
  display: 'block',
  height: '100vh',
  overflow: 'hidden',
  '&>img': {
    objectFit: 'cover',
    height: '100%',
    width: '100%'
  }
})