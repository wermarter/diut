import { Inject, Injectable } from '@nestjs/common'

import { Patient } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  PatientRepositoryToken,
  EntityFindOneOptions,
  IPatientRepository,
} from 'src/domain/interface'

@Injectable()
export class PatientAssertExistsUseCase {
  constructor(
    @Inject(PatientRepositoryToken)
    private readonly patientRepository: IPatientRepository,
  ) {}

  async execute(input: EntityFindOneOptions<Patient>['filter']) {
    const rv = await this.patientRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`Patient ${JSON.stringify(input)}`)
    }

    return rv
  }
}
