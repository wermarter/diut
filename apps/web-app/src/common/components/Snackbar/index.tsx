import * as React from 'react'
import { Slide, Snackbar as MuiSnackbar } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

function TransitionDown(props: TransitionProps) {
  // @ts-ignore
  return <Slide {...props} direction="down" />
}

export interface SnackbarProps {
  showMessage: string
  setShowMessage: React.Dispatch<React.SetStateAction<string>>
}

export function Snackbar({ showMessage, setShowMessage }: SnackbarProps) {
  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(showMessage)}
      autoHideDuration={6000}
      onClose={(event, reason) => {
        if (reason === 'timeout') {
          setShowMessage('')
        }
      }}
      message={showMessage}
      TransitionComponent={TransitionDown}
    />
  )
}
