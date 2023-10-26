import SurveyCardDisplay from '@/components/Card/SurveyCardDisplay'
import EditSurveyModal from '@/components/Modal/EditSurvey'
import CreateSurveyModal from '@/components/Modal/CreateSurvey'
import { FieldsContextProvider } from '@/components/Modal/context/Fields'
import ContentHeader from '@/components/global/ContentHeader'
import { SAMPLE_USER_ID } from '@/helpers/constants'
import useApi from '@/hooks/useApi'
import useSurvey from '@/hooks/useSurvey'
import { Content } from '@/styles'
import { Survey } from '@/types/survey'
import {
  Container,
  Grid
} from '@mui/joy'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const MyFormsPage = () => {

  const {
    data: surveys,
    isLoading: isSurveysLoading,
    fetch: fetchUserSurveys,
    error: hasUserSurveyError
  } = useApi('getSurveysByUser')
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInitialModalOpen, setIsInitialModalOpen] = useState(false)
  const { 
    selectSurvey, 
    selectedSurvey
  } = useSurvey()

  const getUserSurveys = async (userId) => {
    try {
      if (userId) {
        await fetchUserSurveys({
          params: {
            userId
          }
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  /** Triggers to select a survey from the list */
  const handleSelectSurvey = (survey) => {
    selectSurvey(survey)
    setIsModalOpen(true)
  }

  useEffect(()=>{
    getUserSurveys(SAMPLE_USER_ID)
  }, [SAMPLE_USER_ID])
  
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
            onClick: () => setIsInitialModalOpen(true)
          }
        ]}
      />
      <Content>
        <Container>
          <Grid 
            container 
            spacing={2} 
          >

            {/* @ts-ignore */}
            {surveys?.map((survey: Survey, i: number) => 
              <Grid 
                key={i}
                xs={3}
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

      <CreateSurveyModal
        isOpen={isInitialModalOpen}
        onClose={() => setIsInitialModalOpen(false)}
        onSurveyLoad={() => getUserSurveys(SAMPLE_USER_ID)}
      />

      {isModalOpen && 
        <FieldsContextProvider>
          <EditSurveyModal
            surveyId={selectedSurvey?.id}
            isOpen={isModalOpen}
            onClose={() => {
              selectSurvey()
              setIsModalOpen(false)
            }}
            onSurveyLoad={() => getUserSurveys(SAMPLE_USER_ID)}
          />
        </FieldsContextProvider>
      }

    </>
  )
}

export default MyFormsPage