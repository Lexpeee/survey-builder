import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl, 
  FormHelperText, 
  FormLabel,
  Input, 
  Option,
  Select, 
  Stack,
  Switch, 
  Textarea, 
  Typography
} from '@mui/joy'
import { styled } from '@/stitches.config'
import {
  Trash as TrashIcon,
  Send as SendIcon,
  X as CloseIcon,
  Lock as LockIcon, 
  Unlock as UnlockIcon
} from 'lucide-react'
import { 
  FC, 
  useEffect, 
  useState,
  useMemo
} from 'react'
import { SurveyFields } from '@/types/survey'

type FieldItemProps = {
  type: string
  index: number
  field: SurveyFields
  onHandleChange: (index: number, data: any) => void
  onHandleRemove: (id: string) => void
}

const FieldItem:FC<FieldItemProps> = ({
  type,
  field, 
  index,
  onHandleChange,
  onHandleRemove 
}) => {

  const [isFieldLocked, setIsFieldLocked] = useState(field?.isFieldLocked)
  const [choicesInput, setChoicesInput] = useState<string>('')
  const [choices, setChoices] = useState<string[]>([])

  const handleAddChoice = (index: number) => {
    if (choicesInput) {
      setChoices(choices.concat(choicesInput))
      setChoicesInput('')
    }
  }

  const handleRemoveChoice = (index: number) => {
    setChoices(prevState => prevState.filter((v,i) => i !== index))
  }

  const typeHasChoices = useMemo(()=>{
    const choiceTypes = ['radio', 'checkbox']
    return choiceTypes.includes(type)
  }, [type])

  const typeHasNoFields = useMemo(() => {
    return (type === 'welcome' || type === 'message' || type === 'end')
  }, [type])
  
  /** Automatically removes added choices upon field type change */
  useEffect(()=>{
    if (!typeHasChoices) {
      setChoices([])
      return
    }
  }, [type])
  
  useEffect(() => {
    onHandleChange(index, {
      options: choices
    })
  }, [choices])  
  
  return (
    <StyledCard orientation="vertical">
      <CardContent 
        orientation='horizontal'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography level="title-sm">{index + 1}: Field</Typography>
        <Stack direction="row" spacing={1}>
          <FormControl>
            <Button
              size={'md'}
              color="neutral"
              variant={!isFieldLocked ? "outlined" : "solid" }
              onClick={() => {
                setIsFieldLocked(prevState => !prevState)
              }}
            >
              {isFieldLocked ? 
                <LockIcon size={18}/>
              :
                <UnlockIcon size={18}/>
              }
            </Button>
          </FormControl>
          <FormControl error={false}>
            <Select 
              defaultValue="text"
              onChange={(e, value) => {
                onHandleChange(index, {
                  type: value
                })
              }}
              value={field?.type}
            >
              <Option value="welcome">Welcome Message</Option>
              <Option value="message">Message</Option>
              <Option value="end">End Message</Option>
              <Divider/>
              <Option value="text">Text Field</Option>
              <Option value="email">Email</Option>
              <Option value="number">Number</Option>
              <Option value="checkbox">Checkbox</Option>
              <Option value="radio">Radio</Option>
            </Select>
          </FormControl>
          <ButtonGroup>
            <Button 
              size="sm"
              color="danger"
              variant="soft"
              onClick={() => onHandleRemove(field?.id)}
            ><TrashIcon size={16}/></Button>
          </ButtonGroup>
        </Stack>
      </CardContent>
      <Divider inset='context'/>

      <CardContent >

        <FormControl>
          {!typeHasNoFields && 
            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <FormLabel>{typeHasNoFields ? "Message" : "Question" }</FormLabel>
              <Switch
                checked={field?.isAnswerRequired}
                onChange={() => onHandleChange(index, {
                  isAnswerRequired: !field?.isAnswerRequired
                })}
                startDecorator={"Field has answers"}
              />
            </Stack>
          }
          <Textarea 
            minRows={2}
            placeholder={`Write your ${typeHasNoFields ? 'message' : 'question' } here`}
            onChange={(e) => onHandleChange(index, {
              question: e?.target?.value
            })}
            value={field?.question}
          />
        </FormControl>

        {field?.isAnswerRequired && 
          <FormControl
            error={(field?.isAnswerRequired && !field?.answer)}
          >
            <FormLabel>Answer</FormLabel>
            <Input
              value={field?.answer}
              onChange={(e) => onHandleChange(index, {
                answer: e?.target?.value
              })}
            />
            {field?.isAnswerRequired && !field?.answer && 
              <FormHelperText>This field is required</FormHelperText>
            }
          </FormControl>
        }
      </CardContent>

      {!typeHasNoFields && 
        <>
          <CardContent orientation="horizontal">
            <FormControl error={false}>
              <FormLabel>Form name</FormLabel>
              <Input 
                onChange={(e) => onHandleChange(index, {
                  name: e?.target?.value
                })}
                value={field?.name}
              />
            </FormControl>
            <Divider orientation="vertical"/>
            <FormControl error={false}>
              <FormLabel>Form Placeholder</FormLabel>
              <Input 
                onChange={(e) => onHandleChange(index, {
                  placeholder: e?.target?.value
                })}
                value={field?.placeholder}
              />
            </FormControl>
          </CardContent>
        </>
      }

      {typeHasChoices && 
        <>
          <Divider/>
          {/* TODO: add has others field */}
          <CardContent>
            <Stack spacing={1}>
              <FormControl>
                <FormLabel>Options</FormLabel>
                <Input 
                  value={choicesInput}
                  onChange={e => setChoicesInput(e?.target?.value)}
                  endDecorator={
                    <Button
                      onClick={() => handleAddChoice(index)}
                    ><SendIcon size={18}/></Button>
                  }
                  onKeyDown={(e) => {
                    if (e?.key === 'Enter') {
                      e?.preventDefault()
                      handleAddChoice(index)
                    }
                  }}
                />
                {
                  (field?.type === 'checkbox' || field?.type === 'radio') && choices.length < 2 && <FormHelperText>You must include at least 2 options</FormHelperText>
                }
              </FormControl>
              {/* TODO: Wrap these, so that choices won't exceed in width */}
              <Stack direction='row'>
                {choices.map((choice, i) => <StyledChip key={i} onClick={() => handleRemoveChoice(i)} endDecorator={<CloseIcon size={16} />}>{choice}</StyledChip>)}
              </Stack>
              {/* TODO: Others please specify */}
            </Stack>
          </CardContent>
        </>
      }

      {!typeHasNoFields && 
        <>
          <Divider/>
          <Stack direction="row" spacing={1}>
            {
              !typeHasNoFields && 
                <FormControl>
                  <Typography startDecorator={
                    <Switch/>
                  }>Required</Typography>
                </FormControl>
            }
            {/* TODO: enable when there's actual use  */}
            {/* <FormControl>
              <Typography startDecorator={
                <Switch/>
              }>Fullscreen</Typography>
            </FormControl> */}
          </Stack>
        </>
      }
    </StyledCard>
  )
}

export default FieldItem

const StyledCard = styled(Card, {
  cursor: 'pointer',
  '&:hover': {
    filter: 'drop-shadow(0 0 0.75rem #333333)',
    transitionDuration: '500ms',
  }
})

const StyledChip = styled(Chip, {
  cursor: 'pointer'
})