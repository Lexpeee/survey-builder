import ContentHeader from '@/components/global/ContentHeader'
import { Content } from '@/styles'
import {
  Container, 
  Typography,
  Stack
} from '@mui/joy'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { styled } from '@/stitches.config'

const HomePage = () => {
  const router = useRouter()
  
  return (
    <>
      <Head>
        <title>Home | Proform</title>
      </Head>
      <ContentHeader 
        header="Home"
        actionButtons={[
          {
            name: 'Create Survey',
            color: 'success',
            variant: 'solid',
            onClick: () => console.log('creating survey')
          }
        ]}
      />
      <Content>
        <Container>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
          >
            <CoverImage>
              <img src="/assets/cartoon-landscape.jpg" alt="busy-city"/>
            </CoverImage>
            <Stack
              direction="row"
              spacing={3}
            >
              <Image
                src="https://ik.imagekit.io/ychxbfg73/proform/logos/Logo-icon_Ee_Nu4Qla.png?updatedAt=1695609550276"
                alt="proform-icon"
                height={100}
                width={100}
              />
              <Image
                src="https://ik.imagekit.io/ychxbfg73/proform/logos/Logo_qGU_FWdGA.png?updatedAt=1695609550413"
                alt="proform-logo"
                height={100}
                width={350}
              />
            </Stack>
            <Typography level="body-lg">A custom survey form builder in which you can create your own with customizable themes and formats.</Typography>
            <Typography level="body-lg">Created by <a href="https://github.com/lexpeee" target="_blank">@lexpeee</a></Typography>
          </Stack>
          
        </Container>

      </Content>
    </>
  )
}

export default HomePage

const CoverImage = styled('div', {
  display: 'block',
  overflow: 'hidden',
  width: '100%',
  '&>img': {
    width: '100%',
    height: 250,
    objectFit: 'cover'
  }
})