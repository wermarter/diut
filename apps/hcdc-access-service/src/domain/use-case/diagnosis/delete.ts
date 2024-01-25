import { Inject, Injectable } from '@nestjs/common'

import { DiagnosisAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  DiagnosisRepositoryToken,
  IAuthContext,
  IDiagnosisRepository,
} from 'src/domain/interface'
import { DiagnosisAssertExistsUseCase } from './assert-exists'

@Injectable()
export class DiagnosisDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(DiagnosisRepositoryToken)
    private readonly diagnosisRepository: IDiagnosisRepository,
    private readonly diagnosisAssertExistsUseCase: DiagnosisAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.diagnosisAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.Diagnosis,
      DiagnosisAction.Delete,
      entity,
    )

    await this.diagnosisRepository.deleteById(input.id)

    return entity
  }
}
