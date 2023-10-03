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
  CircularProgress
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
  isActual?: boolean
  isLoading?: boolean
}

const MainSurvey:FC<MainSurveyProps> = (p) => {

  const [fields] = useDebounce(p?.fields, 1000)
  const [options] = useDebounce(p?.options, 1000)

  const [currentStep, setCurrentStep] = useState(0)

  const selectedField = useMemo(()=>{
    return fields?.[currentStep]
  }, [fields, currentStep])
  
  const isFirstStep = useMemo(() => {
    return currentStep === 0
  }, [fields, currentStep])
  
  const isLastStep = useMemo(() => {
    return currentStep === (fields?.length - 1)
  }, [fields, currentStep])

  if (p?.isLoading) {
    return <Wrapper
      isActual={p?.isActual}
      css={{
        background: options?.theme?.backgroundColor,
        color: options?.theme?.foregroundColor 
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress/>
        <Typography level={'h3'}>Loading</Typography>
      </Stack>
    </Wrapper>
  }
  
  return (
    <Wrapper
      isActual={p?.isActual}
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
              <Typography 
                level='h1'
                sx={{
                  color: options?.theme?.foregroundColor
                }}
              >
                {selectedField?.question || <>Question {currentStep + 1}</>}
              </Typography>
            </>
          }

          {
            selectedField?.type !== 'welcome' && 
            <Typography 
              level='title-md'
              sx={{
                color: options?.theme?.foregroundColor
              }}
            >
              {selectedField?.question || <>Question {currentStep + 1}</>}
            </Typography>

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
                  return <Checkbox 
                    value={option} 
                    label={option}
                    sx={{
                      color: options?.theme?.foregroundColor
                    }}
                  />
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
                  return <Radio 
                    name={selectedField?.name || `radio-form-${selectedField?.id}`} 
                    value={option} 
                    label={option}
                    sx={{
                      color: options?.theme?.foregroundColor
                    }}
                  />
                })}
              </Stack>
              </>
            }

          </div>
          {/* 
            TODO: 
              - add back button options 
              - show steps 
              - choices direciton
           */}
          <div>
            {/* TODO: refactor styling of buttons, probably wrap in an attribute and use stitches */}
            {fields?.length > 0 && <>
              {!isFirstStep && <Button onClick={() => setCurrentStep(prevState => prevState - 1)} style={{ background: options?.theme?.buttonColor !== 'default' ? options?.theme?.buttonColor : 'var(--joy-palette-primary-500, #0B6BCB)'}}>Back</Button>}
              {!isLastStep && <Button onClick={() => setCurrentStep(prevState => prevState + 1)} style={{ background: options?.theme?.buttonColor !== 'default' ? options?.theme?.buttonColor : 'var(--joy-palette-primary-500, #0B6BCB)'}}>Next</Button>}
              {isLastStep && <Button onClick={() => console.log("wala na finish na")} style={{ background: options?.theme?.buttonColor !== 'default' ? options?.theme?.buttonColor : 'var(--joy-palette-primary-500, #0B6BCB)'}}>Finish</Button>}
            </>}
          </div>
        </Stack>
      </Container>

      {fields?.length !== 0 && !p?.isActual && 
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
  variants: {
    isActual: {
      true: {
        height: '100vh !important',
      }
    }
  },
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: 10,  
})