import { Box, Button, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

type ErrorLayoutProps = PropsWithChildren

export function ErrorLayout({ children }: ErrorLayoutProps) {
  const navigate = useNavigate()

  const handleNavigateHome = () => {
    navigate('/')
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" component="h1">
        Đã xảy ra lỗi
      </Typography>
      <Button sx={{ my: 3 }} variant="contained" onClick={handleNavigateHome}>
        Quay về trang chủ
      </Button>
      {children}
    </Box>
  )
}
