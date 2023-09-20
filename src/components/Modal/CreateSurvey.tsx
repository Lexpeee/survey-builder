import { styled } from '@/stitches.config'
import { SurveyFields, SurveyOptions } from '@/types/survey'
import {
  Button,
  Divider, 
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography
} from '@mui/joy'
import { 
  Eye as EyeIcon,
  PenSquare as PenSquareIcon,
  Save as SaveIcon
} from 'lucide-react'
import {
  FC,
  useEffect,
  useState
} from 'react'
import { v4 as uuid } from 'uuid'
import MainSurvey from '../Window/MainSurvey'
import FieldsTab from './components/Tabs/FieldsTab'
import OptionsTab from './components/Tabs/OptionsTab'
import ThemesTab from './components/Tabs/ThemesTab'

type CreateSurveyModalProps = {
  isOpen: boolean
  onClose: () => void
}

const CreateSurveyModal: FC<CreateSurveyModalProps> = ({
  isOpen, 
  onClose
}) => {

  const initialSurveyOptions: SurveyOptions = {
    link: null, 
    isPublished: true,
    finishButtonLabel: '',
    theme: {
      backgroundColor: 'default',
      foregroundColor: 'default',
      buttonColor: 'default',
    }
  }

  // form states
  const [fields, setFields] = useState<SurveyFields[]>([])
  const [surveyOptions, setSurveyOptions] = useState(initialSurveyOptions)

  const addSurveyField = () => {
    let defaultData:SurveyFields = {
      id: uuid(),
      order: fields.length + 1,
      question: '',
      name: "", 
      answer: '',
      placeholder: '',
      type: 'text',
      defaultValue: '',
      options: [],
      isFullScreen: true,
      isRequired: false,
      isAnswerRequired: false
    }
    // TODO: add logic to check if there are names existing
    setFields(fields.concat(defaultData))
  }

  const handleChangeField = (index: number, data: any) => {
    const newData = fields.slice().map((field, i) => {
      if(index === i) {
        return {
          ...field, 
          ...data
        }
      }
      return field
    })
    setFields(newData)
  }

  const removeSurveyField = (id: string) => {
    setFields(prevState => prevState.filter((v:any) => v?.id !== id))
  }
  
  const onChangeSurveyOptions = (data) => {
    setSurveyOptions(prevState => ({ 
      ...prevState, 
      ...data
    }))
  }
  
  /** Main submit method */
  const handleSubmitForm = () => {
    let data = {
      fields,
      options: surveyOptions
    }

    console.log(data)
  }

  useEffect(()=>{
    console.log("echo out fields",fields)
  }, [fields])

  /** Resets fields and items to their default values */
  useEffect(()=>{
    if (!isOpen) {
      setFields([])
      setSurveyOptions(initialSurveyOptions)
    }
  }, [isOpen])

  if (isOpen) {
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
          <Header
            direction="row"
            justifyContent="space-between"
          >
            <Typography level="h3">Create survey</Typography>
            <Grid container spacing={1}>
              <Grid>
                <Button
                  startDecorator={<EyeIcon/>}
                  variant="outlined"
                >Preview</Button>
              </Grid>
              <Grid>
                <Button
                  startDecorator={<SaveIcon/>}
                  variant="outlined"
                  color="neutral"
                  onClick={handleSubmitForm}
                >Save</Button>
              </Grid>
              <Grid>
                <Button
                  startDecorator={<PenSquareIcon/>}
                  color="success"
                >Publish</Button>
              </Grid>
            </Grid>
          </Header>
          <Grid container spacing={2}>
  
            <Grid xs={12}>
              <FormControl error={false}>
                <FormLabel>Survey Name</FormLabel>
                <Input />
                <FormHelperText>Error show here</FormHelperText>
              </FormControl>
            </Grid>
  
            <Grid md={6}>
  
              <Tabs defaultValue={"fields"}>
                <TabList>
                  <Tab value="fields">Fields ({fields.length})</Tab>
                  <Tab value="logic">Logic</Tab>
                  <Tab value="theme">Theme</Tab>
                  <Tab value="options">Options</Tab>
                </TabList>
                <FieldWrapper>
                  <TabPanel value="fields">
                    <FieldsTab
                      fields={fields}
                      onHandleChange={handleChangeField}
                      onHandleRemove={removeSurveyField}
                      onHandleAdd={addSurveyField}
                    />
                  </TabPanel>
                  <TabPanel value="logic">Logic</TabPanel>
                  <TabPanel value="theme">
                    <ThemesTab
                      options={surveyOptions}
                      onChangeOptions={onChangeSurveyOptions}
                    />
                  </TabPanel>
                  <TabPanel value="options">
                    <OptionsTab
                      options={surveyOptions}
                      onChangeOptions={onChangeSurveyOptions}
                    />
                  </TabPanel>
                </FieldWrapper>
              </Tabs>
              
  
            </Grid>
            <Grid md={6}>
              <MainSurvey
                fields={fields}
                options={surveyOptions}
              />
            </Grid>
          </Grid>
        </ModalDialog>
      </Modal>
    )
  }
}

export default CreateSurveyModal

const Header = styled(Stack, {
  marginRight: 30
})

const FieldWrapper = styled('div', {
  height: '60vh',
  overflow: 'hidden',
  overflowY: 'auto'
})