import {
  Button, 
  Grid
} from '@mui/joy'
import {
  FC, 
  useMemo
} from 'react'
import FieldItem from '../FieldItem'

type FieldsTabProps = {
  fields: any,
  onHandleChange: (index: number, data: any) => void
  onHandleRemove: (id: string) => void
  onHandleAdd: () => void
}

const FieldsTab: FC<FieldsTabProps> = ({
  fields,
  onHandleChange,
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
        return <Grid key={index} xs={12}>
          <FieldItem
            type={field?.type}
            field={field}
            index={index}
            onHandleChange={onHandleChange}
            onHandleRemove={onHandleRemove}
          />
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
