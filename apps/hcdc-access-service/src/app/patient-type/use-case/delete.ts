import { Inject, Injectable } from '@nestjs/common'

import { PatientTypeAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  PatientTypeRepositoryToken,
  IAuthContext,
  IPatientTypeRepository,
} from 'src/domain/interface'
import { PatientTypeAssertExistsUseCase } from './assert-exists'

@Injectable()
export class PatientTypeDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(PatientTypeRepositoryToken)
    private readonly patientTypeRepository: IPatientTypeRepository,
    private readonly patientTypeAssertExistsUseCase: PatientTypeAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.patientTypeAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.PatientType,
      PatientTypeAction.Delete,
      entity,
    )

    await this.patientTypeRepository.deleteById(input.id)

    return entity
  }
}
