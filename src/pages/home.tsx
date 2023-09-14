import SurveyCardDisplay from '@/components/Card/SurveyCardDisplay'
import ContentHeader from '@/components/global/ContentHeader'
import { styled } from '@/stitches.config'
import { Content } from '@/styles'
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from '@mui/joy'
import { useRouter } from 'next/router'
import React from 'react'

const HomePage = () => {
  const router = useRouter()
  
  return (
    <>
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

          <Typography
            level='title-lg'
          >
            Recently viewed surveys
          </Typography>

          <Grid 
            container 
            spacing={2} 
          >
            <Grid xs={3}>
              <SurveyCardDisplay/>
            </Grid>
          </Grid>
          
        </Container>

      </Content>
    </>
  )
}

export default HomePage
