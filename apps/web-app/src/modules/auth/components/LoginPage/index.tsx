import { Alert, IconButton, InputAdornment, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useForm } from 'react-hook-form'

import fullLogo from 'src/assets/images/full-logo.png'
import { useTypedDispatch } from 'src/core'
import { userLogin } from '../../slice'
import { formDefaultValues, formResolver, FormSchema } from './validation'
import { FormTextField } from 'src/common/form-elements/FormTextField'

interface LoginPageProps {
  reason?: string
}

const TextField = FormTextField<FormSchema>

export function LoginPage({ reason }: LoginPageProps) {
  const navigate = useNavigate()
  const dispatch = useTypedDispatch()
  const [contextText, setContextText] = useState(reason)
  const [showPassword, setShowPassword] = useState(false)
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: formDefaultValues,
  })

  const handleLogin = async ({ username, password }: FormSchema) => {
    try {
      const response = await dispatch(
        userLogin({ username, password })
      ).unwrap()
      const isSuccess = Boolean(response?.accessToken)

      if (isSuccess) {
        navigate('../example')
      } else {
        setError('password', { message: 'Sai mật khẩu' })
      }
    } catch (e) {
      if (e instanceof Error) {
        setContextText(e.message)
      }
    }
  }

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
      <Box
        component="form"
        onSubmit={handleSubmit(handleLogin)}
        noValidate
        sx={{ maxWidth: '350px' }}
      >
        <TextField
          name="username"
          control={control}
          margin="dense"
          fullWidth
          label="Tên đăng nhập"
          autoComplete="username"
          autoFocus
        />
        <TextField
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
      </Box>
    </Box>
  )
}
