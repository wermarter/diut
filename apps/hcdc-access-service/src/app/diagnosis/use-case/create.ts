import { Inject, Injectable } from '@nestjs/common'
import { Diagnosis, DiagnosisAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  DIAGNOSIS_REPO_TOKEN,
  IAuthContext,
  IDiagnosisRepository,
  EntityData,
  assertPermission,
} from 'src/domain'
import { DiagnosisValidateUseCase } from './validate'

@Injectable()
export class DiagnosisCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(DIAGNOSIS_REPO_TOKEN)
    private readonly diagnosisRepository: IDiagnosisRepository,
    private readonly diagnosisValidateUseCase: DiagnosisValidateUseCase,
  ) {}

  async execute(input: EntityData<Diagnosis>) {
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.Diagnosis,
      DiagnosisAction.Create,
      input,
    )
    await this.diagnosisValidateUseCase.execute(input)

    const entity = await this.diagnosisRepository.create(input)

    return entity
  }
}
