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
  Grid, 
  Select, 
  Stack,
  Switch, 
  Tooltip, 
  Textarea, 
  Typography,
  Skeleton
} from '@mui/joy'
import { styled } from '@/stitches.config'
import {
  Info as InfoIcon,
  Trash as TrashIcon,
  Send as SendIcon,
  X as CloseIcon,
  Lock as LockIcon, 
  Unlock as UnlockIcon,
} from 'lucide-react'
import { 
  FC, 
  useEffect, 
  useState,
  useMemo
} from 'react'
import { SurveyFields } from '@/types/survey'
import { PLACEHOLDER_TEXT } from '@/helpers/enums'

type FieldItemProps = {
  view?: 'default' | 'mini'
  isLoading?: boolean
  type: string
  index: number
  field: SurveyFields
  typeHasNoFields: boolean
  onHandleSetFieldError: (fieldIndex: number, hasError: boolean) => void
  onHandleChange: (index: number, data: any) => void
  onHandleRemove: (id: string) => void
}

const FieldItem:FC<FieldItemProps> = ({
  view, 
  isLoading, 
  type,
  field, 
  index,
  typeHasNoFields,
  onHandleSetFieldError,
  onHandleChange,
  onHandleRemove 
}) => {

  const selectedField = useMemo(()=>{
    return field
  },[field])

  const [isFieldLocked, setIsFieldLocked] = useState(selectedField?.isFieldLocked)
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

  useEffect(()=>{
    setIsFieldLocked(field?.isFieldLocked)
  }, [field])
  
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

  /** 
   * Detects any errors in the field and sends it to the parent component 
   */
  useEffect(() => {
    const { name, question, isAnswerRequired, answer } = field
  
    const hasFieldError = Boolean(
      (!typeHasNoFields && !name) || 
      !question ||
      (isAnswerRequired && !answer) || 
      (field?.type === 'checkbox' || field?.type === 'radio') && choices.length < 2
    )

    onHandleSetFieldError(index, hasFieldError)

  }, [field])
  
  // TODO: add animation for new fields
  
  if (isLoading) {
    return(
      <StyledCard
        orientation="vertical"
      > 
        <CardContent
          orientation='horizontal'
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography level="title-sm">
            <Skeleton loading>{PLACEHOLDER_TEXT?.S}</Skeleton>
          </Typography>
        </CardContent>
        <Divider inset="context"/>
        <CardContent>
          <Stack 
            direction="column"
            spacing={1}
          >
            <Typography level="title-sm">
              <Skeleton loading>{PLACEHOLDER_TEXT?.M}</Skeleton>
            </Typography>
            <Typography level="title-sm">
              <Skeleton loading>{PLACEHOLDER_TEXT?.XL}</Skeleton>
            </Typography>
            <Typography level="title-sm">
              <Skeleton loading>{PLACEHOLDER_TEXT?.L}</Skeleton>
            </Typography>
          </Stack>
        </CardContent>
      </StyledCard>
    )
  }
  
  return (
    <StyledCard 
      orientation="vertical"
      isLocked={isFieldLocked}
    >
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
              {/* TODO: add these new values */}
              {/* <Option value="Photo">Photo</Option> */}
              {/* <Option value="link">Link</Option> */}
              {/* <Option value="Rating">Rating</Option> */}
              {/* <Option value="Scale">Scale</Option> */}
              {/* <Option value="boolean">Yes/No</Option> */}
              {/* <Option value="fileUpload">Yes/No</Option> */}
              {/* <Option value="text">Dropdown</Option> */}
              {/* <Option value="address">Address</Option> */}
              {/* <Option value="payment">Payment</Option> */}
              {/* <Option value="date">Date</Option> */}
              {/* <Option value="time">Time</Option> */}
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

      {view  === "default" && <>
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
                  checked={selectedField?.isAnswerRequired}
                  onChange={() => onHandleChange(index, {
                    isAnswerRequired: !selectedField?.isAnswerRequired
                  })}
                  startDecorator={"Field has answers"}
                />
              </Stack>
            }
          </FormControl>
          <FormControl
            error={!selectedField?.question}
          >
            <Textarea 
              minRows={2}
              placeholder={`Write your ${typeHasNoFields ? 'message' : 'question' } here`}
              onChange={(e) => onHandleChange(index, {
                question: e?.target?.value
              })}
              value={field?.question}
            />
            {!selectedField?.question && 
              <FormHelperText>Question is required</FormHelperText>
            }
          </FormControl>

          <FormControl>
            <FormLabel>Description (Optional)</FormLabel>
            <Textarea
              minRows={3}
              onChange={e => onHandleChange(index, { description: e?.target?.value})}
              value={field?.description}
            />
          </FormControl>

          {selectedField?.isAnswerRequired && 
            <FormControl
              error={(selectedField?.isAnswerRequired && !selectedField?.answer)}
            >
              <FormLabel>Answer</FormLabel>
              <Input
                value={selectedField?.answer}
                onChange={(e) => onHandleChange(index, {
                  answer: e?.target?.value
                })}
              />
              {selectedField?.isAnswerRequired && !selectedField?.answer && 
                <FormHelperText>Answer is required</FormHelperText>
              }
            </FormControl>
          }
        </CardContent>

        {!typeHasNoFields && 
          <>
            <CardContent orientation="horizontal">
              <Grid container spacing={2}> 
                <Grid xs={12} lg={6}>
                  
                  <FormControl error={!typeHasNoFields && !selectedField?.name}>
                    <FormLabel>
                      Field name 
                      <Tooltip
                        title="Field name serves as a label for this field"
                        arrow
                        placement="top"
                      >
                        <InfoIcon size={14}/>
                      </Tooltip>
                    </FormLabel>
                    <Input 
                      onChange={(e) => onHandleChange(index, {
                        name: e?.target?.value
                      })}
                      value={selectedField?.name}
                    />
                    {!typeHasNoFields && !selectedField?.name && 
                      <FormHelperText>Name is required</FormHelperText>
                    }
                  </FormControl>
                </Grid> 
                <Grid xs={12} lg={6}>
                  <FormControl error={false}>
                    <FormLabel>Placeholder</FormLabel>
                    <Input 
                      onChange={(e) => onHandleChange(index, {
                        placeholder: e?.target?.value
                      })}
                      value={selectedField?.placeholder}
                    />
                  </FormControl>
                </Grid> 
              </Grid>
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
                    (selectedField?.type === 'checkbox' || selectedField?.type === 'radio') && choices.length < 2 && <FormHelperText>You must include at least 2 options</FormHelperText>
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
      </>}
    </StyledCard>
  )
}

export default FieldItem

const StyledCard = styled(Card, {
  cursor: 'pointer',
  '&:hover': {
    filter: 'drop-shadow(0 0 0.75rem #333333)',
    transitionDuration: '500ms',
  },
  variants: {
    isLocked: {
      true: {
        borderStyle: 'dashed',
        borderWidth: 3,
        '&:hover': {
          filter: 'none'
        }
      }
    }
  }
})

const StyledChip = styled(Chip, {
  cursor: 'pointer'
})