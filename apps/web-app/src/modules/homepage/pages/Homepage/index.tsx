import { Box, Typography } from '@mui/material'

export default function HomePage() {
  return (
    // <iframe
    //   src="https://hcdc.vn/"
    //   style={{ width: '100%', height: '100%' }}
    //   frameBorder="0"
    // ></iframe>
    <Box
      sx={{
        my: 15,
        textAlign: 'center',
      }}
    >
      <Typography variant="h2">
        Phần mềm quản lý và in kết quả xét nghiệm
      </Typography>
      <Box sx={{ m: 15 }}>
        <Typography paragraph>
          Ý tưởng: <em> Lê Thị Mỹ Hạnh</em>
        </Typography>
        <Typography paragraph>
          Lập trình: <em>Hà Minh Chiến</em>
        </Typography>
        <Typography paragraph>
          Hỗ trợ: <em>Lê Minh Tuấn</em>
        </Typography>
      </Box>
    </Box>
  )
}
