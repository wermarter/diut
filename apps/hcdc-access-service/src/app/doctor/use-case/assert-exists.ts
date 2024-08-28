import { Doctor } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import {
  DOCTOR_REPO_TOKEN,
  EEntityNotFound,
  EntityFindOneOptions,
  IDoctorRepository,
} from 'src/domain'

@Injectable()
export class DoctorAssertExistsUseCase {
  constructor(
    @Inject(DOCTOR_REPO_TOKEN)
    private readonly doctorRepository: IDoctorRepository,
  ) {}

  async execute(input: EntityFindOneOptions<Doctor>['filter']) {
    const rv = await this.doctorRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`Doctor ${JSON.stringify(input)}`)
    }

    return rv
  }
}
