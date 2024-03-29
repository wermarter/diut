import { LoginExceptionMsg } from '@diut/levansy-common'
import { Alert, IconButton, InputAdornment, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoadingButton from '@mui/lab/LoadingButton'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { fullLogo } from 'src/assets/images'
import { formDefaultValues, formResolver, FormSchema } from './validation'
import { FormTextField, FormContainer } from 'src/common/form-elements'
import { LoginBadRequestDto, useAuthLoginMutation } from 'src/api/auth'

interface LoginPageProps {
  reason?: string
}

export function LoginForm({ reason }: LoginPageProps) {
  const [contextText, setContextText] = useState(reason)
  const [showPassword, setShowPassword] = useState(false)
  const [login, { error }] = useAuthLoginMutation()

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: formDefaultValues,
  })

  useEffect(() => {
    const response = (error as any)?.data as LoginBadRequestDto
    if (response?.message?.length > 0) {
      const { message } = response
      if (message === LoginExceptionMsg.USERNAME_NOT_EXIST) {
        toast.dismiss()
        setError(
          'username',
          { message: 'Sai tên đăng nhập' },
          { shouldFocus: true },
        )
        return
      }
      if (message === LoginExceptionMsg.WRONG_PASSWORD) {
        toast.dismiss()
        setError('password', { message: 'Sai mật khẩu' }, { shouldFocus: true })
        return
      }
      setContextText(message)
    }
  }, [error])

  const handleLogin = async ({ username, password }: FormSchema) =>
    login({ loginRequestDto: { username, password } })

  const handleToggleShowPassword = () => {
    setShowPassword((current) => !current)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src={fullLogo}
        style={{ maxWidth: '50%', marginTop: '24px', marginBottom: '24px' }}
      />
      <FormContainer
        onSubmit={handleSubmit(handleLogin)}
        sx={{ maxWidth: '350px' }}
      >
        <FormTextField
          name="username"
          control={control}
          margin="dense"
          fullWidth
          label="Tên đăng nhập"
          autoComplete="username"
          autoFocus
        />
        <FormTextField
          name="password"
          control={control}
          margin="dense"
          fullWidth
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
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
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 3 }}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Đăng nhập
        </LoadingButton>
        {contextText && <Alert color={'secondary' as any}>{contextText}</Alert>}
      </FormContainer>
    </Box>
  )
}
