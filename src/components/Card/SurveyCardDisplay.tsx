import { styled } from '@/stitches.config'
import {
  AspectRatio,
  Card,
  Chip, 
  CardContent,
  Typography
} from '@mui/joy'
import Image from 'next/image'
import { FC } from 'react'

type SurveyCardDisplayProps = {
  isDraft?: boolean
}

const SurveyCardDisplay:FC<SurveyCardDisplayProps> = ({
  isDraft
}) => {
  return (
    <StyledCard>
      <CardContent>
        <AspectRatio >
          <Image src="/assets/placeholders/image.png" alt="image" width={200} height={120}/>
        </AspectRatio>
        <DraftBadge>
          {isDraft && 
            <Chip
              variant='solid'
            >DRAFT</Chip>
          }
        </DraftBadge>
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

const DraftBadge = styled('div', {
  position: 'absolute',
  right: 20,
  top: 20,
})