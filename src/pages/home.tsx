import ContentHeader from '@/components/global/ContentHeader'
import { Content } from '@/styles'
import {
  Container, 
  Typography
} from '@mui/joy'
import { useRouter } from 'next/router'

const HomePage = () => {
  const router = useRouter()
  
  return (
    <>
      <ContentHeader 
        header="Home"
        actionButtons={[
          {
            name: 'Create Survey',
            color: 'success',
            variant: 'solid',
            onClick: () => console.log('creating survey')
          }
        ]}
      />
      <Content>
        <Container>
          <Typography level="h1">Hi there! Welcome to the survey form!</Typography>
          
        </Container>

      </Content>
    </>
  )
}

export default HomePage
