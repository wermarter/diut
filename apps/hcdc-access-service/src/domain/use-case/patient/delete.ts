import { Inject, Injectable } from '@nestjs/common'

import { PatientAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  PatientRepositoryToken,
  IAuthContext,
  IPatientRepository,
} from 'src/domain/interface'
import { PatientAssertExistsUseCase } from './assert-exists'

@Injectable()
export class PatientDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(PatientRepositoryToken)
    private readonly patientRepository: IPatientRepository,
    private readonly patientAssertExistsUseCase: PatientAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.patientAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Patient, PatientAction.Delete, entity)

    // TODO: delete related sample here: call delete sample use case for auth
    await this.patientRepository.deleteById(input.id)

    return entity
  }
}
