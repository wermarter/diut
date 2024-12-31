import { AuthSubject, Doctor, DoctorAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
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
import { DoctorSearchUseCase } from './search'

@Injectable()
export class DoctorDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(DOCTOR_REPO_TOKEN)
    private readonly doctorRepository: IDoctorRepository,
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    private readonly doctorSearchUseCase: DoctorSearchUseCase,
  ) {}

  async execute(input: FilterQuery<Doctor>) {
    const { ability } = this.authContext.getData()
    const { items: doctors } = await this.doctorSearchUseCase.execute({
      filter: input,
    })

    for (const doctor of doctors) {
      assertPermission(ability, AuthSubject.Doctor, DoctorAction.Delete, doctor)

      const connectedSampleCount = await this.sampleRepository.count({
        doctorId: doctor._id,
      })
      if (connectedSampleCount > 0) {
        throw new EEntityCannotDelete(
          `${connectedSampleCount} connected Sample`,
        )
      }

      await this.doctorRepository.deleteById(doctor._id)
    }
  }
}
