import { ID_INDICATION_PREGNANT } from './indications'

export enum Gender {
  Male = 0,
  Female = 1,
}

export enum PatientCategory {
  Any = 'any',

  Boy = 'boy',
  Girl = 'girl',

  Man = 'man',
  Woman = 'woman',

  Pregnant = 'pregnant',
}

export function getPatientCategory(
  patientGender: Gender,
  patientBirthYear: number,
  sampleIndicationId: string,
) {
  const gender = patientGender
  const birthYear = patientBirthYear
  const age = new Date().getFullYear() - birthYear

  if (gender === Gender.Female && isPregnant(sampleIndicationId)) {
    return PatientCategory.Pregnant
  }

  if (gender === Gender.Male && age >= 15) {
    return PatientCategory.Man
  }

  if (gender === Gender.Female && age >= 15) {
    return PatientCategory.Woman
  }

  if (gender === Gender.Male && age < 15) {
    return PatientCategory.Boy
  }

  if (gender === Gender.Female && age < 15) {
    return PatientCategory.Girl
  }

  return PatientCategory.Any
}

export function isPregnant(sampleIndicationId: string) {
  return sampleIndicationId === ID_INDICATION_PREGNANT
}
