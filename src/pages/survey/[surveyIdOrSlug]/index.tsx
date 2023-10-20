import {
  Stack,
  Button
} from '@mui/joy'
import MainSurvey from '@/components/Window/MainSurvey'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { styled } from '@/stitches.config'
import useApi from '@/hooks/useApi'

const SurveyPage = () => {
  const {
    data: selectedSurvey,
    fetch: getSurvey,
  } = useApi('getSurveyById')
  
  const {
    fetch: submitAnswers,
  } = useApi('submitSurveyForm')
  
  const router = useRouter()
  const { surveyIdOrSlug, preview } = router.query
  
  
  if (!selectedSurvey) {
    <>
      Error displaying survey
    </>
  }

  const handleSubmitSurveyAnswers = async (data) => {
    try {
      await submitAnswers({
        data
      })
    } catch (error) {
      console.error(error)
    }
  }

  const getSelectedSurvey = async () => {
    try {
      await getSurvey({
        params: {
          surveyIdOrSlug: surveyIdOrSlug
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(()=>{
    if (surveyIdOrSlug) {
      getSelectedSurvey()
    }
  }, [surveyIdOrSlug])
  
  if (selectedSurvey) {
    return (
      <>
      <Head>
        <title>{selectedSurvey?.name} | Proform </title>
      </Head>

      {preview && 
        <HeaderPreview>
          <Stack 
            spacing={2}
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <span>You are currently in Preview Mode. You can take on the actual survey. </span>
            <Button
              size="sm"
              variant="soft"
              color="primary"
              onClick={() => {
                window.open(window.location.origin + `/survey/${selectedSurvey?.id}`, '_self')
              }}
            >
              Take the actual survey
            </Button>
          </Stack>
        </HeaderPreview>
      }
        <MainSurvey
          isActual
          onSubmit={handleSubmitSurveyAnswers}
          survey={selectedSurvey}
        />
      </>
    )
  }
  
}

export default SurveyPage

const HeaderPreview = styled('div', {
  position: 'absolute',
  zIndex: 10,
  background: '#333',
  color: '#fff',
  width: '100%',
  padding: 10
})