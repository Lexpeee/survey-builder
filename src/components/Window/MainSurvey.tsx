import {
  Button,
  Stack
} from '@mui/joy'
import {
  FC, 
  useEffect, 
  useState,
  useMemo
} from 'react'
import { styled } from '@/stitches.config'

type MainSurveyProps = {
  fields: any
  options: any
}

const MainSurvey:FC<MainSurveyProps> = ({
  fields,
  options
}) => {

  const [currentStep, setCurrentStep] = useState(0)

  const selectedField = useMemo(()=>{
    return fields[currentStep]
  }, [fields, currentStep])
  
  const isFirstStep = useMemo(() => {
    return currentStep === 0
  }, [fields, currentStep])
  
  const isLastStep = useMemo(() => {
    return currentStep === (fields.length - 1)
  }, [fields, currentStep])

  return (
    <Wrapper>
      MainSurveyWindow
      <Stack>
        <div>
          {selectedField?.question}
        </div>
        <div>
          {fields.length > 0 && <>
            {!isFirstStep && <Button onClick={() => setCurrentStep(prevState => prevState - 1)}>Back</Button>}
            {!isLastStep && <Button onClick={() => setCurrentStep(prevState => prevState + 1)}>Next</Button>}
            {isLastStep && <Button onClick={() => console.log("wala na finish na")}>Finish</Button>}
          </>}
        </div>
      </Stack>
    </Wrapper>
  )
}

export default MainSurvey

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  border: '1px solid black', // TODO: remove afterwards
  padding: 10,  
})