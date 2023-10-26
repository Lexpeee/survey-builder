import { PRE_POPULATED_FIELDS, SAMPLE_USER_ID } from '@/helpers/constants'
import useSurvey from '@/hooks/useSurvey'
import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
} from '@mui/joy'
import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

type CreateSurveyProps = {
  isOpen: boolean
  onClose: () => void
  onSurveyLoad: () => void
}

const CreateSurvey:FC<CreateSurveyProps> = ({
  isOpen,
  onClose, 
  onSurveyLoad
}) => {
  
  const { saveSurvey, isCreatingSurvey } = useSurvey()
  const { handleSubmit, control } = useForm()
  
  /** Main submit method */
  const handleSubmitForm = async (formData) => {
    const { name } = formData


    try {
      if (!name) {
        console.error('Name is required')
        return
      }

      let data = {
        id: uuid(),
        name: name, 
        userId: SAMPLE_USER_ID,
        fields: PRE_POPULATED_FIELDS,
        displayImages: [
          "https://ik.imagekit.io/ychxbfg73/sample-images/jordan-mcgee-l3TwAWTVIQg-unsplash_vnXi71Poy.jpg?updatedAt=1695001101839"
        ],
        isVisible: true
      }

      await saveSurvey(data)
      window.alert("Survey Created")
    } catch (err) {
      console.error(err)
    } finally {
      onClose()
      onSurveyLoad()
    }
  }  
  
  return (
    <Modal 
      open={isOpen}
      onClose={onClose}
    > 
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalDialog>
          <DialogTitle>What will your survey's name be?</DialogTitle>
          <Divider />
          <DialogContent>
            <FormLabel>Name of survey</FormLabel>
            <Controller
              name="name"
              control={control}
              render={({
                field
              }) => (
                <Input 
                  {...field}
                />
              )}
            />
            <Button
              type="submit"
            >Create Survey</Button>
          </DialogContent>

        </ModalDialog>
      </form>
    </Modal>
  )
}

export default CreateSurvey