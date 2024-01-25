import { Inject, Injectable } from '@nestjs/common'

import { Doctor } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  DoctorRepositoryToken,
  EntityFindOneOptions,
  IDoctorRepository,
} from 'src/domain/interface'

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
