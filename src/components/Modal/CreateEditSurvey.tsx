import useSurvey from '@/hooks/useSurvey'
import { styled } from '@/stitches.config'
import { Survey, SurveyFields, SurveyOptions } from '@/types/survey'
import {
  Button,
  CircularProgress,
  DialogActions, 
  DialogTitle, 
  DialogContent, 
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
  Divider,
  Tabs,
  Tooltip, 
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

import { SAMPLE_USER_ID, PRE_POPULATED_FIELDS, SURVEY_DEFAULT_OPTIONS } from '@/helpers/constants'
import useApi from '@/hooks/useApi'
import OverviewTab from './components/Tabs/OverviewTab'

type CreateEditSurveyProps = {
  surveyId: string | null
  isOpen: boolean
  onSurveyLoad: () => void
  onClose: () => void
}

/** 
 * Main modal to create and edit survey
 * @component
 */
const CreateEditSurvey: FC<CreateEditSurveyProps> = ({
  surveyId,
  isOpen, 
  onSurveyLoad,
  onClose
}) => {
  
  const {
    fetch: getFields, 
    isLoading: isFieldsLoading
  } = useApi('getSurveyFields')
  
  const {
    isLoading: isFetchingSurvey,
    fetch: fetchSurveyDetails,
    error: hasSurveyError
  } = useApi('getSurveyById')

  const {
    isLoading: isSurveyUpdating,
    fetch: updateSurvey,
    error: hasUpdateSurveyError
  } = useApi('updateSurvey')

  const {
    isLoading: isRemovingSurvey,
    fetch: removeSurvey,
    error: hasRemoveSurveyError
  } = useApi('removeSurvey')

  const { view: fieldView } = useFieldState()
  const fieldDispatch = useFieldDispatch()
  const { saveSurvey, isCreatingSurvey } = useSurvey()
  
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null)
  const isEdit = useMemo(()=> !!selectedSurvey, [selectedSurvey])

  const initialSurveyOptions = SURVEY_DEFAULT_OPTIONS

  // modal states
  const [isRemoveSurveyModalOpen, setIsRemoveSurveyModalOpen] = useState(false)

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

  const getSurveyFields = async (surveyId: string) => {
    try {

      if (!surveyId) {
        setFields(PRE_POPULATED_FIELDS)
        return
      }

      if (selectedSurvey?.fields?.length === 0) {
        const fields = await getFields({
          params: {
            surveyId: surveyId
          },
          isAsync: true
        })
        setFields(fields)
        return
      }

      setFields(selectedSurvey?.fields)

    } catch (error) {
      console.error(error)
    }
  }
  
  const handleAddSurveyField = () => {
    setIsLoading(true)
    let defaultData:SurveyFields = {
      id: uuid(),
      surveyId: "", 
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

  /** Triggers upon clicking preview */
  const handlePreviewSurvey = () => {
    window.open(window.location.origin + `/survey/${selectedSurvey?.id}?preview=true`, '_blank')
  }
  
  /** Fetches survey details along with fields, status and answers */
  const getSurveyDetails = async (surveyId) => {
    try {
      const survey = await fetchSurveyDetails({
        params: {
          surveyIdOrSlug: surveyId
        },
        queries: {
          showAnswers: true, 
          isComplete: true
        },
        isAsync: true
      })
      setSelectedSurvey(survey)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveSurvey = async (surveyId) => {
    try {
      await removeSurvey({
        params: {
          surveyId: surveyId
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsRemoveSurveyModalOpen(false)
      onSurveyLoad()
      onClose()
    }
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

      // TODO: replace this alert to a dialog
      if (isEdit) {
        await updateSurvey({
          params: {
            surveyId: selectedSurvey?.id
          },
          data
        })
        window.alert("Survey updated")
        return
      }
      await saveSurvey(data)
      window.alert("Survey Created")
    } catch (err) {
      console.error(err)
    } finally {
      if (!isEdit) {
        onClose()
        onSurveyLoad()
      }
    }
  }  

  useEffect(() => {
    setIsLoading(true)

    if (selectedSurvey) {

      setSurveyName(selectedSurvey?.name)
      setSurveyOptions(selectedSurvey?.options)

    }
    getSurveyFields(selectedSurvey?.id)

    // TODO: add call to get answers
    setIsLoading(false)
  }, [selectedSurvey])
  
  
  useEffect(()=>{
    getSurveyDetails(surveyId)
  }, [surveyId])
  
  const isSaveDisabled = useMemo(() => {
    const hasError = !surveyName || 
    isCreatingSurvey || 
    fields?.length < 1 || 
    fieldErrors?.length > 0 || isSurveyUpdating
    return hasError
  }, [fields, fieldErrors, surveyName])

  if (isOpen) {
    return (
      <>
        <Modal
          keepMounted
          open={isOpen}
          onClose={onClose}
        >
          {isLoading ? 
            <ModalDialog
              size='md'
              variant='outlined'
              minWidth={'80vw'}
            >
              <div
                style={{
                  height: '75vh',
                  margin: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 20
                }}
              >
                <CircularProgress/>
                <Typography level="h3">Loading survey</Typography>
              </div>
            </ModalDialog>
          : 
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
                <Typography level="h3">{!isEdit ? "Created" : "Edit" } survey</Typography>
                <Grid container spacing={1}>
                  {isEdit && 
                    <Grid>
                      <Button
                        startDecorator={<EyeIcon/>}
                        variant="outlined"
                        onClick={handlePreviewSurvey}
                      >Preview</Button>
                    </Grid>
                  }
                  <Grid>
                    <Button
                      loading={isCreatingSurvey}
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
                      {isEdit && <Tab value="overview">Overview</Tab>}
                      <Tab value="fields">Fields ({fields?.length})</Tab>
                      <Tab value="logic">Logic</Tab>
                      <Tab value="theme">Theme</Tab>
                      <Tab value="options">Options</Tab>
                    </TabList>
                    <TabWrapper>
                      {selectedSurvey && isEdit && <StyledTabPanel value="overview">
                          <OverviewTab 
                            survey={selectedSurvey}
                          />
                        </StyledTabPanel>
                      }
                      <StyledTabPanel value="fields">
                        <FieldsHeader>
                          <Grid container>
                            <Grid xs={6}>
                              <Stack
                                alignContent={'center'}
                                justifyContent={'center'}
                              >
                                <Typography level="body-md">Select View</Typography>
                              </Stack>
                            </Grid>
                            <Grid 
                              xs={6}
                              textAlign={'right'}
                              spacing={2}
                            >
                              <Tooltip title="Default View" placement="top">
                                <Button
                                  size="sm"
                                  disabled={fieldView === "default"}
                                  onClick={() => {
                                    fieldDispatch({
                                      type: 'CHANGE_VIEW',
                                      payload: 'default'
                                    })
                                  }}
                                >
                                  <RowsIcon size={16}/>
                                </Button>
                              </Tooltip>
                              <Tooltip title="Mini View" placement="top">
                                <Button
                                  size="sm"
                                  disabled={fieldView === "mini"}
                                  onClick={() => {
                                    fieldDispatch({
                                      type: 'CHANGE_VIEW',
                                      payload: 'mini'
                                    })
                                  }}
                                >
                                  <AlignJustifyIcon size={16}/>
                                </Button>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </FieldsHeader>
                        <FieldsTab
                          fields={fields}
                          isLoading={isFieldsLoading}
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
                          survey={selectedSurvey}
                          options={surveyOptions}
                          onChangeOptions={handleChangeSurveyOptions}
                          onRemoveSurvey={() => setIsRemoveSurveyModalOpen(true)}
                        />
                      </StyledTabPanel>
                    </TabWrapper>
                  </Tabs>
                  
      
                </Grid>
                <Grid md={6}>
                  {selectedSurvey && 
                    <MainSurvey
                      isLoading={isLoading}
                      survey={selectedSurvey}
                      fields={fields}
                      options={surveyOptions}
                    />
                  }
                </Grid>
              </Grid>
            </ModalDialog>
          }
        </Modal>
        <Modal
          open={isRemoveSurveyModalOpen}
          onClose={() => setIsRemoveSurveyModalOpen(false)}
        >
          <ModalDialog 
            variant="outlined"
            maxWidth="40vw"
          >
            <DialogTitle>Confirm Survey Deletion</DialogTitle>
            <Divider/>
            <DialogContent>
              <Typography>
                Are you sure you want to remove this survey (<strong>{selectedSurvey?.name}</strong>)? You won't be able to recover any answers and other statistics once this is deleted. 
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button 
                loading={isRemovingSurvey}
                variant="solid" 
                color="danger"
                onClick={() => handleRemoveSurvey(surveyId)}
              >Yes, remove this survey!</Button>
              <Button 
                variant="solid" 
                color="neutral"
                onClick={() => setIsRemoveSurveyModalOpen(false)}
              >Cancel</Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </>
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
  background: '#ffffff',
  padding: 10,
  borderBottom: '1px solid #dddddd',
  width: '100%',
  top: 0,
  zIndex: 10,
  position: 'sticky'
})