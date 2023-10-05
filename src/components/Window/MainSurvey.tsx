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
  useState,
  useEffect
} from 'react'
import {
  useForm, 
  Controller
} from 'react-hook-form'

import { useDebounce } from 'use-debounce'

type MainSurveyProps = {
  fields: any
  options: any
  isActual?: boolean
  isLoading?: boolean
}

const MainSurvey:FC<MainSurveyProps> = (p) => {

  const {
    handleSubmit,
    control,
    setValue, 
    getValues
  } = useForm()

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

  const submit = (formData) => {
    try {
      let data = {
        answers: formData
      }
      
      console.log(data)
      // TODO: add afterlogic for data submission
      
    } catch (err) {
      console.error(err)
    }
  }

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
      <form onSubmit={handleSubmit(submit)}>
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

              {/* INPUT FIELD */}
              {(selectedField?.type === 'text' || selectedField?.type === 'email' || selectedField?.type === 'number') && 
                <Controller
                  name={selectedField?.name}
                  control={control}
                  render={({ field: { name, value, onChange, onBlur } }) => (
                    <FormControl>
                      <Input
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={selectedField?.placeholder}
                        type={selectedField?.type}
                      />
                    </FormControl>
                  )}
                />
              }

              {/* CHECKBOX FIELD */}
              {selectedField?.type === 'checkbox' && <>
              <Stack 
                direction="column"
                spacing={2}
              >
                {selectedField?.options.map(option => {
                  const isOptionSelected = getValues(selectedField?.name)?.includes(option)
                  return <Controller
                    name={selectedField?.name}
                    control={control}
                    defaultValue={[]}
                    render={({ field: { name, onBlur} }) => (
                      <Checkbox 
                        name={name}
                        label={option}
                        value={option}
                        checked={isOptionSelected}
                        onChange={() => {
                          const value = getValues(selectedField?.name)
                          setValue(selectedField?.name, !isOptionSelected ? value?.concat(option) : value?.filter(v => v !== option))
                        }}
                        onBlur={onBlur}
                        sx={{
                          color: options?.theme?.foregroundColor
                        }}
                      />
                    )}
                  />
                })}
              </Stack>
                </>
              }

              {/* RADIO FIELD */}
              {selectedField?.type === 'radio' && <>
                <Controller
                  name={selectedField?.name}
                  control={control}
                  render={({ field: { name, value, onChange, onBlur  } }) => (
                    <Stack 
                      direction="column"
                      spacing={2}
                    >
                      {selectedField?.options.map(option => {
                        return <Radio 
                          // name={selectedField?.name || `radio-form-${selectedField?.id}`} 
                          checked={value === option}
                          name={name}
                          value={option} 
                          label={option}
                          onChange={onChange}
                          onBlur={onBlur}
                          sx={{
                            color: options?.theme?.foregroundColor
                          }}
                        />
                      })}
                    </Stack>
                  )}
                />
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
                {!isFirstStep && <Button type="button" onClick={() => setCurrentStep(prevState => prevState - 1)} style={{ background: options?.theme?.buttonColor !== 'default' ? options?.theme?.buttonColor : 'var(--joy-palette-primary-500, #0B6BCB)'}}>Back</Button>}
                {!isLastStep && <Button type="button" onClick={() => setCurrentStep(prevState => prevState + 1)} style={{ background: options?.theme?.buttonColor !== 'default' ? options?.theme?.buttonColor : 'var(--joy-palette-primary-500, #0B6BCB)'}}>Next</Button>}
                {isLastStep && <Button type="submit" style={{ background: options?.theme?.buttonColor !== 'default' ? options?.theme?.buttonColor : 'var(--joy-palette-primary-500, #0B6BCB)'}}>Finish</Button>}
              </>}
            </div>
          </Stack>
        </Container>
      </form>

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