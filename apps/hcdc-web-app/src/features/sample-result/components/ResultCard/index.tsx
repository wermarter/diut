import LockPersonIcon from '@mui/icons-material/LockPerson'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { format } from 'date-fns'
import { DATETIME_FORMAT } from '@diut/common'
import { PatientCategory } from '@diut/hcdc'

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material'

import {
  CommonResultCard,
  PapsmearResultCard,
  TDResultCard,
} from './components'
import {
  SampleResultTestResponseDto,
  useSampleUpdateResultByIdMutation,
} from 'src/infra/api/access-service/sample'

export type ResultCardProps = {
  testResult: SampleResultTestResponseDto
  patientCategory: PatientCategory
}

export function ResultCard(props: ResultCardProps) {
  const [updateSampleResult, { isLoading }] =
    useSampleUpdateResultByIdMutation()

  return (
    <Card sx={{ mb: 4 }} raised={!isLoading} id={props.testResult.testId}>
      <CardHeader
        title={props.testResult.test?.name}
        titleTypographyProps={{
          color: props.testResult.isLocked ? '#CCC' : 'primary',
          fontWeight:
            props.testResult.test?.printFormId === null ? 'normal' : 'bold',
        }}
        subheader={props.testResult.bioProductName}
        action={
          <Box sx={{ m: 1, display: 'flex', alignItems: 'center' }}>
            {props.testResult.resultAt !== undefined && (
              <Typography sx={{ opacity: 0.5, mr: 1 }} variant="overline">
                {format(new Date(props.testResult.resultAt), DATETIME_FORMAT)}
              </Typography>
            )}
            {props.testResult.resultBy != null && (
              <Typography sx={{ fontStyle: 'italic', mr: 2 }}>
                {props.testResult.resultBy.name}
              </Typography>
            )}
            {props.testResult.isLocked ? (
              // TODO: remove leaky authorization
              (props.testResult.resultBy?._id === userId || userIsAdmin) && (
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => {
                    // unlock and save
                  }}
                >
                  <LockPersonIcon />
                </Button>
              )
            ) : (
              <Button
                size="large"
                variant="contained"
                color="secondary"
                sx={{ color: 'white' }}
                onClick={() => {
                  // lock and save
                }}
              >
                <LockOpenIcon />
              </Button>
            )}
          </Box>
        }
      />
      <CardContent sx={{ px: 6, py: 0 }}>
        {currentTestInfo._id === ID_TEST_TD ? (
          <TDResultCard {...resultCardProps} />
        ) : [ID_TEST_PAPSMEAR, ID_TEST_THINPREP].includes(
            currentTestInfo._id,
          ) ? (
          <PapsmearResultCard {...resultCardProps} />
        ) : (
          <CommonResultCard {...resultCardProps} />
        )}
      </CardContent>
    </Card>
  )
}
