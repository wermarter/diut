import { Inject, Injectable } from '@nestjs/common'
import { Patient } from '@diut/hcdc'

import {
  PatientRepositoryToken,
  EntityFindOneOptions,
  IPatientRepository,
  EEntityNotFound,
} from 'src/domain'

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
