import {
  AuthSubject,
  PatientGender,
  SampleAction,
  checkPermission,
  createAbility,
} from '@diut/hcdc'
import { useEffect, useState, useMemo } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { difference, omit } from 'lodash'
import { trimStringValues } from '@diut/common'

import {
  FormContainer,
  FormSwitch,
  FormTextField,
  FormDateTimePicker,
  FormCheckboxGroup,
  FormSelect,
} from 'src/components/form'
import {
  formResolver,
  FormSchema,
  GENDER_PREGNANT_VALUE,
} from '../InfoInputForm/validation'
import { TestSelector } from 'src/features/test/components/TestSelector'
import {
  SampleResponseDto,
  SampleUnpopulatedResponseDto,
  useSampleDeleteByIdMutation,
  useSampleUpdateInfoByIdMutation,
} from 'src/infra/api/access-service/sample'
import { usePatientUpdateByIdMutation } from 'src/infra/api/access-service/patient'
import { useTypedSelector } from 'src/infra/redux'
import { BarcodeModal } from '../BarcodeModal'
import { PatientTypeResponseDto } from 'src/infra/api/access-service/patient-type'
import { DiagnosisResponseDto } from 'src/infra/api/access-service/diagnosis'
import { DoctorResponseDto } from 'src/infra/api/access-service/doctor'
import { SampleTypeResponseDto } from 'src/infra/api/access-service/sample-type'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { authSlice } from 'src/features/auth'

const currentYear = new Date().getFullYear()

export type InfoEditViewProps = {
  sampleRes: SampleResponseDto
  patientTypes: PatientTypeResponseDto[]
  diagnoses: DiagnosisResponseDto[]
  doctors: DoctorResponseDto[]
  sampleTypes: SampleTypeResponseDto[]
  origins: BranchResponseDto[]
}

export function InfoEditView(props: InfoEditViewProps) {
  const userPermissions = useTypedSelector(
    authSlice.selectors.selectUserPermissions,
  )
  const userAbility = useMemo(() => {
    return createAbility(userPermissions)
  }, [userPermissions])
  const navigate = useNavigate()
  const originalTestIds = props.sampleRes.results.map(({ testId }) => testId)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: {
      externalId: props.sampleRes.patient?.externalId!,
      name: props.sampleRes.patient?.name!,
      infoAt: new Date(props.sampleRes.infoAt),
      sampledAt: new Date(props.sampleRes.sampledAt),
      gender: props.sampleRes.isPregnant
        ? GENDER_PREGNANT_VALUE
        : (props.sampleRes.patient?.gender! as PatientGender),
      birthYear: props.sampleRes.patient?.birthYear!,
      address: props.sampleRes.patient?.address!,
      originId: props.sampleRes.originId,
      sampleId: props.sampleRes.sampleId,
      phoneNumber: props.sampleRes.patient?.phoneNumber!,
      SSN: props.sampleRes.patient?.SSN!,
      isTraBuuDien: props.sampleRes.isTraBuuDien,
      isNgoaiGio: props.sampleRes.isNgoaiGio,
      patientTypeId: props.sampleRes.patientTypeId,
      diagnosisId: props.sampleRes.diagnosisId,
      doctorId: props.sampleRes.doctorId,
      note: props.sampleRes.note,
      sampleTypeIds: props.sampleRes.sampleTypeIds,
      testIds: originalTestIds,
    },
  })

  const name = watch('name')
  const testIds = watch('testIds')
  const sampleId = watch('sampleId')
  const birthYear = watch('birthYear')
  const [age, setAge] = useState(currentYear - birthYear)

  useEffect(() => {
    setAge(currentYear - birthYear)
  }, [birthYear])

  useEffect(() => {
    //@ts-ignore
    if (typeof birthYear === 'string' && birthYear.length > 0) {
      setValue('birthYear', Number(birthYear))
    }
  }, [birthYear])

  const [testSelectorOpen, setTestSelectorOpen] = useState(false)

  const [updateSample] = useSampleUpdateInfoByIdMutation()
  const [updatePatient] = usePatientUpdateByIdMutation()

  const [deleteSample, { isLoading: isDeletingSample }] =
    useSampleDeleteByIdMutation()

  const [barcodeModalOpen, setBarcodeModalOpen] = useState(false)

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={() => {
            navigate(-1)
          }}
        >
          Quay về
        </Button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontStyle: 'italic', mr: 2 }}>
            {props.sampleRes.infoBy?.name}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteSample(props.sampleRes._id)
                .unwrap()
                .then(() => {
                  toast.success(`Đã xoá mẫu: ${props.sampleRes._id}`)
                  navigate(-1)
                })
            }}
            disabled={
              !checkPermission(
                userAbility,
                AuthSubject.Sample,
                SampleAction.Delete,
                omit(props.sampleRes as SampleUnpopulatedResponseDto, [
                  'infoAt',
                  'sampledAt',
                  'printedAt',
                ]),
              ) || isDeletingSample
            }
          >
            Xoá mẫu XN
          </Button>
        </div>
      </Box>
      <FormContainer
        onSubmit={handleSubmit(async (values) => {
          values = trimStringValues(values)
          return Promise.all([
            updatePatient({
              id: props.sampleRes.patient?._id!,
              patientUpdateRequestDto: {
                ...values,
                gender:
                  values.gender === GENDER_PREGNANT_VALUE
                    ? PatientGender.Female
                    : values.gender,
              },
            }).unwrap(),
            updateSample({
              id: props.sampleRes._id,
              sampleUpdateInfoRequestDto: {
                ...values,
                isPregnant: values.gender === GENDER_PREGNANT_VALUE,
                addedTestIds: difference(values.testIds, originalTestIds),
                removedTestIds: difference(originalTestIds, values.testIds),
                sampledAt: values.sampledAt.toISOString(),
                infoAt: values.infoAt.toISOString(),
              },
            }).unwrap(),
          ]).then(() => {
            setBarcodeModalOpen(true)
          })
        })}
      >
        <Paper sx={{ p: 2, mb: 2 }} elevation={4}>
          <Grid container spacing={2}>
            {/* ----------------------------- Row 1 ----------------------------- */}
            <Grid xs={3}>
              <FormTextField
                autoComplete="off"
                name="externalId"
                control={control}
                fullWidth
                label="ID Phòng khám"
                autoFocus
              />
            </Grid>
            <Grid xs={3}>
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
                autoComplete="off"
                name="birthYear"
                type="number"
                size="small"
                control={control}
                fullWidth
                label="Năm sinh"
              />
            </Grid>
            <Grid xs={1.5}>
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
            <Grid xs={3}>
              <FormTextField
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
                {testIds.length} Xét Nghiệm
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
            <Grid xs={12}>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Sửa thông tin
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
        previousState={props.sampleRes.results.map(({ testId }) => testId)}
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
      <BarcodeModal
        open={barcodeModalOpen}
        onClose={() => {
          setBarcodeModalOpen(false)
          navigate(-1)
        }}
        sampleId={sampleId}
        name={name}
        birthYear={birthYear}
      />
    </Box>
  )
}
