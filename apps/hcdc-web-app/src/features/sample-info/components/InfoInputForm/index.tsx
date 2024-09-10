import { dedupSpaces, trimObjectValues } from '@diut/common'
import { DomainErrorCode, PatientGender } from '@diut/hcdc'
import LinkIcon from '@mui/icons-material/Link'
import LoopIcon from '@mui/icons-material/Loop'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { GridActionsCellItem } from '@mui/x-data-grid'
import { addMinutes, setHours, setMinutes } from 'date-fns'
import { useCallback, useDeferredValue, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  FormCheckboxGroup,
  FormContainer,
  FormDateTimePicker,
  FormSelect,
  FormSwitch,
  FormTextField,
} from 'src/components/form'
import { DataTable } from 'src/components/table'
import { authSlice } from 'src/features/auth'
import { TestSelector } from 'src/features/test'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { DiagnosisResponseDto } from 'src/infra/api/access-service/diagnosis'
import { DoctorResponseDto } from 'src/infra/api/access-service/doctor'
import {
  PatientResponseDto,
  usePatientCreateMutation,
  usePatientSearchQuery,
  usePatientUpdateByIdMutation,
} from 'src/infra/api/access-service/patient'
import { PatientTypeResponseDto } from 'src/infra/api/access-service/patient-type'
import {
  HttpErrorResponse,
  useSampleCreateMutation,
} from 'src/infra/api/access-service/sample'
import { SampleTypeResponseDto } from 'src/infra/api/access-service/sample-type'
import { useTypedSelector } from 'src/infra/redux'
import { useDebouncedValue } from 'src/shared/hooks'
import { BarcodeModal } from '../BarcodeModal'
import {
  formDefaultValues,
  formResolver,
  FormSchema,
  GENDER_PREGNANT_VALUE,
} from './validation'

export type InputFormProps = {
  patientTypes: PatientTypeResponseDto[]
  diagnoses: DiagnosisResponseDto[]
  doctors: DoctorResponseDto[]
  sampleTypes: SampleTypeResponseDto[]
  origins: BranchResponseDto[]
}

const currentYear = new Date().getFullYear()

export function InfoInputForm(props: InputFormProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!

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
      patientTypeId: props.patientTypes[0]?._id,
      doctorId: props.doctors[0]?._id,
      diagnosisId: props.diagnoses[0]?._id!,
      originId: props.origins[0]?._id!,
    },
  })

  useEffect(() => {
    setValue('patientTypeId', props.patientTypes[0]?._id)
  }, [props.patientTypes[0]?._id])

  useEffect(() => {
    setValue('doctorId', props.doctors[0]?._id)
  }, [props.doctors[0]?._id])

  useEffect(() => {
    setValue('diagnosisId', props.diagnoses[0]?._id)
  }, [props.diagnoses[0]?._id])

  useEffect(() => {
    setValue('originId', props.origins[0]?._id)
  }, [props.origins[0]?._id])

  const birthYear = watch('birthYear')
  const [age, setAge] = useState(currentYear - birthYear)

  useEffect(() => {
    setAge(currentYear - birthYear)
  }, [birthYear])

  useEffect(() => {
    // @ts-ignore
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
    const response = (error as any)?.data as HttpErrorResponse
    if (response?.message?.length > 0) {
      const { message, errorCode } = response
      if (errorCode === DomainErrorCode.ENTITY_SAMPLE_ID_ALREADY_EXISTS) {
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
        filter: {
          branchId,
          ...(deferredExternalId?.length! > 0
            ? { externalId: deferredExternalId }
            : { name: { $regex: '^' + deferredName, $options: 'i' } }),
        },
        offset: 0,
        limit: 10,
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
      diagnosisId,
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
    setValue('diagnosisId', diagnosisId)
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
      const patientValues = trimObjectValues({
        ...values,
        name: dedupSpaces(values.name),
        gender:
          values.gender === GENDER_PREGNANT_VALUE
            ? PatientGender.Female
            : values.gender,
      })

      if (shouldUpdatePatient != null) {
        patient = await updatePatient({
          id: shouldUpdatePatient,
          patientUpdateRequestDto: patientValues,
        }).unwrap()
      } else {
        patient = await createPatient({ ...patientValues, branchId }).unwrap()
      }

      await createSample({
        ...trimObjectValues(values),
        isPregnant: values.gender === GENDER_PREGNANT_VALUE,
        note: values.note?.trim() ?? '',
        sampledAt: values.sampledAt.toISOString(),
        infoAt: values.infoAt.toISOString(),
        patientId: patient._id,
        branchId,
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
            <Grid xs={1.5}>
              <FormTextField
                name="billId"
                autoComplete="off"
                control={control}
                fullWidth
                label="Số biên lai"
              />
            </Grid>
            <Grid xs={1.5}>
              <FormTextField
                name="externalId"
                autoComplete="off"
                control={control}
                fullWidth
                label="ID Phòng khám"
              />
            </Grid>
            <Grid xs={3}>
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
            <Grid xs={3} sx={{ display: 'flex' }}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ flexGrow: 1, alignItems: 'center' }}>
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value={PatientGender.Male}
                        control={<Radio size="small" />}
                        label="Nam"
                      />
                      <FormControlLabel
                        value={PatientGender.Female}
                        control={<Radio size="small" />}
                        label="Nữ"
                      />
                      <FormControlLabel
                        value={GENDER_PREGNANT_VALUE}
                        control={<Radio size="small" />}
                        label="Thai phụ"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid xs={1.5}>
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
            <Grid xs={1.5}>
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
                name="originId"
                label="Đơn vị"
                options={props.origins}
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
                options={props.patientTypes}
                getOptionValue={(option) => option._id}
                getOptionLabel={(option) => option.name}
              />
            </Grid>
            <Grid xs={3}>
              <FormSelect
                control={control}
                name="diagnosisId"
                label="Chẩn đoán"
                options={props.diagnoses}
                getOptionValue={(option) => option._id}
                getOptionLabel={(option) => option.name}
              />
            </Grid>
            <Grid xs={3}>
              <FormSelect
                control={control}
                name="doctorId"
                label="Bác sĩ"
                options={props.doctors}
                getOptionValue={(option) => option._id}
                getOptionLabel={(option) => option.name}
              />
            </Grid>
            <Grid xs={3}>
              <FormTextField
                autoComplete="off"
                name="note"
                control={control}
                size="small"
                fullWidth
                label="Ghi chú"
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
                {getValues().testIds.length} Xét Nghiệm
              </Button>
            </Grid>
            <Grid xs={9}>
              <FormCheckboxGroup
                control={control}
                name="sampleTypeIds"
                options={props.sampleTypes}
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
            'testIds',
            items.map((item) => item._id),
          )
          const sampleTypeIds = new Set(
            items
              .map((item) => item.sampleTypeId)
              .filter((id): id is string => id !== null),
          )
          setValue('sampleTypeIds', Array.from(sampleTypeIds))
        }}
        showCombos
      />
      <Box sx={{ flexGrow: 1, height: '100%', overflow: 'auto' }}>
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
                    )!

                    setShouldUpdatePatient(patient?._id!)
                    setValue('externalId', patient.externalId)
                    setValue('name', patient.name)
                    setValue('gender', patient.gender as PatientGender)
                    setValue('birthYear', patient.birthYear)
                    setValue('address', patient.address)
                    setValue('phoneNumber', patient.phoneNumber)
                    setValue('SSN', patient.SSN)
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
                if (value === PatientGender.Male) {
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
