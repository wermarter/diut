import { Inject, Injectable } from '@nestjs/common'
import { DiagnosisAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  DIAGNOSIS_REPO_TOKEN,
  IAuthContext,
  IDiagnosisRepository,
  assertPermission,
} from 'src/domain'
import { DiagnosisAssertExistsUseCase } from './assert-exists'
import { DiagnosisValidateUseCase } from './validate'

@Injectable()
export class DiagnosisUpdateUseCase {
  constructor(
    @Inject(DIAGNOSIS_REPO_TOKEN)
    private readonly diagnosisRepository: IDiagnosisRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
