import { Gender, ID_INDICATION_PREGNANT, PatientCategory } from '@diut/common'

import { Patient } from '../patients/patient.schema'
import { Sample } from './sample.schema'

export const UPLOAD_CONFIG = {
  BUCKET: 'sample-uploads',
}

export function getPatientCategory(patient: Patient, sample: Sample) {
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

export function isPregnant(sample: Sample) {
  return sample.indicationId === ID_INDICATION_PREGNANT
}
