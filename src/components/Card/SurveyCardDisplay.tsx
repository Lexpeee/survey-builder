import { styled } from '@/stitches.config'
import { Survey } from '@/types/survey'
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
  isDraft?: boolean,
  survey?: Survey
}

const SurveyCardDisplay:FC<SurveyCardDisplayProps> = ({
  isDraft,
  survey
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
          {survey?.name}
        </Typography>
        {/* 
          TODO: Add survey description to the options tab
         */}
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