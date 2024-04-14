import { Inject, Injectable } from '@nestjs/common'
import { Doctor } from '@diut/hcdc'

import {
  DoctorRepositoryToken,
  EntityFindOneOptions,
  IDoctorRepository,
  EEntityNotFound,
} from 'src/domain'

@Injectable()
export class DoctorAssertExistsUseCase {
  constructor(
    @Inject(DoctorRepositoryToken)
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
