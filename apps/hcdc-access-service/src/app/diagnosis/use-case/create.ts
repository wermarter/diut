import { AuthSubject, Diagnosis, DiagnosisAction, EntityData } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  DIAGNOSIS_REPO_TOKEN,
  IAuthContext,
  IDiagnosisRepository,
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
