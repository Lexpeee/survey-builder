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

import { useDebounce, useDebouncedCallback } from 'use-debounce'
import { shallow } from 'zustand/shallow'

const SAMPLE_USER_ID = '5ea47d58-ff4f-44bb-874b-b7ad94d0a9bf'

const PRE_POPULATED_FIELDS = [
    {
        "id": "cd158975-e6f8-4c6e-b4f2-da34e4a4ccc4",
        "order": 1,
        "question": "Welcome to your Survey!",
        "name": "",
        "answer": "",
        "placeholder": "",
        "type": "welcome",
        "defaultValue": "",
        "options": [],
        "isFullScreen": true,
        "isRequired": false,
        "isAnswerRequired": false,
        "isFieldLocked": true
    },
    {
        "id": "fdd7f6be-29bd-4f14-85ea-7950cf77c7bc",
        "order": 2,
        "question": "Your first input",
        "name": "",
        "answer": "",
        "placeholder": "",
        "type": "text",
        "defaultValue": "",
        "options": [],
        "isFullScreen": true,
        "isRequired": false,
        "isAnswerRequired": false,
        "isFieldLocked": false
    },
    {
        "id": "12f3fa68-46a4-4224-a6d0-1ef099f4f4d5",
        "order": 3,
        "question": "Thank you for submitting your form!",
        "name": "",
        "answer": "",
        "placeholder": "",
        "type": "end",
        "defaultValue": "",
        "options": [],
        "isFullScreen": true,
        "isRequired": false,
        "isAnswerRequired": false,
        "isFieldLocked": true
    }
]

type CreateSurveyModalProps = {
  isOpen: boolean
  onClose: () => void
}

/** 
 * Main modal to create survey
 * @component
 */
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
  const [surveyName, setSurveyName] = useState('')
  const [fields, setFields] = useState<SurveyFields[]>(PRE_POPULATED_FIELDS)
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
      isRequired: true,
      isAnswerRequired: false,
      isFieldLocked: false
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
      id: uuid(),
      name: surveyName, 
      userId: SAMPLE_USER_ID,
      fields,
      options: surveyOptions,
      displayImages: [
        "https://ik.imagekit.io/ychxbfg73/sample-images/jordan-mcgee-l3TwAWTVIQg-unsplash_vnXi71Poy.jpg?updatedAt=1695001101839"
      ],
      isVisible: true
    }

    console.log(data)
  }

  /** Resets fields and items to their default values */
  useEffect(()=>{
    if (!isOpen) {
      setSurveyName('')
      setFields(PRE_POPULATED_FIELDS)
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
              <FormControl error={!surveyName}>
                <FormLabel>Survey Name</FormLabel>
                <Input 
                  value={surveyName}
                  onChange={(e) => setSurveyName(e?.target?.value)}
                />
                {!surveyName && 
                  <FormHelperText>Name is required</FormHelperText>
                }
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