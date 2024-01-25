import { Inject, Injectable } from '@nestjs/common'

import { Diagnosis, DiagnosisAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  DiagnosisRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IDiagnosisRepository,
} from 'src/domain/interface'
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
