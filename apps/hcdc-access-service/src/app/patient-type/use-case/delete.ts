import { Inject, Injectable } from '@nestjs/common'
import { PatientTypeAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  PatientTypeRepositoryToken,
  IAuthContext,
  IPatientTypeRepository,
  assertPermission,
  SampleRepositoryToken,
  ISampleRepository,
  EEntityCannotDelete,
} from 'src/domain'
import { PatientTypeAssertExistsUseCase } from './assert-exists'

@Injectable()
export class PatientTypeDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(PatientTypeRepositoryToken)
    private readonly patientTypeRepository: IPatientTypeRepository,
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
    private readonly patientTypeAssertExistsUseCase: PatientTypeAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.patientTypeAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.PatientType,
      PatientTypeAction.Delete,
      entity,
    )

    const connectedSampleCount = await this.sampleRepository.count({
      patientTypeId: input.id,
    })
    if (connectedSampleCount > 0) {
      throw new EEntityCannotDelete(`${connectedSampleCount} connected Sample`)
    }

    await this.patientTypeRepository.deleteById(input.id)

    return entity
  }
}
