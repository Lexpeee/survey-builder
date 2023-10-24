import { styled } from '@/stitches.config'
import {
  Checkbox,
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

import { useForm, Controller } from 'react-hook-form'

const LoginPage = () => {
  const { handleSubmit, control, reset } = useForm()

  const [isRegisterFormDisplayed, setIsRegisterFormDisplayed] = useState(false)

  const handleLogin = (formData) => {
    console.log("login", formData)
  }

  const handleRegister = (formData) => {
    console.log("register", formData)
  }

  useEffect(()=>{
    reset()
  }, [ isRegisterFormDisplayed])

  return (
    <Grid container>
      <Grid xs={12} md={6}>
        <CoverImage>
          <img src="/assets/cartoon-landscape.jpg" alt="busy-city"/>
        </CoverImage>
      </Grid>
      <Grid xs={12} md={6}>
        <Wrapper>
          <StyledCard>
            <CardContent>
              <form onSubmit={handleSubmit(isRegisterFormDisplayed ? handleRegister : handleLogin)}>
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

                  {isRegisterFormDisplayed ? 
                    <>
                      <Grid xs={12}>
                        <Stack 
                          justifyContent="center"
                          direction="row"
                        >
                          <Typography level="title-lg">Register a new account</Typography>
                        </Stack>
                      </Grid>
                      <Grid xs={12}>
                        <FormLabel>Username</FormLabel>
                        <Controller
                          control={control}
                          name="username"
                          render={({
                            field
                          }) => (
                            <Input
                              {...field}
                            />
                          )}
                        />
                      </Grid>
                      <Grid xs={12}>
                        <FormLabel>Password</FormLabel>
                        <Controller
                          control={control}
                          name="password"
                          render={({
                            field
                          }) => (
                            <Input
                              {...field}
                              type="password"
                            />
                          )}
                        />
                      </Grid>
                      <Grid xs={12}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Controller
                          control={control}
                          name="cPassword"
                          render={({
                            field
                          }) => (
                            <Input
                              {...field}
                              type="password"
                            />
                          )}
                        />
                      </Grid>
                      <Grid xs={12}>
                        <FormLabel>Email Address</FormLabel>
                        <Controller
                          control={control}
                          name="emailAddress"
                          render={({
                            field
                          }) => (
                            <Input
                              {...field}
                              type="email"
                            />
                          )}
                        />
                      </Grid>
                      <Grid xs={12}>
                        <FormLabel>Contact Number</FormLabel>
                        <Controller
                          control={control}
                          name="contactNumber"
                          render={({
                            field
                          }) => (
                            <Input
                              {...field}
                            />
                          )}
                        />
                      </Grid>
                      <Grid xs={12}>
                        <Controller
                          control={control}
                          name="agreeTnc"
                          render={({
                            field
                          }) => (
                            <Checkbox
                              label="I agree by the Terms and Conditions applied upon registering for a new account"
                              {...field}
                            />
                          )}
                        />
                      </Grid>
                      <Grid xs={12} container gap={1}>
                        <Button type="submit" fullWidth variant="solid">Register</Button>
                        <Button type="button" onClick={() => setIsRegisterFormDisplayed(false)} fullWidth variant="plain">I already have an account</Button>
                      </Grid>
                    </>
                    : 
                    <>
                      <Grid xs={12}>
                        <FormLabel>Username</FormLabel>
                        <Controller
                          control={control}
                          name="username"
                          render={({
                            field
                          })=>(
                            <Input
                              {...field}
                            />
                          )}
                        />
                      </Grid>
                      <Grid xs={12}>
                        <FormLabel>Password</FormLabel>
                        <Controller
                          control={control}
                          name="password"
                          render={({
                            field
                          })=>(
                            <Input
                              {...field}
                            />
                          )}
                        />
                      </Grid>
                      <Grid xs={12} container gap={1}>
                        <Button type="submit" fullWidth variant="solid">Login</Button>
                        <Button type="button" onClick={() => setIsRegisterFormDisplayed(true)} fullWidth variant="plain">Don't have an account?</Button>
                      </Grid>
                    </>
                  }

                </Grid>
              </form>
            </CardContent>
          </StyledCard>
          <Typography level="body-xs">Created by @lexpeee</Typography>
        </Wrapper>
      </Grid>
    </Grid>
  )
}

export default LoginPage

const StyledCard = styled(Card, {
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