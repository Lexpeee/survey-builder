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
  X as CloseIcon
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
  field: SurveyFields,
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
    <Card orientation="vertical">
      <CardContent 
        orientation='horizontal'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography level="title-sm">{index + 1}: Field</Typography>
        <ButtonGroup>
          <Button 
            size="sm"
            color="danger"
            variant="soft"
            onClick={() => onHandleRemove(field?.id)}
          ><TrashIcon size={16}/></Button>
        </ButtonGroup>
      </CardContent>
      <Divider inset='context'/>

      <CardContent >
        <FormControl>
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <FormLabel>{type === 'message' ? "Message" : "Question" }</FormLabel>
            <Switch
              checked={field?.isAnswerRequired}
              onChange={() => onHandleChange(index, {
                isAnswerRequired: !field?.isAnswerRequired
              })}
              startDecorator={"Field has answers"}
            />
          </Stack>
          <Textarea 
            minRows={2}
            placeholder={`Write your ${type === "message" ? 'message' : 'question' } here`}
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

      {type !== 'message' && 
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
      <Divider/>

      <CardContent>
        <FormControl error={false}>
          <FormLabel>Type</FormLabel>
          <Select 
            defaultValue="text"
            onChange={(e, value) => {
              onHandleChange(index, {
                type: value
              })
            }}
            value={field?.type}
          >
            <Option value="message">Message</Option>
            <Option value="text">Text</Option>
            <Option value="email">Email</Option>
            <Option value="number">Number</Option>
            <Option value="checkbox">Checkbox</Option>
            <Option value="radio">Radio</Option>
          </Select>
        </FormControl>
        {typeHasChoices && 
          <Card>
            <CardContent>
              <FormControl 
                error={(field?.type === 'checkbox' || field?.type === 'radio') && choices.length < 2}
              >
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
            </CardContent>
            <CardContent>
              <Stack direction='row'>
                {choices.map((choice, i) => <StyledChip key={i} onClick={() => handleRemoveChoice(i)} endDecorator={<CloseIcon size={16} />}>{choice}</StyledChip>)}
              </Stack>
            </CardContent>
          </Card>
        }
        <Stack direction="row" spacing={1}>
          <FormControl>
            <Typography startDecorator={
              <Switch/>
            }>Required</Typography>
          </FormControl>
          <FormControl>
            <Typography startDecorator={
              <Switch/>
            }>Fullscreen</Typography>
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default FieldItem

const StyledChip = styled(Chip, {
  cursor: 'pointer'
})