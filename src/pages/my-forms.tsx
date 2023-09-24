import SurveyCardDisplay from '@/components/Card/SurveyCardDisplay'
import CreateSurveyModal from '@/components/Modal/CreateSurvey'
import ContentHeader from '@/components/global/ContentHeader'
import { useSurveyStore } from '@/store'
import { Content } from '@/styles'
import {
  Container,
  Grid
} from '@mui/joy'
import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

const MyFormsPage = () => {
  const [isCreateSurveyModalOpen, setIsCreateSurveyModalOpen] = useState(false)

  const surveys = useSurveyStore((draft) => draft.surveys, shallow)

  useEffect(()=>{
    console.log(surveys)
  }, [surveys])
  
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

            {surveys?.map(survey => 
              <Grid xs={3}>
                <SurveyCardDisplay
                  survey={survey}
                />
              </Grid>
            )}

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