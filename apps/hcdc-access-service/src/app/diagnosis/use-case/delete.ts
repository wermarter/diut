import { Inject, Injectable } from '@nestjs/common'
import { DiagnosisAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  DiagnosisRepositoryToken,
  IAuthContext,
  IDiagnosisRepository,
  assertPermission,
} from 'src/domain'
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
