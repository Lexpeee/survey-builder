import {
  Button,
  ButtonGroup,
  Grid,
  Tooltip
} from '@mui/joy'
import {
  ChevronDown as ChevronDownIcon
} from 'lucide-react'
import {
  FC, 
  useMemo
} from 'react'
import { styled } from '@/stitches.config'
import FieldItem from '../FieldItem'
import { useFieldState } from '../../context/Fields'

type FieldsTabProps = {
  fields: any,
  isLoading: boolean
  onHandleChange: (index: number, data: any) => void
  onHandleRemove: (id: string) => void
  onHandleAdd: () => void
  onHandleSetFieldError: (fieldIndex: number, hasError: boolean) => void
}

const FieldsTab: FC<FieldsTabProps> = ({
  fields,
  isLoading, 
  onHandleChange,
  onHandleRemove, 
  onHandleAdd,
  onHandleSetFieldError
}) => {

  const { view: fieldView } = useFieldState()
  
  const sortedFields = useMemo(() => {
    const newFields = fields?.sort((a,b) => a - b)
    return newFields
  }, [fields])

  /**
   * TODO: add another header to change view
   */
  
  
  return (
    <Wrapper>
      <Grid 
        container 
        spacing={1}
        direction='column'
      > 
        {sortedFields?.length > 0 && 
          <>
            {sortedFields?.map((field, index) => {
              const {
                name, 
                question,
                type
              } = field
              const typeHasNoFields = (type === 'welcome' || type === 'message' || type === 'end')

              return <Grid key={index} xs={12}>
                <FieldItem  
                  view={fieldView}
                  type={field?.type}
                  field={field}
                  index={index}
                  isLoading={isLoading}
                  typeHasNoFields={typeHasNoFields}
                  onHandleSetFieldError={onHandleSetFieldError}
                  onHandleChange={onHandleChange}
                  onHandleRemove={onHandleRemove}
                />
              </Grid>
            })}
          </>
        }

        {!isLoading && 
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
        }

      </Grid>
    </Wrapper>
  )
}

export default FieldsTab

const Wrapper = styled('div', {
  padding: '30px 50px',
})
