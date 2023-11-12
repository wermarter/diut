import {
  Gender,
  PatientCategory,
  ID_INDICATION_PREGNANT,
} from '@diut/levansy-common'

import { PatientResponseDto } from 'src/api/patient'
import { SampleResponseDto } from 'src/api/sample'

function isPregnant(sample: SampleResponseDto) {
  return sample.indicationId === ID_INDICATION_PREGNANT
}

export function getPatientCategory(
  patient: PatientResponseDto,
  sample: SampleResponseDto,
) {
  const { gender, birthYear } = patient
  const age = new Date().getFullYear() - birthYear

  if (gender === Gender.Female && isPregnant(sample)) {
    return PatientCategory.Pregnant
  }

  if (gender === Gender.Male && age >= 18) {
    return PatientCategory.Man
  }

  if (gender === Gender.Female && age >= 18) {
    return PatientCategory.Woman
  }

  if (gender === Gender.Male && age < 18) {
    return PatientCategory.Boy
  }

  if (gender === Gender.Female && age < 18) {
    return PatientCategory.Girl
  }

  return PatientCategory.Any
}
