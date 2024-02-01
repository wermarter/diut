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
import { DiagnosisValidateUseCase } from './validate'

@Injectable()
export class DiagnosisUpdateUseCase {
  constructor(
    @Inject(DiagnosisRepositoryToken)
    private readonly diagnosisRepository: IDiagnosisRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly diagnosisAssertExistsUseCase: DiagnosisAssertExistsUseCase,
    private readonly diagnosisValidateUseCase: DiagnosisValidateUseCase,
  ) {}

  async execute(...input: Parameters<IDiagnosisRepository['update']>) {
    const entity = await this.diagnosisAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.Diagnosis,
      DiagnosisAction.Update,
      entity,
    )
    await this.diagnosisValidateUseCase.execute(input[1])

    return this.diagnosisRepository.update(...input)
  }
}
