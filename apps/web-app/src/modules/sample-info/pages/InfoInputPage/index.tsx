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
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField as MuiTextField,
  Typography,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import Grid from '@mui/material/Unstable_Grid2'
import { Controller, useForm } from 'react-hook-form'
import { pick } from 'lodash-es'

import { FormContainer, FormTextField } from 'src/common/form-elements'
import { formDefaultValues, formResolver, FormSchema } from './validation'
import { TestSelector } from 'src/common/components/TestSelector'
import { usePatientTypeSearchQuery } from 'src/api/patient-type'
import { useIndicationSearchQuery } from 'src/api/indication'
import { useDoctorSearchQuery } from 'src/api/doctor'
import { useSampleTypeSearchQuery } from 'src/api/sample-type'

const TextField = FormTextField<FormSchema>
const currentYear = new Date().getFullYear()

export default function InfoInputPage() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: formDefaultValues,
  })

  const { data: patientTypes, isFetching: isFetchingPatientTypes } =
    usePatientTypeSearchQuery({
      searchPatientTypeRequestDto: { sort: { index: 1 } },
    })
  const { data: indications, isFetching: isFetchingIndications } =
    useIndicationSearchQuery({
      searchIndicationRequestDto: { sort: { index: 1 } },
    })
  const { data: doctors, isFetching: isFetchingDoctors } = useDoctorSearchQuery(
    {
      searchDoctorRequestDto: { sort: { index: 1 } },
    }
  )
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

  useEffect(() => {
    setValue('infoAt', new Date())
    setValue('sampledAt', new Date())
  }, [])

  const { data: sampleTypes, isFetching: isFetchingSampleTypes } =
    useSampleTypeSearchQuery({
      searchSampleTypeRequestDto: {
        sort: { index: 1 },
      },
    })

  const [testSelectorOpen, setTestSelectorOpen] = useState(false)

  return (
    <FormContainer onSubmit={handleSubmit((res) => alert(JSON.stringify(res)))}>
      <Paper sx={{ p: 2 }} elevation={5}>
        <Grid container spacing={2}>
          {/* ----------------------------- Row 1 ----------------------------- */}
          <Grid xs={2}>
            <TextField
              name="externalId"
              control={control}
              fullWidth
              label="ID Phòng khám"
              autoFocus
            />
          </Grid>
          <Grid xs={4}>
            <TextField name="name" control={control} fullWidth label="Họ tên" />
          </Grid>
          <Grid xs={3}>
            <Controller
              name="sampledAt"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  {...field}
                  dayOfWeekFormatter={(day) => `${day}`}
                  label="TG lấy mẫu"
                  renderInput={(params) => <MuiTextField {...params} />}
                />
              )}
            />
          </Grid>
          <Grid xs={3}>
            <Controller
              name="infoAt"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  {...field}
                  dayOfWeekFormatter={(day) => `${day}`}
                  label="TG nhận mẫu"
                  renderInput={(params) => <MuiTextField {...params} />}
                />
              )}
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
            <TextField
              name="birthYear"
              type="number"
              disableError
              size="small"
              control={control}
              fullWidth
              label="Năm sinh"
            />
          </Grid>
          <Grid xs={2}>
            <MuiTextField
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
            <TextField
              name="address"
              size="small"
              control={control}
              fullWidth
              label="Địa chỉ"
            />
          </Grid>
          {/* ----------------------------- Row 3 ----------------------------- */}
          <Grid xs={4}>
            <TextField
              name="sampleId"
              size="small"
              control={control}
              fullWidth
              label="ID xét nghiệm"
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              name="phoneNumber"
              size="small"
              control={control}
              fullWidth
              label="Số điện thoại"
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              name="SSN"
              control={control}
              size="small"
              fullWidth
              label="Số CMND/CCCD"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ my: 2 }}>
          {/* ----------------------------- Row 4 ----------------------------- */}
          <Grid xs={4}>
            <Controller
              name="patientTypeId"
              control={control}
              render={({ field }) => (
                <FormControl
                  {...field}
                  fullWidth
                  size="small"
                  sx={{ minWidth: '300px' }}
                >
                  <InputLabel>Đối tượng</InputLabel>
                  {!isFetchingPatientTypes && (
                    <Select
                      label="Đối tượng"
                      defaultValue={patientTypes?.items?.[0]?._id}
                    >
                      {patientTypes?.items.map((patientType) => (
                        <MenuItem value={patientType._id} key={patientType._id}>
                          {patientType.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid xs={4}>
            <Controller
              name="indicationId"
              control={control}
              render={({ field }) => (
                <FormControl
                  {...field}
                  fullWidth
                  size="small"
                  sx={{ minWidth: '300px' }}
                >
                  <InputLabel>Chẩn đoán</InputLabel>
                  {!isFetchingIndications && (
                    <Select
                      label="Chẩn đoán"
                      defaultValue={indications?.items?.[0]?._id}
                    >
                      {indications?.items.map((indication) => (
                        <MenuItem value={indication._id} key={indication._id}>
                          {indication.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid xs={4}>
            <Controller
              name="doctorId"
              control={control}
              render={({ field }) => (
                <FormControl
                  {...field}
                  fullWidth
                  size="small"
                  sx={{ minWidth: '300px' }}
                >
                  <InputLabel>Bác sĩ</InputLabel>
                  {!isFetchingDoctors && (
                    <Select
                      label="Bác sĩ"
                      defaultValue={doctors?.items?.[0]?._id}
                    >
                      {doctors?.items.map((doctor) => (
                        <MenuItem value={doctor._id} key={doctor._id}>
                          {doctor.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          {/* ----------------------------- Row 5 ----------------------------- */}
          <Grid xs={2}>
            <Button
              sx={{ height: '100%' }}
              onClick={() => {
                setTestSelectorOpen(true)
              }}
              color="secondary"
              variant="outlined"
              fullWidth
            >
              {getValues().testIds?.length} Xét Nghiệm
            </Button>
          </Grid>
          <Grid xs={10}>
            {!isFetchingSampleTypes && (
              <Autocomplete
                multiple
                options={sampleTypes?.items!}
                getOptionLabel={(option) => option.name}
                onChange={(event, value, reason) => {
                  setValue(
                    'sampleTypeIds',
                    value.map(({ _id }) => _id) as any,
                    {
                      shouldTouch: true,
                    }
                  )
                }}
                defaultValue={[]}
                filterSelectedOptions
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Loại mẫu"
                  />
                )}
              />
            )}
          </Grid>
        </Grid>
        <Typography color="error">
          {Object.values(
            pick(errors, ['birthYear', 'testIds', 'patientTypeIds'])
          )
            .filter((error) => error.type !== 'invalid_type')
            .map((error) => error.message)
            .join('. ')}
        </Typography>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Lưu thông tin
        </LoadingButton>
      </Paper>
      <TestSelector
        open={testSelectorOpen}
        onClose={() => {
          setTestSelectorOpen(false)
        }}
        onSubmit={(items) => {
          setValue(
            'testIds',
            items.map((item) => ({
              bioProductName: item.bioProduct?.name,
              id: item._id,
            })) as any,
            { shouldTouch: true }
          )
        }}
        showCombos
      />
    </FormContainer>
  )
}
