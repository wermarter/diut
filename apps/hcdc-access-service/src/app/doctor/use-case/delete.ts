import { Inject, Injectable } from '@nestjs/common'
import { DoctorAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  DoctorRepositoryToken,
  EEntityCannotDelete,
  IAuthContext,
  IDoctorRepository,
  ISampleRepository,
  SampleRepositoryToken,
  assertPermission,
} from 'src/domain'
import { DoctorAssertExistsUseCase } from './assert-exists'

@Injectable()
export class DoctorDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(DoctorRepositoryToken)
    private readonly doctorRepository: IDoctorRepository,
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
    private readonly doctorAssertExistsUseCase: DoctorAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.doctorAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Doctor, DoctorAction.Delete, entity)

    const connectedSampleCount = await this.sampleRepository.count({
      doctorId: input.id,
    })
    if (connectedSampleCount > 0) {
      throw new EEntityCannotDelete(`${connectedSampleCount} connected Sample`)
    }

    await this.doctorRepository.deleteById(input.id)

    return entity
  }
}
