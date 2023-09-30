import SurveyCardDisplay from '@/components/Card/SurveyCardDisplay'
import CreateSurveyModal from '@/components/Modal/CreateSurvey'
import ContentHeader from '@/components/global/ContentHeader'
import useSurvey from '@/hooks/useSurvey'
import { Content } from '@/styles'
import {
  Container,
  Grid
} from '@mui/joy'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const MyFormsPage = () => {
  const [isCreateSurveyModalOpen, setIsCreateSurveyModalOpen] = useState(false)
  const { surveys, selectSurvey, selectedSurvey } = useSurvey()

  const handleSelectSurvey = (survey) => {
    selectSurvey(survey)
    setIsCreateSurveyModalOpen(true)
  }

  return (
    <>
      <Head>
        <title>My forms | Proform</title>
      </Head>
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
            selectSurvey()
            setIsCreateSurveyModalOpen(false)
          }}
        />
      }

    </>
  )
}

export default MyFormsPage