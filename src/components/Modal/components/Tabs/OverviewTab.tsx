import { 
  FC, 
  useState, 
  useEffect
} from 'react'
import { styled } from '@/stitches.config'
import { 
  Card,
  CardContent,
  Stack, 
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
          <Grid xs={12} container spacing={1}>
            
            <Grid xs={3}>
              <Card>
                <CardContent>
                  <Stack
                    direction="column"
                    alignItems="center"
                  >
                    <Typography level="body-sm">Views</Typography>
                    <Typography level="h3">{survey?.answers?.length}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid xs={3}>
              <Card>
                <CardContent>
                  <Stack
                    direction="column"
                    alignItems="center"
                  >
                    <Typography level="body-sm">Started</Typography>
                    <Typography level="h3">{survey?.answers?.length}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid xs={3}>
              <Card>
                <CardContent>
                  <Stack
                    direction="column"
                    alignItems="center"
                  >
                    <Typography level="body-sm">Completed</Typography>
                    <Typography level="h3">{survey?.answers?.length}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid xs={3}>
              <Card>
                <CardContent>
                  <Stack
                    direction="column"
                    alignItems="center"
                  >
                    <Typography level="body-sm">Avg. Time</Typography>
                    <Typography level="h3">02:53</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>


          </Grid>
          <Grid xs={12}>
            <Table>
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
