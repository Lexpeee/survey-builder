import {
  List, 
  ListItem,
  ListItemDecorator,
  Button,
  FormControl, 
  Switch,
  Typography,
  Input
} from '@mui/joy'
import { Copy as CopyIcon } from 'lucide-react'
import { FC } from 'react'
import { Survey, SurveyOptions } from '@/types/survey'
import { styled } from '@/stitches.config'

type OptionsTabProps = {
  survey?: Survey | null
  options: SurveyOptions,
  onChangeOptions:  (data) => void
  onRemoveSurvey: () => void
}

const OptionsTab: FC<OptionsTabProps> = ({
  survey, 
  options, 
  onChangeOptions,
  onRemoveSurvey
}) => {

  /**
   * TODO: some tasks
   * - Add submit function and custom submit funcitons, can be redirection, or just copy paste, or open email
   * - Also add shareable links in the main component as well
   * - Custom finish button
   */

  const SURVEY_LINK = `${window.location?.origin}/survey/${survey?.slug}`
  
  return (
    <Wrapper>
      <List>
        <Typography level="body-xs">Share</Typography>
        <ListItem>
          <Input
            sx={{ width: '100%'}}
            value={SURVEY_LINK}
            readOnly
            endDecorator={
              <Button
                color="neutral"
                onClick={() => {
                  navigator?.clipboard?.writeText(SURVEY_LINK);
                  window.alert("Link copied to clipboard!")
                }}
              >
                <CopyIcon 
                  size={14}
                />
              </Button>
            }
          />
        </ListItem>
        <Typography level="body-xs">Settings</Typography>
        <ListItem
          endAction={<FormControl>
            <Switch/>
          </FormControl>}
        >
          Publish Survey
        </ListItem>
        <ListItem
          color='danger'
          endAction={
            <Button 
              variant="solid" 
              color="danger" 
              size="sm"
              onClick={onRemoveSurvey}
            >Remove</Button> 
          }
        >
          Remove this survey
        </ListItem>
      </List>
    </Wrapper>
  )
}

export default OptionsTab

const Wrapper = styled('div', {
  padding: 16
})
