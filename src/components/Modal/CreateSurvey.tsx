import { styled } from '@/stitches.config'
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Switch, 
  Sheet,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography
} from '@mui/joy'
import {
  Trash as TrashIcon
} from 'lucide-react'
import {
  FC,
  useEffect,
  useState
} from 'react'
import { v4 as uuid } from 'uuid'

type CreateSurveyModalProps = {
  isOpen: boolean
  onClose: () => void
}

const CreateSurveyModal: FC<CreateSurveyModalProps> = ({
  isOpen, 
  onClose
}) => {
  const [step, setStep] = useState(0)

  // form states
  const [fields, setFields] = useState<any>([])

  const addField = () => {
    let defaultData = {
      id: uuid(),
      order: fields.length + 1,
      name: "", 
      label: `Field ${fields.length}`,
      type: 'text',
      defaultValue: '',
      options: [],
      isFullScreen: false
    }
    // TODO: add logic to check if there are names existing
    setFields(fields.concat(defaultData))
  }

  const removeField = (id: number) => {
    setFields(prevState => prevState.filter((v:any) => v?.id !== id))
  }
  
  /** Main submit method */
  const handleSubmitForm = () => {
    let data = {}

    console.log(data)
  }

  useEffect(()=>{
    if (!isOpen) {
      setFields([])
    }
  }, [isOpen])

  return (
    <Modal
      keepMounted
      open={isOpen}
      onClose={onClose}
    >
      <ModalDialog
        size={'md'}
        variant={'outlined'}
        minWidth={'80vw'}
      >
        <ModalClose/>
        <Typography level="h1">asdfasd</Typography>
        <Grid container spacing={2}>

          <Grid xs={12}>
            <FormControl error={false}>
              <FormLabel>Survey Name</FormLabel>
              <Input />
              <FormHelperText>Error show here</FormHelperText>
            </FormControl>
          </Grid>

          <Grid md={6}>
            <FieldWrapper>
              <Grid 
                container 
                spacing={1}
                direction='column'
              > 
                {fields.map((field, index) => {
                  return <Grid  key={index} xs={12}>
                    <Card>
                      <CardContent 
                        orientation='horizontal'
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <Typography level="title-sm">Field {index + 1}</Typography>
                        <ButtonGroup>
                          <Button 
                            size="sm"
                            color="danger"
                            variant="soft"
                            startDecorator={<TrashIcon/>}
                            onClick={() => removeField(field?.id)}
                          >Remove</Button>
                        </ButtonGroup>
                      </CardContent>
                      <Divider inset='context'/>
                      <CardContent orientation="horizontal">
                        <FormControl error={false}>
                          <FormLabel>Form name</FormLabel>
                          <Input />
                        </FormControl>
                        <Divider orientation="vertical"/>
                        <FormControl error={false}>
                          <FormLabel>Form Label</FormLabel>
                          <Input />
                        </FormControl>
                      </CardContent>
                      <Divider/>
                      <CardContent>
                        <FormControl error={false}>
                          <FormLabel>Type</FormLabel>
                          <Select defaultValue="text">
                            <Option value="text">Text</Option>
                            <Option value="email">Email</Option>
                            <Option value="number">Number</Option>
                            <Option value="checkbox">Checkbox</Option>
                            <Option value="radio">Radio</Option>
                          </Select>
                        </FormControl>
                        <FormControl>
                          <Typography startDecorator={
                            <Switch/>
                          }>Fullscreen</Typography>
                        </FormControl>
                      </CardContent>
                      {/* <Divider />
                      <CardContent>
                        <Typography>asdf</Typography>
                      </CardContent> */}
                    </Card>
                  </Grid>
                })}

                <Grid xs={12}>
                  <Button 
                    fullWidth
                    variant="soft"
                    color="neutral"
                    onClick={addField}
                  >
                    Add {fields.length > 1 && 'another'} field
                  </Button>
                </Grid>

              </Grid>

            </FieldWrapper>

          </Grid>
          <Grid md={6}>asdf</Grid>
        </Grid>
      </ModalDialog>
    </Modal>
  )
}

export default CreateSurveyModal

const FieldWrapper = styled('div', {
  height: '60vh',
  overflow: 'hidden',
  overflowY: 'auto'
})