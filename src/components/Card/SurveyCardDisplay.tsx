import { styled } from '@/stitches.config'
import {
  AspectRatio,
  Card,
  CardContent,
  Typography
} from '@mui/joy'
import Image from 'next/image'

const SurveyCardDisplay = () => {
  return (
    <StyledCard>
      <CardContent>
        <AspectRatio >
          <Image src="/assets/placeholders/image.png" alt="image" width={200} height={120}/>
        </AspectRatio>
        <Typography
          level='h4'
        >
          Survey 1
        </Typography>
        <Typography
          level='body-sm'
        >
          Ac urna aptent convallis consectetur velit vel eleifend nunc libero a...
        </Typography>
      </CardContent>
    </StyledCard>
  )
}

export default SurveyCardDisplay

const StyledCard = styled(Card, {
  cursor: 'pointer'
})