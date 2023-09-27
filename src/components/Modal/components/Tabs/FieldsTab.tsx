import {
  Button, 
  ButtonGroup,
  Grid,
  Tooltip,
  Stack, 
  CircularProgress, 
  Typography
} from '@mui/joy'
import {
  ChevronDown as ChevronDownIcon
} from 'lucide-react'
import {
  FC, 
  useEffect, 
  useMemo,
  useState
} from 'react'
import { styled } from '@/stitches.config'
import FieldItem from '../FieldItem'

type FieldsTabProps = {
  fields: any,
  isLoading: boolean
  onHandleChange: (index: number, data: any) => void
  onHandleRemove: (id: string) => void
  onHandleAdd: () => void
}

const FieldsTab: FC<FieldsTabProps> = ({
  fields,
  isLoading, 
  onHandleChange,
  onHandleRemove, 
  onHandleAdd
}) => {
  
  const sortedFields = useMemo(() => {
    return fields?.sort((a,b) => a - b)
  }, [fields])

  const [fieldErrors, setFieldErrors] = useState([])

  /**
   * TODO: add another header to change view
   */
  

  if (isLoading) {
    return(
      <Wrapper>
        <Grid 
          container
          spacing={1}
          direction={'column'}
        >
          <Grid xs={12}>  
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress/>
            <Typography level={'h3'}>Loading</Typography>
          </Stack>
          </Grid>
        </Grid> 
      </Wrapper> 
    )
  }
  
  return (
    <Wrapper>
      <Grid 
        container 
        spacing={1}
        direction='column'
      > 
        {sortedFields?.map((field, index) => {
          const {
            name, 
            question,
            type
          } = field
          const typeHasNoFields = (type === 'welcome' || type === 'message' || type === 'end')

          // TODO: use for furute validations 
          const fieldHasError = (
            (!typeHasNoFields && !name) || 
            !question ||
            (field?.isAnswerRequired && !field?.answer) || 
            (!typeHasNoFields && !field?.name)
          )

          return <Grid key={index} xs={12}>
            <FieldItem  
              type={field?.type}
              field={field}
              index={index}
              typeHasNoFields={typeHasNoFields}
              handleSetFieldError={() => setFieldErrors(prevState => prevState.concat(index))}
              onHandleChange={onHandleChange}
              onHandleRemove={onHandleRemove}
            />
          </Grid>
        })}

        <Grid xs={12}>
          <ButtonGroup>
            <Button 
              fullWidth
              variant="soft"
              color="neutral"
              onClick={onHandleAdd}
            >
              Add {fields?.length > 1 && 'another'} quick field
            </Button>         
            <Tooltip
              title="Coming soon"
              placement="top"
            >
              <Button
                variant="soft"
                color="neutral"
              >
                <ChevronDownIcon/>
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Grid>

      </Grid>
    </Wrapper>
  )
}

export default FieldsTab

const Wrapper = styled('div', {
  background: '#dddddd',
  padding: '30px 50px',
})
