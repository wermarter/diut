import { Inject } from '@nestjs/common'

import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  PatientAction,
  PatientCategory,
  PatientGender,
} from 'src/domain/entity'
import { AuthContextToken, IAuthContext } from 'src/domain/interface'
import { PatientAssertExistsUseCase } from './assert-exists'

export class PatientGetCategoryUseCase {
  constructor(
    @Inject(AuthContextToken)
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
