import { Gender, SampleExceptionMsg } from '@diut/hcdc-common'
import { useCallback, useDeferredValue, useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Paper,
  TextField,
  IconButton,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useLoaderData } from 'react-router-dom'
import { GridActionsCellItem } from '@mui/x-data-grid'
import { addMinutes, setMinutes, setHours } from 'date-fns'
import LoopIcon from '@mui/icons-material/Loop'
import LinkIcon from '@mui/icons-material/Link'

import {
  FormContainer,
  FormSwitch,
  FormTextField,
  FormDateTimePicker,
  FormSelect,
  FormCheckboxGroup,
} from 'src/common/form-elements'
import { formDefaultValues, formResolver, FormSchema } from './validation'
import { TestSelector } from 'src/common/components/TestSelector'
import { SampleBadRequestDto, useSampleCreateMutation } from 'src/api/sample'
import {
  PatientResponseDto,
  usePatientCreateMutation,
  usePatientSearchQuery,
  usePatientUpdateByIdMutation,
} from 'src/api/patient'
import { DataTable } from 'src/common/components/DataTable'
import { useDebouncedValue } from 'src/common/hooks'
import { infoInputPageLoader } from './loader'
import { BarcodeModal } from '../../components/BarcodeModal'

const currentYear = new Date().getFullYear()

