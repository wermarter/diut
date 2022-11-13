import { Gender } from '@diut/common'
import { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Paper,
  TextField,
  Box,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'

import { FormContainer, FormTextField } from 'src/common/form-elements'
import { formResolver, FormSchema } from '../InfoInputPage/validation'
import { TestSelector } from 'src/common/components/TestSelector'
import { FormDateTimePicker } from 'src/common/form-elements/FormDateTimePicker'
import { FormAutocomplete } from 'src/common/form-elements/FormAutocomplete'
import { FormSelect } from 'src/common/form-elements/FormSelect'
import {
  useSampleDeleteByIdMutation,
  useSampleUpdateByIdMutation,
} from 'src/api/sample'
import { usePatientUpdateByIdMutation } from 'src/api/patient'
import { infoEditPageLoader } from './loader'
import { useTypedSelector } from 'src/core'
import { selectUserId, selectUserIsAdmin } from 'src/modules/auth'

const currentYear = new Date().getFullYear()

export default function InfoEditPage() {
  const navigate = useNavigate()
  const { sampleId, patientId } = useParams()
  const {
    author,
    sampleInfo,
    patientInfo,
    patientTypes,
    indications,
    doctors,
    sampleTypes,
  } = useLoaderData() as Awaited<ReturnType<typeof infoEditPageLoader>>
  const userIsAdmin = useTypedSelector(selectUserIsAdmin)
  const userId = useTypedSelector(selectUserId)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: {
      ...sampleInfo,
      infoAt: new Date(sampleInfo.infoAt),
      sampledAt: new Date(sampleInfo.sampledAt),
      tests: sampleInfo.results.map(({ testId, bioProductName }) => ({
        id: testId,
        bioProductName,
      })),
      ...patientInfo,
    },
  })

  const birthYear = watch('birthYear')
  const [age, setAge] = useState(currentYear - getValues().birthYear)

  useEffect(() => {
    setAge(currentYear - birthYear)
  }, [birthYear])

  useEffect(() => {
    if (typeof birthYear === 'string') {
      setValue('birthYear', Number(birthYear))
    }
  }, [birthYear])

  const [testSelectorOpen, setTestSelectorOpen] = useState(false)

  const [updateSample] = useSampleUpdateByIdMutation()
  const [updatePatient] = usePatientUpdateByIdMutation()

  const [deleteSample, { isLoading: isDeletingSample }] =
    useSampleDeleteByIdMutation()

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={() => {
            navigate('/info/confirm')
          }}
        >
          Quay về
        </Button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontStyle: 'italic', mr: 2 }}>
            {author.name}
          </Typography>
          {(userIsAdmin || userId === author._id) && (
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteSample({ id: sampleInfo._id })
                  .unwrap()
                  .then(() => {
                    toast.success(`Đã xoá mẫu: ${sampleInfo.sampleId}`)
                    navigate('/info/confirm')
                  })
              }}
              disabled={isDeletingSample}
            >
              Xoá mẫu XN
            </Button>
          )}
        </div>
      </Box>
      <FormContainer
        onSubmit={handleSubmit((values) => {
          Object.keys(values).forEach(
            //@ts-ignore
            (k) => values[k]! === '' && delete values[k]
          )

          return Promise.all([
            updatePatient({
              id: patientId!,
              updatePatientRequestDto: values,
            }).unwrap(),
            updateSample({
              id: sampleId!,
              updateSampleRequestDto: {
                ...values,
                sampledAt: values.sampledAt.toISOString(),
                infoAt: values.infoAt.toISOString(),
              },
            }).unwrap(),
          ]).then(() => {
            toast.success('Sửa thành công')
            navigate('/info/confirm')
          })
        })}
      >
        <Paper sx={{ p: 2, mb: 2 }} elevation={4}>
          <Grid container spacing={2}>
            {/* ----------------------------- Row 1 ----------------------------- */}
            <Grid xs={2}>
              <FormTextField
                autoComplete="off"
                name="externalId"
                control={control}
                fullWidth
                label="ID Phòng khám"
                autoFocus
              />
            </Grid>
            <Grid xs={4}>
              <FormTextField
                autoComplete="off"
                name="name"
                control={control}
                fullWidth
                label="Họ tên"
              />
            </Grid>
            <Grid xs={3}>
              <FormDateTimePicker
                name="sampledAt"
                label="TG lấy mẫu"
                control={control}
              />
            </Grid>
            <Grid xs={3}>
              <FormDateTimePicker
                name="infoAt"
                label="TG nhận mẫu"
                control={control}
              />
            </Grid>
            {/* ----------------------------- Row 2 ----------------------------- */}
            <Grid xs={2}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value={Gender.Male}
                        control={<Radio size="small" />}
                        label="Nam"
                      />
                      <FormControlLabel
                        value={Gender.Female}
                        control={<Radio size="small" />}
                        label="Nữ"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid xs={2}>
              <FormTextField
                autoComplete="off"
                name="birthYear"
                type="number"
                size="small"
                control={control}
                fullWidth
                label="Năm sinh"
              />
            </Grid>
            <Grid xs={2}>
              <TextField
                autoComplete="off"
                name="age"
                type="number"
                size="small"
                value={age}
                onChange={(e) => {
                  setValue('birthYear', currentYear - Number(e.target.value), {
                    shouldValidate: true,
                  })
                }}
                fullWidth
                label="Tuổi"
              />
            </Grid>
            <Grid xs={6}>
              <FormTextField
                name="address"
                size="small"
                control={control}
                fullWidth
                label="Địa chỉ"
              />
            </Grid>
            {/* ----------------------------- Row 3 ----------------------------- */}
            <Grid xs={4}>
              <FormTextField
                autoComplete="off"
                name="sampleId"
                size="small"
                control={control}
                fullWidth
                label="ID xét nghiệm"
              />
            </Grid>
            <Grid xs={4}>
              <FormTextField
                autoComplete="off"
                name="phoneNumber"
                size="small"
                control={control}
                fullWidth
                label="Số điện thoại"
              />
            </Grid>
            <Grid xs={4}>
              <FormTextField
                autoComplete="off"
                name="SSN"
                control={control}
                size="small"
                fullWidth
                label="Số CMND/CCCD"
              />
            </Grid>
            {/* ----------------------------- Row 4 ----------------------------- */}
            <Grid xs={4}>
              <FormSelect
                control={control}
                name="patientTypeId"
                label="Đối tượng"
                options={patientTypes?.items!}
                getOptionValue={(option) => option._id}
                getOptionLabel={(option) => option.name}
              />
            </Grid>
            <Grid xs={4}>
              <FormSelect
                control={control}
                name="indicationId"
                label="Chẩn đoán"
                options={indications?.items!}
                getOptionValue={(option) => option._id}
                getOptionLabel={(option) => option.name}
              />
            </Grid>
            <Grid xs={4}>
              <FormSelect
                control={control}
                name="doctorId"
                label="Bác sĩ"
                options={doctors?.items!}
                getOptionValue={(option) => option._id}
                getOptionLabel={(option) => option.name}
              />
            </Grid>
            {/* ----------------------------- Row 5 ----------------------------- */}
            <Grid xs={2}>
              <Button
                sx={{ height: '100%' }}
                onClick={() => {
                  setTestSelectorOpen(true)
                }}
                color="primary"
                variant="outlined"
                fullWidth
              >
                {getValues().tests?.length} Xét Nghiệm
              </Button>
            </Grid>
            <Grid xs={10}>
              <FormAutocomplete
                control={control}
                name="sampleTypeIds"
                options={sampleTypes?.items!}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option._id}
                label="Loại mẫu"
              />
            </Grid>
          </Grid>
          {/* ----------------------------- Submit ----------------------------- */}
          <LoadingButton
            sx={{ mt: 2 }}
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Sửa thông tin
          </LoadingButton>
        </Paper>
      </FormContainer>
      <TestSelector
        open={testSelectorOpen}
        onClose={() => {
          setTestSelectorOpen(false)
        }}
        previousState={sampleInfo.results.map(({ testId }) => testId)}
        onSubmit={(items) => {
          setValue(
            'tests',
            items.map((item) => ({
              bioProductName: item.bioProduct?.name,
              id: item._id,
            }))
          )
        }}
        showCombos
      />
    </Box>
  )
}
