import { Gender } from '@diut/common'
import { useDeferredValue, useEffect, useState } from 'react'
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
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useLoaderData } from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check'
import { GridActionsCellItem } from '@mui/x-data-grid'

import { FormContainer, FormTextField } from 'src/common/form-elements'
import { formDefaultValues, formResolver, FormSchema } from './validation'
import { TestSelector } from 'src/common/components/TestSelector'
import { FormDateTimePicker } from 'src/common/form-elements/FormDateTimePicker'
import { FormAutocomplete } from 'src/common/form-elements/FormAutocomplete'
import { FormSelect } from 'src/common/form-elements/FormSelect'
import { useSampleCreateMutation } from 'src/api/sample'
import {
  PatientResponseDto,
  usePatientCreateMutation,
  usePatientSearchQuery,
  usePatientUpdateByIdMutation,
} from 'src/api/patient'
import { DataTable } from 'src/common/components/DataTable'
import { useDebouncedValue } from 'src/common/hooks'
import { infoInputPageLoader } from './loader'

const currentYear = new Date().getFullYear()

export default function InfoInputPage() {
  const { patientTypes, indications, doctors, sampleTypes } =
    useLoaderData() as Awaited<ReturnType<typeof infoInputPageLoader>>

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting },
    reset,
  } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: {
      ...formDefaultValues,
      patientTypeId: patientTypes.items?.[0]?._id!,
      doctorId: doctors.items?.[0]?._id!,
      indicationId: indications.items?.[0]?._id!,
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

  useEffect(() => {
    setValue('infoAt', new Date())
    setValue('sampledAt', new Date())
  }, [])

  const [testSelectorOpen, setTestSelectorOpen] = useState(false)

  const [createSample] = useSampleCreateMutation()
  const [createPatient] = usePatientCreateMutation()
  const [updatePatient] = usePatientUpdateByIdMutation()

  const deferredExternalId = useDeferredValue(
    useDebouncedValue(watch('externalId')!)
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
      }
    )

  const [shouldUpdatePatient, setShouldUpdatePatient] = useState<string | null>(
    null
  )

  const resetState = () => {
    const newSampleId = Number(getValues().sampleId) + 1
    reset()
    setValue('sampleId', newSampleId.toString())
    setValue('infoAt', new Date())
    setValue('sampledAt', new Date())
    setShouldUpdatePatient(null)
  }

  return (
    <Box sx={{ p: 2 }}>
      <FormContainer
        onSubmit={handleSubmit(async (values) => {
          Object.keys(values).forEach(
            //@ts-ignore
            (k) => values[k]! === '' && delete values[k]
          )
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
              sampledAt: values.sampledAt.toISOString(),
              infoAt: values.infoAt.toISOString(),
              patientId: patient._id,
            },
          }).unwrap()
          toast.success('Thêm thành công')
          resetState()
        })}
      >
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
                autoFocus
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
                name="sampledAt"
                label="TG lấy mẫu"
                control={control}
              />
            </Grid>
            <Grid xs={3}>
              <FormDateTimePicker
                name="infoAt"
                label="TG nhận bệnh"
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
            Lưu thông tin
          </LoadingButton>
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
            }))
          )
        }}
        showCombos
      />
      <DataTable
        rows={patients?.items ?? []}
        loading={isFetchingPatients}
        disableSelectionOnClick
        getRowId={(row) => row._id}
        pageSize={10}
        rowsPerPageOptions={[10]}
        columns={[
          {
            field: 'startActions',
            type: 'actions',
            width: 80,
            sortable: false,
            cellClassName: 'actions',
            getActions: ({ id }) => [
              <GridActionsCellItem
                icon={<CheckIcon />}
                label="Chọn"
                color="primary"
                onClick={() => {
                  const patient = patients?.items.find(({ _id }) => _id === id)
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
  )
}
