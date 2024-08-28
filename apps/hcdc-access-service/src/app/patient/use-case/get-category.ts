import {
  AuthSubject,
  PatientAction,
  PatientCategory,
  PatientGender,
} from '@diut/hcdc'
import { Inject } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'
import { PatientAssertExistsUseCase } from './assert-exists'

export class PatientGetCategoryUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly patientAssertExistsUseCase: PatientAssertExistsUseCase,
  ) {}

  async execute(input: { patientId: string }): Promise<PatientCategory> {
    const { ability } = this.authContext.getData()
    const patient = await this.patientAssertExistsUseCase.execute({
      _id: input.patientId,
    })
    assertPermission(ability, AuthSubject.Patient, PatientAction.Read, patient)

    const { gender, birthYear } = patient
    const age = new Date().getFullYear() - birthYear

    if (gender === PatientGender.Male && age >= 15) {
      return PatientCategory.MatureMale
    }

    if (gender === PatientGender.Female && age >= 15) {
      return PatientCategory.MatureFemale
    }

    if (gender === PatientGender.Male && age < 15) {
      return PatientCategory.YoungMale
    }

    if (gender === PatientGender.Female && age < 15) {
      return PatientCategory.YoungFemale
    }

    return PatientCategory.Any
  }
}
