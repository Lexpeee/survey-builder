import {
  Stack,
  Button
} from '@mui/joy'
import MainSurvey from '@/components/Window/MainSurvey'
import { useSurveyStore } from '@/store'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { styled } from '@/stitches.config'

const SurveyPage = () => {
  const router = useRouter()
  const { surveyId, preview } = router.query
  
  const { surveys } =  useSurveyStore((draft) => ({
    surveys: draft.surveys
  }))
  
  const selectedSurvey = useMemo(() => {
    const survey = surveys.filter(v => v?.id === surveyId)[0]
    return survey
  }, [router])
  
  if (!selectedSurvey) {
    <>
      Error displaying survey
    </>
  }
  
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
          fields={selectedSurvey?.fields}
          options={selectedSurvey?.options}
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