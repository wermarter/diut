import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  DiagnosisRepositoryToken,
  IAuthContext,
  IDiagnosisRepository,
} from 'src/domain/interface'
import { Diagnosis, DiagnosisAction, EntityData } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { DiagnosisValidateUseCase } from './validate'

@Injectable()
export class DiagnosisCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(DiagnosisRepositoryToken)
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
