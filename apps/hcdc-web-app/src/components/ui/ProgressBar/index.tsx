import { LinearProgress, LinearProgressProps } from '@mui/material'

type ProgressBarProps = LinearProgressProps

export function ProgressBar(props: ProgressBarProps) {
  return <LinearProgress {...props} color="secondary" />
}
