import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

import fullLogo from 'src/assets/images/full-logo.png'
import { useTypedDispatch } from 'src/core'
import { userLogin } from '../../slice'
import { Alert } from '@mui/material'
import { useState } from 'react'

interface LoginPageProps {
  reason?: string
}

export function LoginPage({ reason }: LoginPageProps) {
  const navigate = useNavigate()
  const dispatch = useTypedDispatch()
  const [helperText, setHelperText] = useState(reason)

  const handleLogin = (username: string, password: string) => {
    dispatch(userLogin({ username, password }))
    const wrongCredentials = !username
    if (wrongCredentials) {
      setHelperText('Vui lòng kiểm tra lại thông tin.')
    } else {
      navigate('../example')
    }
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img src={fullLogo} style={{ maxWidth: '50%' }} />
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin('oke', 'conde')
        }}
        noValidate
        sx={{ mt: 1, maxWidth: '350px' }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Tên đăng nhập"
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          label="Mật khẩu"
          type="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 3 }}
        >
          Đăng nhập
        </Button>
        {helperText && <Alert color={'secondary' as any}>{helperText}</Alert>}
      </Box>
    </Box>
  )
}
