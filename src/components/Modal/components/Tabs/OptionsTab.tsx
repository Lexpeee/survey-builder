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
import { SurveyOptions } from '@/types/survey'

type OptionsTabProps = {
  options: SurveyOptions,
  onChangeOptions:  (data) => void
}

const OptionsTab: FC<OptionsTabProps> = () => {

  /**
   * TODO: some tasks
   * - Add submit function and custom submit funcitons, can be redirection, or just copy paste, or open email
   * - Also add shareable links in the main component as well
   * - Custom finish button
   */
  
  return (
    <List>
      <Typography level="body-xs">Settings</Typography>
      <ListItem
        endAction={<FormControl>
          <Switch/>
        </FormControl>}
      >
        Publish Survey
      </ListItem>
      <Typography level="body-xs">Share</Typography>
      <ListItem>
        <Input
          sx={{ width: '100%'}}
          value={`${window.location?.origin}/survey/sample-slug`}
          disabled
          endDecorator={
            <CopyIcon/>
          }
        />
      </ListItem>
    </List>
  )
}

export default OptionsTab