import { styled } from '@/stitches.config'
import {
  Button,
  FormControl,
  Input,
  Stack,
  Typography,
} from '@mui/joy'
import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from 'lucide-react'
import {
  FC,
  useMemo,
  useState
} from 'react'

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
    <Wrapper
      css={{
        background: options?.theme?.backgroundColor,
        color: options?.theme?.foregroundColor 
      }}
    >
      <Stack
        spacing={1}
      >
        <div>
          {selectedField?.question || <>Question {currentStep + 1}</>}
        </div>
        <div>
          {
          (selectedField?.type === 'text' || selectedField?.type === 'email' || selectedField?.type === 'number') && 
            <FormControl>
              <Input
                placeholder={selectedField?.placeholder}
                type={selectedField?.type}
              />
            </FormControl>
          }
        </div>
        <div>
          {fields.length > 0 && <>
            {!isFirstStep && <Button onClick={() => setCurrentStep(prevState => prevState - 1)}>Back</Button>}
            {!isLastStep && <Button onClick={() => setCurrentStep(prevState => prevState + 1)}>Next</Button>}
            {isLastStep && <Button onClick={() => console.log("wala na finish na")}>Finish</Button>}
          </>}
        </div>
      </Stack>
      <Footer>
        <Stack direction="row" spacing={2} alignItems={'center'}>
          <FooterItem>
            {!isFirstStep && 
              <Button 
                size="sm" 
                variant="soft" 
                color="neutral"
                onClick={() => setCurrentStep(prevState => prevState - 1)}
              ><ArrowLeftIcon size={16}/></Button>
            }
          </FooterItem>
          <Typography 
            sx={{
              color: options?.theme?.foregroundColor
            }}
          >
            Step {currentStep + 1} of {fields?.length}
          </Typography>
          <FooterItem>
            {!isLastStep && 
              <Button 
                size="sm" 
                variant="soft" 
                color="neutral"
                onClick={() => setCurrentStep(prevState => prevState + 1)}
              ><ArrowRightIcon size={16}/></Button>
            }
          </FooterItem>
        </Stack>
      </Footer>
    </Wrapper>
  )
}

export default MainSurvey

const Footer = styled('div', {
  position: 'absolute',
  right: 0,
  bottom: 0,
  margin: 10
})

const FooterItem = styled('div', {
  minWidth: 50
})

const Wrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  border: '1px solid #ccc', // TODO: remove afterwards
  borderRadius: 10,
  padding: 10,  
})