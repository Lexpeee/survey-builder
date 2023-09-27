import {
  FC, 
  useState,
  useEffect
} from 'react'
import { SurveyOptions } from '@/types/survey'
import {
  Button,
  Stack,
  Typography, 
  Modal, 
  ModalDialog
} from '@mui/joy'
import { SwatchesPicker } from 'react-color'
import { styled } from '@stitches/react'

type ThemesTabProps = {
  options: SurveyOptions,
  onChangeOptions:  (data) => void
}

const ThemesTab: FC<ThemesTabProps> = ({
  options, 
  onChangeOptions
}) => {
  
  const [backgroundColor, setBackgroundColor] = useState(options?.theme?.backgroundColor)
  const [foregroundColor, setForegroundColor] = useState(options?.theme?.foregroundColor)
  const [buttonColor, setButtonColor] = useState(options?.theme?.foregroundColor)
  
  const handleChangeTheme = () => {
    onChangeOptions({
      theme: {
        foregroundColor: foregroundColor, 
        backgroundColor: backgroundColor,
        buttonColor: buttonColor
      }
    })
  }
  
  const [selectedColorOption, setSelectedColorOption] = useState('')
  const [isColorPickerModalOpen, setIsColorPickerModalOpen] = useState(false)
  
  useEffect(()=>{
    handleChangeTheme()
  }, [
    backgroundColor, 
    foregroundColor, 
    buttonColor
  ])
  
  return (
    <Stack 
      direction="column"
      spacing={1}
    >
      <Stack 
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>Background color</Typography>
        <Button
          variant="outlined"
          size="sm"
          color="neutral"
          startDecorator={
            <ColorBox
              css={{
                background: options?.theme?.backgroundColor
              }}
            />
          }
          onClick={() => {
            setSelectedColorOption('background')
            setIsColorPickerModalOpen(true)
          }}
        >
          {options?.theme?.backgroundColor}
        </Button>
      </Stack>
      <Stack 
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>Text color</Typography>
        <Button
          variant="outlined"
          size="sm"
          color="neutral"
          startDecorator={
            <ColorBox
              css={{
                background: options?.theme?.foregroundColor
              }}
            />
          }
          onClick={() => {
            setSelectedColorOption('foreground')
            setIsColorPickerModalOpen(true)
          }}
        >
          {options?.theme?.foregroundColor}
        </Button>
      </Stack>
      <Stack 
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>Button color</Typography>
        <Button
          variant="outlined"
          size="sm"
          color="neutral"
          startDecorator={
            <ColorBox
              css={{
                background: options?.theme?.buttonColor
              }}
            />
          }
          onClick={() => {
            setSelectedColorOption('button')
            setIsColorPickerModalOpen(true)
          }}
        >
          {options?.theme?.buttonColor}
        </Button>
      </Stack>

      <Modal
        keepMounted
        open={isColorPickerModalOpen}
        onClose={() => setIsColorPickerModalOpen(false)}
      >
        {/* TODO: chore - try refactoring, map every theme and set to it's color */}
        <ModalDialog>
            <Typography level="h4">Select {selectedColorOption} color</Typography>
          <Stack direction="row" spacing={1}>
            {selectedColorOption === 'background' && <ColorBox css={{background: backgroundColor}}/>}
            {selectedColorOption === 'foreground' && <ColorBox css={{background: foregroundColor}}/>}
            {selectedColorOption === 'button' && <ColorBox css={{background: buttonColor}}/>}
            <Typography level="body-sm">{selectedColorOption}</Typography>
          </Stack>
          <Stack
            spacing={1}
          >
            <Button
              variant='outlined'
              color="neutral"
              onClick={() => {
                selectedColorOption === 'background' && setBackgroundColor('default')
                selectedColorOption === 'foreground' && setForegroundColor('default')
                selectedColorOption === 'button' && setButtonColor('default')
                handleChangeTheme()
                setIsColorPickerModalOpen(false)
              }}
            >
              Reset to default color
            </Button>
            <SwatchesPicker
              onChangeComplete={({hex}) => {
                selectedColorOption === 'background' && setBackgroundColor(hex)
                selectedColorOption === 'foreground' && setForegroundColor(hex)
                selectedColorOption === 'button' && setButtonColor(hex)
                setIsColorPickerModalOpen(false)
              }}
            />
          </Stack>
        </ModalDialog>
      </Modal>
    </Stack>
  )
}

export default ThemesTab

const ColorBox = styled('div', {
  height: 14,
  width: 14,
  display: 'block',
  border: '1px solid #ccc',
})