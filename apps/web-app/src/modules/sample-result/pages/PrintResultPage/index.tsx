import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'

export default function PrintResultPage() {
  const { sampleId } = useParams()

  return <Box>Server side printing for {sampleId}</Box>
}
