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
import { FC, useEffect } from 'react'
import { SurveyOptions } from '../../types'

type OptionsTabProps = {
  options: SurveyOptions,
  onChangeOptions:  (data) => void
}

const OptionsTab: FC<OptionsTabProps> = () => {
  
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