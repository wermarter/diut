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
import { addMinutes, setMinutes, setHours } from 'date-fns'

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
    setFocus,
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
    const {
      sampleId,
      isNgoaiGio,
      patientTypeId,
      indicationId,
      doctorId,
      address,
      infoAt,
      sampledAt,
    } = getValues()
    const newSampleId = Number(sampleId) + 1

    const moment = new Date()
    const thisHour = moment.getHours()
    const thisMinute = moment.getMinutes()
    const nextInfoAt = setMinutes(setHours(infoAt, thisHour), thisMinute)
    const nextSampledAt = setMinutes(setHours(sampledAt, thisHour), thisMinute)

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
  }

  return (
    <Box
      sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
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
              note: values.note ?? '',
              sampledAt: values.sampledAt.toISOString(),
              infoAt: values.infoAt.toISOString(),
              patientId: patient._id,
            },
          }).unwrap()
          toast.success('Th??m th??nh c??ng')
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
                label="ID Ph??ng kh??m"
              />
            </Grid>
            <Grid xs={4}>
              <FormTextField
                name="name"
                autoComplete="off"
                control={control}
                fullWidth
                label="H??? t??n"
              />
            </Grid>
            <Grid xs={3}>
              <FormDateTimePicker
                name="sampledAt"
                label="TG l???y m???u"
                control={control}
              />
            </Grid>
            <Grid xs={3}>
              <FormDateTimePicker
                name="infoAt"
                label="TG nh???n b???nh"
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
                        label="N???"
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
                label="N??m sinh"
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
                label="Tu???i"
              />
            </Grid>
            <Grid xs={6}>
              <FormTextField
                autoComplete="off"
                name="address"
                size="small"
                control={control}
                fullWidth
                label="?????a ch???"
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
                label="ID x??t nghi???m"
              />
            </Grid>
            <Grid xs={3}>
              <FormTextField
                autoComplete="off"
                name="phoneNumber"
                size="small"
                control={control}
                fullWidth
                label="S??? ??i???n tho???i"
              />
            </Grid>
            <Grid xs={4}>
              <FormTextField
                autoComplete="off"
                name="SSN"
                control={control}
                size="small"
                fullWidth
                label="S??? CMND/CCCD"
              />
            </Grid>
            <Grid xs={2}>
              <FormSwitch
                control={control}
                name="isTraBuuDien"
                label="B??u ??i???n"
              />
            </Grid>
            {/* ----------------------------- Row 4 ----------------------------- */}
            <Grid xs={3}>
              <FormSelect
                control={control}
                name="patientTypeId"
                label="?????i t?????ng"
                options={patientTypes?.items!}
                getOptionValue={(option) => option._id}
                getOptionLabel={(option) => option.name}
              />
            </Grid>
            <Grid xs={3}>
              <FormSelect
                control={control}
                name="indicationId"
                label="Ch???n ??o??n"
                options={indications?.items!}
                getOptionValue={(option) => option._id}
                getOptionLabel={(option) => option.name}
              />
            </Grid>
            <Grid xs={3}>
              <FormSelect
                control={control}
                name="doctorId"
                label="B??c s??"
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
                label="Ghi ch??"
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
                {getValues().tests?.length} X??t Nghi???m
              </Button>
            </Grid>
            <Grid xs={9}>
              <FormCheckboxGroup
                control={control}
                name="sampleTypeIds"
                options={sampleTypes?.items!}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option._id}
                label="Lo???i m???u"
              />
            </Grid>
            {/* ----------------------------- Submit ----------------------------- */}
            <Grid xs={10}>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                L??u th??ng tin
              </LoadingButton>
            </Grid>
            <Grid xs={2}>
              <FormSwitch
                control={control}
                name="isNgoaiGio"
                label="Ngo??i gi???"
              />
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
            }))
          )
        }}
        showCombos
      />
      <Box sx={{ flexGrow: 1 }}>
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
                  label="Ch???n"
                  color="primary"
                  onClick={() => {
                    const patient = patients?.items.find(
                      ({ _id }) => _id === id
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
              headerName: 'H??? t??n',
              sortable: false,
              flex: 1,
              minWidth: 150,
            },
            {
              field: 'birthYear',
              headerName: 'N??m sinh',
              sortable: false,
              width: 100,
            },
            {
              field: 'gender',
              headerName: 'Gi???i t??nh',
              sortable: false,
              width: 100,
              valueGetter: ({ value }) => {
                if (value === Gender.Male) {
                  return 'Nam'
                }
                return 'N???'
              },
            },
            {
              field: 'address',
              headerName: '?????a ch???',
              sortable: false,
              width: 200,
            },
            {
              field: 'phoneNumber',
              headerName: 'S??T',
              sortable: false,
              width: 150,
            },
          ]}
        />
      </Box>
    </Box>
  )
}
