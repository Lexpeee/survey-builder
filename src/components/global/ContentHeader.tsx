import { 
  Button, 
  ColorPaletteProp, 
  VariantPropOverrides 
} from '@mui/joy'
import { styled } from '@/stitches.config'
import { FC } from 'react'
import { useGlobalDispatch } from '@/context/global'

type ContentHeaderProps = {
  header: string,
  actionButtons?: {
    name: string, 
    color?: ColorPaletteProp, 
    variant?: VariantPropOverrides,
    onClick: () => void
  }[]
  children?: any
}

/** Header component for pages */
const ContentHeader:FC<ContentHeaderProps> = ({
  header,
  actionButtons
}) => {

  const globalDispatch = useGlobalDispatch()
  
  return (
    <StyledContent>
      <h3>{header}</h3>
      <div>
        <Button
          color="neutral"
          onClick={() => {
            globalDispatch({
              type: 'TOGGLE_THEME'
            })
          }}
        >Dark</Button>
        {actionButtons?.map(action => {
          return <Button
            variant={action?.variant}
            color={action?.color}
            onClick={action?.onClick}
          >{action?.name}</Button>
        })}
      </div>
    </StyledContent>
  )
}

export default ContentHeader

export const StyledContent = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 10,
  borderBottom: '1px solid rgb(205, 215, 225)'
})