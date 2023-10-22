import { 
  FC, 
  useState, 
  useEffect
} from 'react'
import { styled } from '@/stitches.config'
import { 
  Modal,
  Table,
  Grid,
  Divider,
  Typography
} from '@mui/joy'
import { Survey } from '@/types/survey'

type OverviewTabProps = {
  survey: Survey
}

const OverviewTab:FC<OverviewTabProps> = ({
  survey
}) => {
  
  const [showGraphModal, setShowGraphModal] = useState(false)

  const dateCreated = new Date(survey?.dateCreated).toDateString()  
  
  return (
    <>
      <Wrapper>
        <Grid container>
          <Grid xs={12}>
            <Typography level='body-sm'>Overview of the survey</Typography>
            <Divider/>
          </Grid>
          <Grid>
            <Table>
              <tr>
                <td><strong>Number of people answered </strong></td>
                <td align='right'>{survey?.answers?.length}</td>
              </tr>
              <tr>
                <td><strong>Date created</strong></td>
                <td align='right'>{dateCreated}</td>
              </tr>
            </Table>
          </Grid>
        </Grid> 
      </Wrapper>
      <Modal
        open={showGraphModal}
      >
        <p>asdf</p>
      </Modal>
    </>
  )
}

export default OverviewTab

const Wrapper = styled('div', {
  padding: 16
})
