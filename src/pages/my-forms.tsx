import SurveyCardDisplay from '@/components/Card/SurveyCardDisplay'
import CreateSurveyModal from '@/components/Modal/CreateSurvey'
import ContentHeader from '@/components/global/ContentHeader'
import { Content } from '@/styles'
import {
  Container,
  Grid
} from '@mui/joy'
import { useState } from 'react'

const MyFormsPage = () => {
  const [isCreateSurveyModalOpen, setIsCreateSurveyModalOpen] = useState(false)

  return (
    <>
      <ContentHeader
        header="Your forms"
        actionButtons={[
          {
            name: 'Create Survey',
            color: 'success',
            variant: 'solid',
            onClick: () => setIsCreateSurveyModalOpen(true)
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

      <CreateSurveyModal
        isOpen={isCreateSurveyModalOpen}
        onClose={() => setIsCreateSurveyModalOpen(false)}
      />

    </>
  )
}

export default MyFormsPage