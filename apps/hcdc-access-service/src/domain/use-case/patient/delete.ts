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
import { SampleDeleteManyUseCase } from '../sample/delete-many'

@Injectable()
export class PatientDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(PatientRepositoryToken)
    private readonly patientRepository: IPatientRepository,
    private readonly patientAssertExistsUseCase: PatientAssertExistsUseCase,
    private readonly sampleDeleteManyUseCase: SampleDeleteManyUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.patientAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Patient, PatientAction.Delete, entity)

    // TODO: DB transaction
    await this.sampleDeleteManyUseCase.execute({ patientId: input.id })
    await this.patientRepository.deleteById(input.id)

    return entity
  }
}
