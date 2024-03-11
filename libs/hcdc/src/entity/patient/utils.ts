import { Patient, PatientCategory, PatientGender } from './entity'

export const PATIENT_ADULT_AGE = 16

export function getPatientCategory(
  patient: Pick<Patient, 'gender' | 'birthYear'>,
  isPregnant: boolean,
): PatientCategory {
  if (isPregnant) {
    return PatientCategory.Pregnant
  }

  const thisYear = new Date().getFullYear()
  const age = thisYear - patient.birthYear

  if (patient.gender === PatientGender.Male) {
    if (age >= PATIENT_ADULT_AGE) {
      return PatientCategory.MatureMale
    }
    return PatientCategory.YoungMale
  }

  if (patient.gender === PatientGender.Female) {
    if (age >= PATIENT_ADULT_AGE) {
      return PatientCategory.MatureFemale
    }
    return PatientCategory.YoungFemale
  }
}
