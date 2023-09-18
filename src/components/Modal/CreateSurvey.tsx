import { styled } from '@/stitches.config'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalClose,
  ModalDialog, Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography
} from '@mui/joy'
import {
  FC,
  useEffect,
  useState
} from 'react'
import { v4 as uuid } from 'uuid'
import FieldsTab from './components/Tabs/FieldsTab'
import OptionsTab from './components/Tabs/OptionsTab'
import { SurveyOptions } from './types'
import MainSurvey from '../Window/MainSurvey'

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
    isPublished: true
  }

  // form states
  const [fields, setFields] = useState<any>([])
  const [surveyOptions, setSurveyOptions] = useState(initialSurveyOptions)

  const addSurveyField = () => {
    let defaultData = {
      id: uuid(),
      order: fields.length + 1,
      question: '',
      name: "", 
      label: `Field ${fields.length}`,
      type: 'text',
      defaultValue: '',
      options: [],
      isFullScreen: true
    }
    // TODO: add logic to check if there are names existing
    setFields(fields.concat(defaultData))
  }

  const removeSurveyField = (id: string) => {
    setFields(prevState => prevState.filter((v:any) => v?.id !== id))
  }
  
  const onChangeSurveyOptions = (data) => {
    console.log('change survey options')
  }
  
  /** Main submit method */
  const handleSubmitForm = () => {
    let data = {}

    console.log(data)
  }

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
                      onHandleRemove={removeSurveyField}
                      onHandleAdd={addSurveyField}
                    />
                  </TabPanel>
                  <TabPanel value="logic">Logic</TabPanel>
                  <TabPanel value="theme">Theme</TabPanel>
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

const FieldWrapper = styled('div', {
  height: '60vh',
  overflow: 'hidden',
  overflowY: 'auto'
})