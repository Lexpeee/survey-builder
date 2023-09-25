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

  const {
    surveys,
    selectedSurvey, 
    setSelectedSurvey
  } = useSurveyStore((draft) => ({
    surveys: draft.surveys,
    selectedSurvey: draft.selectedSurvey,
    setSelectedSurvey: draft.setSelectedSurvey,
  }), shallow)

  const handleSelectSurvey = (survey) => {
    setSelectedSurvey(survey)
    setIsCreateSurveyModalOpen(true)
  }
  
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
              <Grid xs={3}
                onClick={() => handleSelectSurvey(survey)}
              >
                <SurveyCardDisplay
                  survey={survey}
                />
              </Grid>
            )}

          </Grid>
        </Container>
      </Content>

      {isCreateSurveyModalOpen && 
        <CreateSurveyModal
          selectedSurvey={selectedSurvey}
          isOpen={isCreateSurveyModalOpen}
          onClose={() => {
            setSelectedSurvey({})
            setIsCreateSurveyModalOpen(false)
          }}
        />
      }

    </>
  )
}

export default MyFormsPage