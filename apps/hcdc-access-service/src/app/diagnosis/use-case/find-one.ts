import { Inject, Injectable } from '@nestjs/common'
import { Diagnosis, DiagnosisAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  DiagnosisRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IDiagnosisRepository,
  assertPermission,
} from 'src/domain'
import { DiagnosisAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class DiagnosisFindOneUseCase {
  constructor(
    @Inject(DiagnosisRepositoryToken)
    private readonly diagnosisRepository: IDiagnosisRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly diagnosisAuthorizePopulatesUseCase: DiagnosisAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<Diagnosis>) {
    input.populates = this.diagnosisAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.diagnosisRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.Diagnosis,
      DiagnosisAction.Read,
      entity,
    )

    return entity
  }
}
