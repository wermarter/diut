import { DomainErrorCode } from '@diut/hcdc'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoadingButton from '@mui/lab/LoadingButton'
import { Alert, Box, IconButton, InputAdornment } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { fullLogo } from 'src/assets/images'
import { FormContainer, FormTextField } from 'src/components/form'
import {
  HttpErrorResponse,
  useAuthLoginMutation,
} from 'src/infra/api/access-service/auth'
import { formDefaultValues, formResolver, FormSchema } from './validation'

type LoginPageProps = {
  reason?: string
}

export function LoginForm(props: LoginPageProps) {
  const [contextText] = useState(props.reason)
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
    const response = (error as any)?.data as HttpErrorResponse
    if (!response) return

    const { errorCode } = response
    if (errorCode === DomainErrorCode.AUTHN_LOGIN_INVALID_USERNAME) {
      toast.dismiss()
      setError(
        'username',
        { message: 'Sai tên đăng nhập' },
        { shouldFocus: true },
      )
      return
    }
    if (errorCode === DomainErrorCode.AUTHN_LOGIN_INVALID_PASSWORD) {
      toast.dismiss()
      setError('password', { message: 'Sai mật khẩu' }, { shouldFocus: true })
      return
    }
  }, [error])

  const handleLogin = async ({ username, password }: FormSchema) =>
    login({ username, password })

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
      {import.meta.env.PROD && (
        <img
          src={fullLogo}
          style={{ maxWidth: '50%', marginTop: '24px', marginBottom: '24px' }}
        />
      )}
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
