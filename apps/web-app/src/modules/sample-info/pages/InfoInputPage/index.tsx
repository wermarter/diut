import { LoadingButton } from '@mui/lab'
import { Button, IconButton } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useForm } from 'react-hook-form'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'

import { FormContainer, FormTextField } from 'src/common/form-elements'
import { formDefaultValues, formResolver, FormSchema } from './validation'
import { TestSelector } from 'src/common/components/TestSelector'
import { useState } from 'react'

const TextField = FormTextField<FormSchema>

export default function InfoInputPage() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: formDefaultValues,
  })

  const [testSelectorOpen, setTestSelectorOpen] = useState(false)

  return (
    <FormContainer onSubmit={handleSubmit((res) => console.log(res))}>
      <Grid container spacing={2} alignItems={'center'}>
        <Grid xs={2}>
          <TextField
            name="username"
            control={control}
            margin="dense"
            fullWidth
            label="ID Phòng khám"
            autoFocus
          />
        </Grid>
        <Grid xs={4}>
          <TextField
            name="username"
            control={control}
            margin="dense"
            fullWidth
            label="Họ tên"
          />
        </Grid>
        <Grid xs>
          <IconButton size="large" sx={{ border: '1px solid' }} color="primary">
            <PersonSearchIcon />
          </IconButton>
        </Grid>
      </Grid>
      <TextField
        name="password"
        control={control}
        margin="dense"
        fullWidth
        label="Mật khẩu"
        autoComplete="current-password"
      />
      <Button
        onClick={() => {
          setTestSelectorOpen(true)
        }}
      >
        Click me
      </Button>
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
      <TestSelector
        open={testSelectorOpen}
        onClose={() => {
          setTestSelectorOpen(false)
        }}
        onSubmit={(items) => {
          alert(JSON.stringify(items))
        }}
        showCombos
      />
    </FormContainer>
  )
}
