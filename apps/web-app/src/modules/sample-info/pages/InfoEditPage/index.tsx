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

import {
  FormContainer,
  FormSwitch,
  FormTextField,
  FormDateTimePicker,
  FormCheckboxGroup,
  FormSelect,
} from 'src/common/form-elements'
import { formResolver, FormSchema } from '../InfoInputPage/validation'
import { TestSelector } from 'src/common/components/TestSelector'
import {
  useSampleDeleteByIdMutation,
  useSampleUpdateByIdMutation,
} from 'src/api/sample'
import { usePatientUpdateByIdMutation } from 'src/api/patient'
import { infoEditPageLoader } from './loader'
import { useTypedSelector } from 'src/core'
import { selectUserIsAdmin } from 'src/modules/auth'

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
    //@ts-ignore
    if (typeof birthYear === 'string' && birthYear.length > 0) {
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
            navigate(-1)
          }}
        >
          Quay v???
        </Button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontStyle: 'italic', mr: 2 }}>
            {author.name}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteSample({ id: sampleInfo._id })
                .unwrap()
                .then(() => {
                  toast.success(`???? xo?? m???u: ${sampleInfo.sampleId}`)
                  navigate(-1)
                })
            }}
            disabled={!userIsAdmin || isDeletingSample}
          >
            Xo?? m???u XN
          </Button>
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
                note: values.note ?? '',
                results: sampleInfo.results, // needed for backend update logic
                sampleCompleted: sampleInfo.sampleCompleted, // needed for backend update logic
                sampledAt: values.sampledAt.toISOString(),
                infoAt: values.infoAt.toISOString(),
              },
            }).unwrap(),
          ]).then(() => {
            toast.success('S???a th??nh c??ng')
            navigate(-1)
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
                label="ID Ph??ng kh??m"
                autoFocus
              />
            </Grid>
            <Grid xs={4}>
              <FormTextField
                autoComplete="off"
                name="name"
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
                label="TG nh???n m???u"
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
                autoComplete="off"
                name="birthYear"
                type="number"
                size="small"
                control={control}
                fullWidth
                label="N??m sinh"
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
                label="Tu???i"
              />
            </Grid>
            <Grid xs={6}>
              <FormTextField
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
            <Grid xs={10}>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                S???a th??ng tin
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
