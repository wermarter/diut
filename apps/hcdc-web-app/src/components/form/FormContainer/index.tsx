import { Box, BoxProps } from '@mui/material'

export type FormContainerProps = BoxProps<'form'>

export function FormContainer({ children, ...boxProps }: FormContainerProps) {
  return (
    <Box component="form" autoComplete="on" noValidate {...boxProps}>
      {children}
    </Box>
  )
}
