import useSurvey from '@/hooks/useSurvey'
import { styled } from '@/stitches.config'
import { Survey, SurveyFields, SurveyOptions } from '@/types/survey'
import {
  Button,
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
  Save as SaveIcon,
  Rows as RowsIcon, 
  AlignJustify as AlignJustifyIcon
} from 'lucide-react'
import {
  FC,
  useEffect,
  useMemo,
  useState
} from 'react'
import { v4 as uuid } from 'uuid'
import MainSurvey from '../Window/MainSurvey'
import FieldsTab from './components/Tabs/FieldsTab'
import OptionsTab from './components/Tabs/OptionsTab'
import ThemesTab from './components/Tabs/ThemesTab'
import { useFieldDispatch, useFieldState } from './context/Fields'


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

type CreateEditSurveyProps = {
  selectedSurvey?: Survey | null,
  isOpen: boolean
  onClose: () => void
}

/** 
 * Main modal to create survey
 * @component
 */
const CreateEditSurvey: FC<CreateEditSurveyProps> = ({
  selectedSurvey = null, 
  isOpen, 
  onClose
}) => {
  const fieldDispatch = useFieldDispatch()
  const { saveSurvey } = useSurvey()
  
  const isEdit = useMemo(()=> !!selectedSurvey, [selectedSurvey])

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
  const [isLoading, setIsLoading] = useState(true)
  const [surveyName, setSurveyName] = useState('')
  const [fields, setFields] = useState<SurveyFields[]>([])
  const [surveyOptions, setSurveyOptions] = useState(initialSurveyOptions)

  // error states
  const [formErrors, setFormErrors] = useState([])
  const [fieldErrors, setFieldErrors] = useState<Number[]>([])

  /**
   * TODO: Form errors
   * - check same field names
   *  - validate end and welcome fields
   * 
   * for the errors, consider adding an overlay to the preview? 
   */

  const handleAddSurveyField = () => {
    setIsLoading(true)
    let defaultData:SurveyFields = {
      id: uuid(),
      order: fields?.length + 1,
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
    // TODO: add welcome and end field type validation

    const tempFields = fields.concat()
    const unlockedFields = fields.filter(field => !field?.isFieldLocked)
    if (tempFields.length > 0) {
      tempFields.every((field, i) => {
        if (unlockedFields.length > 0) {
          if (!field?.isFieldLocked) {
            setFields(prevState => (
              [
                ...prevState.slice(0, i).concat(defaultData),
                ...prevState.slice(i)
              ].map((field, index) => ({
                ...field, 
                order: index + 1
              }))
            ))
            return false
          } 
        } else {
          setFields(fields.concat(defaultData))
        }
        return true
      })

    } else { 
      setFields(fields.concat(defaultData))
    }
    setIsLoading(false)

    // TODO: add logic to check if there are names existing
  }

  const handleChangeField = (index: number, data: any) => {
    // TODO: add on change surveys event
    const newData = fields?.slice().map((field, i) => {
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

  const handleRemoveSurveyField = (id: string) => {
    const index = fields.findIndex((item) => item?.id === id)
    setFieldErrors(fieldErrors.filter((v) => v !== index))
    setFields(prevState => prevState.filter((v:any) => v?.id !== id))
    // TODO: add on change surveys event
  }
  
  const handleChangeSurveyOptions = (data) => {
    // TODO: add on change surveys event
    setSurveyOptions(prevState => ({ 
      ...prevState, 
      ...data
    }))
  }

  const handleSetFieldErrors = (index: number, hasError: boolean) => {
    const errorExists = fieldErrors?.includes(index)
    if (hasError && errorExists) {
      return
    }
    setFieldErrors(hasError ? fieldErrors.concat(index) : fieldErrors.filter(v => v !== index))
  }

  const handlePreviewSurvey = () => {
    window.open(window.location.origin + `/survey/${selectedSurvey?.id}?preview=true`, '_blank')
  }
  
  /** Main submit method */
  const handleSubmitForm = async () => {
    try {
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
      await saveSurvey(data)
      
    } catch (err) {
      console.error(err)
    } finally {
      if (!isEdit) {
        onClose()
      }
    }
  }  
  
  useEffect(()=>{
    setIsLoading(true)
    setSurveyName(selectedSurvey?.name || '')
    setFields(selectedSurvey?.fields || PRE_POPULATED_FIELDS)
    setSurveyOptions(selectedSurvey?.options || initialSurveyOptions)
    setIsLoading(false)
  }, [selectedSurvey])
  
  const isSaveDisabled = useMemo(() => {
    const hasError = !surveyName || 
    fields.length < 1 || 
    fieldErrors.length > 0
    return hasError
  }, [fields, fieldErrors, surveyName])

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
                  onClick={handlePreviewSurvey}
                >Preview</Button>
              </Grid>
              <Grid>
                <Button
                  disabled={isSaveDisabled}
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
                  <Tab value="fields">Fields ({fields?.length})</Tab>
                  <Tab value="logic">Logic</Tab>
                  <Tab value="theme">Theme</Tab>
                  <Tab value="options">Options</Tab>
                </TabList>
                <TabWrapper>
                  <StyledTabPanel value="fields">
                    <FieldsHeader>
                      <Grid container>
                        <Grid xs={6}>
                          <Stack
                            alignContent={'center'}
                          >
                            <Typography level="body-md">Select View</Typography>
                          </Stack>
                        </Grid>
                        <Grid 
                          xs={6}
                          textAlign={'right'}
                          spacing={2}
                        >
                          <Button
                            onClick={() => {
                              fieldDispatch({
                                type: 'CHANGE_VIEW',
                                payload: 'default'
                              })
                            }}
                          >
                            <RowsIcon size={16}/>
                          </Button>
                          <Button
                            onClick={() => {
                              fieldDispatch({
                                type: 'CHANGE_VIEW',
                                payload: 'mini'
                              })
                            }}
                          >
                            <AlignJustifyIcon size={16}/>
                          </Button>
                        </Grid>
                      </Grid>
                    </FieldsHeader>
                    <FieldsTab
                      fields={fields}
                      isLoading={isLoading}
                      onHandleChange={handleChangeField}
                      onHandleRemove={handleRemoveSurveyField}
                      onHandleAdd={handleAddSurveyField}
                      onHandleSetFieldError={handleSetFieldErrors}
                    />
                  </StyledTabPanel>
                  <StyledTabPanel value="logic">
                    Coming soon
                  </StyledTabPanel>
                  <StyledTabPanel value="theme">
                    <ThemesTab
                      options={surveyOptions}
                      onChangeOptions={handleChangeSurveyOptions}
                    />
                  </StyledTabPanel>
                  <StyledTabPanel value="options">
                    <OptionsTab
                      options={surveyOptions}
                      onChangeOptions={handleChangeSurveyOptions}
                    />
                  </StyledTabPanel>
                </TabWrapper>
              </Tabs>
              
  
            </Grid>
            <Grid md={6}>
              <MainSurvey
                isLoading={isLoading}
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

export default CreateEditSurvey

const StyledTabPanel = styled(TabPanel, {
  padding: 0
})

const Header = styled(Stack, {
  marginRight: 30
})

const TabWrapper = styled('div', {
  height: '60vh',
  overflow: 'hidden',
  overflowY: 'auto',
  position: 'relative'
})

const FieldsHeader = styled('div', {
  padding: 10,
  borderBottom: '1px solid #dddddd',
  width: '100%',
  top: 0,
  zIndex: 10,
  position: 'sticky'
})