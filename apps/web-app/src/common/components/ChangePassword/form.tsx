import * as React from 'react'
import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment } from '@mui/material'
import { useForm } from 'react-hook-form'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { FormContainer, FormTextField } from 'src/common/form-elements'
import { formDefaultValues, formResolver, FormSchema } from './validation'

const TextField = FormTextField<FormSchema>

interface ChangePasswordFormProps {
  onSubmit: (newPassword: string) => Promise<unknown>
}

export function ChangePasswordForm({ onSubmit }: ChangePasswordFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: formDefaultValues,
  })

  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const handleToggleShowPassword = () => {
    setShowPassword((current) => !current)
  }

  const handleToggleShowConfirmPassword = () => {
    setShowConfirmPassword((current) => !current)
  }

  return (
    <FormContainer
      onSubmit={handleSubmit(({ password }: FormSchema) => {
        return onSubmit(password)
      })}
      sx={{ maxWidth: '350px' }}
    >
      <TextField
        name="password"
        control={control}
        margin="dense"
        fullWidth
        label="Mật khẩu mới"
        type={showPassword ? 'text' : 'password'}
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleToggleShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name="confirmPassword"
        control={control}
        margin="dense"
        fullWidth
        label="Nhắc lại mật khẩu"
        type={showConfirmPassword ? 'text' : 'password'}
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleToggleShowConfirmPassword}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 3 }}
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        Lưu
      </LoadingButton>
    </FormContainer>
  )
}
