import { Inject, Injectable } from '@nestjs/common'
import { DiagnosisAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  DiagnosisRepositoryToken,
  EEntityCannotDelete,
  IAuthContext,
  IDiagnosisRepository,
  ISampleRepository,
  SampleRepositoryToken,
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
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
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

    const connectedSampleCount = await this.sampleRepository.count({
      diagnosisId: input.id,
    })
    if (connectedSampleCount > 0) {
      throw new EEntityCannotDelete(`${connectedSampleCount} connected Sample`)
    }

    await this.diagnosisRepository.deleteById(input.id)

    return entity
  }
}