export default function InfoInputPage() {
  const { patientTypes, indications, doctors, sampleTypes, sampleOrigins } =
    useLoaderData() as Awaited<ReturnType<typeof infoInputPageLoader>>

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting },
    reset,
    setFocus,
    setError,
  } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: {
      ...formDefaultValues,
      patientTypeId: patientTypes.items?.[0]?._id!,
      doctorId: doctors.items?.[0]?._id!,
      indicationId: indications.items?.[0]?._id!,
      sampleOriginId: sampleOrigins.items?.[0]?._id!,
    },
  })

  const birthYear = watch('birthYear')
  const [age, setAge] = useState(currentYear - getValues().birthYear)

  useEffect(() => {
    setAge(currentYear - birthYear)
  }, [birthYear])

  useEffect(() => {
    //@ts-ignore
    if (typeof birthYear === 'string' && birthYear.length > 0) {
      setValue('birthYear', Number(birthYear))
    }
  }, [birthYear])

  useEffect(() => {
    setFocus('externalId')
    setValue('infoAt', new Date())
    setValue('sampledAt', addMinutes(new Date(), 5))
  }, [])

  const [testSelectorOpen, setTestSelectorOpen] = useState(false)

  const [createSample, { error }] = useSampleCreateMutation()
  const [createPatient] = usePatientCreateMutation()
  const [updatePatient] = usePatientUpdateByIdMutation()

  useEffect(() => {
    const response = (error as any)?.data as SampleBadRequestDto
    if (response?.message?.length > 0) {
      const { message } = response
      if (message === SampleExceptionMsg.SAMPLE_ID_EXISTED) {
        setError('sampleId', { message: 'Đã tồn tại' }, { shouldFocus: true })
      } else {
        toast.error(message)
      }
    }
  }, [error])

  const deferredExternalId = useDeferredValue(
    useDebouncedValue(watch('externalId')!),
  )
  const deferredName = useDeferredValue(useDebouncedValue(watch('name')!))

  const { data: patients, isFetching: isFetchingPatients } =
    usePatientSearchQuery(
      {
        searchPatientRequestDto: {
          filter:
            deferredExternalId?.length! > 0
              ? { externalId: deferredExternalId }
              : { name: { $regex: '^' + deferredName, $options: 'i' } },
          offset: 0,
          limit: 10,
        },
      },
      {
        skip:
          (deferredExternalId ?? '').length === 0 &&
          (deferredName ?? '').length === 0,
      },
    )

  const [shouldUpdatePatient, setShouldUpdatePatient] = useState<string | null>(
    null,
  )

  const resetForm = useCallback(() => {
    const {
      sampleId,
      isNgoaiGio,
      patientTypeId,
      indicationId,
      doctorId,
      address,
      infoAt,
    } = getValues()
    const newSampleId = Number(sampleId) + 1

    const moment = new Date()
    const thisHour = moment.getHours()
    const thisMinute = moment.getMinutes()
    const nextInfoAt = setMinutes(setHours(infoAt, thisHour), thisMinute)
    const nextSampledAt = addMinutes(nextInfoAt, 5)

    setFocus('externalId')
    reset()

    setValue('isNgoaiGio', isNgoaiGio)
    setValue('patientTypeId', patientTypeId)
    setValue('indicationId', indicationId)
    setValue('doctorId', doctorId)
    setValue('sampleId', newSampleId.toString())
    setValue('address', address)
    setValue('infoAt', nextInfoAt)
    setValue('sampledAt', nextSampledAt)
    setShouldUpdatePatient(null)
  }, [])

  const [barcodeModalOpen, setBarcodeModalOpen] = useState(false)

  const handleFormSubmit = useCallback(
    handleSubmit(async (values) => {
      let patient: PatientResponseDto

      if (shouldUpdatePatient !== null) {
        patient = await updatePatient({
          id: shouldUpdatePatient,
          updatePatientRequestDto: values,
        }).unwrap()
      } else {
        patient = await createPatient({
          createPatientRequestDto: values,
        }).unwrap()
      }

      await createSample({
        createSampleRequestDto: {
          ...values,
          note: values.note ?? '',
          sampledAt: values.sampledAt.toISOString(),
          infoAt: values.infoAt.toISOString(),
          patientId: patient._id,
        },
      }).unwrap()

      setBarcodeModalOpen(true)
    }),
    [shouldUpdatePatient],
  )

  return (
    <Box
      sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <FormContainer onSubmit={handleFormSubmit}>
        <Paper sx={{ p: 2, mb: 2 }} elevation={4}>
          <Grid container spacing={2}>
            {/* ----------------------------- Row 1 ----------------------------- */}
            <Grid xs={2}>
              <FormTextField
                name="externalId"
                autoComplete="off"
                control={control}
                fullWidth
                label="ID Phòng khám"
              />
            </Grid>
            <Grid xs={4}>
              <FormTextField
                name="name"
                autoComplete="off"
                control={control}
                fullWidth
                label="Họ tên"
              />
            </Grid>
            <Grid xs={3}>
              <FormDateTimePicker
                inputProps={{ tabIndex: 999 }}
                name="sampledAt"
                label="TG lấy mẫu"
                control={control}
              />
            </Grid>
            <Grid xs={3}>
              <FormDateTimePicker
                inputProps={{ tabIndex: 999 }}
                name="infoAt"
                label="TG nhận bệnh"
                control={control}
              />
            </Grid>
            {/* ----------------------------- Row 2 ----------------------------- */}
            <Grid xs={2} sx={{ display: 'flex' }}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ flexGrow: 1, alignItems: 'center' }}>
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
                name="birthYear"
                autoComplete="off"
                type="number"
                size="small"
                control={control}
                fullWidth
                label="Năm sinh"
              />
            </Grid>
            <Grid xs={2}>
              <TextField
                name="age"
                autoComplete="off"
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
            <Grid xs={3}>
              <FormTextField
                autoComplete="off"
                name="address"
                size="small"
                control={control}
                fullWidth
                label="Địa chỉ"
              />
            </Grid>
            <Grid xs={3}>
              <FormSelect
                control={control}
                name="sampleOriginId"
                label="Đơn vị"
                options={sampleOrigins?.items!}
                getOptionValue={(option) => option._id}
                getOptionLabel={(option) => option.name}
              />
            </Grid>
            {/* ----------------------------- Row 3 ----------------------------- */}
            <Grid xs={3}>
              <FormTextField
                autoComplete="off"
                name="sampleId"
                size="small"
                control={control}
                fullWidth
                label="ID xét nghiệm"
              />
            </Grid>
            <Grid xs={3}>
              <FormTextField
                autoComplete="off"
                name="phoneNumber"
                size="small"
                control={control}
                fullWidth
                label="Số điện thoại"
              />
            </Grid>
            <Grid xs={3}>
              <FormTextField
                autoComplete="off"
                name="SSN"
                control={control}
                size="small"
                fullWidth
                label="Số CMND/CCCD"
              />
            </Grid>
            <Grid xs={1.4}>
              <FormSwitch
                control={control}
                name="isTraBuuDien"
                label="BưuĐiện"
              />
            </Grid>
            <Grid xs={1.6}>
              <FormSwitch
                control={control}
                name="isNgoaiGio"
                label="NgoàiGiờ"
              />
            </Grid>
            {/* ----------------------------- Row 4 ----------------------------- */}
            <Grid xs={3}>
              <FormSelect
                control={control}
                name="patientTypeId"
                label="Đối tượng"
                options={patientTypes?.items!}
                getOptionValue={(option) => option._id}
                getOptionLabel={(option) => option.name}
              />
            </Grid>
            <Grid xs={3}>
              <FormSelect
                control={control}
                name="indicationId"
                label="Chẩn đoán"
                options={indications?.items!}
                getOptionValue={(option) => option._id}
                getOptionLabel={(option) => option.name}
              />
            </Grid>
            <Grid xs={3}>
              <FormSelect
                control={control}
                name="doctorId"
                label="Bác sĩ"
                options={doctors?.items!}
                getOptionValue={(option) => option._id}
                getOptionLabel={(option) => option.name}
              />
            </Grid>
            <Grid xs={3}>
              <FormTextField
                color="secondary"
                autoComplete="off"
                name="note"
                control={control}
                size="small"
                fullWidth
                label="Ghi chú"
                focused
              />
            </Grid>
            {/* ----------------------------- Row 5 ----------------------------- */}
            <Grid xs={3}>
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
            <Grid xs={9}>
              <FormCheckboxGroup
                control={control}
                name="sampleTypeIds"
                options={sampleTypes?.items!}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option._id}
                label="Loại mẫu"
              />
            </Grid>
            {/* ----------------------------- Submit ----------------------------- */}
            <Grid xs={12}>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Lưu thông tin
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
      </FormContainer>
      <TestSelector
        open={testSelectorOpen}
        onClose={() => {
          setTestSelectorOpen(false)
        }}
        onSubmit={(items) => {
          setValue(
            'tests',
            items.map((item) => ({
              bioProductName: item.bioProduct?.name,
              id: item._id,
            })),
          )
        }}
        showCombos
      />
      <Box sx={{ flexGrow: 1 }}>
        <DataTable
          rows={patients?.items ?? []}
          loading={isFetchingPatients}
          disableRowSelectionOnClick
          getRowId={(row) => row._id}
          paginationModel={{ page: 1, pageSize: 10 }}
          pageSizeOptions={[10]}
          columns={[
            {
              field: 'startActions',
              type: 'actions',
              width: 80,
              sortable: false,
              cellClassName: 'actions',
              renderHeader: () => (
                <IconButton
                  color="secondary"
                  size="small"
                  onClick={() => {
                    resetForm()
                  }}
                >
                  <LoopIcon />
                </IconButton>
              ),
              getActions: ({ id }) => [
                <GridActionsCellItem
                  icon={<LinkIcon />}
                  label="Liên kết"
                  color="primary"
                  onClick={() => {
                    const patient = patients?.items.find(
                      ({ _id }) => _id === id,
                    )
                    setShouldUpdatePatient(patient?._id!)
                    setValue('externalId', patient?.externalId)
                    setValue('name', patient?.name!)
                    setValue('gender', patient?.gender!)
                    setValue('birthYear', patient?.birthYear!)
                    setValue('address', patient?.address!)
                    setValue('phoneNumber', patient?.phoneNumber)
                    setValue('SSN', patient?.SSN)
                  }}
                />,
              ],
            },
            {
              field: 'externalId',
              headerName: 'ID PK',
              sortable: false,
              width: 120,
            },
            {
              field: 'name',
              headerName: 'Họ tên',
              sortable: false,
              flex: 1,
              minWidth: 150,
            },
            {
              field: 'birthYear',
              headerName: 'Năm sinh',
              sortable: false,
              width: 100,
            },
            {
              field: 'gender',
              headerName: 'Giới tính',
              sortable: false,
              width: 100,
              valueGetter: ({ value }) => {
                if (value === Gender.Male) {
                  return 'Nam'
                }
                return 'Nữ'
              },
            },
            {
              field: 'address',
              headerName: 'Địa chỉ',
              sortable: false,
              width: 200,
            },
            {
              field: 'phoneNumber',
              headerName: 'SĐT',
              sortable: false,
              width: 150,
            },
          ]}
        />
      </Box>
      <BarcodeModal
        open={barcodeModalOpen}
        onClose={() => {
          setBarcodeModalOpen(false)
          resetForm()
        }}
        sampleId={getValues().sampleId}
        name={getValues().name}
        birthYear={getValues().birthYear}
      />
    </Box>
  )
}
