import { PatientGender, getPatientCategory } from '@diut/hcdc'
import {
  Alert,
  Box,
  Button,
  List,
  ListItemButton,
  Typography,
} from '@mui/material'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormContainer } from 'src/components/form'
import { PrintFormResponseDto } from 'src/infra/api/access-service/print-form'
import { SampleResponseDto } from 'src/infra/api/access-service/sample'
import { ResultCard } from '../ResultCard'

export type ResultEditViewProps = {
  sampleRes: SampleResponseDto
  printFormMap: Map<string, PrintFormResponseDto>
}

export function ResultEditView(props: ResultEditViewProps) {
  const navigate = useNavigate()

  const patientCategory = useMemo(() => {
    return getPatientCategory(
      {
        birthYear: props.sampleRes.patient?.birthYear!,
        gender: props.sampleRes.patient?.gender as PatientGender,
      },
      props.sampleRes.isPregnant,
    )
  }, [props.sampleRes.patientId])

  const sortedTests = useMemo(() => {
    return Object.values(props.sampleRes.results)
      .filter(({ test }) => test)
      .map((result) => ({
        ...result,
        elements: result.elements.toSorted(
          (a, b) => a.testElement?.displayIndex! - b.testElement?.displayIndex!,
        ),
      }))
      .toSorted((a, b) => {
        if (a.test?.testCategoryId === b.test?.testCategoryId) {
          return a.test?.displayIndex! - b.test?.displayIndex!
        }

        return Number(a.test?.testCategoryId! > b.test?.testCategoryId!)
      })
  }, [props.sampleRes])

  return (
    <FormContainer sx={{ p: 2 }}>
      <Box
        sx={{
          position: 'fixed',
          width: '280px',
        }}
      >
        <Button
          sx={{ mr: 1 }}
          fullWidth
          variant="outlined"
          onClick={() => {
            navigate(-1)
          }}
        >
          Quay về
        </Button>
        <Box
          sx={{
            my: 1,
            px: 2,
            py: 1,
            border: '1px #CCC solid',
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {props.sampleRes.sampleId}
          </Typography>
          <Typography variant="h5">{props.sampleRes.patient?.name}</Typography>
          <Typography fontStyle="italic" sx={{ mt: 2, opacity: '0.5' }}>
            {props.sampleRes.infoBy?.name}
          </Typography>
        </Box>
        <List
          sx={{
            bgcolor: 'background.paper',
            '&& .Mui-selected, && .Mui-selected:hover': {
              bgcolor: 'secondary.main',
              '&, & .MuiListItemIcon-root': {
                color: 'white',
              },
            },
            overflowY: 'auto',
            maxHeight: '50vh',
          }}
        >
          {sortedTests.map((test) => (
            <ListItemButton
              key={test.testId}
              selected={!test.isLocked}
              onClick={() => {
                document.getElementById(test.testId)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                })
              }}
            >
              {test.test?.name}
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          ml: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'auto',
        }}
      >
        {props.sampleRes.note.length > 0 && (
          <Alert
            variant="outlined"
            severity="info"
            color={'secondary' as any}
            sx={{ width: '100%', mb: 1 }}
          >
            {props.sampleRes.note}
          </Alert>
        )}
        {sortedTests.map((testResult) => (
          <ResultCard
            key={testResult.testId}
            sampleRes={props.sampleRes}
            testResult={testResult}
            patientCategory={patientCategory}
            printFormMap={props.printFormMap}
          />
        ))}
      </Box>
    </FormContainer>
  )
}
