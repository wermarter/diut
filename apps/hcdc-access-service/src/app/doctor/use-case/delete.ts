import { AuthSubject, DoctorAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  DOCTOR_REPO_TOKEN,
  EEntityCannotDelete,
  IAuthContext,
  IDoctorRepository,
  ISampleRepository,
  SAMPLE_REPO_TOKEN,
} from 'src/domain'
import { DoctorAssertExistsUseCase } from './assert-exists'

@Injectable()
export class DoctorDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(DOCTOR_REPO_TOKEN)
    private readonly doctorRepository: IDoctorRepository,
    @Inject(SAMPLE_REPO_TOKEN)
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
