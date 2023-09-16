import SurveyCardDisplay from '@/components/Card/SurveyCardDisplay'
import ContentHeader from '@/components/global/ContentHeader'
import { Content } from '@/styles'
import {
  Container, 
  Grid
} from '@mui/joy'

const MyFormsPage = () => {


  
  return (
    <>
      <ContentHeader
        header="Your forms"
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
          <Grid 
            container 
            spacing={2} 
          >

            <Grid xs={3}>
              <SurveyCardDisplay/>
            </Grid>
            <Grid xs={3}>
              <SurveyCardDisplay/>
            </Grid>
            <Grid xs={3}>
              <SurveyCardDisplay/>
            </Grid>
            <Grid xs={3}>
              <SurveyCardDisplay/>
            </Grid>
            <Grid xs={3}>
              <SurveyCardDisplay/>
            </Grid>
            <Grid xs={3}>
              <SurveyCardDisplay/>
            </Grid>

          </Grid>
        </Container>
        
      </Content>
    </>
  )
}

export default MyFormsPage