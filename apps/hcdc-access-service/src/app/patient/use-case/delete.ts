import { Inject, Injectable } from '@nestjs/common'
import { PatientAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  PatientRepositoryToken,
  IAuthContext,
  IPatientRepository,
  assertPermission,
} from 'src/domain'
import { PatientAssertExistsUseCase } from './assert-exists'
import { SampleDeleteManyUseCase } from '../../sample/use-case/delete-many'

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
