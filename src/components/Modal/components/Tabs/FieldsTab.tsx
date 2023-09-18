import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Divider,
  FormControl, 
  FormLabel,
  Grid,
  Input, 
  Option,
  Select, 
  Switch, 
  Textarea, 
  Typography
} from '@mui/joy'
import {
  Trash as TrashIcon
} from 'lucide-react'
import { FC, useMemo } from 'react'

type FieldsTabProps = {
  fields: any,
  onHandleRemove: (id: string) => void
  onHandleAdd: () => void
}

const FieldsTab: FC<FieldsTabProps> = ({
  fields,
  onHandleRemove, 
  onHandleAdd
}) => {
  
  const sortedFields = useMemo(() => {
    return fields.sort((a,b) => a - b)
  }, [fields])
  
  return (
    <Grid 
      container 
      spacing={1}
      direction='column'
    > 
      {sortedFields.map((field, index) => {
        return <Grid  key={index} xs={12}>
          <Card orientation="vertical">
            <CardContent 
              orientation='horizontal'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography level="title-sm">{index + 1}: Field</Typography>
              <ButtonGroup>
                <Button 
                  size="sm"
                  color="danger"
                  variant="soft"
                  onClick={() => onHandleRemove(field?.id)}
                ><TrashIcon size={16}/></Button>
              </ButtonGroup>
            </CardContent>
            <Divider inset='context'/>
            <CardContent >
              <FormControl>
                <FormLabel>Question</FormLabel>
                <Textarea 
                  minRows={2}
                  placeholder="Write your question here.."
                />
              </FormControl>
            </CardContent>
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
          onClick={onHandleAdd}
        >
          Add {fields.length > 1 && 'another'} field
        </Button>
      </Grid>

    </Grid>
  )
}

export default FieldsTab