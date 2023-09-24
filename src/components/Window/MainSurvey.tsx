import { styled } from '@/stitches.config'
import {
  Container,
  Button,
  Radio,
  Checkbox,
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

import { useDebounce } from 'use-debounce'

type MainSurveyProps = {
  fields: any
  options: any
}

const MainSurvey:FC<MainSurveyProps> = (p) => {

  const [fields] = useDebounce(p?.fields, 1000)
  const [options] = useDebounce(p?.options, 1000)

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
      <Container>
        <Stack
          spacing={1}
        >
          {
            selectedField?.type === 'welcome' && <>
              <h1>
                {selectedField?.question || <>Question {currentStep + 1}</>}
              </h1>
            </>
          }

          {
            selectedField?.type !== 'welcome' && 
            <>
              {selectedField?.question || <>Question {currentStep + 1}</>}
            </>

          }
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

            {selectedField?.type === 'checkbox' && <>
              <Stack 
                direction="column"
                spacing={2}
              >
                {selectedField?.options.map(option => {
                  return <Checkbox value={option} label={option}/>
                })}
              </Stack>
              </>
            }

            {selectedField?.type === 'radio' && <>
              <Stack 
                direction="column"
                spacing={2}
              >
                {selectedField?.options.map(option => {
                  return <Radio name={selectedField?.name || `radio-form-${selectedField?.id}`} value={option} label={option}/>
                })}
              </Stack>
              </>
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
      </Container>

      {fields.length !== 0 && 
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
      }
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