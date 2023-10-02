import SurveyCardDisplay from '@/components/Card/SurveyCardDisplay'
import CreateEditSurveyModal from '@/components/Modal/CreateEditSurvey'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { surveys, selectSurvey, selectedSurvey } = useSurvey()

  const handleSelectSurvey = (survey) => {
    selectSurvey(survey)
    setIsModalOpen(true)
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
            onClick: () => setIsModalOpen(true)
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

      {isModalOpen && 
        <CreateEditSurveyModal
          selectedSurvey={selectedSurvey}
          isOpen={isModalOpen}
          onClose={() => {
            selectSurvey()
            setIsModalOpen(false)
          }}
        />
      }

    </>
  )
}

export default MyFormsPage